export type ProjectCategory = 'All' | 'Systems' | 'AI & Tools' | 'Web Experiments' | 'Campus Tools';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  year: string;
  category: ProjectCategory;
  status: 'Active' | 'Complete' | 'Prototype' | 'Research';
  problem: string;
  architecture: string;
  learnings: string;
  technologies: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Essay {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  content: string[]; // Markdown-style paragraphs
}

export interface BookRecommendation {
  title: string;
  author: string;
  type: 'Book' | 'Paper' | 'Essay';
  takeaway: string;
  link?: string;
}

export interface TimelineItem {
  year: string;
  period?: string;
  title: string;
  roleOrContext: string;
  description: string;
  highlights?: string[];
}

export interface InquiryQuestion {
  question: string;
  context: string;
  status: 'Pondering' | 'Prototyping' | 'Reading';
}

export interface PortfolioData {
  personal: {
    name: string;
    pronouns: string;
    title: string;
    location: string;
    university: string;
    degree: string;
    expectedGraduation: string;
    bioIntro: string;
    bioExpanded: string[];
    email: string;
    github: string;
    twitter: string;
    linkedin: string;
    rssUrl?: string;
  };
  currently: {
    statusBadge: string;
    focus: string;
    readingBook: {
      title: string;
      author: string;
      status: string;
    };
    tinkeringWith: string;
    currentInquiries: InquiryQuestion[];
  };
  projects: Project[];
  essays: Essay[];
  readingShelf: BookRecommendation[];
  timeline: TimelineItem[];
  colophon: {
    builtWith: string[];
    typography: string;
    lastUpdated: string;
    designInspiration: string;
  };
}
