import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { KNOWLEDGE_GRAPH_DATA, PUBLICATIONS } from '../data/scholarData';
import { NetworkNode, NetworkLink } from '../types';
import { Search, ZoomIn, ZoomOut, RefreshCw, Info, ExternalLink, Sparkles, Filter } from 'lucide-react';

interface KnowledgeGraphProps {
  onSelectPublication?: (pubId: string) => void;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onSelectPublication }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Zoom behavior reference
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const gRef = useRef<SVGGElement | null>(null);

  // Filtered nodes
  const filteredData = useMemo(() => {
    let nodes = [...KNOWLEDGE_GRAPH_DATA.nodes];
    if (filterType !== 'all') {
      if (filterType === 'discipline') nodes = nodes.filter(n => n.type === 'discipline');
      else if (filterType === 'strategy') nodes = nodes.filter(n => n.type === 'strategy');
      else if (filterType === 'concept') nodes = nodes.filter(n => n.type === 'concept');
      else if (filterType === 'paper') nodes = nodes.filter(n => n.type === 'paper');
      else if (filterType === 'testbed') nodes = nodes.filter(n => n.type === 'testbed');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      nodes = nodes.filter(n => n.name.toLowerCase().includes(q) || (n.description && n.description.toLowerCase().includes(q)));
    }

    const nodeIds = new Set(nodes.map(n => n.id));
    const links = KNOWLEDGE_GRAPH_DATA.links.filter(
      l => nodeIds.has(typeof l.source === 'object' ? (l.source as any).id : (l.source as string)) &&
           nodeIds.has(typeof l.target === 'object' ? (l.target as any).id : (l.target as string))
    );

    return { nodes, links };
  }, [filterType, searchQuery]);

  // Connected nodes map for highlighting
  const connectedNodeIds = useMemo(() => {
    const targetNode = selectedNode || hoveredNode;
    if (!targetNode) return null;
    const ids = new Set<string>([targetNode.id]);
    KNOWLEDGE_GRAPH_DATA.links.forEach(link => {
      const sId = typeof link.source === 'object' ? (link.source as any).id : link.source;
      const tId = typeof link.target === 'object' ? (link.target as any).id : link.target;
      if (sId === targetNode.id) ids.add(tId);
      if (tId === targetNode.id) ids.add(sId);
    });
    return ids;
  }, [selectedNode, hoveredNode]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = 650;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Defs for glowing filters and arrow markers
    const defs = svg.append('defs');
    
    // Ambient glow filter
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g').attr('class', 'graph-content');
    gRef.current = g.node();

    // Set up Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(Math.round(event.transform.k * 100) / 100);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Center initial zoom
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85));

    // Deep copy data for simulation
    const simulationNodes = filteredData.nodes.map(d => ({ ...d }));
    const simulationLinks = filteredData.links.map(d => ({ ...d }));

    // Force simulation
    const simulation = d3.forceSimulation(simulationNodes as any)
      .force('link', d3.forceLink(simulationLinks as any).id((d: any) => d.id).distance((d: any) => {
        if (d.strength === 3) return 80;
        if (d.strength === 2) return 120;
        return 160;
      }))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('collide', d3.forceCollide().radius((d: any) => d.radius + 15))
      .force('center', d3.forceCenter(0, 0));

    // Draw Links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(simulationLinks)
      .enter()
      .append('line')
      .attr('stroke', '#334155')
      .attr('stroke-width', (d: any) => (d.strength ? d.strength * 1.5 : 1.5))
      .attr('stroke-opacity', 0.6)
      .attr('stroke-dasharray', (d: any) => (d.label === 'Empirical site' ? '4,4' : 'none'));

    // Draw Nodes group
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(simulationNodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, any>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Node Outer Ring for Selected / High-impact nodes
    node.append('circle')
      .attr('r', (d: any) => d.radius + 4)
      .attr('fill', 'none')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', (d: any) => (d.type === 'discipline' ? 2.5 : 1.5))
      .attr('stroke-dasharray', (d: any) => (d.type === 'testbed' ? '3,3' : 'none'))
      .attr('opacity', 0.5);

    // Main Node Circle
    node.append('circle')
      .attr('r', (d: any) => d.radius)
      .attr('fill', (d: any) => d.color)
      .attr('fill-opacity', 0.85)
      .attr('filter', (d: any) => (d.type === 'discipline' ? 'url(#glow)' : null));

    // Label Text
    node.append('text')
      .text((d: any) => d.name)
      .attr('x', (d: any) => d.radius + 6)
      .attr('y', 4)
      .attr('font-size', (d: any) => (d.type === 'discipline' ? '13px' : d.type === 'strategy' ? '12px' : '11px'))
      .attr('font-weight', (d: any) => (d.type === 'discipline' ? '700' : '500'))
      .attr('fill', '#f1f5f9')
      .attr('paint-order', 'stroke')
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    // Node interactions
    node
      .on('mouseover', (_, d: any) => setHoveredNode(d))
      .on('mouseout', () => setHoveredNode(null))
      .on('click', (_, d: any) => {
        setSelectedNode(d);
        if (d.paperId && onSelectPublication) {
          onSelectPublication(d.paperId);
        }
      });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [filteredData]);

  // Handle dynamic opacity based on selection/hover
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    if (connectedNodeIds) {
      svg.selectAll('.node-group')
        .transition().duration(200)
        .style('opacity', (d: any) => (connectedNodeIds.has(d.id) ? 1 : 0.2));

      svg.selectAll('.links line')
        .transition().duration(200)
        .style('opacity', (d: any) => {
          const sId = typeof d.source === 'object' ? d.source.id : d.source;
          const tId = typeof d.target === 'object' ? d.target.id : d.target;
          return (connectedNodeIds.has(sId) && connectedNodeIds.has(tId)) ? 1 : 0.08;
        })
        .attr('stroke', (d: any) => {
          const sId = typeof d.source === 'object' ? d.source.id : d.source;
          const tId = typeof d.target === 'object' ? d.target.id : d.target;
          return (connectedNodeIds.has(sId) && connectedNodeIds.has(tId)) ? '#38bdf8' : '#334155';
        })
        .attr('stroke-width', (d: any) => {
          const sId = typeof d.source === 'object' ? d.source.id : d.source;
          const tId = typeof d.target === 'object' ? d.target.id : d.target;
          return (connectedNodeIds.has(sId) && connectedNodeIds.has(tId)) ? 2.5 : 1;
        });
    } else {
      svg.selectAll('.node-group').transition().duration(200).style('opacity', 1);
      svg.selectAll('.links line')
        .transition().duration(200)
        .style('opacity', 0.6)
        .attr('stroke', '#334155')
        .attr('stroke-width', (d: any) => (d.strength ? d.strength * 1.5 : 1.5));
    }
  }, [connectedNodeIds]);

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    if (direction === 'in') {
      svg.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.3);
    } else if (direction === 'out') {
      svg.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.7);
    } else {
      const width = containerRef.current?.clientWidth || 900;
      svg.transition().duration(400).call(
        zoomBehaviorRef.current.transform,
        d3.zoomIdentity.translate(width / 2, 325).scale(0.85)
      );
    }
  };

  const selectedPaper = useMemo(() => {
    if (!selectedNode?.paperId) return null;
    return PUBLICATIONS.find(p => p.id === selectedNode.paperId);
  }, [selectedNode]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1 text-blue-400" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Interconnections' },
            { id: 'discipline', label: 'Foundational Disciplines' },
            { id: 'strategy', label: 'Strategy & Change' },
            { id: 'concept', label: 'Core Concepts' },
            { id: 'paper', label: 'Landmark Publications' },
            { id: 'testbed', label: 'Empirical Testbeds' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === f.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search & Zoom Controls */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search concepts, papers, roots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:border-blue-500 w-48 sm:w-56"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => handleZoom('in')}
              title="Zoom In"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              title="Zoom Out"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('reset')}
              title="Reset View"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Graph Visual Area + Details Side Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Interactive SVG Canvas */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl h-[650px]"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Graph Legend */}
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5 shadow-lg pointer-events-none sm:pointer-events-auto">
            <div className="font-semibold text-slate-300 pb-1 border-b border-slate-800">Knowledge Architecture</div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
              <span className="text-slate-300">Foundational Disciplines</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
              <span className="text-slate-300">Strategic Imperatives</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-sky-400" />
              <span className="text-slate-300">Theoretical Concepts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-cyan-300" />
              <span className="text-slate-300">Landmark Papers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full border border-dashed border-red-400 bg-red-400/30" />
              <span className="text-red-300">Empirical Testbeds (Peripheral)</span>
            </div>
          </div>

          <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Hint Overlay */}
          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-slate-400 text-xs pointer-events-none flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Drag nodes · Scroll to zoom · Click to inspect theoretical linkages</span>
          </div>
        </div>

        {/* Selected Node Details Panel */}
        <div className="lg:col-span-4 h-[650px] flex flex-col">
          {selectedNode ? (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: selectedNode.color,
                      color: selectedNode.color,
                      backgroundColor: `${selectedNode.color}15`
                    }}
                  >
                    {selectedNode.type}
                  </span>
                  {selectedNode.citations && (
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                      {selectedNode.citations.toLocaleString()} Citations
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white font-serif tracking-tight leading-snug">
                  {selectedNode.name}
                </h3>

                {selectedNode.description && (
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-sm text-slate-300 leading-relaxed">
                    <p className="font-sans">{selectedNode.description}</p>
                  </div>
                )}

                {/* If selected node is a landmark publication */}
                {selectedPaper && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-200">Authors:</span> {selectedPaper.authors.join(', ')} ({selectedPaper.year})
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-200">Venue:</span> {selectedPaper.venue}
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1.5">
                      <div className="text-xs font-bold text-blue-400 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Core Theoretical Contribution</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-serif italic">
                        "{selectedPaper.theoreticalContribution}"
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200">
                      <span className="font-bold">Epistemic Takeaway:</span> {selectedPaper.epistemicTakeaway}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
                {selectedPaper ? (
                  <a
                    href={selectedPaper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-blue-600/30"
                  >
                    <span>Read Publication / DOI</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 border-dashed h-full flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-base font-semibold text-white">Select a Knowledge Node</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Click on any foundational discipline, strategic imperative, or landmark publication to inspect its theoretical mechanisms and cross-cutting interconnections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

