import React, { useState } from 'react';
import { Cloud, X, Copy, Check, Terminal, GitBranch, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

interface CloudflareDeployGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareDeployGuide: React.FC<CloudflareDeployGuideProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-serif">Deploy to Cloudflare Pages</h3>
              <p className="text-xs text-slate-400">Global Edge CDN · Custom Domain Support · Free Tier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Banner */}
        <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 flex items-start space-x-3">
          <ShieldCheck className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <div>
            This website is pre-configured as a static single-page application (SPA). When built with Vite, it produces a production-ready <code className="bg-blue-900/40 px-1 py-0.5 rounded text-blue-300">dist/</code> directory that deploys instantly on Cloudflare Pages with zero server configuration.
          </div>
        </div>

        {/* Two Deployment Methods */}
        <div className="space-y-6">
          {/* Method 1: Wrangler CLI */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Option 1: Deploy Directly via Terminal (Wrangler CLI)</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                Fastest (2 min)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Run these commands inside your project folder:
            </p>

            <div className="relative group">
              <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
{`# 1. Build the production website
npm run build

# 2. Deploy directly to Cloudflare Pages
npx wrangler pages deploy dist --project-name=babu-george-scholarship`}
              </pre>
              <button
                onClick={() => copyToClipboard(`npm run build\nnpx wrangler pages deploy dist --project-name=babu-george-scholarship`, 'wrangler')}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1"
              >
                {copiedStep === 'wrangler' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Method 2: GitHub CI/CD */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>Option 2: Continuous Deployment via GitHub (Recommended for automatic updates)</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-950/60 text-purple-400 border border-purple-800/40">
                Auto-updates
              </span>
            </div>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Push this repository to your GitHub account (e.g. <code className="bg-slate-800 px-1 py-0.5 rounded">github.com/your-username/scholarship-portal</code>).</li>
              <li>Log in to the <strong>Cloudflare Dashboard</strong> $\rightarrow$ Navigate to <strong>Workers & Pages</strong>.</li>
              <li>Click <strong>Create application</strong> $\rightarrow$ <strong>Pages</strong> $\rightarrow$ <strong>Connect to Git</strong>.</li>
              <li>Select your repository and configure the build settings:
                <ul className="mt-2 ml-4 space-y-1 list-disc text-slate-400">
                  <li><strong>Framework preset:</strong> <code className="text-white">Vite</code></li>
                  <li><strong>Build command:</strong> <code className="text-white">npm run build</code></li>
                  <li><strong>Build output directory:</strong> <code className="text-white">dist</code></li>
                </ul>
              </li>
              <li>Click <strong>Save and Deploy</strong>. Cloudflare will give you a live URL like <code className="text-blue-400">babu-george-scholarship.pages.dev</code>!</li>
            </ol>
          </div>

          {/* Custom Domain Section */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start space-x-3 text-xs text-slate-300">
            <Globe className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-white">Custom Domain Setup:</strong> In your Cloudflare Pages project settings under <em>Custom domains</em>, you can attach any custom domain (e.g. <code className="text-blue-300 font-mono">babugeorge.com</code> or your academic subdomain). Cloudflare automatically generates and renews the SSL certificate for you.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            Got it, close guide
          </button>
        </div>
      </div>
    </div>
  );
};

