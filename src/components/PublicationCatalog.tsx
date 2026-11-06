import React, { useState, useMemo } from 'react';
import { PUBLICATIONS, DISCIPLINARY_PILLARS, STRATEGIC_PILLARS } from '../data/scholarData';
import { Publication, DisciplinaryLens, StrategicArea } from '../types';
import { Search, ExternalLink, Copy, Check, Filter, Sparkles, BookOpen } from 'lucide-react';

interface PublicationCatalogProps {
  highlightedPubId?: string | null;
}

export const PublicationCatalog: React.FC<PublicationCatalogProps> = ({ highlightedPubId }) => {
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedStrategic, setSelectedStrategic] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPubs = useMemo(() => {
    return PUBLICATIONS.filter(pub => {
      const matchesSearch =
        search.trim() === '' ||
        pub.title.toLowerCase().includes(search.toLowerCase()) ||
        pub.theoreticalContribution.toLowerCase().includes(search.toLowerCase()) ||
        pub.authors.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
        pub.venue.toLowerCase().includes(search.toLowerCase());

      const matchesDiscipline =
        selectedDiscipline === 'all' || pub.disciplinaryLens.includes(selectedDiscipline as DisciplinaryLens);

      const matchesStrategic =
        selectedStrategic === 'all' || pub.strategicArea.includes(selectedStrategic as StrategicArea);

      return matchesSearch && matchesDiscipline && matchesStrategic;
    }).sort((a, b) => b.citations - a.citations);
  }, [search, selectedDiscipline, selectedStrategic]);

  const copyBibTeX = (pub: Publication) => {
    const bibtex = `@article{george${pub.year}${pub.id.slice(4, 10)},
  title = {${pub.title}},
  author = {${pub.authors.join(' and ')}},
  journal = {${pub.venue}},
  year = {${pub.year}}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Catalog Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Refereed Output & Monographs</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-serif mt-1">
            Scholarly Publications Catalog
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md">
          Filterable by foundational discipline, strategic transformation, and citations. Each work highlights its theoretical contribution beyond empirical testing grounds.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by theoretical construct, title, or co-author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Disciplinary Foundation Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Discipline:</span>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Disciplinary Foundations</option>
              {DISCIPLINARY_PILLARS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Strategic Area Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Strategy:</span>
            <select
              value={selectedStrategic}
              onChange={(e) => setSelectedStrategic(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Strategic Imperatives</option>
              {STRATEGIC_PILLARS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
          <span>Showing <strong className="text-white">{filteredPubs.length}</strong> refereed publications</span>
          {(search || selectedDiscipline !== 'all' || selectedStrategic !== 'all') && (
            <button
              onClick={() => { setSearch(''); setSelectedDiscipline('all'); setSelectedStrategic('all'); }}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPubs.map(pub => {
          const isHighlighted = highlightedPubId === pub.id;

          return (
            <article
              key={pub.id}
              className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
                isHighlighted
                  ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {pub.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs uppercase font-bold tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                    {pub.type}
                  </span>
                  {pub.disciplinaryLens.map(lens => (
                    <span
                      key={lens}
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize bg-purple-950/60 text-purple-300 border border-purple-800/50"
                    >
                      {lens}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-3 py-1 rounded-full">
                    {pub.citations.toLocaleString()} Citations
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-serif leading-snug">
                  {pub.title}
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  <span className="text-slate-200 font-medium">{pub.authors.join(', ')}</span> · <em>{pub.venue}</em>
                </div>
              </div>

              {/* Deep Theoretical Contribution */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-blue-400 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Theoretical Mechanism & Contribution:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic font-serif leading-relaxed">
                  "{pub.theoreticalContribution}"
                </p>
                <div className="text-xs text-purple-300 font-medium pt-1 border-t border-slate-800/80">
                  <strong>Epistemic Takeaway:</strong> {pub.epistemicTakeaway}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div className="text-xs text-slate-500">
                  <span className="text-slate-400 font-semibold">Empirical Testbed:</span> {pub.empiricalTestbed.join(', ').replace(/_/g, ' ')}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyBibTeX(pub)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
                    title="Copy BibTeX Citation"
                  >
                    {copiedId === pub.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Cite (BibTeX)</span>
                      </>
                    )}
                  </button>

                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
                  >
                    <span>View Paper</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

