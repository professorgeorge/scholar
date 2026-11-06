import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { DisciplinaryExplorer } from './components/DisciplinaryExplorer';
import { EmpiricalTestbeds } from './components/EmpiricalTestbeds';
import { PublicationCatalog } from './components/PublicationCatalog';
import { CloudflareDeployGuide } from './components/CloudflareDeployGuide';
import { SCHOLAR_PROFILE } from './data/scholarData';
import { Network, BookOpen, Layers, FileText, Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('graph');
  const [highlightedPubId, setHighlightedPubId] = useState<string | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);

  const handleSelectPublicationFromGraph = (pubId: string) => {
    setHighlightedPubId(pubId);
    setActiveTab('publications');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Navigation Bar / Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'graph'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Interconnections Knowledge Graph</span>
            </button>

            <button
              onClick={() => setActiveTab('disciplines')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'disciplines'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Foundational Disciplines (Tier 1 & 2)</span>
            </button>

            <button
              onClick={() => setActiveTab('testbeds')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'testbeds'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Empirical Testbeds (Tier 3)</span>
            </button>

            <button
              onClick={() => setActiveTab('publications')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'publications'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Publications Catalog</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'graph' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
                  Interactive Network Topography
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight font-serif mt-1">
                  Epistemic Knowledge Graph
                </h2>
              </div>
              <p className="text-xs text-slate-400 max-w-lg">
                Visualizing how foundational disciplines (Philosophy, Psychology, Economics, Sociology) inform strategic governance and manifest across empirical testbeds.
              </p>
            </div>

            <KnowledgeGraph onSelectPublication={handleSelectPublicationFromGraph} />

            {/* Intellectual Trajectory Eras Banner */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    Chronological Evolution of the Inquiry (2004 – 2026)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">22 Years of Scholarship</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-sky-400">2004 – 2012</div>
                  <h4 className="text-sm font-bold text-white">Cognitive & Behavioral Foundations</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Place attachment, cognitive dissonance, novelty seeking, and initial rural self-determination inquiries.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-blue-400">2013 – 2018</div>
                  <h4 className="text-sm font-bold text-white">Mobile Diffusion & Identity</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cognitive technology acceptance (UTAUT-2), destination branding social construction, and service adaptation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-purple-400">2019 – 2023</div>
                  <h4 className="text-sm font-bold text-white">Institutional AI & Disruption</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Strategic AI transformation of higher ed, robotics in human encounters, and digital financial inclusion (DFS).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-emerald-400">2024 – 2026+</div>
                  <h4 className="text-sm font-bold text-white">Ontological Critique & Governance</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deconstructing SDGs (Growth vs. Ecology contradiction), boardroom stewardship, and biopolitical borders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'disciplines' && <DisciplinaryExplorer />}

        {activeTab === 'testbeds' && <EmpiricalTestbeds />}

        {activeTab === 'publications' && (
          <PublicationCatalog highlightedPubId={highlightedPubId} />
        )}
      </main>

      {/* Cloudflare Deployment Modal */}
      <CloudflareDeployGuide
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Academic Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-10 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-white text-sm font-serif">
              {SCHOLAR_PROFILE.name} · {SCHOLAR_PROFILE.affiliation}
            </div>
            <p>
              Epistemic synthesis of Philosophy, Psychology, and Economics in Strategic Leadership & Transformation.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Cloudflare Pages Instructions
            </button>
            <a
              href={SCHOLAR_PROFILE.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
            >
              <span>Google Scholar Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

