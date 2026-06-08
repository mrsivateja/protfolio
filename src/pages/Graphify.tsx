import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code,
  Database,
  Cpu,
  Layers,
  Activity,
  Flame,
  Coffee,
  Clock,
  Sparkles,
  TrendingUp,
  Terminal,
  Languages,
  Smartphone,
  Video,
  Info
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Nodes structure
interface Node {
  id: string;
  label: string;
  type: "project" | "skill";
  x: number;
  y: number;
  category?: string;
  level?: number;
  icon: React.ComponentType<any>;
  desc: string;
  details: string;
  link?: string;
  git?: string;
  stats?: Record<string, string>;
}

interface LinkEdge {
  source: string;
  target: string;
}

const NODES_DATA: Node[] = [
  // Projects
  {
    id: "p-vitalme",
    label: "Vital Me",
    type: "project",
    x: 180,
    y: 100,
    icon: Activity,
    desc: "Personal fitness tracker connected with wearable integrations.",
    details: "A full-stack health application showcasing end-to-end data pipelines. Integrates Google Fit API to sync steps and activities, sleep analytics, a custom AI chatbot for personalized health guidance, and computer vision (YOLO/Mediapipe) for automatic pushup counting.",
    link: "https://vitalme.vercel.app",
    git: "https://github.com/mrsivateja/VitalMe",
    stats: {
      "Lines of Code": "12k+",
      "Deploy State": "Production",
      "API Integrations": "Google Fit, Gemini AI",
      "Complexity": "High"
    }
  },
  {
    id: "p-college360",
    label: "College360 ERP",
    type: "project",
    x: 180,
    y: 200,
    icon: Layers,
    desc: "AI-Powered University ERP with geofenced attendance.",
    details: "An enterprise-grade university solution. Designed with secure Role-Based Access Control (RBAC), automatic student ID card generation, academic resource sharing hub, and a live campus assistant powered by Gemini. Features a sophisticated geofencing mechanism for verifying physical classroom attendance.",
    git: "https://github.com/sandeep2409-gitch/college360",
    stats: {
      "Role": "Full Stack Dev",
      "Database": "SQLite3 / Node.js",
      "Framework": "React / Tailwind",
      "Features": "Geofencing, AI Helper"
    }
  },
  {
    id: "p-farmdirect",
    label: "Farm Direct",
    type: "project",
    x: 180,
    y: 300,
    icon: TrendingUp,
    desc: "D2C Agriculture platform with crop grading.",
    details: "A cutting-edge Next.js 15 and React 19 application focusing on empowering farmers. Features crop classification and grading using computer vision, voice-enabled assistant controls, KisanGPT powered by NVIDIA NIM, and secure locally-synchronized SQLite storage.",
    link: "https://tejafarmdirect.vercel.app",
    git: "https://github.com/sivatejajetti/FarmDirect",
    stats: {
      "Stack": "Next.js 15, React 19",
      "AI Tech": "YOLO11, NVIDIA NIM",
      "Status": "Deployed",
      "Interaction": "Voice Commands"
    }
  },
  {
    id: "p-portfolio",
    label: "Portfolio Site",
    type: "project",
    x: 180,
    y: 400,
    icon: Code,
    desc: "This portfolio showcasing work & live visualizations.",
    details: "Designed from scratch to showcase engineering projects, education, and technical experience. Leverages modern Tailwind layouts, Framer Motion for micro-animations, React Router for seamless navigation, and interactive Recharts data panels.",
    link: "https://tejajetti.vercel.app",
    git: "https://github.com/sivatejajetti/protfolio",
    stats: {
      "Performance": "100/100 Lighthouse",
      "Styling": "Tailwind CSS",
      "Libraries": "Framer Motion, Recharts",
      "Responsive": "Yes"
    }
  },

  // Skills
  {
    id: "s-react",
    label: "React / Next.js",
    type: "skill",
    x: 520,
    y: 70,
    category: "Frontend",
    level: 85,
    icon: Code,
    desc: "Component architectures, modern hooks, Next.js App Router, SSR, custom state management.",
    details: "Experienced in constructing reactive, dynamic single-page applications and server-rendered sites. Proficient in managing complex UI state, standard custom hooks, and Tailwind CSS layouts."
  },
  {
    id: "s-nodejs",
    label: "Node.js & Express",
    type: "skill",
    x: 520,
    y: 140,
    category: "Backend",
    level: 80,
    icon: Terminal,
    desc: "Scalable REST APIs, MVC structure, routing, middleware orchestration, and authentication.",
    details: "Proficient in developing server architectures using Express, managing CORS, database integrations, OAuth flow, and token-based session handlers."
  },
  {
    id: "s-db",
    label: "SQL & Databases",
    type: "skill",
    x: 520,
    y: 210,
    category: "Backend",
    level: 75,
    icon: Database,
    desc: "Database structures, normalization, transaction safety, SQLite3, and MongoDB.",
    details: "Experienced in querying relational databases, indexing, handling complex JOINs, writing structured SQL queries, and utilizing ODM wrappers like Mongoose for MongoDB."
  },
  {
    id: "s-ai",
    label: "Gemini / YOLO AI",
    type: "skill",
    x: 520,
    y: 280,
    category: "Artificial Intelligence",
    level: 70,
    icon: Cpu,
    desc: "Large Language Model integration, vision models, prompt crafting, and computer vision deployment.",
    details: "Experienced in integrating Gemini API for smart chatbots, deploying YOLO models for real-time edge object detection, and orchestrating models via NVIDIA NIM."
  },
  {
    id: "s-java",
    label: "Java & Android",
    type: "skill",
    x: 520,
    y: 350,
    category: "Systems / Mobile",
    level: 65,
    icon: Smartphone,
    desc: "OOP paradigms, Android Studio, Gradle dependencies, and basic Java systems.",
    details: "Familiar with designing native Android applications, handling activity lifecycles, user permissions, view bindings, and SQLite storage databases."
  },
  {
    id: "s-video",
    label: "Video & Motion",
    type: "skill",
    x: 520,
    y: 420,
    category: "Creative",
    level: 80,
    icon: Video,
    desc: "Visual storytelling, video editing, motion graphics, audio syncing.",
    details: "Passionate videographer and editor. Well-versed in video editing suites, keyframe animations, audio post-production, and creating developer showcase videos."
  }
];

