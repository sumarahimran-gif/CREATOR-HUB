export interface NavLink {
  label: string;
  href: string;
}

export interface GrowthStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface CorePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  deliverables: string[];
  visualType: 'laptop' | 'neural' | 'mobile' | 'code' | 'network';
}

export interface CaseStudyProject {
  id: string;
  name: string;
  category: string;
  impact: string;
  description: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

export interface OnboardingStep {
  step: number;
  title: string;
  description: string;
  statusText?: string;
  actionText?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export type ModalType = 'apply' | 'terms' | 'privacy' | 'refund' | 'contact' | 'all-buttons' | null;
