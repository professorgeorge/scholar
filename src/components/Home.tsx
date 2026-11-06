import React from "react";
import { ArrowRight } from "lucide-react";
import { LinkOut, Publication, profile, works } from "../App";
export function Home({ themeCards }: { themeCards: React.ReactNode }) {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            Business scholarship · Alcorn State University
          </p>
          <h1>
            People. Institutions.
            <br />
            <em>
              The possibilities
              <br />
              of change.
            </em>
          </h1>
          <p className="hero-intro">
            I study how people and organizations make decisions, respond to
            technology, and build a more inclusive future.
          </p>
          <div className="hero-signature">
            <span className="signature-rule" />
            <p>
              <strong>{profile.name}</strong>
              <span>
                {profile.title} · {profile.affiliation}
              </span>
            </p>
          </div>
          <div className="actions">
            <a className="button primary" href="#research">
              Explore the research <ArrowRight size={17} />
            </a>
            <LinkOut href={profile.scholarUrl} className="text-link">
              Google Scholar
            </LinkOut>
          </div>
        </div>
        <div className="hero-diagram">
          <span className="diagram-label">A connected research practice</span>
          <svg viewBox="0 0 440 450" role="img" aria-labelledby="orbit-title">
            <title id="orbit-title">
              Research connects people, institutions, technology, and
              communities
            </title>
            <circle className="orbit" cx="220" cy="220" r="156" />
            <circle className="orbit inner" cx="220" cy="220" r="95" />
            <path
              className="diagram-lines"
              d="M220 64L376 220L220 376L64 220Z M220 64V376 M64 220H376"
            />
            <circle className="center-disc" cx="220" cy="220" r="64" />
            <text className="center-text" x="220" y="216" textAnchor="middle">
              Shared
            </text>
            <text className="center-text" x="220" y="242" textAnchor="middle">
              questions
            </text>
            {[
              { x: 220, y: 64, label: "People", n: "01" },
              { x: 376, y: 220, label: "Institutions", n: "02" },
              { x: 220, y: 376, label: "Technology", n: "03" },
              { x: 64, y: 220, label: "Communities", n: "04" },
            ].map((n) => (
              <g key={n.n}>
                <circle className="node-dot" cx={n.x} cy={n.y} r="5" />
                <text
                  className="node-number"
                  x={n.x}
                  y={n.y - 14}
                  textAnchor="middle"
                >
                  {n.n}
                </text>
                <text
                  className="node-name"
                  x={n.x}
                  y={n.y + 27}
                  textAnchor="middle"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
          <p>
            Behavioral insight.
            <br />
            Institutional perspective.
            <br />
            Questions that cross disciplines.
          </p>
        </div>
      </section>
      <div className="record-strip">
        <div className="wrap record-inner">
          <span>
            <strong>{works.length}</strong> CV-listed works
          </span>
          <span>
            <strong>{works.filter((w) => w.type === "book").length}</strong>{" "}
            Books & monographs listed
          </span>
          <span>
            <strong>4</strong> Connected research themes
          </span>
          <a href="#publications">
            Browse the record <ArrowRight size={16} />
          </a>
        </div>
      </div>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lines of inquiry</p>
            <h2>Research across boundaries.</h2>
          </div>
          <a className="text-link" href="#research">
            Explore all themes <ArrowRight size={17} />
          </a>
        </div>
        {themeCards}
      </section>
      <section className="selected-section">
        <div className="wrap section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected scholarship</p>
              <h2>A few starting points.</h2>
            </div>
            <a className="text-link" href="#publications">
              All publications <ArrowRight size={17} />
            </a>
          </div>
          {works
            .filter((w) => w.featured)
            .map((w) => (
              <Publication key={w.id} work={w} />
            ))}
          <p className="source-note">
            Selections and thematic summaries are an editorial guide to the
            research. Publication details are drawn from the CV.
          </p>
        </div>
      </section>
      <section className="wrap section bio-section">
        <div>
          <p className="eyebrow">About Babu George</p>
          <h2>
            Scholarship informed
            <br />
            by institutional life.
          </h2>
        </div>
        <div>
          <p className="large-copy">{profile.bio}</p>
          <p>
            Academic leadership roles have included interim dean at Alcorn State
            University, associate dean of graduate business at Christian
            Brothers University, and international program chair at Fort Hays
            State University.
          </p>
          <a className="text-link" href="#contact">
            Background & contact <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
