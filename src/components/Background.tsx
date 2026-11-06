import React from "react";
import { Mail, BookOpen } from "lucide-react";
import { LinkOut, profile } from "../App";
export function Background() {
  return (
    <section className="wrap section">
      <p className="eyebrow">Background & collaboration</p>
      <h1 className="page-title">Let’s connect.</h1>
      <div className="contact-layout">
        <div>
          <p className="large-copy">{profile.bio}</p>
          <p>
            Research conversations, academic partnerships, and teaching
            collaborations are welcome in the areas represented here.
          </p>
          <div className="actions">
            <a className="button primary" href={`mailto:${profile.email}`}>
              <Mail size={18} /> Email Babu George
            </a>
            <LinkOut href={profile.scholarUrl}>Google Scholar</LinkOut>
            <a href="/academic-profile.html" target="_blank" rel="noreferrer">
              Printable academic profile
            </a>
            {profile.orcidUrl && (
              <LinkOut href={profile.orcidUrl}>ORCID</LinkOut>
            )}
            {profile.cvUrl && (
              <LinkOut href={profile.cvUrl}>Download CV</LinkOut>
            )}
          </div>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <h2 className="subsection-title">Academic appointments</h2>
          {profile.appointments.map((a) => (
            <div className="timeline-item" key={a.title + a.organization}>
              <span>{a.period}</span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.organization}</p>
              </div>
            </div>
          ))}
        </div>
        <aside className="background-panel">
          <p className="eyebrow">Education</p>
          {profile.education.map((a) => (
            <div key={a.title}>
              <h3>{a.title}</h3>
              <p>
                {a.organization} · {a.period}
              </p>
            </div>
          ))}
          <p className="eyebrow">Selected recognition</p>
          {profile.awards.map((a) => (
            <div key={a.title}>
              <h3>{a.title}</h3>
              <p>
                {a.organization} · {a.period}
              </p>
            </div>
          ))}
        </aside>
      </div>
      <div className="section-heading resources-heading">
        <div>
          <p className="eyebrow">Teaching & open resources</p>
          <h2>Ideas put into practice.</h2>
        </div>
      </div>
      <div className="resource-grid">
        {profile.projects.map((p) => (
          <article key={p.title}>
            <BookOpen size={23} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <LinkOut href={p.url}>Explore resource</LinkOut>
          </article>
        ))}
      </div>
      <p className="source-note">
        Background and resources drawn from the author’s CV.
      </p>
    </section>
  );
}
