import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NutriSnap",
    description: "Edge AI Food Recognition App. Fully offline Android application that classifies food items and estimates nutritional content using EfficientNet-Lite0.",
    tech: ["Android", "TensorFlow Lite", "EfficientNet-Lite0", "SQLite"],
    category: "AI",
    links: { github: "https://github.com/jivasrohith25" }
  },
  {
    id: 2,
    title: "JERICHO",
    description: "File Based Security system using entropy-based feature extraction. Research paper submitted to Karunya Institute.",
    tech: ["Python", "scikit-learn", "C", "Random Forest"],
    category: "Cybersecurity",
    links: { github: "https://github.com/jivasrohith25" }
  },
  {
    id: 3,
    title: "RAG System",
    description: "Retrieval-Augmented Generation pipeline for document Q&A. Implemented vector embedding, semantic search, and LLM response generation.",
    tech: ["Python", "LangChain", "Vector DB", "LLM"],
    category: "AI",
    links: { github: "https://github.com/jivasrohith25" }
  },
  {
    id: 5,
    title: "Automatic Solar Tracker",
    description: "Embedded system that autonomously rotates a solar panel to track sunlight direction in real time using Embedded C.",
    tech: ["Embedded C", "Servo Motors", "LDR Sensors"],
    category: "IoT",
    links: { github: "https://github.com/jivasrohith25" }
  },
  {
    id: 6,
    title: "Vgamepad",
    description: "Multi-player controller system enabling up to 6 players to use smartphones as game controllers over local WiFi.",
    tech: ["Node.js", "WebSockets", "vgamepad"],
    category: "Web Development",
    links: { github: "https://github.com/jivasrohith25" }
  }
];

export const SKILLS_LIST = [
  "Python", "LangChain", "Machine Learning", "Deep Learning",
  "Git", "Linux", "Devops", "Networking", "Teamwork", "Communication"
];
