import fs from "node:fs/promises";
const data = JSON.parse(await fs.readFile("src/data/profile.json", "utf8"));
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const p = data.profile;
const list = (items) =>
  items
    .map(
      (x) =>
        `<li><strong>${esc(x.title)}</strong> — ${esc(x.organization)} (${esc(x.period)})</li>`,
    )
    .join("");
const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.name)} — Academic profile</title><style>body{font:16px/1.65 Georgia,serif;max-width:900px;margin:50px auto;padding:0 24px;color:#202f3a}h1{font-size:36px}h2{margin-top:36px}li{margin-bottom:14px}a{color:#326b69}small{color:#58656a}@media print{body{margin:0;max-width:none;font-size:11pt}.controls{display:none}li{break-inside:avoid}}</style></head><body><p class="controls"><a href="/">Return to website</a> · Use your browser’s Print command to save a PDF.</p><h1>${esc(p.name)}</h1><p>${esc(p.title)} · ${esc(p.affiliation)}</p><p>${esc(p.bio)}</p><p><a href="mailto:${esc(p.email)}">${esc(p.email)}</a> · <a href="${esc(p.scholarUrl)}">Google Scholar</a></p><h2>Academic appointments</h2><ul>${list(p.appointments)}</ul><h2>Education</h2><ul>${list(p.education)}</ul><h2>Selected recognition</h2><ul>${list(p.awards)}</ul><h2>Publications and conference contributions</h2><p>Bibliographic entries reproduced from the supplied CV${data.cvDate ? ` dated ${esc(data.cvDate)}` : ""}. Future-dated entries are included. Publisher verification is separate.</p><ol>${[
  ...data.publications,
]
  .sort((a, b) => b.year - a.year)
  .map((w) => `<li>${esc(w.rawCitation)}</li>`)
  .join(
    "",
  )}</ol><small>Academic profile generated from the website’s approved data. Updated ${esc(data.updatedAt)}. This is not a reproduction of the private source CV.</small></body></html>`;
await fs.writeFile("dist/academic-profile.html", html);
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateModified: data.updatedAt,
  mainEntity: {
    "@type": "Person",
    name: p.name,
    jobTitle: p.title,
    affiliation: { "@type": "Organization", name: p.affiliation },
    description: p.bio,
    sameAs: [p.scholarUrl, ...(p.orcidUrl ? [p.orcidUrl] : [])],
  },
};
let index = await fs.readFile("dist/index.html", "utf8");
index = index
  .replace(
    "</head>",
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></head>`,
  )
  .replace(
    '<div id="root"></div>',
    `<div id="root"></div><noscript><h1>${esc(p.name)}</h1><p>${esc(p.bio)}</p><a href="/academic-profile.html">Read the academic profile and publication list</a></noscript>`,
  );
await fs.writeFile("dist/index.html", index);
console.log("Generated printable academic profile and structured metadata.");
