import { createHash } from "node:crypto";
export const hash = (text) => createHash("sha256").update(text).digest("hex");
export const normalize = (text) =>
  text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
const fields = [
  "title",
  "year",
  "type",
  "rawCitation",
  "authors",
  "venue",
  "link",
  "source",
];
const themes = ["education", "technology", "organizations", "communities"];
export function validateWork(w) {
  if (!w || typeof w !== "object") throw Error("Invalid publication");
  for (const k of [
    "id",
    "title",
    "type",
    "theme",
    "rawCitation",
    "venue",
    "link",
    "summary",
    "source",
  ])
    if (typeof w[k] !== "string")
      throw Error(`Publication ${k} must be a string`);
  if (
    !/^work-[a-z0-9-]+$/.test(w.id) ||
    w.title.length < 4 ||
    w.title.length > 1500 ||
    w.rawCitation.length < 10
  )
    throw Error("Invalid publication identity or citation");
  if (
    !Number.isInteger(w.year) ||
    w.year < 1800 ||
    w.year > new Date().getFullYear() + 5
  )
    throw Error("Invalid year");
  if (
    !["journal", "book", "chapter", "conference", "other"].includes(w.type) ||
    !themes.includes(w.theme)
  )
    throw Error("Invalid type or theme");
  if (
    !Array.isArray(w.authors) ||
    !w.authors.every((a) => typeof a === "string") ||
    typeof w.featured !== "boolean"
  )
    throw Error("Invalid authors or featured flag");
  if (w.link && !/^https:\/\//.test(w.link))
    throw Error("Publication links must use HTTPS");
}
export function validateData(d) {
  if (!d.profile || !Array.isArray(d.publications))
    throw Error("Missing profile or publications");
  const ids = new Set();
  for (const w of d.publications) {
    validateWork(w);
    if (ids.has(w.id)) throw Error("Duplicate ID");
    ids.add(w.id);
  }
  for (const field of [
    "name",
    "title",
    "affiliation",
    "email",
    "bio",
    "scholarUrl",
    "orcidUrl",
    "cvUrl",
  ])
    if (typeof d.profile[field] !== "string")
      throw Error(`Invalid profile ${field}`);
  for (const field of ["scholarUrl", "orcidUrl", "cvUrl"])
    if (d.profile[field] && !/^https:\/\//.test(d.profile[field]))
      throw Error("Profile links must use HTTPS");
  if (d.profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.profile.email))
    throw Error("Invalid contact email");
  for (const field of ["appointments", "awards", "education"]) {
    if (!Array.isArray(d.profile[field])) throw Error(`Invalid ${field}`);
    for (const x of d.profile[field])
      for (const key of ["title", "organization", "period"])
        if (typeof x[key] !== "string") throw Error(`Invalid ${field} record`);
  }
  if (!Array.isArray(d.profile.projects)) throw Error("Invalid projects");
  for (const x of d.profile.projects) {
    for (const k of ["title", "description", "url"])
      if (typeof x[k] !== "string") throw Error("Invalid resource");
    if (!/^https:\/\//.test(x.url))
      throw Error("Resource links must use HTTPS");
  }
  return d;
}
export function applyProposal(current, proposal, cvText) {
  if (proposal.baseHash !== hash(JSON.stringify(current)))
    throw Error("Website data changed since preparation. Prepare again.");
  if (proposal.cvHash !== hash(cvText))
    throw Error("CV changed since preparation. Prepare again.");
  if (!Array.isArray(proposal.changes)) throw Error("Missing changes");
  const result = structuredClone(current),
    report = [],
    touched = new Set();
  for (const change of proposal.changes) {
    if (
      typeof change.evidence !== "string" ||
      change.evidence.trim().length < 12 ||
      !cvText.includes(change.evidence)
    )
      throw Error("Every change needs an exact CV evidence passage");
    const { kind, id, field, value } = change;
    const touch = `${kind}:${id}:${field}`;
    if (touched.has(touch)) throw Error("Duplicate operation");
    touched.add(touch);
    let v;
    try {
      v = JSON.parse(value);
    } catch {
      throw Error("Change value must be JSON encoded");
    }
    if (kind === "add-publication") {
      validateWork(v);
      if (v.featured || v.summary)
        throw Error("New works start unfeatured without inferred summaries");
      const duplicate = result.publications.find(
        (w) =>
          w.id === v.id ||
          (normalize(w.title) === normalize(v.title) && w.year === v.year) ||
          (v.link.startsWith("https://doi.org/") &&
            w.link.toLowerCase() === v.link.toLowerCase()),
      );
      if (duplicate)
        throw Error(
          `Duplicate publication: ${duplicate.id}. Update it instead.`,
        );
      result.publications.push(v);
      report.push(`Added: ${v.title}`);
    } else if (kind === "update-publication") {
      if (!fields.includes(field))
        throw Error(
          "Editorial theme, summary, featured status, and identifiers are preserved",
        );
      const w = result.publications.find((w) => w.id === id);
      if (!w) throw Error("Unknown publication ID");
      const before = JSON.stringify(w[field]);
      w[field] = v;
      validateWork(w);
      if (before !== JSON.stringify(v))
        report.push(`Updated ${w.title}: ${field}`);
    } else if (kind === "update-profile") {
      if (
        ![
          "title",
          "affiliation",
          "email",
          "scholarUrl",
          "orcidUrl",
          "cvUrl",
          "appointments",
          "awards",
          "education",
          "projects",
        ].includes(field)
      )
        throw Error(
          "Unsupported profile field; biography requires editorial review",
        );
      if (Array.isArray(result.profile[field])) {
        if (!Array.isArray(v)) throw Error("Profile list must be an array");
        // Omitted CV items are retained. An incoming item updates only the same title and organization.
        for (const incoming of v) {
          const list = result.profile[field];
          const match = list.findIndex(
            (x) =>
              normalize(x.title) === normalize(incoming.title) &&
              normalize(x.organization || "") ===
                normalize(incoming.organization || ""),
          );
          if (match >= 0) list[match] = incoming;
          else list.push(incoming);
        }
      } else result.profile[field] = v;
      report.push(`Updated profile: ${field}`);
    } else
      throw Error(
        "Unsupported operation. Deletions and metric inference are not allowed.",
      );
  }
  validateData(result);
  result.cvHash = proposal.cvHash;
  result.cvDate = proposal.cvDate || current.cvDate;
  result.updatedAt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
  }).format(new Date());
  return { data: result, report };
}
export const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    cvDate: { type: ["string", "null"] },
    changes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          kind: {
            type: "string",
            enum: ["add-publication", "update-publication", "update-profile"],
          },
          id: { type: "string" },
          field: { type: "string" },
          value: { type: "string" },
          evidence: { type: "string" },
          reason: { type: "string" },
        },
        required: ["kind", "id", "field", "value", "evidence", "reason"],
      },
    },
    questions: { type: "array", items: { type: "string" } },
  },
  required: ["cvDate", "changes", "questions"],
};
