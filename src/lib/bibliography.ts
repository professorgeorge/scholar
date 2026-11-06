export interface Work {
  id: string;
  title: string;
  year: number;
  type: string;
  theme: string;
  rawCitation: string;
  authors: string[];
  venue: string;
  link: string;
  summary: string;
  featured: boolean;
  source: string;
}
const escapeBib = (s: string) =>
  s.replace(/\\/g, "\\textbackslash{}").replace(/[{}%&#_$]/g, (c) => `\\${c}`);
export function toBibTeX(p: Work) {
  const type =
    (
      {
        journal: "article",
        book: "book",
        chapter: "incollection",
        conference: "inproceedings",
      } as Record<string, string>
    )[p.type] || "misc";
  const fields: Record<string, string> = {
    title: p.title,
    year: String(p.year),
  };
  if (p.authors.length) fields.author = p.authors.join(" and ");
  // CV citations can contain incomplete or ambiguous container metadata. Preserve it verbatim.
  fields.note = p.rawCitation;
  if (p.link.startsWith("https://doi.org/")) fields.doi = p.link.slice(16);
  else if (p.link) fields.url = p.link;
  return `@${type}{${p.id.replace(/[^a-zA-Z0-9_-]/g, "")},\n${Object.entries(
    fields,
  )
    .map(([k, v]) => `  ${k} = {${escapeBib(v)}}`)
    .join(",\n")}\n}`;
}
export function downloadFile(name: string, text: string, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
