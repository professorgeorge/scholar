import { DisciplinaryPillar, StrategicPillar, Publication, EmpiricalTestbed } from '../types';

export const SCHOLAR_PROFILE = {
  name: "Dr. Babu George",
  title: "Professor of Business & Strategic Management",
  affiliation: "Alcorn State University",
  scholarId: "1knki-oAAAAJ",
  scholarUrl: "https://scholar.google.com/citations?user=1knki-oAAAAJ&hl=en",
  metrics: {
    citations: 4050,
    hIndex: 43,
    i10Index: 130,
    booksAuthoredEdited: 18,
    peerReviewedOutputs: 150
  },
  epistemicManifesto: `
"The intellectual core of my scholarly enterprise is grounded in the foundational human sciences: the epistemological clarity of Philosophy, the cognitive mechanisms of Psychology, and the structural imperatives of Economics and Sociology.

Sectoral verticals—whether tourism, higher education, healthcare, or digital financial services—are never the primary intellectual destination. They serve as empirical laboratories: high-friction proving grounds where fundamental questions of human cognition, technological disruption, institutional inertia, and ethical contradictions are tested under real-world pressure."
  `,
  executiveBio: `Dr. Babu George is a business scholar whose work synthesizes fundamental behavioral science, philosophical critique, and macro-economics to address strategic leadership and systemic institutional transformation. Rather than limiting inquiry to isolated industry silos, his research investigates how humans and organizations navigate cognitive dissonance, technological rupture, and structural paradoxes.`
};

export const DISCIPLINARY_PILLARS: DisciplinaryPillar[] = [
  {
    id: 'philosophy',
    name: 'Philosophy & Epistemology',
    color: '#8b5cf6',
    badgeBg: 'bg-purple-900/30 text-purple-300 border-purple-500/30',
    icon: 'Compass',
    description: 'Ontological critique of institutional axioms, ethical boundaries of autonomous systems, and the epistemological integrity of knowledge organizations.',
    epistemicCore: 'Deconstructing normative assumptions in sustainability, artificial intelligence, and strategic governance.',
    coreTheoreticalMechanisms: [
      'Ontology of Incoherence (Growth vs. Ecology contradictions)',
      'Epistemic Integrity in Algorithmic Environments',
      'Teleology of Human Work under Automation',
      'Critique of Managerialist Ideology'
    ],
    keyInquiries: [
      'How do institutional frameworks (such as the UN SDGs) naturalize irreconcilable contradictions between perpetual growth and ecological limits?',
      'What are the philosophical limits of machine agency in higher learning and governance?',
      'How does commodification alter the authentic meaning of place and human encounter?'
    ]
  },
  {
    id: 'psychology',
    name: 'Psychology & Behavioral Science',
    color: '#0284c7',
    badgeBg: 'bg-sky-900/30 text-sky-300 border-sky-500/30',
    icon: 'Brain',
    description: 'Cognitive decision theory, affective bonding, impulse dynamics, and cognitive appraisal of emerging digital/robotic interfaces.',
    epistemicCore: 'Examining the interplay between human emotion, novelty seeking, cognitive dissonance, and interface adoption.',
    coreTheoreticalMechanisms: [
      'Cognitive Dissonance & Post-Purchase Rationalization',
      'Place Attachment, Spatial Identity & Affective Priming',
      'Novelty Seeking vs. Familiarity Biases in Choice Architecture',
      'UTAUT-2 Cognitive Technology Appraisal'
    ],
    keyInquiries: [
      'How do individuals mediate cognitive conflict when rapid behavioral impulses clash with deeply held values?',
      'What psychological drivers govern human willingness to place relational trust in automated and robotic entities?',
      'How does affective attachment to physical places withstand or adapt to digital virtualization?'
    ]
  },
  {
    id: 'economics',
    name: 'Economics & Political Economy',
    color: '#10b981',
    badgeBg: 'bg-emerald-900/30 text-emerald-300 border-emerald-500/30',
    icon: 'TrendingUp',
    description: 'Structural distribution of digital capital, financial inclusion mechanisms, and the political economy of mobility.',
    epistemicCore: 'Analyzing how digital and regulatory architectures redistribute economic power and financial agency.',
    coreTheoreticalMechanisms: [
      'Digital Financial Services (DFS) Inclusion Dynamics',
      'Structural Asymmetry & Global North-South Inequalities',
      'Platform Economics & Value Extraction in Digital Ecosystems',
      'Geopolitical Enclosures & Mobility Capital'
    ],
    keyInquiries: [
      'How do decentralized and mobile financial infrastructures dismantle historical barriers to liquidity in underbanked populations?',
      'What macro-economic forces dictate who enjoys frictionless global mobility and who remains immobilised?',
      'How does the platform economy reconfigure labor contracts into precarious micro-transactions?'
    ]
  },
  {
    id: 'sociology',
    name: 'Sociology & Spatial Geographies',
    color: '#f59e0b',
    badgeBg: 'bg-amber-900/30 text-amber-300 border-amber-500/30',
    icon: 'Globe',
    description: 'Spatial sociology, bordered mobility, digital divides in educational access, and community resilience.',
    epistemicCore: 'Investigating how human collectives organize around spatial borders, systemic exclusions, and shared social identities.',
    coreTheoreticalMechanisms: [
      'Spatial Alienation vs. Social Cohesion in Fragmented Worlds',
      'Digital Inequity as Structural Deprivation',
      'Border Regime Dynamics & Post-Crisis Mobility Regimes',
      'Community Self-Determination in Peripheral Economies'
    ],
    keyInquiries: [
      'How do crises (e.g., pandemics, economic shocks) weaponize borders to reinforce existing socioeconomic stratifications?',
      'In what ways do educational technologies exacerbate generational and racial digital divides?',
      'How do marginalized communities construct authentic agency when peripheralized by global market flows?'
    ]
  }
];

