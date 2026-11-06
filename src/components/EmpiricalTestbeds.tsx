import React from 'react';
import { EMPIRICAL_TESTBEDS, PUBLICATIONS } from '../data/scholarData';
import { EmpiricalTestbed } from '../types';
import { Beaker, AlertCircle, ArrowUpRight, ShieldCheck, Microscope } from 'lucide-react';

export const EmpiricalTestbeds: React.FC = () => {
  const testbedKeys = Object.keys(EMPIRICAL_TESTBEDS) as EmpiricalTestbed[];

  return (
    <div className="space-y-8">
      {/* Header with Epistemic Disclaimer */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
          <Beaker className="w-4 h-4" />
          <span>Tier 3 Architecture · Empirical Testbeds</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight font-serif">
          The Empirical Laboratories
        </h2>

        {/* Clear Framing Notice */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 text-rose-200 text-xs sm:text-sm leading-relaxed flex items-start space-x-3.5">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Epistemic Demarcation:</span> Industry sectors (tourism, hospitality, healthcare, higher education, mobile banking) are <span className="underline decoration-rose-500 underline-offset-2 font-semibold">not the core disciplines</span> of this scholarship. They serve exclusively as <strong>high-friction empirical proving grounds</strong>—laboratories where fundamental theories of human decision-making, epistemic inertia, and economic distribution are stress-tested against messy institutional realities.
          </div>
        </div>
      </div>

      {/* Testbed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testbedKeys.map(key => {
          const testbed = EMPIRICAL_TESTBEDS[key];
          const testbedPubs = PUBLICATIONS.filter(p => p.empiricalTestbed.includes(key));

          return (
            <div
              key={key}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-slate-800 text-rose-400 border border-slate-700/60">
                      <Microscope className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      Empirical Context
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                    {testbedPubs.length} Studies
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-serif">{testbed.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{testbed.description}</p>

                {/* Why this is a laboratory */}
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Laboratory Rationale (Why this testbed?):</span>
                  </div>
                  <p className="text-xs text-slate-300 italic font-serif leading-relaxed">
                    "{testbed.whyTestbed}"
                  </p>
                </div>
              </div>

              {/* Sample Tested Theories in this Lab */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Theories Stress-Tested in this Site:
                </span>
                <div className="space-y-1.5">
                  {testbedPubs.map(pub => (
                    <div
                      key={pub.id}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between hover:border-slate-700 transition-colors"
                    >
                      <span className="truncate pr-2">{pub.title}</span>
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 shrink-0 flex items-center"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

