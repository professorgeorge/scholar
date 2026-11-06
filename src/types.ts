export type DisciplinaryLens = 'philosophy' | 'psychology' | 'economics' | 'sociology';
export type StrategicArea = 'strategy' | 'change' | 'technology' | 'governance';
export type EmpiricalTestbed = 'higher_education' | 'hospitality_mobility' | 'digital_financial_services' | 'regional_development';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  type: 'journal' | 'book' | 'chapter' | 'editorial' | 'critique';
  citations: number;
  link: string;
  disciplinaryLens: DisciplinaryLens[];
  strategicArea: StrategicArea[];
  empiricalTestbed: EmpiricalTestbed[];
  theoreticalContribution: string;
  epistemicTakeaway: string;
}

export interface DisciplinaryPillar {
  id: DisciplinaryLens;
  name: string;
  color: string;
  badgeBg: string;
  description: string;
  epistemicCore: string;
  coreTheoreticalMechanisms: string[];
  keyInquiries: string[];
  icon: string;
}

export interface StrategicPillar {
  id: StrategicArea;
  name: string;
  color: string;
  description: string;
  mechanisms: string[];
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'discipline' | 'strategy' | 'concept' | 'paper' | 'testbed';
  group: string;
  color: string;
  radius: number;
  description?: string;
  citations?: number;
  year?: number;
  paperId?: string;
}

export interface NetworkLink {
  source: string;
  target: string;
  strength?: number;
  label?: string;
}