const LINKS_DATA: LinkEdge[] = [
  // Vital Me -> React, Node.js, DB
  { source: "p-vitalme", target: "s-react" },
  { source: "p-vitalme", target: "s-nodejs" },
  { source: "p-vitalme", target: "s-db" },

  // College360 -> React, Node.js, DB, AI
  { source: "p-college360", target: "s-react" },
  { source: "p-college360", target: "s-nodejs" },
  { source: "p-college360", target: "s-db" },
  { source: "p-college360", target: "s-ai" },

  // Farm Direct -> React, DB, AI
  { source: "p-farmdirect", target: "s-react" },
  { source: "p-farmdirect", target: "s-db" },
  { source: "p-farmdirect", target: "s-ai" },

  // Portfolio -> React
  { source: "p-portfolio", target: "s-react" }
];

// Recharts: Weekly Productivity data
const WEEKLY_FLOW_DATA = [
  { day: "Mon", coding: 4.5, design: 1.0, learning: 2.0 },
  { day: "Tue", coding: 5.5, design: 0.5, learning: 1.5 },
  { day: "Wed", coding: 3.5, design: 1.5, learning: 3.0 },
  { day: "Thu", coding: 6.0, design: 1.0, learning: 2.0 },
  { day: "Fri", coding: 7.0, design: 0.8, learning: 1.2 },
  { day: "Sat", coding: 2.5, design: 3.0, learning: 4.0 },
  { day: "Sun", coding: 3.0, design: 2.0, learning: 3.5 }
];

// Recharts: Tech distribution data
const TECH_PIE_DATA = [
  { name: "React / Next.js", value: 35, color: "#2dd4bf" },
  { name: "Node.js / APIs", value: 20, color: "#a855f7" },
  { name: "AI / YOLO / ML", value: 20, color: "#ec4899" },
  { name: "Java & C Languages", value: 15, color: "#eab308" },
  { name: "Databases & SQL", value: 10, color: "#3b82f6" }
];