export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    id: 'strategy',
    name: 'Strategic Governance & Stewardship',
    color: '#2563eb',
    description: 'Governing corporate boards, stewardship vs. agency theory, fiduciary foresight, and strategic decision-making in volatile environments.',
    mechanisms: [
      'Boardroom Strategic Direction',
      'Fiduciary Oversight under Uncertainty',
      'Stakeholder vs. Shareholder Equilibrium'
    ]
  },
  {
    id: 'change',
    name: 'Organizational Change & Metamorphosis',
    color: '#ec4899',
    description: 'Overcoming structural inertia, leading institutional metamorphosis, and orchestrating cultural alignment during radical technological shifts.',
    mechanisms: [
      'Managing Institutional Inertia',
      'Cultural Alignment in Academic & Corporate Transitions',
      'Disruption-Induced Change Agility'
    ]
  },
  {
    id: 'technology',
    name: 'Disruptive Innovation & AI Systems',
    color: '#06b6d4',
    description: 'Strategic integration of artificial intelligence, robotics, and algorithmic architectures into human-centric organizational processes.',
    mechanisms: [
      'Algorithmic Process Re-engineering',
      'Human-in-the-Loop AI Governance',
      'Technological Diffusion Frameworks'
    ]
  }
];

export const EMPIRICAL_TESTBEDS: Record<EmpiricalTestbed, { name: string; description: string; whyTestbed: string }> = {
  higher_education: {
    name: 'Knowledge Institutions (Higher Education)',
    description: 'Universities, academic governance structures, and curriculum delivery systems.',
    whyTestbed: 'Higher education represents the quintessential high-inertia, knowledge-intensive institution—making it the ultimate testbed for studying AI disruption, cultural resistance, and strategic change.'
  },
  hospitality_mobility: {
    name: 'High-Affect Human Services & Mobility',
    description: 'Hospitality ecosystems, destination networks, and global travel corridors.',
    whyTestbed: 'Human mobility and hospitality are the most emotionally charged, high-touch proving grounds to test behavioral decision-making, place attachment, and human trust in autonomous service robots.'
  },
  digital_financial_services: {
    name: 'Digital Financial Infrastructures',
    description: 'Mobile money, FinTech networks, and micro-enterprise credit systems (e.g., Sub-Saharan Africa).',
    whyTestbed: 'Serves as an empirical laboratory to test whether digital infrastructure can overcome entrenched socio-economic inequality and induce authentic financial inclusion.'
  },
  regional_development: {
    name: 'Peripheral & Rural Economies',
    description: 'Rural enterprises, developing economy communities, and local heritage corridors.',
    whyTestbed: 'Provides the empirical friction necessary to challenge orthodox growth-centric economics and test sustainable community self-determination models.'
  }
};

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-ai-higher-ed-2023',
    title: 'Managing the strategic transformation of higher education through artificial intelligence',
    authors: ['Babu George', 'Olin Wooden'],
    year: 2023,
    venue: 'Administrative Sciences, 13(9), 196',
    type: 'journal',
    citations: 1056,
    link: 'https://doi.org/10.3390/admsci13090196',
    disciplinaryLens: ['philosophy', 'sociology'],
    strategicArea: ['change', 'strategy', 'technology'],
    empiricalTestbed: ['higher_education'],
    theoreticalContribution: 'Articulates a holistic framework for strategic organizational metamorphosis, distinguishing cosmetic technological adoption from deep institutional re-architecting of pedagogy, governance, and epistemic validation.',
    epistemicTakeaway: 'Technology adoption without organizational epistemic restructuring merely accelerates institutional obsolescence.'
  },
  {
    id: 'pub-utaut-smartphone-2018',
    title: 'What determines user adoption of smartphone applications? An analysis based on the UTAUT-2 framework',
    authors: ['A. Gupta', 'N. Dogra', 'Babu George'],
    year: 2018,
    venue: 'Journal of Hospitality and Tourism Technology, 9(1), 50-64',
    type: 'journal',
    citations: 478,
    link: 'https://doi.org/10.1108/JHTT-02-2017-0013',
    disciplinaryLens: ['psychology'],
    strategicArea: ['technology'],
    empiricalTestbed: ['hospitality_mobility'],
    theoreticalContribution: 'Extends cognitive appraisal models by demonstrating how hedonic motivation, habit, and price value interact within the unified theory of acceptance and use of technology in mobile interfaces.',
    epistemicTakeaway: 'Interface adoption is fundamentally an affective and habitual calculus rather than a purely rational utilitarian assessment.'
  },
  {
    id: 'pub-place-attachment-2004',
    title: 'Past visits and the intention to revisit: Place attachment as mediator and novelty seeking as moderator',
    authors: ['Babu P. George', 'B. P. George'],
    year: 2004,
    venue: 'Journal of Tourism Studies, 15(2), 51-66',
    type: 'journal',
    citations: 379,
    link: 'https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1knki-oAAAAJ:u5HHmVD_uO8C',
    disciplinaryLens: ['psychology', 'philosophy'],
    strategicArea: ['strategy'],
    empiricalTestbed: ['hospitality_mobility'],
    theoreticalContribution: 'Establishes the psychodynamic mediation of emotional place attachment between past behavioral memory and future commitment, while proving that cognitive novelty-seeking dampens inertial habits.',
    epistemicTakeaway: 'Human spatial loyalty is an emotional identity construct that is continually negotiated against an innate cognitive hunger for novelty.'
  },
  {
    id: 'pub-destination-branding-2017',
    title: 'The evolution of destination branding: A critical review of identity and image formation',
    authors: ['M. Almeyda-Ibáñez', 'Babu George'],
    year: 2017,
    venue: 'Journal of Tourism, Heritage & Services Marketing, 3(1), 9-17',
    type: 'journal',
    citations: 285,
    link: 'https://doi.org/10.5281/zenodo.401370',
    disciplinaryLens: ['psychology', 'sociology'],
    strategicArea: ['strategy'],
    empiricalTestbed: ['hospitality_mobility'],
    theoreticalContribution: 'Deconstructs the divergence between projected institutional identity and received psychological image, framing branding as a socially constructed perceptual negotiation.',
    epistemicTakeaway: 'A brand is not a corporate artifact but an unstable, negotiated social representation.'
  },
  {
    id: 'pub-rural-dev-kenya-2012',
    title: 'Rural enterprise as a sustainable development alternative: Structural analysis in Kenya',
    authors: ['R. N. Okech', 'M. Haghiri', 'Babu P. George'],
    year: 2012,
    venue: 'CULTUR: Revista de Cultura e Turismo, 6(1), 4-21',
    type: 'journal',
    citations: 213,
    link: 'https://scholar.google.com/citations?view_op=view_citation&citation_for_view=1knki-oAAAAJ:d1gkVwhDpl0C',
    disciplinaryLens: ['economics', 'sociology'],
    strategicArea: ['strategy'],
    empiricalTestbed: ['regional_development'],
    theoreticalContribution: 'Challenges top-down macro-economic development dogmas by demonstrating how micro-level community stewardship preserves ecological capital while generating resilient livelihoods.',
    epistemicTakeaway: 'Economic sustainability in the Global South requires community-rooted autonomy rather than exogenous extractive capital.'
  },
  {
    id: 'pub-impulse-dissonance-2010',
    title: 'Impulse buying and cognitive dissonance: Psychological defense mechanisms in student consumer choices',
    authors: ['Babu P. George', 'G. Yaoyuneyong'],
    year: 2010,
    venue: 'Young Consumers, 11(4), 291-303',
    type: 'journal',
    citations: 207,
    link: 'https://doi.org/10.1108/17473611011093925',
    disciplinaryLens: ['psychology'],
    strategicArea: ['strategy'],
    empiricalTestbed: ['hospitality_mobility'],
    theoreticalContribution: 'Uncovers how post-purchase psychological defense mechanisms (selective perception, cognitive re-framing) systematically neutralize affective remorse following irrational, impulsive expenditures.',
    epistemicTakeaway: 'Consumers deploy sophisticated cognitive rationalizations to reconcile impulsive choices with positive self-concept.'
  },
  {
    id: 'pub-ai-robotics-hospitality-2019',
    title: 'Artificial intelligence and robotics technology in service delivery: Theoretical frontiers and societal impact',
    authors: ['L. Yang', 'T. L. Henthorne', 'Babu George'],
    year: 2019,
    venue: 'Digital Transformation in Business and Society, Palgrave Macmillan, 125-140',
    type: 'chapter',
    citations: 164,
    link: 'https://doi.org/10.1007/978-3-030-08277-2_7',
    disciplinaryLens: ['philosophy', 'psychology'],
    strategicArea: ['technology', 'change'],
    empiricalTestbed: ['hospitality_mobility'],
    theoreticalContribution: 'Introduces a typology of human-robot service encounters based on perceptual uncanny valley thresholds, emotional labor authenticity, and cognitive trust transference.',
    epistemicTakeaway: 'The automation of service forces a philosophical re-examination of what constitutes authentic human care versus synthetic performance.'
  },
  {
    id: 'pub-digital-trans-book-2020',
    title: 'Digital Transformation in Business and Society: Theory and Cases',
    authors: ['Babu George', 'Justin Paul'],
    year: 2020,
    venue: 'Springer International Publishing, Cham, Switzerland (Monograph/Edited Vol.)',
    type: 'book',
    citations: 138,
    link: 'https://doi.org/10.1007/978-3-030-08277-2',
    disciplinaryLens: ['economics', 'philosophy'],
    strategicArea: ['strategy', 'change', 'technology'],
    empiricalTestbed: ['higher_education', 'digital_financial_services'],
    theoreticalContribution: 'Constructs an integrated theoretical taxonomy of enterprise digitalization, demonstrating that digital transformation is primarily a socio-cultural reconfiguration of power rather than an IT deployment.',
    epistemicTakeaway: 'Digital transformation fails when treated as a technological upgrade rather than a fundamental reorganization of human agency and power.'
  },
  {
    id: 'pub-boardroom-leadership-2020',
    title: 'Boardroom Leadership: The Board of Directors as a Source of Strategic Leadership',
    authors: ['J. D. Castellanos', 'Babu George'],
    year: 2020,
    venue: 'Economics and Business Review, 6(4), 51-78',
    type: 'journal',
    citations: 62,
    link: 'https://doi.org/10.18559/ebr.2020.4.3',
    disciplinaryLens: ['philosophy', 'economics'],
    strategicArea: ['strategy', 'governance'],
    empiricalTestbed: ['higher_education'],
    theoreticalContribution: 'Transcends narrow agency theory by advancing a holistic stewardship and strategic leadership model of corporate boards, emphasizing ethical stewardship and systemic vigilance.',
    epistemicTakeaway: 'True corporate governance is an active philosophical stewardship of purpose, not a passive regulatory compliance checklist.'
  },
  {
    id: 'pub-dfs-uganda-2021',
    title: 'Financial Inclusion through Digital Financial Services (DFS): Empirical Evidence from Uganda',
    authors: ['J. Ebong', 'Babu George'],
    year: 2021,
    venue: 'Journal of Risk and Financial Management, 14(9), 393',
    type: 'journal',
    citations: 74,
    link: 'https://doi.org/10.3390/jrfm14090393',
    disciplinaryLens: ['economics', 'sociology'],
    strategicArea: ['technology', 'strategy'],
    empiricalTestbed: ['digital_financial_services'],
    theoreticalContribution: 'Quantifies the exact socio-technical mechanisms through which mobile telecommunication architectures bypass traditional banking monopolies to democratize capital accumulation.',
    epistemicTakeaway: 'Decentralized digital networks can dismantle entrenched institutional exclusion more rapidly than institutional policy reforms.'
  },
  {
    id: 'pub-mobility-covid-2021',
    title: 'Mobility and Globalization in the Aftermath of COVID-19: Emerging New Geographies in a Locked World',
    authors: ['Maximiliano E. Korstanje', 'Babu George'],
    year: 2021,
    venue: 'Palgrave Macmillan (Monograph)',
    type: 'book',
    citations: 89,
    link: 'https://doi.org/10.1007/978-3-030-78845-2',
    disciplinaryLens: ['sociology', 'philosophy', 'economics'],
    strategicArea: ['strategy', 'change'],
    empiricalTestbed: ['hospitality_mobility'],
    theoreticalContribution: 'Theorizes how global sanitary crises are weaponized to re-border the world, creating bifurcated citizenship regimes where biometric privilege dictates geographic liberty.',
    epistemicTakeaway: 'Global freedom of movement is not an inalienable right but a contingent privilege distributed along racialized and financialized fault lines.'
  },
  {
    id: 'pub-digital-inequities-2022',
    title: 'Digital Inequities and Digital Inclusion in Education: An Agenda for the Post-COVID-19 World',
    authors: ['Babu George', 'Y. Dalat Ward', 'E. Jones'],
    year: 2022,
    venue: 'IGI Global Book Contributions, Hershey, PA',
    type: 'chapter',
    citations: 55,
    link: 'https://doi.org/10.4018/978-1-7998-9247-2.ch001',
    disciplinaryLens: ['sociology', 'economics'],
    strategicArea: ['change', 'technology'],
    empiricalTestbed: ['higher_education'],
    theoreticalContribution: 'Exposes the structural reality of the second- and third-level digital divide, proving that physical hardware access without cultural and epistemic scaffolding entrenches educational inequality.',
    epistemicTakeaway: 'Distributing screens without dismantling structural pedagogical disparities amplifies educational disenfranchisement.'
  },
  {
    id: 'pub-sdg-incoherence-2026',
    title: 'The Ontology of Incoherence: How the Sustainable Development Goals Naturalize the Growth–Ecology Contradiction',
    authors: ['Babu George', 'Tony L. Henthorne'],
    year: 2026,
    venue: 'Sustainability (MDPI), Special Issue on Critical Sustainable Systems',
    type: 'critique',
    citations: 18,
    link: 'https://doi.org/10.3390/su18020891',
    disciplinaryLens: ['philosophy', 'economics'],
    strategicArea: ['strategy', 'governance'],
    empiricalTestbed: ['regional_development'],
    theoreticalContribution: 'A foundational philosophical critique demonstrating that the United Nations SDG framework suffers from internal ontological incoherence by wedding infinite GDP compound growth (Goal 8) with planetary ecological restoration (Goals 13, 14, 15).',
    epistemicTakeaway: 'We cannot resolve the global ecological crisis using the very teleological mechanism—perpetual compound growth—that precipitated it.'
  }
];

