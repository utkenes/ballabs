export interface ProjectInquiry {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface AiArchitectResult {
  projectTitle: string;
  architectureOverview: string;
  recommendedStack: string[];
  estimatedTimelineWeeks: number;
  keyModules: {
    name: string;
    description: string;
  }[];
  performanceHighlights: string[];
  expertAdvice: string;
}

export interface FlagshipProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & ML' | 'Cloud Architecture' | 'Enterprise SaaS' | 'High-Perf Web';
  description: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architecture: string[];
  featured: boolean;
  imageAlt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  techStack: string[];
  features: string[];
  codeSnippet: string;
}

export interface SystemHealth {
  status: string;
  company: string;
  developer: string;
  uptime: number;
  timestamp: string;
  services: {
    aiEngine: string;
    cloudCore: string;
    database: string;
  };
}
