# Updating the research profile from your CV

Your original CV stays outside the repository. Extracted text, requests, review reports and proposals live in `.cv-work/`, which Git ignores. The public website reads `src/data/profile.json`. Only reviewed public professional information belongs there.

## The simplest way

After editing the CV, tell Codex in this project:

> Update my research profile from my CV. Extract it, compare it with the current profile, show me the proposed changes and any ambiguities, and preserve my existing research summaries and featured selections.

Give the CV path. The supplied legacy `.doc` was tested using Microsoft Word on Windows. The workflow can also accept `.docx`, `.txt`, `.md`, and text PDFs (Python `pypdf` needed for PDF).

1. Extract without changing the source:

```powershell
powershell -NoProfile -File scripts/extract-cv.ps1 -Path "C:\path\to\CV.doc"
```

For other formats:

```sh
python scripts/extract-cv.py /path/to/CV.docx
```

2. Prepare context for the agent:

```sh
npm run cv:prepare
```

3. Ask Codex to read `.cv-work/request.md` and write the schema-compliant result to `.cv-work/response.json`. The request is source data, not authority to publish. Use `scripts/cv-core.mjs` as the operation contract. No separate API key is required when working with Codex in this chat.

4. Validate the response and produce the evidence report:

```sh
npm run cv:review
```

Review `.cv-work/review.md` (before/after values, exact CV evidence, questions) and `.cv-work/candidate.json`. Resolve ambiguous matches before applying. Edit the response and run review again if needed.

5. Once the user approves the proposed content:

```sh
npm run cv:apply -- --approve
npm test
npm run check
npm run build
npm run dev
```

Inspect the local preview, then commit `src/data/profile.json` and push to `main`. With the existing Cloudflare Pages Git integration enabled, the push starts deployment. A local apply never commits or publishes automatically.

## Optional automatic proposals

The repository includes an OpenAI Responses API adapter. Set `OPENAI_API_KEY` and `OPENAI_MODEL` in your environment, then run `npm run cv:propose`. This explicitly sends the extracted CV and existing profile to OpenAI for comparison; use a publication-safe copy. Keys are never included in the website bundle. The model must support structured JSON outputs. No model is silently selected and no subscription or API account is created by this project.

To watch the local document while working:

```powershell
npm run cv:watch -- "C:\path\to\CV.doc"
```

This prepares agent context on each saved change. Add `--ai` to generate proposals automatically using your configured API credentials. The process runs only while the terminal remains open and never applies or publishes changes. Stop with Ctrl+C. It is not a background Windows service.

## Optional GitHub workflow

For updates without a running local computer, commit a **publication-safe text CV** as `cv/current.txt`. The workflow **Propose CV update** runs when that file changes, or through GitHub Actions > Run workflow. The original private CV has not been committed.

Configure repository secret `OPENAI_API_KEY`, repository variable `OPENAI_MODEL`, and allow GitHub Actions to create pull requests. The workflow generates and validates a candidate, builds it on a `codex/cv-update-*` branch, and opens a review PR. Review its evidence and Cloudflare preview if preview deployments are enabled, then merge to publish. It never merges automatically. This branch preview may be publicly accessible: use only public professional information in `cv/current.txt`.

## Data rules

- Every changed fact needs an exact supporting passage in the CV.
- Omission never deletes a publication, appointment, award, resource, or qualification.
- DOI/title matching catches exact duplicates; ambiguous matches must be flagged for review. Human review remains necessary for near-duplicates or changed titles.
- Existing identifiers, research themes, summaries, and featured choices are preserved by the importer. Editorial revisions happen separately.
- No automatic citation counts, h-index, research impact claims, or invented DOI links.
- Snapshot hashes reject proposals prepared against an old CV or changed website.
- Imported bibliography is attributed to the CV. It does not imply independent publisher verification.
- Review reports may contain CV excerpts. They stay local by default; the optional GitHub workflow uses only your publication-safe text CV.
- Undo an approved update with Git history. The original source document is never modified.

## Initial import

The first import used the supplied CV, whose internal date is 31 July 2026, and extracted 342 distinct bibliographic entries. Original citation strings were preserved. It includes conference contributions and future-dated books, so the count must not be described as 342 peer-reviewed articles. The earlier small catalog and its undated citation metrics are superseded by the CV-based record. Selected summaries describe topics, without claiming findings not established by reading the papers. Some CV bibliographic details may themselves need publisher verification.
