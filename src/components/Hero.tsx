import React from 'react';
import { SCHOLAR_PROFILE } from '../data/scholarData';
import { Award, BookOpen, Quote, Sparkles, Compass, Brain, TrendingUp, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Scholar Intro */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Epistemic Grounding & Disciplinary Synthesis</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
              {SCHOLAR_PROFILE.name}
            </h1>

            <p className="text-lg text-slate-300 font-medium leading-relaxed">
              {SCHOLAR_PROFILE.title} · <span className="text-blue-400">{SCHOLAR_PROFILE.affiliation}</span>
            </p>

            {/* Epistemic Manifesto Quote Box */}
            <div className="relative p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 shadow-xl backdrop-blur-sm">
              <Quote className="w-8 h-8 text-blue-500/30 absolute -top-3 -left-3" />
              <blockquote className="text-sm text-slate-300 italic font-serif leading-relaxed">
                "{SCHOLAR_PROFILE.epistemicManifesto.trim()}"
              </blockquote>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-sans border-t border-slate-700/50 pt-2.5">
                <span className="font-semibold text-slate-300">Epistemic Thesis</span>
                <span className="text-blue-400">Disciplines Endure · Contexts Test</span>
              </div>
            </div>

            {/* Four Foundational Pillars Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-200">
                <Compass className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold">Philosophy</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-sky-950/40 border border-sky-800/40 text-sky-200">
                <Brain className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs font-semibold">Psychology</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold">Economics</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold">Sociology</span>
              </div>
            </div>
          </div>

          {/* Metric Dashboard */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">Google Scholar Citations</h3>
                  <p className="text-xs text-slate-400">Cumulative Impact Metrics</p>
                </div>
                <Award className="w-6 h-6 text-amber-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-3xl font-extrabold text-blue-400 font-mono">
                    {SCHOLAR_PROFILE.metrics.citations.toLocaleString()}+
                  </div>
                  <div className="text-xs font-medium text-slate-400 mt-1">Total Citations</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-3xl font-extrabold text-purple-400 font-mono">
                    {SCHOLAR_PROFILE.metrics.hIndex}
                  </div>
                  <div className="text-xs font-medium text-slate-400 mt-1">h-index (Impact)</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                    {SCHOLAR_PROFILE.metrics.i10Index}
                  </div>
                  <div className="text-xs font-medium text-slate-400 mt-1">i10-index (Major Works)</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">
                    {SCHOLAR_PROFILE.metrics.booksAuthoredEdited}+
                  </div>
                  <div className="text-xs font-medium text-slate-400 mt-1">Authored & Edited Books</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 flex items-start space-x-2.5">
                <BookOpen className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p>
                  Refereed scholarly contributions published across Springer, Palgrave Macmillan, IGI Global, MDPI, Emerald, and leading international journals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

