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
  location: string;
  availability: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  downloadCvUrl: string;
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
  title: string;
  caption: string;
  altText: string;
  imageUrl?: string;
}

export interface ProjectResults {
  summary: string;
  metricName?: string;
  metricDirection?: 'lower-is-better' | 'higher-is-better';
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
  title: string;
  tags: string[];
  summary: string;
  keyMetric: string;
  status: string;
  featured: boolean;
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
  links: {
    github: string;
    liveDemo: string;
  };
  gallery: GalleryItem[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  verifyUrl: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface AboutContent {
  paragraphs: string[];
}

export interface PortfolioContent {
  profile: Profile;
  navLinks: NavLink[];
  skills: SkillCategory[];
  education: EducationItem;
  timeline: TimelineEntry[];
  projects: Project[];
  credentials: Certificate[];
  languages: LanguageItem[];
  about: AboutContent;
}

export const content: PortfolioContent = {
  profile: {
    fullName: "Kuzivakwashe Joshua Chawatama",
    identityLine: "Data scientist who builds and ships.",
    pitch: "I turn data into working products, from explainable machine learning to the APIs and dashboards that put it in front of people. Data Science and Informatics graduate, University of Zimbabwe, with nine months building banking systems at KaribuTech AI.",
    location: "Al Wakra, Qatar",
    availability: "Available immediately.",
    email: "kuzivakwashechawatama@gmail.com",
    phone: "+974 6652 7520",
    linkedin: "https://www.linkedin.com/in/kuzivakwashej",
    github: "https://github.com/KCHAWATAMA",
    downloadCvUrl: "#contact",
    photoAlt: "Portrait of Kuzivakwashe Joshua Chawatama, Data Scientist and Engineer",
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
      title: "AeroTwin: explainable predictive maintenance for aircraft engines",
      tags: ["Machine Learning", "Explainable AI", "Full Stack"],
      summary: "Predicts the remaining useful life of turbofan engines from NASA C-MAPSS sensor data and explains each prediction, inside a digital twin dashboard.",
      keyMetric: "RMSE 14.00 (R² 0.878)",
      status: "In progress (deployment)",
      featured: true,
      problem: "Unplanned engine maintenance is costly and disruptive. Planners need predictions they can trust and understand.",
      whatIBuilt: "An LSTM model blended with XGBoost, served by a FastAPI backend with SHAP, LIME and counterfactual explanations and Monte Carlo uncertainty, and a Next.js dashboard with CSV import and a 3D engine view.",
      data: "NASA C-MAPSS FD001 (public). 30-cycle windows, 17 input features, remaining life capped at 125 cycles, engine-wise splits.",
      approach: "I processed multi-sensor time series data into rolling 30-cycle sequences. I combined an LSTM recurrent network with XGBoost gradient boosting to balance temporal sequence dynamics and tabular split precision. For model trust, the backend serves SHAP attribution values, LIME local surrogates, counterfactual scenarios, and Monte Carlo dropout estimates for confidence bounds.",
      architecture: {
        title: "System Pipeline",
        description: "Sensor ingestion, hybrid model inference, explainability engines, and user dashboard.",
        nodes: [
          { id: "node-1", label: "NASA C-MAPSS FD001", sublabel: "17 sensor streams, 30-cycle windows", category: "data" },
          { id: "node-2", label: "Preprocessing & Scaling", sublabel: "MinMax scaling, RUL cap at 125", category: "process" },
          { id: "node-3", label: "Hybrid LSTM + XGBoost", sublabel: "Sequential dynamics + tree boosting", category: "model" },
          { id: "node-4", label: "FastAPI Inference & XAI", sublabel: "SHAP, LIME, counterfactuals, uncertainty", category: "api" },
          { id: "node-5", label: "Next.js Digital Twin", sublabel: "CSV upload, explanations, 3D view", category: "ui" }
        ]
      },
      results: {
        summary: "Official test set RMSE evaluation on NASA C-MAPSS FD001. Lower RMSE indicates superior remaining useful life prediction accuracy. The hybrid model achieved the lowest test RMSE of 14.00 and an R squared score of 0.878.",
        metricName: "Test RMSE (Lower is better)",
        metricDirection: "lower-is-better",
        chart: {
          title: "NASA C-MAPSS FD001 Test Set RMSE Comparison",
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
        verificationMethod: "I verified all machine learning math, model loss curves, cross-validation splits, and SHAP mathematical outputs by running local unit tests, inspecting tensor dimensions, and comparing predictions against manual baseline calculations."
      },
      links: {
        github: "https://github.com/KCHAWATAMA/aircraft-engine-predictive-maintenance",
        liveDemo: "[ADD LINK]"
      },
      gallery: [
        {
          id: "aerotwin-fig1",
          title: "Digital Twin Engine Dashboard",
          caption: "Figure 1. Digital twin interface showing remaining useful life estimates, confidence interval, and sensor telemetry feed.",
          altText: "Digital twin dashboard with turbofan sensor indicators and remaining useful life gauge."
        },
        {
          id: "aerotwin-fig2",
          title: "SHAP and Counterfactual Explanation Panel",
          caption: "Figure 2. Feature attribution waterfall chart detailing which sensor anomalies drove the predicted maintenance deadline.",
          altText: "SHAP explanation plot highlighting sensor contributions to engine degradation score."
        }
      ]
    },
    {
      id: "sensorstream",
      slug: "sensorstream",
      title: "SensorStream Analytics",
      tags: ["Data Engineering", "IoT Simulation", "Dashboards"],
      summary: "A local prototype that replays the UCI household electricity dataset through simulated Modbus and MQTT, processes it in Python, and shows it on a JavaScript monitoring dashboard and in Power BI reports.",
      keyMetric: "[ADD]",
      status: "Completed Prototype",
      featured: true,
      simulationLabel: "Simulation using public data",
      problem: "Industrial IoT teams require lightweight ways to test telemetry pipelines and power consumption monitors before hardware is connected in the field.",
      whatIBuilt: "A local data engineering pipeline simulating industrial sensor networks using Modbus and MQTT protocols, Python stream transformation workers, an interactive JavaScript dashboard, and synchronized Power BI analytical reports.",
      data: "UCI Individual Household Electric Power Consumption dataset (public domain). Millions of sub-metered power measurements replayed at configured time multipliers.",
      approach: "I constructed asynchronous protocol emulators for Modbus and MQTT broker streams. Python subscriber workers aggregate power spikes, handle missing packet simulation, and push structured records into local storage and dashboard feeds.",
      architecture: {
        title: "Simulation Pipeline",
        description: "UCI record replay, protocol publisher, Python ingestion, and multi-surface dashboards.",
        nodes: [
          { id: "node-1", label: "UCI Electricity Dataset", sublabel: "Sub-metering public series", category: "data" },
          { id: "node-2", label: "Simulated Modbus & MQTT", sublabel: "Asynchronous protocol broker", category: "process" },
          { id: "node-3", label: "Python Stream Worker", sublabel: "Aggregation & anomaly thresholding", category: "model" },
          { id: "node-4", label: "Local API & Storage", sublabel: "Normalized time buckets", category: "api" },
          { id: "node-5", label: "JS Dashboard & Power BI", sublabel: "Live view + executive reports", category: "ui" }
        ]
      },
      results: {
        summary: "[ADD] Performance metrics, latency evaluations, and streaming throughput details will be added as benchmarks finalize.",
        metricName: "Streaming Throughput",
        metricDirection: "higher-is-better"
      },
      aiToolsUsage: {
        toolsUsed: "I used language models to review protocol packet framing structures and explore syntax variations for MQTT Python clients.",
        verificationMethod: "I verified payload validity and broker handshakes with local Wireshark packet captures and dedicated pytest validation suites."
      },
      links: {
        github: "[ADD]",
        liveDemo: "[ADD]"
      },
      gallery: [
        {
          id: "sensorstream-fig1",
          title: "Real-time Telemetry Monitor",
          caption: "Figure 1. JavaScript monitoring interface rendering simulated voltage, active power, and sub-metering streams.",
          altText: "Real-time sensor telemetry dashboard with live line charts and status indicators."
        },
        {
          id: "sensorstream-fig2",
          title: "Power BI Executive Analysis",
          caption: "Figure 2. Power BI analytical view showing peak consumption periods and load distribution summaries.",
          altText: "Power BI report with power breakdown charts and demand metrics."
        }
      ]
    },
    {
      id: "kaributech-banking",
      slug: "kaributech-banking",
      title: "Banking systems at KaribuTech AI (work case study)",
      tags: ["Backend", "Banking", "Business Analysis", "Testing"],
      summary: "During a nine-month industrial attachment I worked on banking technology for a commercial bank client: a credit-scoring rules API, integrations and business analysis.",
      keyMetric: "200+ test cases validated",
      status: "Production deployment (client)",
      featured: true,
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
          { id: "node-5", label: "Bank Core Systems", sublabel: "Secure test environment verification", category: "ui" }
        ]
      },
      results: {
        summary: "Validated rule execution with more than 200 automated test cases in the staging environment. Value stream mapping across 12 banking departments uncovered 7 duplicated operational steps, informing executive process improvements.",
        metricName: "Test Cases Validated",
        table: [
          { name: "Drools Credit Rules API", primaryScore: "200+ test cases passed", secondaryScore: "100% logic parity with Excel" },
          { name: "Departmental Value Stream Mapping", primaryScore: "12 departments mapped", secondaryScore: "7 duplicate steps eliminated" },
          { name: "User Research Artifacts", primaryScore: "12 user personas", secondaryScore: "6 customer journey maps" }
        ]
      },
      aiToolsUsage: {
        toolsUsed: "I used developer tooling for generating draft DTO mappings between GraphQL schemas and Java POJO objects.",
        verificationMethod: "I checked all generated POJO properties and Drools decision outputs against formal bank test matrices with manual assertion logs."
      },
      links: {
        github: "[ADD]",
        liveDemo: "[ADD]"
      },
      gallery: [
        {
          id: "karibu-fig1",
          title: "Value Stream Map Diagram (Conceptual)",
          caption: "Figure 1. Architectural blueprint of credit decision automation and document submission handoffs.",
          altText: "Process flow diagram showing customer document ingestion, automated rule scoring, and e-signature execution."
        }
      ]
    }
  ],

