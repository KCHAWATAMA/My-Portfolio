/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kuzivakwashe Joshua Chawatama Portfolio Content
 * SINGLE SOURCE OF TRUTH: All site content is managed and edited here.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Profile {
  fullName: string;
  identityLine: string;
  pitch: string;
  proofStrip: string[];
  location: string;
  availability: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  developerProfileUrl?: string;
  cvUrl: string;
  downloadCvUrl: string;
  photoUrl: string;
  photoAlt: string;
  currently: {
    learning: string[];
    status: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  graduationDate: string;
  classification: string;
  class1Results: string[];
}

export interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  type: string;
  bullets?: string[];
}

export interface ChartDatum {
  label: string;
  value: number;
  secondaryMetric?: string;
  highlight?: boolean;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  category: 'data' | 'process' | 'model' | 'api' | 'ui';
}

export interface GalleryItem {
  id: string;
  slotId: string;
  title: string;
  caption: string;
  altText: string;
  imageUrl?: string;
  fallbackType: 'resultsMiniChart' | 'pipelineDiagram' | 'explainability' | 'dashboardSketch' | 'proofTiles';
}

export interface ProjectResults {
  summary: string;
  metricName?: string;
  metricDirection?: 'lower-is-better' | 'higher-is-better';
  comparisonNote?: string;
  chart?: {
    title: string;
    description: string;
    metricLabel: string;
    data: ChartDatum[];
  };
  table?: Array<{
    name: string;
    primaryScore: string;
    secondaryScore?: string;
    isTop?: boolean;
  }>;
}

export interface Project {
  id: string;
  slug: string;
  cardSlotId: string;
  title: string;
  tags: string[];
  summary: string;
  readingTime: string;
  role: string;
  tools: string;
  keyMetric?: string;
  status: string;
  featured: boolean;
  imageUrl?: string;
  fallbackType: 'resultsMiniChart' | 'pipelineDiagram' | 'explainability' | 'dashboardSketch' | 'proofTiles';
  confidentialityNote?: string;
  simulationLabel?: string;
  problem: string;
  whatIBuilt: string;
  data: string;
  approach: string;
  architecture: {
    title: string;
    description: string;
    nodes: ArchitectureNode[];
  };
  results: ProjectResults;
  aiToolsUsage: {
    toolsUsed: string;
    verificationMethod: string;
  };
  lessons?: string[];
  nextSteps?: string;
  links: {
    github?: string;
    liveDemo?: string;
  };
  gallery: GalleryItem[];
}

export interface MoreWorkItem {
  id: string;
  title?: string;
  year?: string;
  summary?: string;
  tools?: string[];
  image?: string;
  link?: string;
}