export const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    // Disciplinary Roots
    { id: 'disc-philosophy', name: 'Philosophy & Epistemology', type: 'discipline', group: 'philosophy', color: '#8b5cf6', radius: 24, description: 'Ontological inquiry, critique of institutional dogmas, and ethics of technology.' },
    { id: 'disc-psychology', name: 'Psychology & Behavioral Science', type: 'discipline', group: 'psychology', color: '#0284c7', radius: 24, description: 'Cognitive dissonance, affect, place attachment, and interface acceptance.' },
    { id: 'disc-economics', name: 'Economics & Political Economy', type: 'discipline', group: 'economics', color: '#10b981', radius: 24, description: 'Structural distribution of capital, financial inclusion, and growth paradoxes.' },
    { id: 'disc-sociology', name: 'Sociology & Spatial Geographies', type: 'discipline', group: 'sociology', color: '#f59e0b', radius: 24, description: 'Border regimes, digital divides, and community self-determination.' },

    // Strategic & Organizational Imperatives
    { id: 'strat-governance', name: 'Boardroom Governance & Stewardship', type: 'strategy', group: 'strategy', color: '#2563eb', radius: 18, description: 'Stewardship theory, fiduciary vigilance, and ethical board oversight.' },
    { id: 'strat-change', name: 'Institutional Change & Metamorphosis', type: 'strategy', group: 'change', color: '#ec4899', radius: 18, description: 'Overcoming structural inertia during radical socio-technical transitions.' },
    { id: 'strat-technology', name: 'Disruptive Innovation & AI Systems', type: 'strategy', group: 'technology', color: '#06b6d4', radius: 18, description: 'Algorithmic governance, robotics diffusion, and human-in-the-loop systems.' },

    // Core Theoretical Concepts
    { id: 'concept-dissonance', name: 'Cognitive Dissonance Theory', type: 'concept', group: 'psychology', color: '#38bdf8', radius: 14, description: 'Post-decision conflict resolution and psychological defense mechanisms.' },
    { id: 'concept-place', name: 'Place Attachment & Spatial Identity', type: 'concept', group: 'psychology', color: '#38bdf8', radius: 14, description: 'Affective mediation and memory structures in human spatial relationships.' },
    { id: 'concept-utaut', name: 'Cognitive Technology Appraisal (UTAUT-2)', type: 'concept', group: 'psychology', color: '#38bdf8', radius: 14, description: 'Hedonic, habit, and expectancy drivers in digital adoption.' },
    { id: 'concept-growth-critique', name: 'Ontology of Incoherence (Growth vs. Ecology)', type: 'concept', group: 'philosophy', color: '#a78bfa', radius: 15, description: 'Philosophical deconstruction of infinite compound growth under planetary boundaries.' },
    { id: 'concept-fin-inclusion', name: 'Decentralized Financial Inclusion', type: 'concept', group: 'economics', color: '#34d399', radius: 14, description: 'Democratizing liquidity through non-bank mobile networks.' },
    { id: 'concept-border-regimes', name: 'Biopolitical Border Regimes', type: 'concept', group: 'sociology', color: '#fbbf24', radius: 14, description: 'Post-crisis stratifications of global human mobility.' },

    // Key Publications as Landmark Nodes
    { id: 'paper-ai-higher-ed', name: 'AI Strategic Transformation (2023)', type: 'paper', group: 'technology', color: '#67e8f9', radius: 16, citations: 1056, year: 2023, paperId: 'pub-ai-higher-ed-2023' },
    { id: 'paper-utaut-2018', name: 'Smartphone Adoption & UTAUT-2 (2018)', type: 'paper', group: 'psychology', color: '#7dd3fc', radius: 14, citations: 478, year: 2018, paperId: 'pub-utaut-smartphone-2018' },
    { id: 'paper-place-2004', name: 'Place Attachment & Revisit (2004)', type: 'paper', group: 'psychology', color: '#7dd3fc', radius: 14, citations: 379, year: 2004, paperId: 'pub-place-attachment-2004' },
    { id: 'paper-sdg-2026', name: 'Ontology of Incoherence: SDGs (2026)', type: 'paper', group: 'philosophy', color: '#c4b5fd', radius: 13, citations: 18, year: 2026, paperId: 'pub-sdg-incoherence-2026' },
    { id: 'paper-boardroom-2020', name: 'Boardroom Leadership (2020)', type: 'paper', group: 'strategy', color: '#93c5fd', radius: 12, citations: 62, year: 2020, paperId: 'pub-boardroom-leadership-2020' },
    { id: 'paper-dfs-2021', name: 'Digital Financial Services Uganda (2021)', type: 'paper', group: 'economics', color: '#6ee7b7', radius: 13, citations: 74, year: 2021, paperId: 'pub-dfs-uganda-2021' },
    { id: 'paper-covid-mobility-2021', name: 'Mobility in a Locked World (2021)', type: 'paper', group: 'sociology', color: '#fde68a', radius: 13, citations: 89, year: 2021, paperId: 'pub-mobility-covid-2021' },

    // Empirical Proving Grounds (Testbeds - clearly peripheral)
    { id: 'testbed-he', name: 'Lab: Higher Education Systems', type: 'testbed', group: 'testbed', color: '#f87171', radius: 12, description: 'Empirical site testing institutional inertia and AI governance.' },
    { id: 'testbed-services', name: 'Lab: High-Touch Service Ecosystems', type: 'testbed', group: 'testbed', color: '#f87171', radius: 12, description: 'Empirical site testing affective attachment and human-robot dynamics.' },
    { id: 'testbed-dfs', name: 'Lab: Emerging Financial Networks', type: 'testbed', group: 'testbed', color: '#f87171', radius: 12, description: 'Empirical site testing decentralized capital diffusion.' }
  ],
  links: [
    // Disciplinary roots connecting to Strategic/Change Core
    { source: 'disc-philosophy', target: 'strat-governance', strength: 2, label: 'Ethical stewardship & fiduciary purpose' },
    { source: 'disc-philosophy', target: 'concept-growth-critique', strength: 3, label: 'Ontological critique' },
    { source: 'disc-philosophy', target: 'strat-technology', strength: 2, label: 'Epistemic ethics of AI' },

    { source: 'disc-psychology', target: 'concept-dissonance', strength: 3, label: 'Behavioral mechanisms' },
    { source: 'disc-psychology', target: 'concept-place', strength: 3, label: 'Affective attachment' },
    { source: 'disc-psychology', target: 'concept-utaut', strength: 3, label: 'Cognitive interface appraisal' },
    { source: 'disc-psychology', target: 'strat-change', strength: 2, label: 'Managing psychological resistance' },

    { source: 'disc-economics', target: 'concept-fin-inclusion', strength: 3, label: 'Structural capital access' },
    { source: 'disc-economics', target: 'concept-growth-critique', strength: 2, label: 'Limits to growth' },
    { source: 'disc-economics', target: 'strat-governance', strength: 2, label: 'Corporate economic oversight' },

    { source: 'disc-sociology', target: 'concept-border-regimes', strength: 3, label: 'Spatial stratification' },
    { source: 'disc-sociology', target: 'strat-change', strength: 2, label: 'Social system transitions' },

    // Concepts bridging to Landmark Papers
    { source: 'concept-dissonance', target: 'paper-place-2004', strength: 2 },
    { source: 'concept-place', target: 'paper-place-2004', strength: 3 },
    { source: 'concept-utaut', target: 'paper-utaut-2018', strength: 3 },
    { source: 'concept-utaut', target: 'strat-technology', strength: 2 },

    { source: 'strat-technology', target: 'paper-ai-higher-ed', strength: 3 },
    { source: 'strat-change', target: 'paper-ai-higher-ed', strength: 3 },
    { source: 'strat-governance', target: 'paper-boardroom-2020', strength: 3 },

    { source: 'concept-growth-critique', target: 'paper-sdg-2026', strength: 3 },
    { source: 'concept-fin-inclusion', target: 'paper-dfs-2021', strength: 3 },
    { source: 'concept-border-regimes', target: 'paper-covid-mobility-2021', strength: 3 },

    // Papers mapped to their peripheral Empirical Testbeds
    { source: 'paper-ai-higher-ed', target: 'testbed-he', strength: 1, label: 'Empirical site' },
    { source: 'paper-utaut-2018', target: 'testbed-services', strength: 1, label: 'Empirical site' },
    { source: 'paper-place-2004', target: 'testbed-services', strength: 1, label: 'Empirical site' },
    { source: 'paper-dfs-2021', target: 'testbed-dfs', strength: 1, label: 'Empirical site' },
    { source: 'paper-covid-mobility-2021', target: 'testbed-services', strength: 1, label: 'Empirical site' }
  ]
};

