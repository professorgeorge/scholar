import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { applyProposal, hash, validateData } from "./cv-core.mjs";
const current = JSON.parse(fs.readFileSync("src/data/profile.json", "utf8"));
const cv =
  "Babu George. A new publication for the research profile (2026). Example Journal.";
const proposal = (changes) => ({
  baseHash: hash(JSON.stringify(current)),
  cvHash: hash(cv),
  changes,
  questions: [],
  cvDate: "2026-07-31",
});
const evidence = cv;
const newWork = {
  ...current.publications[0],
  id: "work-fixture",
  title: "A new publication for the research profile",
  year: 2026,
  rawCitation: cv,
  summary: "",
  featured: false,
  link: "",
};
const add = () => ({
  kind: "add-publication",
  id: "",
  field: "",
  value: JSON.stringify(newWork),
  evidence,
  reason: "New CV entry",
});
const change = (field, value) => ({
  kind: "update-publication",
  id: current.publications[0].id,
  field,
  value: JSON.stringify(value),
  evidence,
  reason: "Correction",
});
test("current catalog validates", () =>
  assert.equal(
    validateData(current).publications.length,
    current.publications.length,
  ));
test("adding a work preserves all existing records", () => {
  const r = applyProposal(current, proposal([add()]), cv);
  assert.equal(r.data.publications.length, current.publications.length + 1);
  assert.deepEqual(r.data.publications.slice(0, -1), current.publications);
});
test("an abbreviated CV never deletes omitted works", () =>
  assert.deepEqual(
    applyProposal(current, proposal([]), cv).data.publications,
    current.publications,
  ));
test("rejects duplicates with changed punctuation", () => {
  const op = add();
  op.value = JSON.stringify({
    ...newWork,
    title: current.publications[0].title + "!",
    year: current.publications[0].year,
  });
  assert.throws(() => applyProposal(current, proposal([op]), cv), /Duplicate/);
});
test("rejects unsupported evidence", () =>
  assert.throws(
    () =>
      applyProposal(
        current,
        proposal([{ ...add(), evidence: "This is not in the CV" }]),
        cv,
      ),
    /evidence/,
  ));
test("rejects stale website data", () =>
  assert.throws(
    () => applyProposal({ ...current, updatedAt: "changed" }, proposal([]), cv),
    /Website data changed/,
  ));
test("rejects stale CV text", () =>
  assert.throws(
    () => applyProposal(current, proposal([]), cv + "changed"),
    /CV changed/,
  ));
test("preserves curated summaries and selections", () => {
  for (const f of ["summary", "theme", "featured", "id"])
    assert.throws(
      () => applyProposal(current, proposal([change(f, "changed")]), cv),
      /Editorial/,
    );
});
test("rejects unsafe publication URLs", () =>
  assert.throws(
    () =>
      applyProposal(
        current,
        proposal([change("link", "javascript:alert(1)")]),
        cv,
      ),
    /HTTPS/,
  ));
test("profile arrays retain omitted entries", () => {
  const r = applyProposal(
    current,
    proposal([
      {
        kind: "update-profile",
        id: "",
        field: "appointments",
        value: "[]",
        evidence,
        reason: "",
      },
    ]),
    cv,
  );
  assert.deepEqual(r.data.profile.appointments, current.profile.appointments);
});
test("invalid operations cannot partially mutate current data", () => {
  const before = JSON.stringify(current);
  assert.throws(() =>
    applyProposal(current, proposal([add(), change("year", 0)]), cv),
  );
  assert.equal(JSON.stringify(current), before);
});
test("metrics cannot be inferred", () =>
  assert.throws(
    () =>
      applyProposal(
        current,
        proposal([
          {
            kind: "update-profile",
            id: "",
            field: "metrics",
            value: "{}",
            evidence,
          },
        ]),
        cv,
      ),
    /Unsupported/,
  ));