  credentials: [
    {
      id: "cred-1",
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      year: "2024",
      verifyUrl: "[ADD LINK]"
    },
    {
      id: "cred-2",
      title: "Preparing Data for Analysis with Microsoft Excel",
      issuer: "Microsoft via Coursera",
      year: "2024",
      verifyUrl: "[ADD LINK]"
    },
    {
      id: "cred-3",
      title: "Supervised Machine Learning",
      issuer: "DeepLearning.AI and Stanford",
      year: "2024",
      verifyUrl: "[ADD LINK]"
    },
    {
      id: "cred-4",
      title: "Learn SQL and Learn Python 3",
      issuer: "Codecademy",
      year: "2024",
      verifyUrl: "[ADD LINK]"
    },
    {
      id: "cred-5",
      title: "Data Analytics and Visualization Job Simulation",
      issuer: "Accenture via Forage",
      year: "2024",
      verifyUrl: "[ADD LINK]"
    },
    {
      id: "cred-6",
      title: "Data Protection Officer Training",
      issuer: "Alison",
      year: "2026",
      verifyUrl: "[ADD LINK]"
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
      "During my nine-month industrial attachment at KaribuTech AI, I took predictive models and credit rules from design to deployment. I converted complex Excel credit scoring tables into automated Java and Drools rules, built secure APIs for document management, and worked with twelve commercial banking departments to streamline operations.",
      "I am now based in Al Wakra, Qatar, available immediately for data science and engineering roles. I focus on building reliable systems, from explainable machine learning models to the production APIs and monitoring dashboards that deliver clear value to decision makers."
    ]
  }
};