const Graphify: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node>(NODES_DATA[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [activeTab, setActiveTab] = useState<"projects" | "skills">("projects");
  const [heatmapType, setHeatmapType] = useState<"commits" | "hours">("commits");

  // GitHub live state variables
  const [githubRepos, setGithubRepos] = useState<number>(8);
  const [githubCommits, setGithubCommits] = useState<string>("840+");
  const [realCommitsMap, setRealCommitsMap] = useState<Record<string, number>>({});
  const [liveDataLoaded, setLiveDataLoaded] = useState<boolean>(false);

  // Fetch GitHub live data on mount
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch profile info for real repo count
        const profileRes = await fetch("https://api.github.com/users/sivatejajetti");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.public_repos !== undefined) {
            setGithubRepos(profileData.public_repos);
          }
        }

        // Fetch events to get actual commit frequency (last ~90 days)
        const eventsRes = await fetch("https://api.github.com/users/sivatejajetti/events");
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          const commitsMap: Record<string, number> = {};
          
          eventsData.forEach((event: any) => {
            if (event.type === "PushEvent" && event.created_at) {
              const date = new Date(event.created_at);
              const dateString = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });
              const commitCount = event.payload.commits ? event.payload.commits.length : 0;
              commitsMap[dateString] = (commitsMap[dateString] || 0) + commitCount;
            }
          });
          
          setRealCommitsMap(commitsMap);
          setLiveDataLoaded(true);
        }

        // Fetch commit count search as estimation
        const searchRes = await fetch("https://api.github.com/search/commits?q=author:sivatejajetti");
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (searchData.total_count !== undefined) {
            setGithubCommits(searchData.total_count.toString());
          }
        }
      } catch (error) {
        console.warn("GitHub API fetch limit or connection issue. Defaulting to simulations.", error);
      }
    };

    fetchGitHubData();
  }, []);

  // Animate the network nodes floating effect
  useEffect(() => {
    let animationFrameId: number;
    const updatePhysics = () => {
      setTime(prev => prev + 0.03);
      animationFrameId = requestAnimationFrame(updatePhysics);
    };
    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Compute node coordinates with float displacement
  const animatedNodes = useMemo(() => {
    return NODES_DATA.map(node => {
      // Gentle floating offset
      const dy = Math.sin(time + node.y * 0.05) * 5;
      const dx = Math.cos(time + node.x * 0.05) * 3;
      return {
        ...node,
        x: node.x + dx,
        y: node.y + dy
      };
    });
  }, [time]);

  // Compute edges between animated nodes
  const animatedLinks = useMemo(() => {
    return LINKS_DATA.map(link => {
      const sourceNode = animatedNodes.find(n => n.id === link.source);
      const targetNode = animatedNodes.find(n => n.id === link.target);
      return {
        sourceId: link.source,
        targetId: link.target,
        x1: sourceNode ? sourceNode.x : 0,
        y1: sourceNode ? sourceNode.y : 0,
        x2: targetNode ? targetNode.x : 0,
        y2: targetNode ? targetNode.y : 0
      };
    });
  }, [animatedNodes]);

  // Check if a node is connected to the hovered node
  const isNodeConnected = (nodeId: string) => {
    if (!hoveredNodeId) return true;
    if (nodeId === hoveredNodeId) return true;

    return LINKS_DATA.some(link => {
      return (
        (link.source === hoveredNodeId && link.target === nodeId) ||
        (link.target === hoveredNodeId && link.source === nodeId)
      );
    });
  };

  // Check if an edge is active (connected to hovered node)
  const isEdgeActive = (sourceId: string, targetId: string) => {
    if (!hoveredNodeId) return true;
    return sourceId === hoveredNodeId || targetId === hoveredNodeId;
  };

  // Generate GitHub-like contribution heatmap grid (26 columns x 7 rows)
  const contributionGrid = useMemo(() => {
    const seed = heatmapType === "commits" ? 7 : 4;
    const grid: { commits: number; date: string; level: number }[] = [];
    
    // GitHub API event history limit cutoff (approx. 90 days ago)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);

    // Simulate last 182 days
    for (let i = 0; i < 182; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (182 - i));
      const dateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      let commits = 0;
      if (liveDataLoaded && date >= cutoffDate) {
        // Within live fetching window, use real parsed GitHub commits count
        commits = realCommitsMap[dateString] || 0;
      } else {
        // Outside live fetching window (90+ days), use deterministic simulated data
        const hash = Math.sin(i * 12.3) * Math.cos(i * 7.9);
        if (hash > 0.6) commits = Math.floor(Math.abs(hash) * seed) + 1;
        else if (hash > 0.2) commits = Math.floor(Math.abs(hash) * 3);
      }
      
      let level = 0;
      if (commits > 0) {
        if (commits <= 2) level = 1;
        else if (commits <= 4) level = 2;
        else if (commits <= 6) level = 3;
        else level = 4;
      }

      grid.push({ commits, date: dateString, level });
    }
    return grid;
  }, [heatmapType, liveDataLoaded, realCommitsMap]);

  // Handle graph node click
  const handleNodeClick = (nodeId: string) => {
    const node = NODES_DATA.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative py-12 px-6 md:px-12 overflow-x-hidden">
      {/* Dynamic glow overlays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-8">
          <div className="space-y-2">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group code-font mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              &lt; Back to Home /&gt;
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              TJ / <span className="gradient-text">Graphify</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Interactive relationship network and telemetry stats.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/sivatejajetti"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-secondary/40 hover-glow cursor-pointer transition-colors"
            >
              <Github className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">GitHub Profile</span>
            </a>
            <div className="glass-card px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-default border border-primary/20">
              <Sparkles className={`w-4 h-4 text-primary ${liveDataLoaded ? "animate-pulse" : "animate-spin"}`} />
              <span className="text-sm font-semibold text-primary">
                {liveDataLoaded ? "Live GitHub Connection" : "Connecting Live Data..."}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "GitHub Commits", value: githubCommits, desc: liveDataLoaded ? "Real commits from profile search" : "Simulated developer index", icon: Flame, color: "text-orange-500" },
            { label: "Development Hours", value: "650+ hrs", desc: "Building & prototyping", icon: Clock, color: "text-teal-400" },
            { label: "Coffee Consumed", value: "180+ Cups", desc: "Fueling the code", icon: Coffee, color: "text-purple-400" },
            { label: "Active Repositories", value: githubRepos.toString(), desc: liveDataLoaded ? "Fetched live count of repositories" : "Showcasing version history", icon: Code, color: "text-blue-400" }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl hover-glow group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-3xl pointer-events-none" />
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-muted-foreground font-medium code-font">{stat.label}</span>
                <stat.icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight mb-1">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Network Section */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* SVG Network Canvas */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 hover-glow relative flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="code-font text-primary font-bold">&lt;relation-graph /&gt;</span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">Float-Physics</span>
              </div>
              <div className="text-xs text-muted-foreground flex gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500 block"></span> Project Node</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 block"></span> Skill Node</span>
              </div>
            </div>

            {/* Interactive Graph Box */}
            <div className="relative flex-1 bg-background/30 rounded-xl overflow-hidden border border-border/40 min-h-[400px]">
              <svg className="w-full h-full absolute inset-0 select-none" viewBox="0 0 700 500" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Glowing line gradients */}
                  <linearGradient id="edge-gradient-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="edge-gradient-default" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Draw connection curves */}
                {animatedLinks.map((link, idx) => {
                  const active = isEdgeActive(link.sourceId, link.targetId);
                  const isHoveringAny = hoveredNodeId !== null;

                  return (
                    <path
                      key={`${link.sourceId}-${link.targetId}-${idx}`}
                      d={`M ${link.x1} ${link.y1} C ${(link.x1 + link.x2) / 2} ${link.y1}, ${(link.x1 + link.x2) / 2} ${link.y2}, ${link.x2} ${link.y2}`}
                      fill="none"
                      stroke={active && isHoveringAny ? "url(#edge-gradient-hover)" : "url(#edge-gradient-default)"}
                      strokeWidth={active && isHoveringAny ? 2.5 : 1}
                      className="transition-all duration-300"
                      strokeDasharray={active ? "none" : "3,3"}
                    />
                  );
                })}

                {/* Draw nodes */}
                {animatedNodes.map(node => {
                  const active = isNodeConnected(node.id);
                  const isHovered = hoveredNodeId === node.id;
                  const isSelected = selectedNode.id === node.id;
                  const nodeColor = node.type === "project" ? "stroke-teal-400" : "stroke-purple-400";
                  const nodeFill = node.type === "project" ? "bg-teal-950/80" : "bg-purple-950/80";
                  
                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onClick={() => handleNodeClick(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      opacity={active ? 1 : 0.25}
                    >
                      {/* Glow outline on selection */}
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={24}
                          className="fill-none stroke-primary/30 stroke-[3px] animate-ping"
                        />
                      )}

                      {/* External ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? 20 : 16}
                        className={`fill-background stroke-[2px] ${nodeColor} transition-all duration-300`}
                        style={{
                          filter: isHovered || isSelected ? "drop-shadow(0 0 8px currentColor)" : "none"
                        }}
                      />

                      {/* Internal colored point */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={8}
                        className={node.type === "project" ? "fill-teal-400" : "fill-purple-400"}
                      />

                      {/* Hover text label */}
                      <text
                        x={node.x}
                        y={node.y - (isHovered ? 26 : 22)}
                        textAnchor="middle"
                        className={`text-[11px] code-font select-none ${
                          isSelected ? "fill-primary font-bold" : "fill-muted-foreground"
                        }`}
                        style={{
                          textShadow: isHovered ? "0 0 6px rgba(45, 212, 191, 0.4)" : "none"
                        }}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Float help prompt */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 justify-center bg-black/40 backdrop-blur-sm border border-border/30 rounded-xl px-4 py-2 text-xs text-muted-foreground pointer-events-none">
                <Info className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Hover nodes to trace relationships. Click on any node to view stats and files.</span>
              </div>
            </div>
          </div>

          {/* Node Details Box */}
          <div className="glass-card rounded-2xl p-6 hover-glow flex flex-col justify-between border border-border/40">
            <div>
              <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
                <span className="code-font text-accent font-bold">&lt;node-details /&gt;</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  selectedNode.type === "project" ? "bg-teal-950 text-teal-300" : "bg-purple-950 text-purple-300"
                }`}>
                  {selectedNode.type}
                </span>
              </div>

              {/* Node Title Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-xl border ${
                    selectedNode.type === "project"
                      ? "bg-teal-950/20 border-teal-500/30 text-teal-400"
                      : "bg-purple-950/20 border-purple-500/30 text-purple-400"
                  }`}>
                    <selectedNode.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{selectedNode.label}</h2>
                    {selectedNode.category && (
                      <p className="text-xs text-muted-foreground mt-0.5 code-font">{selectedNode.category} / Technology</p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedNode.desc}
                </p>

                <div className="bg-secondary/40 border border-border/30 rounded-xl p-4 space-y-3">
                  <p className="text-xs text-foreground/80 leading-relaxed italic">
                    "{selectedNode.details}"
                  </p>
                </div>

                {/* Conditional metrics details */}
                {selectedNode.type === "skill" && selectedNode.level && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold code-font">
                      <span>Proficiency</span>
                      <span className="text-accent">{selectedNode.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedNode.level}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                )}

                {selectedNode.type === "project" && selectedNode.stats && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {Object.entries(selectedNode.stats).map(([k, v]) => (
                      <div key={k} className="bg-secondary/30 border border-border/20 rounded-lg p-2.5 text-center">
                        <span className="block text-[10px] text-muted-foreground uppercase code-font mb-0.5">{k}</span>
                        <span className="text-xs font-bold text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Project Buttons */}
            {selectedNode.type === "project" && (
              <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-border/40">
                {selectedNode.git && (
                  <a
                    href={selectedNode.git}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card flex items-center justify-center gap-2 py-2 rounded-xl text-xs hover:bg-secondary/40 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedNode.link ? (
                  <a
                    href={selectedNode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <div className="bg-secondary/40 text-muted-foreground flex items-center justify-center gap-2 py-2 rounded-xl text-xs cursor-not-allowed">
                    <span>Local Project</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Git Contributions mock section */}
        <div className="glass-card rounded-2xl p-6 hover-glow border border-border/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-4 mb-6 gap-4">
            <div className="space-y-1">
              <span className="code-font text-primary font-bold">&lt;contributions-matrix /&gt;</span>
              <p className="text-xs text-muted-foreground">Git commit simulation showing activity telemetry over the past 26 weeks.</p>
            </div>
            
            <div className="flex bg-secondary/50 rounded-lg p-1 border border-border/50 self-start md:self-auto">
              <button
                onClick={() => setHeatmapType("commits")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  heatmapType === "commits" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Commits
              </button>
              <button
                onClick={() => setHeatmapType("hours")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  heatmapType === "hours" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Coding Hours
              </button>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex flex-col gap-[3px] min-w-[720px] max-w-full">
              {/* Row mapping: Sunday (top) to Saturday (bottom) */}
              {Array.from({ length: 7 }).map((_, rIndex) => (
                <div key={rIndex} className="flex gap-[3px]">
                  {/* Label for days */}
                  <div className="w-8 text-[9px] text-muted-foreground code-font flex items-center justify-start select-none">
                    {rIndex === 1 ? "Mon" : rIndex === 3 ? "Wed" : rIndex === 5 ? "Fri" : ""}
                  </div>

                  {/* Calendar columns (26 weeks) */}
                  {Array.from({ length: 26 }).map((_, cIndex) => {
                    const dayIdx = cIndex * 7 + rIndex;
                    const dayData = contributionGrid[dayIdx] || { commits: 0, date: "", level: 0 };
                    
                    let bgClass = "bg-muted/30 border border-border/20";
                    if (dayData.level === 1) bgClass = "bg-emerald-950/70 border border-emerald-950";
                    else if (dayData.level === 2) bgClass = "bg-emerald-800/80 border border-emerald-800";
                    else if (dayData.level === 3) bgClass = "bg-emerald-600/90 border border-emerald-600";
                    else if (dayData.level === 4) bgClass = "bg-emerald-400 border border-emerald-400";

                    return (
                      <div
                        key={cIndex}
                        className={`w-[13px] h-[13px] rounded-[2px] transition-all hover:scale-125 hover:z-10 group relative cursor-pointer ${bgClass}`}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 bg-background/95 border border-border/80 text-[10px] text-foreground rounded px-2 py-1 shadow-xl whitespace-nowrap pointer-events-none">
                          <span className="font-bold">{dayData.commits} {heatmapType === "commits" ? "commits" : "hrs"}</span> on {dayData.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 text-[10px] text-muted-foreground">
            <span className="code-font">Dec 2025 - Jun 2026 (Live Simulation)</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-muted/30 border border-border/20 block" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950 block" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800 block" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 block" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 block" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Recharts Graphical Dashboards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Dev Flow */}
          <div className="glass-card rounded-2xl p-6 hover-glow border border-border/40">
            <div className="border-b border-border/40 pb-4 mb-6 flex justify-between items-center">
              <div>
                <span className="code-font text-primary font-bold">&lt;productivity-flow /&gt;</span>
                <p className="text-xs text-muted-foreground mt-0.5">Average weekly hours distributed by task profile.</p>
              </div>
              <TrendingUp className="w-4.5 h-4.5 text-primary" />
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={WEEKLY_FLOW_DATA}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCoding" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLearning" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    unit="h"
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontFamily: "JetBrains Mono"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="coding"
                    name="Coding/Dev"
                    stroke="#2dd4bf"
                    fillOpacity={1}
                    fill="url(#colorCoding)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="learning"
                    name="Research & AI"
                    stroke="#a855f7"
                    fillOpacity={1}
                    fill="url(#colorLearning)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Technology Weight */}
          <div className="glass-card rounded-2xl p-6 hover-glow border border-border/40">
            <div className="border-b border-border/40 pb-4 mb-6 flex justify-between items-center">
              <div>
                <span className="code-font text-accent font-bold">&lt;tech-weight /&gt;</span>
                <p className="text-xs text-muted-foreground mt-0.5">Technology density index compiled from active repositories.</p>
              </div>
              <Terminal className="w-4.5 h-4.5 text-accent" />
            </div>

            <div className="h-[280px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TECH_PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {TECH_PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontFamily: "JetBrains Mono"
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-[11px] text-muted-foreground code-font">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border/40 text-xs text-muted-foreground code-font">
          &lt; TJ-GRAPHIFY v1.0.0 • Developed with react-recharts &amp; framer-motion /&gt;
        </div>
      </div>
    </div>
  );
};

export default Graphify;
