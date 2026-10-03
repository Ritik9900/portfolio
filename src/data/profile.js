// Single source of truth for identity, links and headline content.
// Plain ES module (no Vite-specific imports) so build scripts can read it too.
// Experience, skills, education and certifications mirror the current resume
// (public/documents/Ritik_Ranjan.pdf) — update both together.

import { competitions, topTenCount } from './kaggle.js'

export const profile = {
  name: 'Ritik Ranjan',
  role: 'GenAI Engineer',
  employer: 'Ascendion',
  school: 'IIT Madras',
  location: 'Mumbai, India',
  headline: 'I build production RAG systems and the observability that keeps them honest.',
  summary:
    'GenAI Engineer at Ascendion with a BS in Data Science from IIT Madras. I build multimodal RAG pipelines ' +
    'and an AI voice platform that tests IVR systems over real phone calls — and I bring a data scientist’s ' +
    'toolkit to that work: exploratory analysis, feature engineering, statistical validation and classical ML, ' +
    `sharpened across ${competitions.length} ranked Kaggle competitions, ${topTenCount()} of them in the top 10%.`,
  email: 'ritikranjan1212@gmail.com',
  resume: 'documents/Ritik_Ranjan.pdf',
  avatar: 'images/avatar.jpg',
  links: {
    github: 'https://github.com/Ritik9900',
    linkedin: 'https://www.linkedin.com/in/ritik-ranjan9900/',
    kaggle: 'https://www.kaggle.com/ritik9929'
  },
  // Headline proof points. Each links to the section that substantiates it.
  metrics: [
    { value: '68% → 91%', label: 'Retrieval precision: hybrid search + reranking vs semantic-only', href: '/projects/multimodal-rag-pipeline' },
    { value: '$0.13', label: 'Per 3-minute AI-driven IVR test call, scored by an LLM judge', href: '/projects/ivr-validation-platform' },
    { value: `${topTenCount()} of ${competitions.length}`, label: 'Kaggle competitions finished in the top 10%', href: '/#kaggle' }
  ]
}

export const experience = [
  {
    role: 'GenAI Engineer',
    company: 'Ascendion',
    location: 'Hyderabad, India',
    period: 'Dec 2025 — Present',
    projects: [
      {
        name: 'Multimodal RAG Ingestion & Retrieval Pipeline',
        caseStudy: 'multimodal-rag-pipeline',
        highlights: [
          'Built an end-to-end multimodal RAG pipeline that ingests PDFs, CSVs, DOCX and PPT files, extracting text, images, charts and tables — with a vision language model generating context-rich summaries for 300+ visual elements per document, cached for deduplication.',
          'Implemented a 4-stage hybrid search system combining semantic search with BM25 keyword search, fused via Reciprocal Rank Fusion and refined through cross-encoder reranking — ~91% precision compared to ~68% with semantic-only search.',
          'Engineered a chunking strategy that preserves image-reference integrity, paired with dense embeddings and an inverted BM25 index across all document types for comprehensive multimodal retrieval.'
        ]
      },
      {
        name: 'AI-Powered IVR Validation Platform',
        caseStudy: 'ivr-validation-platform',
        highlights: [
          'Automated end-to-end IVR QA by architecting an AI-powered voice testing platform that runs 50-scenario regression suites against live phone systems for about $6.50 per run.',
          'Engineered a real-time conversational audio bridge in pure NumPy and WebSockets that converts Twilio\'s 8 kHz µ-law streams to PCM16, with strict concurrency guards to orchestrate simultaneous Gemini 3.1 Flash Live sessions safely.',
          'Integrated an Azure OpenAI evaluation pipeline via DeepEval that scores 100% of transcripts on custom quality metrics such as safety and role adherence — LLM-as-a-judge QA at ~$0.13 per 3-minute test call.'
        ]
      }
    ],
    stack: ['LangGraph', 'FastAPI', 'PostgreSQL + pgvector', 'Azure OpenAI', 'Langfuse', 'Twilio', 'Gemini Live', 'DeepEval', 'Docker']
  },
  {
    role: 'AI / ML Engineer',
    company: 'Gmonks',
    location: 'Mumbai, India',
    period: 'Oct 2024 — Nov 2025',
    highlights: [
      'Implemented a computer vision solution using YOLOv8 (0.339 mAP) and deployed it on AWS ECS Fargate, reducing client application size by 80 MB via remote inference.',
      'Engineered a secure FastAPI backend with ephemeral signed URLs and orchestrated the full MLOps lifecycle, serving thousands of daily inference requests.',
      'Automated end-to-end infrastructure provisioning with Terraform: 100% reproducible cloud environments and 95% less setup time.'
    ],
    stack: ['YOLOv8', 'OpenCV', 'FastAPI', 'AWS ECS Fargate', 'Terraform', 'Docker']
  }
]

