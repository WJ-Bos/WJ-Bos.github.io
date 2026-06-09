// Shared portfolio data for both variations
window.PORTFOLIO = {
  name: "WJ Boshoff",
  role: "Software Engineer",
  location: "Centurion, South Africa",
  startedPro: "Jan 2025",
  email: "wjbosdev@gmail.com",
  phone: "+27 79 873 7177",
  github: "https://github.com/WJ-Bos",
  tagline:
    "Full-stack engineer building enterprise fintech, distributed systems, and AI-augmented mobile apps. Fast learner, team player, pace-pusher.",

  shortAbout:
    "I'm a Software Engineer at IdealSolution in Centurion, working across the JVM ecosystem, .NET, mobile (Kotlin / Flutter) and AWS. I like taking ownership end-to-end — system design, build, ship, observe. Outside work I build things: a music-theory platform, a voice-first productivity app, and a local AWS-style control plane.",

  longAbout: [
    "Started professionally in January 2025. Since then I've shipped financial integrations (Sage, RealPay), built a distributed-tracing stack on ECS with OpenTelemetry + SigNoz, led a migration off AWS Cognito to a custom auth platform with row-level security, and stood up real-time dashboards in QuickSight.",
    "On the side I run boshetto.com — a music-theory learning platform aimed at guitarists — and I've been building voice-first and Bible-study apps in Flutter with Rust + .NET backends.",
    "I care about systems that hold up under load, code that's easy to reason about, and shipping things people actually use.",
  ],

  projects: [
    {
      name: "Boshetto",
      tag: "Music theory, the way it actually works",
      url: "https://boshetto.com",
      urlLabel: "boshetto.com",
      kind: "Web",
      stack: ["TanStack Start", "TypeScript", "PostgreSQL", "Drizzle", "tonal.js", "Tone.js", "AlphaTab"],
      description:
        "Music-theory learning platform for guitarists. Interactive SVG fretboard, structured curriculum with prerequisites, ear-training, spaced-repetition scheduling, runtime audio synthesis via Tone.js, and tab rendering with AlphaTab. PostgreSQL via Drizzle for progress.",
      year: "2026",
    },
    {
      name: "Yap",
      tag: "Voice-first productivity",
      kind: "Mobile",
      stack: ["Flutter", ".NET 10", "ASP.NET Core", "PostgreSQL", "pgvector", "Whisper", "Gemini 2.5"],
      description:
        "Cross-platform mobile app that turns spoken notes into structured actions — tasks, calendar events, reminders, emails, expenses. Whisper for transcription, Gemini 2.5 Flash for extraction + generation, pgvector for semantic recall.",
      year: "2026",
    },
    {
      name: "Local Cloud",
      tag: "RDS-style provisioning on local hardware",
      url: "https://github.com/WJ-Bos/local-cloud",
      urlLabel: "github.com/WJ-Bos/local-cloud",
      kind: "Platform",
      stack: ["Java 21", "Spring Boot", "React", "Terraform", "Docker", "PostgreSQL"],
      description:
        "A self-built platform that mimics AWS RDS-style provisioning on a local box. Provision PostgreSQL, MySQL, MariaDB, Mongo, Redis through a React UI; backend writes Terraform per instance and orchestrates Docker. Live log streaming, version selection, encrypted credentials.",
      year: "2026",
    },
    {
      name: "Koinon",
      tag: "AI-powered Bible study",
      kind: "Mobile",
      stack: ["Flutter", "Rust", "PostgreSQL", "LLM ingestion"],
      description:
        "Cross-platform Bible study app with a Rust-backed service layer. AI ingestion-and-generation pipeline produces curated study plans grounded in the books of the Bible. FCM push, generated cover art, typography system designed for long-form reading.",
      year: "2026",
    },
  ],

  experience: [
    {
      role: "Software Engineer",
      company: "IdealSolution",
      location: "Centurion, Gauteng",
      from: "Jan 2025",
      to: "Present",
      groups: [
        {
          title: "Mobile — World Rugby match tracking",
          bullets: [
            "Production Kotlin Android app used by World Rugby to track live game progression across matches and tournaments.",
            "Built real-time match timers, player time tracking, card management (yellow / red), and per-tournament event logging — for use under live broadcast and officiating conditions.",
          ],
        },
        {
          title: "Financial systems & integrations",
          bullets: [
            "Architected production integrations with Sage (contract sync) and RealPay (payments, onboarding, mandates, debit-order automation).",
            "Built JSON↔XML transformation pipelines for legacy compatibility; eliminated manual processing bottlenecks.",
          ],
        },
        {
          title: "Auth & security",
          bullets: [
            "Led migration from AWS Cognito to a custom auth platform — user management, RBAC, multi-tenant infra.",
            "Designed JWT auth with refresh rotation; implemented row-level security at the DB layer for tenant isolation.",
          ],
        },
        {
          title: "Observability & infra",
          bullets: [
            "Full-stack distributed tracing on ECS with OpenTelemetry + ADOT + SigNoz; cut MTTR for production incidents.",
            "Owned end-to-end AWS ECS deployments — ECR, task definitions, service orchestration, custom VPC.",
            "CI/CD on Jenkins + Azure DevOps; blue-green deploys via CodeDeploy for zero-downtime releases.",
          ],
        },
        {
          title: "AI integration",
          bullets: [
            "Integrated LLMs into Spring Boot services with structured-output contracts, retries, fallbacks, cost/latency monitoring.",
            "Built AI components for document parsing, data extraction, and natural-language querying of business data.",
          ],
        },
        {
          title: "BI & analytics",
          bullets: [
            "Built financial dashboards from scratch in AWS QuickSight; real-time insight into business metrics.",
            "Data-integrity microservice on Spring Boot with dynamic IoC config; automated validation across services.",
          ],
        },
      ],
    },
  ],

  education: [
    {
      school: "CTU Training Solutions",
      qualification: "Certificate of Higher Education — Software Development",
      location: "Potchefstroom",
      from: "Jan 2023",
      to: "Nov 2024",
      note: "Graduated May 2025. Software architecture, database design, full-stack, cloud, CI/CD.",
    },
    {
      school: "CTU Training Solutions",
      qualification: "Certificate of Higher Education — Networking",
      location: "Potchefstroom",
      from: "Jan 2022",
      to: "Nov 2022",
      note: "Network architecture, security protocols, infrastructure design, sysadmin.",
    },
  ],

  stack: {
    Languages: ["Java", "C#", "Kotlin", "TypeScript", "Dart", "Go"],
    Frameworks: ["Spring Boot", ".NET / ASP.NET Core", "Angular", "React", "Flutter"],
    Cloud: ["AWS (ECS, Fargate, ECR, VPC, IAM, QuickSight)", "Azure DevOps", "Docker", "Terraform"],
    Data: ["PostgreSQL", "MySQL", "Oracle", "pgvector", "ActiveMQ"],
    Observability: ["OpenTelemetry", "ADOT", "SigNoz", "CloudWatch", "Structured logging"],
    Security: ["JWT", "OAuth 2.0", "RBAC", "Multi-tenant", "Row-level security"],
    AI: ["LLM API integration", "Prompt engineering", "Structured outputs", "RAG patterns"],
    Mobile: ["Kotlin (Android)", "Flutter", "Material Design", "FCM", "Offline-first"],
  },

  languages: [
    { name: "Afrikaans", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
};
