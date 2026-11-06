import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Mail,
  Moon,
  Sun,
  Search,
  X,
  Menu,
  Network,
  List,
} from "lucide-react";
import data from "./data/profile.json";
import { themes } from "./data/themes";
import { Work, toBibTeX, downloadFile } from "./lib/bibliography";
import { Home } from "./components/Home";
import { Background } from "./components/Background";
export const works = data.publications as Work[],
  profile = data.profile;
export const typeNames: Record<string, string> = {
  journal: "Journal article",
  book: "Book",
  chapter: "Book chapter",
  conference: "Conference contribution",
  other: "Other",
};
export function LinkOut({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
export function Publication({ work: w }: { work: Work }) {
  const [open, setOpen] = useState(false),
    [status, setStatus] = useState("");
  return (
    <article className="work" id={w.id}>
      <div className="work-meta">
        <span>
          {w.year > new Date().getFullYear() ? "Forthcoming · " : ""}
          {w.year}
        </span>
        <span>{typeNames[w.type] || "Publication"}</span>
      </div>
      <div className="work-body">
        <button
          className="work-title"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {w.title}
        </button>
        <p className="citation">{w.rawCitation}</p>
        {w.summary && <p className="work-summary">{w.summary}</p>}
        {open && (
          <div className="work-detail">
            <p>
              Source: {w.source}. Publisher verification is separate from the CV
              record.
            </p>
            <div className="actions">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(w.rawCitation);
                    setStatus("Citation copied.");
                  } catch {
                    setStatus("Clipboard unavailable. Use BibTeX download.");
                  }
                }}
              >
                Copy citation
              </button>
              <button onClick={() => downloadFile(`${w.id}.bib`, toBibTeX(w))}>
                Download BibTeX
              </button>
              <LinkOut
                href={
                  w.link ||
                  `https://scholar.google.com/scholar?q=${encodeURIComponent(w.title)}`
                }
              >
                {w.link ? "Publisher / DOI" : "Find on Google Scholar"}
              </LinkOut>
            </div>
            <p role="status">{status}</p>
          </div>
        )}
      </div>
      <button
        className="work-open"
        aria-label={`Details for ${w.title}`}
        onClick={() => setOpen(!open)}
      >
        <ArrowUpRight size={20} />
      </button>
    </article>
  );
}
export const App = () => {
  const [page, setPage] = useState(location.hash.slice(1) || "about"),
    [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("scholar-theme") === "dark";
    } catch {
      return false;
    }
  });
  const [query, setQuery] = useState(""),
    [theme, setTheme] = useState("all"),
    [kind, setKind] = useState("all"),
    [sort, setSort] = useState("newest"),
    [limit, setLimit] = useState(24);
  const [selectedTheme, setSelectedTheme] = useState<string>("education"),
    [mapView, setMapView] = useState("map");
  useEffect(() => {
    const fn = () => {
      setPage(location.hash.slice(1) || "about");
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("scholar-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  useEffect(() => {
    setLimit(24);
  }, [query, theme, kind, sort]);
  useEffect(() => {
    document.title = `${page === "about" ? "Research & scholarship" : page.replace(/-/g, " ")} | Dr. Babu George`;
  }, [page]);
  const results = useMemo(
    () =>
      works
        .filter(
          (w) =>
            (theme === "all" || w.theme === theme) &&
            (kind === "all" || w.type === kind) &&
            `${w.title} ${w.rawCitation} ${w.summary}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === "oldest"
            ? a.year - b.year
            : sort === "title"
              ? a.title.localeCompare(b.title)
              : b.year - a.year || a.title.localeCompare(b.title),
        ),
    [query, theme, kind, sort],
  );
  const selected = themes.find((t) => t.id === selectedTheme)!;
  const related = works
    .filter((w) => w.theme === selectedTheme)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
  const browse = (id: string) => {
    setTheme(id);
    setQuery("");
    setKind("all");
    location.hash = "publications";
  };
  const themeCards = (
    <div className="theme-grid">
      {themes.map((t, i) => (
        <button
          className="theme-card"
          key={t.id}
          onClick={() => {
            setSelectedTheme(t.id);
            if (page === "about") location.hash = "research";
          }}
          aria-pressed={page !== "about" ? selectedTheme === t.id : undefined}
        >
          <span className="theme-number">
            0{i + 1}
            <ArrowUpRight size={21} />
          </span>
          <h3>{t.name}</h3>
          <p>{t.question}</p>
          <span className="theme-lenses">{t.lenses.join(" / ")}</span>
        </button>
      ))}
    </div>
  );
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#about" className="brand">
            <span className="monogram">
              BG<span>.</span>
            </span>
            <span>
              Babu George<small>Research & scholarship</small>
            </span>
          </a>
          <nav aria-label="Main navigation" className={menu ? "open" : ""}>
            {[
              "About",
              "Research",
              "Publications",
              "Research map",
              "Contact",
            ].map((p) => (
              <a
                key={p}
                href={`#${p.toLowerCase().replace(/ /g, "-")}`}
                aria-current={
                  page === p.toLowerCase().replace(/ /g, "-")
                    ? "page"
                    : undefined
                }
              >
                {p}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label={dark ? "Use light theme" : "Use dark theme"}
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className="icon-button menu-toggle"
              aria-label="Toggle navigation"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {page === "about" && <Home themeCards={themeCards} />}
        {page === "contact" && <Background />}
        {page === "research" && (
          <section className="wrap section">
            <p className="eyebrow">Research agenda</p>
            <h1 className="page-title">
              Questions that connect
              <br />
              <em>different worlds.</em>
            </h1>
            <p className="page-intro">
              Four themes bring together work across business, higher education,
              technology, and community life. Philosophy, psychology, economics,
              and sociology offer complementary perspectives on these questions.
            </p>
            <div className="research-layout">
              <div
                className="theme-selector"
                role="group"
                aria-label="Research themes"
              >
                {themes.map((t, i) => (
                  <button
                    key={t.id}
                    aria-pressed={selectedTheme === t.id}
                    onClick={() => setSelectedTheme(t.id)}
                  >
                    <span>0{i + 1}</span>
                    {t.name}
                    <ArrowRight size={18} />
                  </button>
                ))}
              </div>
              <div>
                <p className="eyebrow">{selected.lenses.join(" · ")}</p>
                <h2>{selected.question}</h2>
                <p className="large-copy">{selected.description}</p>
                <button
                  className="text-link"
                  onClick={() => browse(selectedTheme)}
                >
                  View {related.length} related works <ArrowRight size={17} />
                </button>
                <div className="related-works">
                  {related.slice(0, 4).map((w) => (
                    <Publication key={w.id} work={w} />
                  ))}
                </div>
              </div>
            </div>
            <div className="approach">
              <h2>Approach to research</h2>
              <p>
                The disciplinary framework traces recurring questions across
                different settings: how people form judgments, how institutions
                change, and how the benefits and costs of change are
                distributed. These themes are an interpretive guide; individual
                publications may connect to several areas.
              </p>
              <p>
                Hospitality, higher education, healthcare, digital finance, and
                regional development each bring distinct practical questions to
                this broader inquiry.
              </p>
            </div>
          </section>
        )}
        {page === "publications" && (
          <section className="wrap section">
            <p className="eyebrow">The scholarly record</p>
            <h1 className="page-title">Publications.</h1>
            <p className="page-intro">
              Explore journal articles, books, chapters, and conference
              contributions. This catalog follows the supplied CV
              {data.cvDate ? `, dated ${data.cvDate}` : ""}; it includes
              future-dated works and is not a live Google Scholar feed.
            </p>
            <div className="catalog-controls">
              <label className="search-field">
                <Search size={19} />
                <span className="sr-only">Search publications</span>
                <input
                  placeholder="Search titles, authors, or journals…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </label>
              <div className="filters">
                <label>
                  Research theme
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="all">All themes</option>
                    {themes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Publication type
                  <select
                    value={kind}
                    onChange={(e) => setKind(e.target.value)}
                  >
                    <option value="all">All types</option>
                    {Object.entries(typeNames).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Sort by
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title">Title A–Z</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="result-bar">
              <span>{results.length} matching works</span>
              <button
                className="text-link"
                disabled={!results.length}
                onClick={() =>
                  downloadFile(
                    "babu-george-publications.bib",
                    results.map(toBibTeX).join("\n\n"),
                  )
                }
              >
                <Download size={16} /> Export results as BibTeX
              </button>
            </div>
            {results.slice(0, limit).map((w) => (
              <Publication key={w.id} work={w} />
            ))}
            {!results.length && (
              <div className="empty-state">
                <h2>No matching publications</h2>
                <p>Try another phrase or clear the filters.</p>
                <button
                  className="button"
                  onClick={() => {
                    setQuery("");
                    setTheme("all");
                    setKind("all");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
            {results.length > limit && (
              <button
                className="button load-more"
                onClick={() => setLimit(limit + 24)}
              >
                Show more ({results.length - limit} remaining)
              </button>
            )}
            <aside className="source-note">
              Source: author-supplied CV. Last imported {data.updatedAt}. Counts
              describe this catalog, including conference contributions and
              forthcoming works; they are not citation metrics.{" "}
              <a href={profile.scholarUrl} target="_blank" rel="noreferrer">
                View current Google Scholar metrics ↗
              </a>
            </aside>
          </section>
        )}
        {page === "research-map" && (
          <section className="wrap section">
            <p className="eyebrow">Connections across the work</p>
            <h1 className="page-title">A map of the research.</h1>
            <p className="page-intro">
              Select a theme to explore its disciplinary lenses and related
              publications. Connections represent an editorial interpretation,
              rather than a citation network.
            </p>
            <div className="segmented" role="group" aria-label="Map display">
              <button
                aria-pressed={mapView === "map"}
                onClick={() => setMapView("map")}
              >
                <Network size={17} /> Map
              </button>
              <button
                aria-pressed={mapView === "list"}
                onClick={() => setMapView("list")}
              >
                <List size={17} /> List
              </button>
            </div>
            {mapView === "map" ? (
              <div className="research-map">
                <div className="map-center">
                  <span>Shared inquiry</span>
                  <h2>
                    People &<br />
                    institutions
                  </h2>
                </div>
                <div className="map-branches">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      className="map-branch"
                      aria-pressed={selectedTheme === t.id}
                      onClick={() => setSelectedTheme(t.id)}
                    >
                      <span
                        className="branch-dot"
                        style={{ background: t.color }}
                      />
                      <strong>{t.name}</strong>
                      <small>{t.lenses.join(" · ")}</small>
                      <ArrowRight size={18} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              themeCards
            )}
            <div className="map-results" aria-live="polite">
              <p className="eyebrow">{selected.lenses.join(" · ")}</p>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              <button
                className="text-link"
                onClick={() => browse(selectedTheme)}
              >
                Browse all {related.length} related works{" "}
                <ArrowRight size={17} />
              </button>
              {related.slice(0, 5).map((w) => (
                <Publication key={w.id} work={w} />
              ))}
            </div>
          </section>
        )}
        {![
          "about",
          "research",
          "publications",
          "research-map",
          "contact",
        ].includes(page) && (
          <section className="wrap section">
            <h1>Page not found</h1>
            <a href="#about">Return to profile</a>
          </section>
        )}
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <div>
            <a className="footer-name" href="#about">
              Babu George<span>.</span>
            </a>
            <p>Scholarship across people, institutions, and change.</p>
          </div>
          <div>
            <LinkOut href={profile.scholarUrl}>Google Scholar</LinkOut>
            <a href={`mailto:${profile.email}`}>
              Contact <ArrowUpRight size={15} />
            </a>
            <small>CV-based profile · Updated {data.updatedAt}</small>
          </div>
        </div>
      </footer>
    </>
  );
};