export interface Badge {
  title: string;
  issuer: string;
  date: string;
  note?: string;
  url: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  verifyUrl?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface AboutContent {
  paragraphs: string[];
}

export interface PortfolioContent {
  lastUpdated: string;
  profile: Profile;
  navLinks: NavLink[];
  skills: SkillCategory[];
  education: EducationItem;
  timeline: TimelineEntry[];
  projects: Project[];
  moreWork: MoreWorkItem[];
  credentials: Certificate[];
  badges: Badge[];
  languages: LanguageItem[];
  about: AboutContent;
}

export const content: PortfolioContent = {
  lastUpdated: "October 2026",
  profile: {
    fullName: "Kuzivakwashe Joshua Chawatama",
    identityLine: "Data scientist who builds and ships.",
    pitch: "I turn data into working products, from explainable machine learning to the APIs and dashboards that put it in front of people. Data Science and Informatics graduate, University of Zimbabwe, with nine months building banking systems at KaribuTech AI.",
    proofStrip: [
      "RMSE 14.00 on NASA C-MAPSS FD001",
      "200+ rule test cases",
      "12 bank departments interviewed"
    ],
    location: "Al Wakra, Qatar",
    availability: "Available immediately.",
    email: "kuzivakwashechawatama@gmail.com",
    phone: "+974 6652 7520",
    linkedin: "https://www.linkedin.com/in/kuzivakwashej",
    github: "https://github.com/KCHAWATAMA",
    developerProfileUrl: "https://g.dev/kuzivakwashejoshuachawatama",
    cvUrl: "",
    downloadCvUrl: "",
    photoUrl: "",
    photoAlt: "Kuzivakwashe Joshua Chawatama, Data Scientist and Engineer",
    currently: {
      learning: ["Microsoft PL-300 (Power BI)", "AZ-900 (Azure)", "Tableau"],
      status: "Available immediately in Al Wakra, Qatar for data science and engineering roles."
    }
  },

  navLinks: [
    { label: "Home", href: "#/" },
    { label: "Projects", href: "#/projects" },
    { label: "About", href: "#/about" },
    { label: "Credentials", href: "#/credentials" },
    { label: "Contact", href: "#/contact" }
  ],

  skills: [
    {
      category: "Data and ML",
      skills: ["Python", "pandas", "scikit-learn", "XGBoost", "TensorFlow", "SHAP", "SQL"]
    },
    {
      category: "Analytics and BI",
      skills: ["Power BI", "Excel", "PostgreSQL", "Data cleaning and reporting"]
    },
    {
      category: "Engineering",
      skills: ["FastAPI", "Java", "Spring Boot", "REST APIs", "GraphQL", "Drools", "Git and GitHub", "Postman", "Jira"]
    },
    {
      category: "Design and communication",
      skills: ["Figma", "PowerPoint", "Stakeholder interviews"]
    },
    {
      category: "Currently learning",
      skills: ["Microsoft PL-300 (Power BI)", "AZ-900 (Azure)", "Tableau"]
    }
  ],

  education: {
    degree: "BSc Honours in Data Science and Informatics",
    institution: "University of Zimbabwe",
    graduationDate: "August 2026",
    classification: "Upper Second Class (2.1)",
    class1Results: [
      "Applied Statistics",
      "Data Warehousing and Mining",
      "Machine Learning Fundamentals",
      "Deep Learning",
      "Computer Vision",
      "Data Structures and Algorithms",
      "Linear Algebra",
      "Introduction to Data Science",
      "Industrial Attachment"
    ]
  },

  timeline: [
    {
      company: "Abitons Construction Company",
      role: "Project Planning and Design Coordination",
      period: "Sept 2025 to July 2026",
      type: "Part time"
    },
    {
      company: "KaribuTech AI",
      role: "Backend Developer and Digital Solutions Intern",
      period: "July 2024 to March 2025",
      type: "Industrial Attachment",
      bullets: [
        "Turned Excel credit-scoring decision tables into Java and Drools REST API rules and validated them with more than 200 test cases.",
        "Built SharePoint file management and GraphQL APIs, DocuSign signing integration, and WhatsApp file submission on Meta WhatsApp Cloud API.",
        "Interviewed process owners across 12 bank departments for value stream maps that found 7 duplicated process steps, and created 12 user personas and 6 customer journey maps."
      ]
    },
    {
      company: "Prodigy InfoTech",
      role: "Data Science Intern",
      period: "2024",
      type: "Internship"
    },
    {
      company: "Nyamakuyo Primary School",
      role: "Computer Lab Assistant and Data Capture Clerk",
      period: "2023",
      type: "Role"
    },
    {
      company: "Ngangu Construction Group",
      role: "IT Support Assistant",
      period: "April to August 2022",
      type: "Role"
    },
    {
      company: "NYMAK Wholesalers",
      role: "Stock and Inventory Controller",
      period: "Nov 2021 to March 2022",
      type: "Role"
    }
  ],

  projects: [
    {
      id: "aerotwin",
      slug: "aerotwin",
      cardSlotId: "aerotwin-card",
      title: "AeroTwin: explainable predictive maintenance for aircraft engines",
      tags: ["Machine Learning", "Explainable AI", "Full Stack"],
      summary: "Predicts the remaining useful life of turbofan engines from NASA C-MAPSS sensor data and explains each prediction, inside a digital twin dashboard.",
      readingTime: "4 min read",
      role: "Sole developer (final-year project)",
      tools: "Python, TensorFlow, XGBoost, SHAP, LIME, FastAPI, Next.js",
      keyMetric: "RMSE 14.00 (R² 0.878)",
      status: "In progress (deployment)",
      featured: true,
      imageUrl: "",
      fallbackType: "resultsMiniChart",
      problem: "Unplanned engine maintenance is costly and disruptive. Planners need predictions they can trust and understand.",
      whatIBuilt: "An LSTM model blended with XGBoost, served by a FastAPI backend with SHAP, LIME and counterfactual explanations and Monte Carlo uncertainty, and a Next.js dashboard with CSV import and a 3D engine view.",
      data: "NASA C-MAPSS FD001 (public). 30-cycle windows, 17 input features, remaining life capped at 125 cycles, engine-wise splits.",
      approach: "I processed multi-sensor time series data into rolling 30-cycle sequences. I combined an LSTM recurrent network with XGBoost gradient boosting to balance temporal sequence dynamics and tabular split precision. For model trust, the backend serves SHAP attribution values, LIME local surrogates, counterfactual scenarios, and Monte Carlo dropout estimates for confidence bounds.",
      architecture: {
        title: "System Pipeline",
        description: "Sensor ingestion, hybrid model inference, explainability engines, and user dashboard.",
        nodes: [
          { id: "node-1", label: "NASA C-MAPSS FD001", sublabel: "17 sensor streams, 30-cycle windows", category: "data" },
          { id: "node-2", label: "Preprocessing & Scaling", sublabel: "Standard scaling, RUL cap at 125", category: "process" },
          { id: "node-3", label: "Hybrid LSTM + XGBoost", sublabel: "Sequential dynamics + tree boosting", category: "model" },
          { id: "node-4", label: "FastAPI Inference & XAI", sublabel: "SHAP, LIME, counterfactuals, uncertainty", category: "api" },
          { id: "node-5", label: "Next.js Digital Twin", sublabel: "CSV upload, explanations, 3D view", category: "ui" }
        ]
      },
      results: {
        summary: "Official test set RMSE evaluation on NASA C-MAPSS FD001. Lower RMSE indicates superior remaining useful life prediction accuracy. The hybrid model achieved the lowest test RMSE of 14.00 and an R squared score of 0.878.",
        metricName: "Test RMSE (Lower is better)",
        metricDirection: "lower-is-better",
        comparisonNote: "The hybrid model is 3% more accurate than XGBoost and 32% more accurate than the CNN.",
        chart: {
          title: "Prediction error by model (lower is better)",
          description: "Benchmark comparison across six evaluated model architectures on the official test set. Lower is better.",
          metricLabel: "RMSE",
          data: [
            { label: "Hybrid LSTM + XGBoost", value: 14.00, secondaryMetric: "R² 0.878", highlight: true },
            { label: "XGBoost", value: 14.47 },
            { label: "TCN", value: 14.99 },
            { label: "LSTM", value: 15.54 },
            { label: "Random Forest", value: 16.82 },
            { label: "CNN", value: 20.54 }
          ]
        },
        table: [
          { name: "Hybrid LSTM + XGBoost", primaryScore: "14.00", secondaryScore: "0.878", isTop: true },
          { name: "XGBoost", primaryScore: "14.47", secondaryScore: "N/A" },
          { name: "TCN", primaryScore: "14.99", secondaryScore: "N/A" },
          { name: "LSTM", primaryScore: "15.54", secondaryScore: "N/A" },
          { name: "Random Forest", primaryScore: "16.82", secondaryScore: "N/A" },
          { name: "CNN", primaryScore: "20.54", secondaryScore: "N/A" }
        ]
      },
      aiToolsUsage: {
        toolsUsed: "I used AI coding assistants to draft boilerplate FastAPI routing patterns and Next.js component skeletons.",
        verificationMethod: "I checked model outputs against the official NASA test set and wrote a pytest suite for the data pipeline, inference, explanations and digital twin endpoints."
      },
      lessons: [],
      nextSteps: "Finalizing cloud container deployment for the FastAPI service and linking live interactive inference to the digital twin dashboard.",
      links: {
        github: "https://github.com/KCHAWATAMA/aircraft-engine-predictive-maintenance",
        liveDemo: ""
      },
      gallery: [
        {
          id: "aerotwin-fig1",
          slotId: "aerotwin-fig-1",
          title: "System Pipeline Architecture",
          caption: "Figure 1. End-to-end processing pipeline from NASA C-MAPSS sensor ingestion to hybrid inference and digital twin view.",
          altText: "System pipeline diagram from sensor data to digital twin dashboard.",
          imageUrl: "",
          fallbackType: "pipelineDiagram"
        },
        {
          id: "aerotwin-fig2",
          slotId: "aerotwin-fig-2",
          title: "Multi-Method Explainability Framework",
          caption: "Figure 2. Explainability framework connecting predictions with SHAP, LIME, counterfactuals, and Monte Carlo uncertainty.",
          altText: "Explainability architecture diagram linking prediction to explanation methods.",
          imageUrl: "",
          fallbackType: "explainability"
        }
      ]
    },
    {
      id: "sensorstream",
      slug: "sensorstream",
      cardSlotId: "sensorstream-card",
      title: "SensorStream Analytics",
      tags: ["Data Engineering", "IoT Simulation", "Dashboards"],
      summary: "A local prototype that replays the UCI household electricity dataset through simulated Modbus and MQTT, processes it in Python, and shows it on a JavaScript monitoring dashboard and in Power BI reports.",
      readingTime: "3 min read",
      role: "Sole developer (independent project)",
      tools: "Python, MQTT, Modbus, JavaScript, Power BI",
      keyMetric: "",
      status: "Completed Prototype",
      featured: true,
      imageUrl: "",
      fallbackType: "pipelineDiagram",
      simulationLabel: "Simulation using public data",
      problem: "Industrial IoT teams require lightweight ways to test telemetry pipelines and power consumption monitors before hardware is connected in the field.",
      whatIBuilt: "A local data engineering pipeline simulating industrial sensor networks using Modbus and MQTT protocols, Python stream transformation workers, an interactive JavaScript dashboard, and synchronized Power BI analytical reports.",
      data: "UCI Individual Household Electric Power Consumption dataset (public domain). Sub-metered power measurements replayed at configured time multipliers.",
      approach: "I replayed the UCI data through simulated Modbus and MQTT feeds, processed the readings with Python, and showed them on a JavaScript dashboard and in Power BI reports.",
      architecture: {
        title: "Simulation Pipeline",
        description: "UCI record replay, protocol publisher, Python ingestion, and multi-surface dashboards.",
        nodes: [
          { id: "node-1", label: "UCI Electricity Dataset", sublabel: "Sub-metering public series", category: "data" },
          { id: "node-2", label: "Simulated Modbus & MQTT", sublabel: "Asynchronous protocol broker", category: "process" },
          { id: "node-3", label: "Python Stream Worker", sublabel: "Aggregation", category: "model" },
          { id: "node-4", label: "Local API & Storage", sublabel: "Normalized time buckets", category: "api" },
          { id: "node-5", label: "JS Dashboard & Power BI", sublabel: "Live view + executive reports", category: "ui" }
        ]
      },
      results: {
        summary: "Performance metrics and streaming throughput evaluation for the local replay pipeline.",
        metricName: "Streaming Throughput",
        metricDirection: "higher-is-better"
      },
      aiToolsUsage: {
        toolsUsed: "I used language models to review protocol packet framing structures and explore syntax variations for MQTT Python clients.",
        verificationMethod: "I checked the dashboard and Power BI totals against the source dataset."
      },
      lessons: [],
      nextSteps: "Extending the broker configuration to evaluate Kafka connector scaling under multi-tenant industrial telemetry scenarios.",
      links: {
        github: "",
        liveDemo: ""
      },
      gallery: [
        {
          id: "sensorstream-fig1",
          slotId: "sensorstream-fig-1",
          title: "Streaming Architecture Pipeline",
          caption: "Figure 1. End-to-end data pipeline from UCI replay to protocol brokers and dashboards.",
          altText: "Streaming data pipeline diagram.",
          imageUrl: "",
          fallbackType: "pipelineDiagram"
        },
        {
          id: "sensorstream-fig2",
          slotId: "sensorstream-fig-2",
          title: "Monitoring Dashboard Wireframe",
          caption: "Figure 2. Dashboard layout wireframe depicting key power and communication telemetry panels.",
          altText: "Dashboard layout wireframe with active power, voltage, sub-metering, and MQTT panels.",
          imageUrl: "",
          fallbackType: "dashboardSketch"
        }
      ]
    },
    {
      id: "kaributech-banking",
      slug: "kaributech-banking",
      cardSlotId: "kaributech-card",
      title: "Banking systems at KaribuTech AI (work case study)",
      tags: ["Backend", "Banking", "Business Analysis", "Testing"],
      summary: "During a nine-month industrial attachment I worked on banking technology for a commercial bank client: a credit-scoring rules API, integrations and business analysis.",
      readingTime: "5 min read",
      role: "Backend developer and digital solutions intern",
      tools: "Java, Spring Boot, Drools, GraphQL, SharePoint, DocuSign, WhatsApp Cloud API, Figma",
      keyMetric: "200+ test cases validated",
      status: "Deployed to a test environment",
      featured: true,
      imageUrl: "",
      fallbackType: "proofTiles",
      confidentialityNote: "Client details are confidential. No client data is shown.",
      problem: "The commercial bank client relied on complex manual spreadsheet decision tables for credit decisions, creating slow approval cycles and inconsistent validation across loan applications.",
      whatIBuilt: "Turned Excel credit-scoring decision tables into Java and Drools REST API rules and validated them with more than 200 test cases (deployed to a test environment). Built SharePoint file management and GraphQL APIs, a DocuSign signing integration and a Python WhatsApp file submission workflow on the Meta WhatsApp Cloud API. Interviewed process owners across 12 bank departments for value stream maps that found 7 duplicated process steps, and created 12 user personas and 6 customer journey maps.",
      data: "Bank business rules, decision logic matrices, departmental operating procedures, and synthetic test suites. No real client data was extracted or stored.",
      approach: "I analyzed spreadsheet logic and converted complex risk matrices into declarative Drools rule files hosted inside a Java Spring Boot REST microservice. For customer onboarding, I integrated GraphQL endpoints with SharePoint repositories, automated e-signatures via DocuSign APIs, and enabled WhatsApp document submissions via Meta Cloud API webhooks. I also conducted structured interviews across 12 departments to map end-to-end value streams.",
      architecture: {
        title: "Integration Architecture",
        description: "Credit rules engine, document workflows, customer channels, and enterprise repositories.",
        nodes: [
          { id: "node-1", label: "Customer Ingestion Channels", sublabel: "Meta WhatsApp Cloud API, Web portal", category: "data" },
          { id: "node-2", label: "Java Spring Boot API", sublabel: "REST & GraphQL orchestration", category: "api" },
          { id: "node-3", label: "Drools Rules Engine", sublabel: "Credit score matrices & risk gates", category: "model" },
          { id: "node-4", label: "DocuSign & SharePoint", sublabel: "Automated e-signature & file store", category: "process" },
          { id: "node-5", label: "Test environment", sublabel: "Rules validated with 200+ test cases", category: "ui" }
        ]
      },
      results: {
        summary: "Validated rule execution with more than 200 automated test cases in the staging environment. Value stream mapping across 12 banking departments uncovered 7 duplicated operational steps.",
        metricName: "Test Cases Validated",
        table: [
          { name: "Drools Credit Rules API", primaryScore: "200+ test cases passed", secondaryScore: "Deployed to a test environment" },
          { name: "Departmental Value Stream Mapping", primaryScore: "12 departments mapped", secondaryScore: "7 duplicated steps found" },
          { name: "User Research Artifacts", primaryScore: "12 user personas", secondaryScore: "6 customer journey maps" }
        ]
      },
      aiToolsUsage: {
        toolsUsed: "I used developer tooling for generating draft DTO mappings between GraphQL schemas and Java POJO objects.",
        verificationMethod: "I checked all generated POJO properties and Drools decision outputs against formal bank test matrices with manual assertion logs."
      },
      lessons: [],
      nextSteps: "Supporting documentation handoff and technical knowledge transfer for bank internal engineering maintainers.",
      links: {
        github: "",
        liveDemo: ""
      },
      gallery: [
        {
          id: "karibu-fig1",
          slotId: "kaributech-fig-1",
          title: "Key Verification Deliverables",
          caption: "Diagram: confirmed figures from the attachment",
          altText: "Banking integration deliverables and verification figures.",
          imageUrl: "",
          fallbackType: "proofTiles"
        }
      ]
    }
  ],

  moreWork: [
    {
      id: "more-1",
      image: ""
    },
    {
      id: "more-2",
      image: ""
    }
  ],

  credentials: [
    {
      id: "cred-1",
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      year: "2024"
    },
    {
      id: "cred-2",
      title: "Preparing Data for Analysis with Microsoft Excel",
      issuer: "Microsoft via Coursera",
      year: "2024"
    },
    {
      id: "cred-3",
      title: "Supervised Machine Learning",
      issuer: "DeepLearning.AI and Stanford",
      year: "2024"
    },
    {
      id: "cred-4",
      title: "Learn SQL and Learn Python 3",
      issuer: "Codecademy",
      year: "2024"
    },
    {
      id: "cred-5",
      title: "Data Analytics and Visualization Job Simulation",
      issuer: "Accenture via Forage",
      year: "2024"
    },
    {
      id: "cred-6",
      title: "Data Protection Officer Training",
      issuer: "Alison",
      year: "2026"
    }
  ],

  badges: [
    {
      title: "Gemini Agent Ready",
      issuer: "Google Developer Program",
      date: "Oct 2026",
      url: "https://g.dev/kuzivakwashejoshuachawatama"
    },
    {
      title: "GDG Events (level 3)",
      issuer: "Google Developer Groups",
      date: "Oct 2026",
      note: "Attended Google Developer Group events",
      url: "https://g.dev/kuzivakwashejoshuachawatama"
    },
    {
      title: "Google Cloud & NVIDIA community member",
      issuer: "Google Cloud and NVIDIA",
      date: "Oct 2026",
      url: "https://g.dev/kuzivakwashejoshuachawatama"
    },
    {
      title: "Google Developer Program premium tier",
      issuer: "Google",
      date: "Oct 2026",
      url: "https://g.dev/kuzivakwashejoshuachawatama"
    }
  ],

  languages: [
    { language: "English", proficiency: "Professional" },
    { language: "Shona", proficiency: "Native" },
    { language: "French", proficiency: "Beginner" }
  ],

  about: {
    paragraphs: [
      "I began my data science training at the University of Zimbabwe, completing a BSc Honours in Data Science and Informatics with Upper Second Class honors. My academic coursework provided a deep mathematical foundation, earning Class 1 results in Applied Statistics, Machine Learning Fundamentals, Deep Learning, Linear Algebra, and Data Structures and Algorithms.",
      "During my nine-month industrial attachment at KaribuTech AI, I turned Excel credit-scoring tables into Java and Drools REST API rules, built SharePoint, GraphQL, DocuSign and WhatsApp integrations, and interviewed process owners across 12 bank departments to map how work actually flowed.",
      "I am now based in Al Wakra, Qatar, available immediately for data science and engineering roles. I focus on building reliable systems, from explainable machine learning models to the production APIs and monitoring dashboards that deliver clear value to decision makers."
    ]
  }
};
