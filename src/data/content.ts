export type ProjectStatus = "Proposed" | "Protocol Development" | "Preregistered" | "Data Collection" | "Analysis" | "Manuscript" | "Under Review" | "Published" | "Completed" | "Paused";
export type Project = {
  id: string; slug: string; title: string; status: ProjectStatus; summary: string;
  researchQuestion: string; methods: string[]; researchArea: string; lead: string;
  members: string[]; collaborators: string[]; startDate: string; lastUpdated: string;
  progressStage: "Idea" | "Protocol" | "Registered" | "Data" | "Analysis" | "Manuscript" | "Published";
  preregistration?: string; protocol?: string; code?: string; data?: string; preprint?: string; publication?: string; doi?: string;
};
export type Person = {
  id: string; slug: string; name: string; role: string; category: string; photo?: string;
  bio: string; researchInterests: string[]; methods: string[]; externalAffiliation?: string;
  orcid?: string; scholar?: string; github?: string; linkedin?: string; website?: string;
  joinedYear?: number; projectIds: string[]; publicationIds: string[];
};
export type Publication = {
  id: string; slug: string; title: string; authors: string[]; year: number; type: string;
  peerReviewed?: boolean; venue?: string; volume?: string; issue?: string; pages?: string;
  doi?: string; abstract?: string; paperUrl?: string; codeUrl?: string; dataUrl?: string;
  preregistrationUrl?: string; projectId?: string;
};

// Public arrays remain empty until records are verified by Lagun Lab.
export const projects: Project[] = [];
export const publications: Publication[] = [];
export const people: Person[] = [
  {
    id: "person-nikesh-lagun",
    slug: "nikesh-lagun",
    name: "Nikesh Lagun",
    role: "Founder & Research Lead",
    category: "Research Leadership",
    bio: "Nikesh Lagun leads the development of Lagun Lab's research direction and its project-based approach to cognitive and behavioral science.",
    researchInterests: ["Action initiation", "Computational cognition", "Behavioral dynamics"],
    methods: [],
    projectIds: [],
    publicationIds: [],
  },
];

export const researchAreas = [
  { slug: "cognitive-dynamics", title: "Cognitive Dynamics", short: "Action initiation, persistence, disengagement, attention, cognitive control, and behavioral transitions.", description: "We investigate the processes that determine when behavior begins, persists, changes, or stops.", questions: ["How does action begin?", "Why can intention exist without action?", "What predicts transitions between inactivity and engagement?", "Why does sustained effort collapse?", "How does recent behavioral history influence future behavior?", "How does cognitive control vary across time?"] },
  { slug: "computational-quantitative-cognition", title: "Computational & Quantitative Cognition", short: "Formal models, behavioral time series, simulation, statistical inference, and computational approaches to cognition.", description: "We use formal, computational, and statistical methods to describe and test models of human cognition and behavior.", questions: ["Formal modeling", "Computational simulation", "Time-series analysis", "Statistical inference", "Predictive modeling", "Large behavioral datasets"] },
  { slug: "theory-testing-open-science", title: "Theory Testing & Open Science", short: "Theory comparison, construct validation, replication, reproducibility, and transparent empirical testing.", description: "We treat theories as testable explanations and emphasize transparent methods, competing models, replication, and reproducibility.", questions: ["Preregistration", "Competing-model comparison", "Construct validation", "Replication", "Robustness testing", "Transparent reporting and null results"] },
];

export const progressStages = ["Idea", "Protocol", "Registered", "Data", "Analysis", "Manuscript", "Published"] as const;