export const otherProjects = [
  {
    title: 'GenAI integration for the SEEK learning platform',
    role: 'Software Engineering Project · PM / Team Lead · May — Aug 2024',
    summary:
      'Led a 7-member team using Agile across multiple sprints to deliver a working prototype with three ' +
      'AI features: code feedback, interactive content and learner support.'
  },
  {
    title: 'Big data engineering on GCP',
    role: 'PySpark · Spark Streaming · Kafka · Pub/Sub · Jan — Apr 2025',
    summary:
      'Batch pipelines on Google Dataproc with SCD Type II warehousing logic, plus two real-time systems: ' +
      'a serverless Cloud Functions + Pub/Sub pipeline and a Kafka + Spark Streaming pipeline with ' +
      '5-second micro-batches.'
  }
]

export const skills = [
  { area: 'Domains', items: 'Data science, machine learning, deep learning, generative AI, LLMs, NLP, computer vision, MLOps' },
  { area: 'Data science', items: 'pandas, NumPy, SQL, exploratory data analysis, feature engineering, statistics, cross-validation, class-imbalance handling (SMOTE, re-weighting), matplotlib, seaborn' },
  { area: 'Machine learning', items: 'scikit-learn pipelines, XGBoost, LightGBM, CatBoost, linear and kernel models, ensembling' },
  { area: 'Deep learning', items: 'PyTorch, TensorFlow, timm and torchvision (ViT), Ultralytics YOLO, Hugging Face, QLoRA fine-tuning with Unsloth' },
  { area: 'GenAI & retrieval', items: 'LangGraph, LangChain, LlamaIndex, hybrid search (pgvector + BM25 + RRF), cross-encoder reranking, vision language models, Langfuse, DeepEval' },
  { area: 'Backend & real-time', items: 'FastAPI, asyncio, WebSockets, PostgreSQL, Redis, Twilio Media Streams' },
  { area: 'Cloud & data', items: 'AWS, Azure, GCP, Terraform, Docker, PySpark, Kafka' },
  { area: 'Languages', items: 'Python, SQL, Java, JavaScript, Bash' }
]

export const education = {
  degree: 'BS in Data Science & Programming',
  school: 'Indian Institute of Technology Madras',
  period: 'May 2021 — Apr 2025',
  minors: ['Economics & Finance'],
  coursework: 'Data Structures & Algorithms, Math & Stats for Data Science, Machine Learning, Deep Learning, Artificial Intelligence, Cloud Computing Concepts, Distributed Systems, Big Data Analytics',
  activities: 'Volunteer, IIT Madras academic societies (Jul 2022 — present)',
  photo: 'images/iitm-campus.jpg'
}

// `url` opens the credential; null shows the certificate without a link.
export const certifications = [
  {
    name: 'SQL AI Developer Associate',
    issuer: 'Microsoft Certified',
    url: 'https://learn.microsoft.com/api/credentials/share/en-us/RitikRanjan-2755/5F3F19AA5241EE7C?sharingId=48F96758124519CF'
  },
  {
    name: 'Model Context Protocol: Advanced Topics',
    issuer: 'Anthropic',
    url: 'https://verify.skilljar.com/c/dg9m9ohssx79'
  },
  {
    name: 'Supervised Machine Learning',
    issuer: 'Stanford · Coursera',
    // The resume's link for this certificate opens "Emotional Intelligence.pdf"; add the correct one here.
    url: null
  },
  {
    name: 'Data Mining',
    issuer: 'NPTEL · IIT Kharagpur',
    url: 'https://drive.google.com/file/d/1lKqptf_kalcEnRMViG2xvVAvf3RoWJnU/view'
  }
]
