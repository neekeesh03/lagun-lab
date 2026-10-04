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
  orcid?: string; scholar?: string; scopus?: string; researchGate?: string; github?: string; linkedin?: string; website?: string; email?: string; knowledgePanel?: string;
  joinedYear?: number; projectIds: string[]; publicationIds: string[];
  scholarlyMetrics?: { citations: number; hIndex: number; i10Index: number; worksListed?: number; updatedAt: string };
};
export type Publication = {
  id: string; slug: string; title: string; authors: string[]; year: number; type: string;
  peerReviewed?: boolean; venue?: string; volume?: string; issue?: string; pages?: string;
  doi?: string; abstract?: string; paperUrl?: string; codeUrl?: string; dataUrl?: string;
  preregistrationUrl?: string; projectId?: string;
  relationshipToLab: "lagun-lab" | "foundational-founder-work" | "external-collaboration";
  citations?: number; citationsUpdatedAt?: string; tags: string[];
};

// Public arrays remain empty until records are verified by Lagun Lab.
export const projects: Project[] = [];
export const publications: Publication[] = [
  {
    id: "lab-2025-llm-organic-synthesis", slug: "large-language-models-transform-organic-synthesis",
    title: "Large Language Models Transform Organic Synthesis: From Reaction Prediction to Automation",
    authors: ["Kartar Kumar", "Rajesh Kumar", "Nikesh Lagun"],
    year: 2025, type: "Preprint", venue: "arXiv", paperUrl: "https://arxiv.org/abs/2508.05427",
    relationshipToLab: "lagun-lab", tags: ["Large language models", "Organic synthesis", "Laboratory automation"],
  },
  {
    id: "foundational-2026-history-dependent-inactivity", slug: "history-dependent-transitions-to-sustained-inactivity",
    title: "The Weight of the Past: History-Dependent Structure in Transitions to Sustained Inactivity",
    authors: ["Nikesh Lagun"], year: 2026, type: "Peer-reviewed article", peerReviewed: true,
    venue: "Chronobiology in Medicine", volume: "8", issue: "2", pages: "87–97",
    relationshipToLab: "foundational-founder-work", tags: ["Behavioral dynamics", "History dependence"],
  },
  {
    id: "foundational-2026-threshold-action-initiation", slug: "why-intentions-fail-to-become-action",
    title: "Why Intentions Fail to Become Action: A Threshold Account of Action Initiation",
    authors: ["Nikesh Lagun", "B. L. Tamang", "Kushal Budha", "S. Darji", "B. Ghimire", "S. Adhikari", "S. Rijal"],
    year: 2026, type: "Preprint", venue: "OSF", relationshipToLab: "foundational-founder-work",
    tags: ["Action initiation", "Threshold models"],
  },
  {
    id: "foundational-2025-laguns-law", slug: "laguns-law-foundations-cognitive-drive-architecture",
    title: "Lagun’s Law and the Foundations of Cognitive Drive Architecture: A First Principles Theory of Effort and Performance",
    authors: ["Nikesh Lagun"], year: 2025, type: "Peer-reviewed article", peerReviewed: true,
    venue: "International Journal of Science and Research Archive", relationshipToLab: "foundational-founder-work",
    citations: 13, citationsUpdatedAt: "September 2026", tags: ["Cognitive Drive Architecture", "Theory"],
  },
  {
    id: "foundational-2025-latent-task-architecture", slug: "latent-task-architecture",
    title: "Latent Task Architecture: Modeling Cognitive Readiness Under Unresolved Intentions",
    authors: ["Nikesh Lagun"], year: 2025, type: "Preprint", venue: "Research Square",
    relationshipToLab: "foundational-founder-work", citations: 4, citationsUpdatedAt: "September 2026",
    tags: ["Action initiation", "Cognitive readiness"],
  },
];
export const foundingYear = 2026;
export const contactEmail = "lagunnikesh2064@gmail.com";

