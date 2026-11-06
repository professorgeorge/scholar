import React, { useState } from 'react';
import { DISCIPLINARY_PILLARS, STRATEGIC_PILLARS, PUBLICATIONS } from '../data/scholarData';
import { DisciplinaryLens } from '../types';
import { Compass, Brain, TrendingUp, Globe, Sparkles, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export const DisciplinaryExplorer: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplinaryLens>('philosophy');

  const getIcon = (id: string) => {
    switch (id) {
      case 'philosophy': return <Compass className="w-5 h-5 text-purple-400" />;
      case 'psychology': return <Brain className="w-5 h-5 text-sky-400" />;
      case 'economics': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'sociology': return <Globe className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  const currentPillar = DISCIPLINARY_PILLARS.find(p => p.id === selectedDiscipline) || DISCIPLINARY_PILLARS[0];

  const relatedPublications = PUBLICATIONS.filter(p => p.disciplinaryLens.includes(selectedDiscipline));

  return (
    <div className="space-y-12">
      {/* Disciplinary Foundations Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <span>Tier 1 Architecture</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-serif mt-1">
              Foundational Human Disciplines
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            The enduring epistemic anchors of the scholarship. Industry contexts shift; the philosophical, cognitive, and economic questions persist.
          </p>
        </div>

        {/* Discipline Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DISCIPLINARY_PILLARS.map(pillar => {
            const isSelected = pillar.id === selectedDiscipline;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedDiscipline(pillar.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-800/90 border-blue-500 shadow-xl shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: pillar.color }}
                  />
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60">
                    {getIcon(pillar.id)}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {PUBLICATIONS.filter(p => p.disciplinaryLens.includes(pillar.id)).length} Works
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight">{pillar.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{pillar.description}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Discipline Deep-Dive Card */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: currentPillar.color }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="flex items-center space-x-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg"
                style={{
                  backgroundColor: `${currentPillar.color}20`,
                  borderColor: `${currentPillar.color}50`
                }}
              >
                {getIcon(currentPillar.id)}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Epistemic Anchor</span>
                <h3 className="text-2xl font-bold text-white font-serif">{currentPillar.name}</h3>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 max-w-lg font-serif italic">
              "{currentPillar.epistemicCore}"
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Theoretical Mechanisms */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200 tracking-wide uppercase flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Core Theoretical Constructs & Mechanisms</span>
              </h4>
              <ul className="space-y-2.5">
                {currentPillar.coreTheoreticalMechanisms.map((mech, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>{mech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fundamental Inquiries Addressed */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200 tracking-wide uppercase flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Fundamental Scholarly Inquiries</span>
              </h4>
              <ul className="space-y-2.5">
                {currentPillar.keyInquiries.map((inq, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 text-xs text-slate-300 italic font-serif leading-relaxed"
                  >
                    "{inq}"
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Publications within this Disciplinary Lens */}
          <div className="pt-6 border-t border-slate-800/80">
            <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Flagship Publications Grounded in {currentPillar.name}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPublications.map(pub => (
                <div
                  key={pub.id}
                  className="p-4 rounded-2xl bg-slate-850 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono">{pub.year} · {pub.venue.split(',')[0]}</span>
                    <span className="font-semibold text-emerald-400 font-mono">{pub.citations} Citations</span>
                  </div>
                  <h5 className="text-sm font-bold text-white leading-snug">{pub.title}</h5>
                  <p className="text-xs text-slate-300 font-serif italic line-clamp-2">
                    "{pub.theoreticalContribution}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic & Organizational Imperatives (Tier 2) */}
      <div className="space-y-6 pt-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-pink-400 uppercase tracking-wider">
            <span>Tier 2 Architecture</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-serif mt-1">
            Strategic Imperatives & Organizational Transformations
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            How fundamental disciplines are synthesized into actionable organizational science: strategic governance, institutional metamorphosis, and technological innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STRATEGIC_PILLARS.map(strat => (
            <div
              key={strat.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                style={{ backgroundColor: strat.color }}
              >
                {strat.id[0].toUpperCase()}
              </div>

              <h3 className="text-lg font-bold text-white">{strat.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{strat.description}</p>

              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Strategic Focus:</span>
                {strat.mechanisms.map((m, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-center space-x-2">
                    <ArrowRight className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

