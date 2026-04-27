import type { LucideIcon } from "lucide-react";
import { Code2, FileText, Github, Linkedin, Link as LinkIcon, Mail } from "lucide-react";

export type Stage = {
  id: string;
  label: string;
  range: string;
  log: string;
};

export type Skill = {
  name: string;
  tone: "blue" | "green" | "silver";
  log: string;
  level: string;
  group: "Languages" | "Frontend" | "Backend" | "Cloud" | "Tools" | "Coursework";
};

export type ExperienceItem = {
  company: string;
  meta: string;
  period: string;
  title: string;
  details: string;
  metric: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  label: string;
};

export type Project = {
  name: string;
  stack: string;
  metric: string;
  copy: string;
  signal: string;
  problem: string;
  media: ProjectMedia[];
  architecture: string[];
  decisions: string[];
  links: ProjectLink[];
};

export type CompetitiveProfile = {
  platform: string;
  handle: string;
  rating: string;
  tier: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const siteProfile = {
  name: "Aditya Srivastava",
  title: "Software Development Engineer | System Architect",
  location: "Bangalore, India",
  email: "sriaditya16@gmail.com",
  siteUrl: "https://adityasrivastava.dev",
  resumeHref: "https://drive.google.com/file/d/1zBbPLYJlFTyngobXBBWxughLH_HncRXT/view?usp=sharing"
};

export const stages: Stage[] = [
  { id: "hero", label: "Initialization", range: "0-15%", log: "Identity core waking from cold storage." },
  { id: "engine", label: "Engine Room", range: "15-35%", log: "Education substrate and architecture layer exposed." },
  { id: "stack", label: "Stack Explosion", range: "35-55%", log: "Runtime stack separated into orbiting service bands." },
  { id: "timeline", label: "Timeline", range: "55-75%", log: "Career fragments aligning into a data pillar." },
  { id: "showcase", label: "Showcase", range: "75-90%", log: "Product viewport online. Holographic modules ready." },
  { id: "handshake", label: "Handshake", range: "90-100%", log: "Core reassembled. Contact protocol open." }
];

export const bootLines = [
  "Booting Oracle Core",
  "Compiling Identity Graph",
  "Mapping BIT Mesra substrate",
  "Linking Kafka-WebSocket channel",
  "System Ready"
];

export const skills: Skill[] = [
  { name: "C++", tone: "silver", level: "Algorithmic Kernel", group: "Languages", log: "Low-level systems thinking and competitive problem solving." },
  { name: "C", tone: "silver", level: "Systems Base", group: "Languages", log: "Memory-aware programming foundation and operating-system level reasoning." },
  { name: "Python", tone: "blue", level: "Automation Layer", group: "Languages", log: "Fast scripting, data handling, and AI/product glue code." },
  { name: "JavaScript", tone: "green", level: "Runtime Web", group: "Languages", log: "Browser and Node.js fluency for product-grade interfaces." },
  { name: "TypeScript", tone: "silver", level: "Typed Product Layer", group: "Languages", log: "Safer full-stack development with explicit contracts." },
  { name: "React.js", tone: "blue", level: "Interface Layer", group: "Frontend", log: "Responsive interfaces with animation-aware interaction patterns." },
  { name: "Next.js", tone: "silver", level: "Product Shell", group: "Frontend", log: "Full-stack product surfaces, AI workflows, and optimized rendering." },
  { name: "GSAP", tone: "green", level: "Motion Driver", group: "Frontend", log: "Timeline-based animation and scroll-linked storytelling." },
  { name: "Tailwind CSS", tone: "blue", level: "Design System Utility", group: "Frontend", log: "Fast, consistent styling for modern responsive products." },
  { name: "Node.js", tone: "green", level: "API Runtime", group: "Backend", log: "Server-side JavaScript for APIs, tools, and integration layers." },
  { name: "Spring Boot", tone: "green", level: "Service Fabric", group: "Backend", log: "Service architecture, integrations, and clean domain boundaries." },
  { name: "PostgreSQL", tone: "blue", level: "Relational Store", group: "Backend", log: "Structured persistence for reliable product data." },
  { name: "MySQL", tone: "silver", level: "Relational Store", group: "Backend", log: "Database modeling and query fundamentals." },
  { name: "Azure", tone: "blue", level: "Cloud Platform", group: "Cloud", log: "Cloud delivery and Azure DevOps experience." },
  { name: "Docker", tone: "green", level: "Runtime Capsule", group: "Cloud", log: "Containerized development flows and predictable runtime packaging." },
  { name: "Kubernetes", tone: "blue", level: "Cluster Control", group: "Cloud", log: "Cloud-native deployment literacy and scalable platform awareness." },
  { name: "Git", tone: "silver", level: "Version Control", group: "Tools", log: "Clean source control and collaborative development workflow." },
  { name: "GitHub", tone: "blue", level: "Code Platform", group: "Tools", log: "Project hosting, collaboration, and open-source style workflows." },
  { name: "GitLab", tone: "green", level: "DevOps Platform", group: "Tools", log: "Repository and delivery workflow literacy." },
  { name: "OS", tone: "silver", level: "Coursework", group: "Coursework", log: "Process, memory, file-system, and concurrency fundamentals." },
  { name: "DBMS", tone: "blue", level: "Coursework", group: "Coursework", log: "Relational modeling, transactions, indexes, and query design." },
  { name: "OOP", tone: "green", level: "Coursework", group: "Coursework", log: "Object-oriented design principles and maintainable abstractions." },
  { name: "Networks", tone: "silver", level: "Coursework", group: "Coursework", log: "Transport, routing, sockets, and distributed-system foundations." }
];

export const competitiveProfiles: CompetitiveProfile[] = [
  {
    platform: "Codeforces",
    handle: "ocullus_repelo",
    rating: "1749",
    tier: "Expert",
    href: "https://codeforces.com/profile/ocullus_repelo"
  },
  {
    platform: "LeetCode",
    handle: "adi_1618",
    rating: "1927",
    tier: "Knight",
    href: "https://leetcode.com/u/adi_1618/"
  },
  {
    platform: "AtCoder",
    handle: "Adi_1816",
    rating: "1700",
    tier: "4 Star",
    href: "https://atcoder.jp/users/Adi_1816"
  },
  {
    platform: "CodeChef",
    handle: "adiedits_1816",
    rating: "Profile",
    tier: "Competitive Programmer",
    href: "https://www.codechef.com/users/adiedits_1816"
  }
];

export const experience: ExperienceItem[] = [
  {
    company: "Oracle",
    meta: "Software Development Engineer - OSDMC",
    period: "Jan 2026 - Present",
    title: "Backend refactor and streaming integration",
    details:
      "Refactored OSDMC backend flows and delivered a Kafka-WebSocket integration with a 100% bug-free handoff signal.",
    metric: "100% bug-free integration"
  },
  {
    company: "DocuSign",
    meta: "Engineering internship",
    period: "May 2025 - Aug 2025",
    title: "Identity verification and delivery acceleration",
    details:
      "Built Azure DevOps delivery improvements and OTP-based identity verification, reducing deployment time by 20%.",
    metric: "20% faster deployments"
  },
  {
    company: "TLE Eliminators",
    meta: "Competitive Programming Mathematics Tutor",
    period: "Aug 2024 - Dec 2024",
    title: "Mathematics for competitive programming",
    details:
      "Delivered expert instruction to 200+ beginners, strengthening number theory, combinatorics, and problem-solving foundations for Codeforces growth.",
    metric: "40% rating enhancement"
  }
];

export const projects: Project[] = [
  {
    name: "AI Mock Interview",
    stack: "Next.js 14 + Gemini AI",
    metric: "500+ interviews processed",
    signal: "Voice, rubric, feedback loop",
    copy: "A holographic interview platform that converts preparation into structured, AI-assisted feedback loops.",
    problem:
      "Interview preparation is usually unstructured: candidates practice answers, but do not get consistent scoring, live transcripts, or actionable performance reports.",
    media: [
      {
        src: "/projects/ai-mock-interview-01.png",
        alt: "AI Mock Interview landing page with AI interview preparation hero and feature cards",
        label: "Landing Surface"
      },
      {
        src: "/projects/ai-mock-interview-02.png",
        alt: "AI Mock Interview dashboard with previous mock interviews and create interview panel",
        label: "Dashboard Flow"
      }
    ],
    architecture: [
      "Smart web app that simulates real interviews using an AI-driven interviewer.",
      "Question flow supports technical and HR practice with live transcripts.",
      "Performance reports convert responses into feedback that users can act on."
    ],
    decisions: [
      "Kept feedback structured instead of purely conversational so results are easy to compare over time.",
      "Designed the UI around high-pressure interview cadence: prompt, answer, score, reflect, retry.",
      "Used the 500+ processed interviews metric as the primary proof point."
    ],
    links: [
      { label: "Live Demo", href: "https://ai-mock-interview-delta-one.vercel.app" },
      { label: "Source", href: "https://github.com/Adi1816/AI-Mock-Interview" }
    ]
  },
  {
    name: "SpecPilot",
    stack: "Next.js + GenAI + OpenAPI",
    metric: "Contract-grounded test handoff",
    signal: "OpenAPI, live API checks, markdown bug report",
    copy: "A contract-grounded API testing copilot that turns API specs into scoped, reproducible QA handoffs.",
    problem:
      "API testing often drifts away from the contract: teams need tests grounded in the uploaded OpenAPI or Swagger document and backed by reproducible execution evidence.",
    media: [
      {
        src: "/projects/specpilot-01.png",
        alt: "SpecPilot product page showing the contract-grounded API testing copilot and workflow object",
        label: "Hero System"
      },
      {
        src: "/projects/specpilot-02.png",
        alt: "SpecPilot workflow page showing flight path steps and Aditya Srivastava attribution panel",
        label: "Flight Path"
      }
    ],
    architecture: [
      "Next.js product shell for uploading an OpenAPI or Swagger contract and scoping the test suite.",
      "Execution workflow runs checks against a live API while keeping the generated suite grounded in the uploaded contract.",
      "Markdown handoff produces bug-ready evidence for issues, PRs, and QA reports."
    ],
    decisions: [
      "Uses AI where it helps explain and organize, but keeps the workflow grounded in the contract.",
      "Prioritizes reproducibility over generic chatbot-style API advice.",
      "Designed as a flagship GenAI portfolio project with a concrete engineering workflow."
    ],
    links: [
      { label: "Live Demo", href: "https://specpilot-ruby.vercel.app" },
      { label: "Source", href: "https://github.com/Adi1816/specpilot" }
    ]
  },
  {
    name: "Fresher's Guide",
    stack: "HTML + CSS + JavaScript",
    metric: "College-life knowledge hub",
    signal: "Student guide, doubts, onboarding",
    copy: "A one-stop virtual place to handle miniature doubts and make college life more memorable.",
    problem:
      "New college students often have small but persistent doubts that are hard to answer from formal documents or scattered senior advice.",
    media: [
      {
        src: "/projects/freshers-guide-01.png",
        alt: "Fresher's Guide landing page with BIT Mesra campus hero and welcome message",
        label: "Campus Hero"
      },
      {
        src: "/projects/freshers-guide-02.png",
        alt: "Fresher's Guide coding and inner exploration section with dark editorial layout",
        label: "Guide Modules"
      }
    ],
    architecture: [
      "Static web experience hosted on GitHub Pages for fast access and easy sharing.",
      "Information architecture groups common student doubts into approachable guide sections.",
      "Lightweight frontend keeps the product simple, portable, and low-friction."
    ],
    decisions: [
      "Kept the product practical and student-first rather than over-engineered.",
      "Focused on discoverability and quick answers for incoming freshers.",
      "Used a simple static deployment so the guide remains accessible without backend dependencies."
    ],
    links: [
      { label: "Live Demo", href: "https://adi1816.github.io/Fresher-s-Guide/" },
      { label: "Source", href: "https://github.com/Adi1816/Fresher-s-Guide" }
    ]
  },
  {
    name: "Text2Mantra",
    stack: "Python + Poetic Structure Analysis",
    metric: "10,000+ words processed",
    signal: "Matra conversion, research tooling, academic impact",
    copy:
      "A Python-based Text2Matra converter built with Prof. Niraj Kumar Singh for poetic structure analysis and research enablement.",
    problem:
      "Scholars working with Indian poetic forms need tooling that can convert text into matra-aware structure, making rhythm and composition easier to analyze at scale.",
    media: [
      {
        src: "/projects/text2mantra-01.png",
        alt: "Centre for Computational Poetics homepage with poetic banner and research focus panels",
        label: "Research Home"
      },
      {
        src: "/projects/text2mantra-02.png",
        alt: "Centre for Computational Poetics contact page with BIT Mesra campus image and contact form",
        label: "Centre Surface"
      }
    ],
    architecture: [
      "Python processing pipeline converts text into matra-oriented poetic structure signals.",
      "Designed to support analysis across more than 10,000 words for academic research workflows.",
      "Built in collaboration with Prof. Niraj Kumar Singh and connected to the Centre of Excellence Lab initiative."
    ],
    decisions: [
      "Focused on research usefulness and repeatable text processing rather than a decorative interface.",
      "Preserved poetic structure as the primary output so scholars can reason about form and rhythm.",
      "Positioned the tool as academic infrastructure supporting 1,000+ scholars and researchers."
    ],
    links: [
      { label: "Centre Link", href: "https://ccpbitmesra.in/" },
      { label: "Source", href: "https://github.com/Adi1816/Text2Mantra" }
    ]
  }
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-srivastava-12476524a/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/Adi1816", icon: Github },
  { label: "Codeforces", href: "https://codeforces.com/profile/ocullus_repelo", icon: Code2 },
  { label: "Contact", href: `mailto:${siteProfile.email}`, icon: Mail },
  { label: "Resume", href: siteProfile.resumeHref, icon: FileText }
];