export const people: Person[] = [
  {
    id: "person-nikesh-lagun",
    slug: "nikesh-lagun",
    name: "Nikesh Lagun",
    role: "Founder & Research Lead",
    category: "Research Leadership",
    photo: "/__l5e/assets-v1/630027cb-7bff-4ab7-9de4-8fe811e0043b/nikesh-lagun.png",
    bio: "Nikesh Lagun is a researcher and the founder of Lagun Lab. His work spans cognitive and behavioral research, quantitative analysis, and computational approaches to studying human behavior. He has published work proposing Cognitive Drive Architecture (CDA) as a field of research concerned with the processes involved in initiating, regulating, and sustaining cognitive effort. His publications have introduced and examined concepts including Lagun’s Law, Cognitive Thermostat Theory, and related models of action initiation and behavioral dynamics. His research has also included studies involving chronobiology, education, psychological and behavioral datasets, and statistical modeling. He is currently studying at Beihang University and continues to develop and test research questions related to cognition, behavior, and computational modeling through Lagun Lab.",
    researchInterests: ["Cognitive dynamics", "Action initiation", "Cognitive Drive Architecture", "Behavioral science", "Computational psychology", "Quantitative research"],
    methods: ["Formal modeling", "Behavioral time-series analysis", "Statistical inference", "Secondary-data analysis"],
    externalAffiliation: "Beihang University",
    orcid: "https://orcid.org/0009-0005-6372-4852",
    scholar: "https://scholar.google.com/citations?user=nGsGSgIAAAAJ&hl=en",
    scopus: "60009209500",
    email: "lagunnikesh2064@gmail.com",
    knowledgePanel: "https://share.google/nB3viIOxt9ZfzScDr",
    projectIds: [],
    publicationIds: ["lab-2025-llm-organic-synthesis", "foundational-2026-history-dependent-inactivity", "foundational-2026-threshold-action-initiation", "foundational-2025-laguns-law", "foundational-2025-latent-task-architecture"],
    scholarlyMetrics: { citations: 36, hIndex: 4, i10Index: 1, worksListed: 23, updatedAt: "September 2026" },
  },
  {
    id: "person-rajesh-kumar",
    slug: "rajesh-kumar",
    name: "Rajesh Kumar",
    role: "Research Lead",
    category: "Research Leadership",
    photo: "/__l5e/assets-v1/0813a69e-6da0-488f-8eba-efbba8121712/rajesh-kumar.png",
    bio: "Rajesh Kumar is an Associate Professor and researcher working at the intersection of privacy-preserving AI, federated learning, blockchain, cybersecurity, and medical imaging. His research centers on a guiding question: how can AI systems learn from sensitive, distributed, or high-risk data without compromising privacy, security, trust, or real-world usability? He has worked on AI-powered cybersecurity, Android and IoT malware detection, blockchain-based secure data sharing, and federated learning for healthcare applications, with recent work focusing on privacy-preserving medical AI, including CT, PET-CT, brain tumor, and liver lesion imaging. He completed his PhD in Computer Science and Technology at the University of Electronic Science and Technology of China, where his research focused on Android malware detection using machine learning, and continued postdoctoral research there from 2019 to 2021 on IoT malware detection and blockchain-based secure data sharing. His research record includes 70+ papers across journals and conferences, including SCI-indexed work in IEEE, Elsevier, Springer, and Nature portfolio journals, alongside teaching and supervision in machine learning, deep learning, blockchain, and research methodology, contributions to funded research projects, patent work, datasets, and academic reviewing for IEEE and Elsevier journals.",
    researchInterests: ["Privacy-preserving AI", "Federated learning", "Blockchain-enabled healthcare", "AI for cybersecurity", "Secure data sharing", "Medical imaging AI"],
    methods: ["Machine learning", "Deep learning", "Federated learning", "Blockchain systems", "Malware detection"],
    externalAffiliation: "International Research Center for Complexity Sciences, International Innovation Institute, Beihang University, Hangzhou 311115, China",
    orcid: "https://orcid.org/0000-0003-0813-7485",
    scholar: "https://scholar.google.com/citations?user=2_F5e_YAAAAJ&hl=en",
    scopus: "58488212700",
    email: "rajakumarlohano@gmail.com",
    projectIds: [],
    publicationIds: ["lab-2025-llm-organic-synthesis"],
    scholarlyMetrics: { citations: 3976, hIndex: 31, i10Index: 53, worksListed: 84, updatedAt: "October 2026" },
  },
];

export const researchAreas = [
  { slug: "cognitive-dynamics", title: "Cognitive Dynamics", short: "Action initiation, persistence, disengagement, attention, cognitive control, and behavioral transitions.", description: "We investigate the processes that determine when behavior begins, persists, changes, or stops.", questions: ["How does action begin?", "Why can intention exist without action?", "What predicts transitions between inactivity and engagement?", "Why does sustained effort collapse?", "How does recent behavioral history influence future behavior?", "How does cognitive control vary across time?"] },
  { slug: "computational-quantitative-cognition", title: "Computational & Quantitative Cognition", short: "Formal models, behavioral time series, simulation, statistical inference, and computational approaches to cognition.", description: "We use formal, computational, and statistical methods to describe and test models of human cognition and behavior.", questions: ["Formal modeling", "Computational simulation", "Time-series analysis", "Statistical inference", "Predictive modeling", "Large behavioral datasets"] },
  { slug: "theory-testing-open-science", title: "Theory Testing & Open Science", short: "Theory comparison, construct validation, replication, reproducibility, and transparent empirical testing.", description: "We treat theories as testable explanations and emphasize transparent methods, competing models, replication, and reproducibility.", questions: ["Preregistration", "Competing-model comparison", "Construct validation", "Replication", "Robustness testing", "Transparent reporting and null results"] },
];

export const progressStages = ["Idea", "Protocol", "Registered", "Data", "Analysis", "Manuscript", "Published"] as const;
