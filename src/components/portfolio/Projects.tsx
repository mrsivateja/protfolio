import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Folder, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectModal from "./ProjectModal";

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  live?: string;
  image: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    title: "VitalMe",
    description: "An end-to-end fitness telemetry hub that integrates metrics from wearables and processes data with AI analytics.",
    longDescription: "VitalMe is a comprehensive fitness platform connected with the Google Fit REST API for wearable health metrics. Features include an intelligent Gemini AI health chatbot, sleep and task telemetry dashboards, and an automated computer vision pushup validation system powered by YOLO and MediaPipe. Fully deployed and functional.",
    tech: ["React", "Node.js", "MongoDB", "Google Fit API", "Gemini AI", "MediaPipe"],
    github: "https://github.com/mrsivateja/VitalMe",
    live: "https://vitalme.vercel.app",
    image: "/vitalme.png",
    featured: true,
  },
  {
    title: "Mr.Cypher",
    description: "An advanced web-based cryptography playground and ethical hacking sandbox for simulating classical and modern encryption ciphers.",
    longDescription: "Mr.Cypher is an interactive cryptographic tool that visualizes encoding, decoding, and crack-simulation processes. It supports classical algorithms like Caesar, Vigenère, and Playfair alongside modern standards (AES, DES) and key hash functions (MD5, SHA-256). It includes a functional virtual console for interactive cracking challenges.",
    tech: ["React", "TypeScript", "Tailwind CSS", "CryptoJS", "Framer Motion"],
    github: "https://github.com/sivatejajetti/Mr.Cypher",
    live: "https://mrcypher.vercel.app",
    image: "/mrcypher.png",
    featured: true,
  },
  {
    title: "College Management System",
    description: "An AI-powered academic operations ERP platform featuring coordinate geofencing attendance validation and real-time campus assistance.",
    longDescription: "College360 is a university operations ERP platform built to digitize academic processes. It implements tenant Role-Based Access Control, coordinate-verified geofencing classroom attendance, academic ID generation, and an automated Gemini AI student support assistant with clean responsive charts.",
    tech: ["React", "Node.js", "SQLite3", "Gemini AI", "Recharts", "Framer Motion"],
    github: "https://github.com/sandeep2409-gitch/college360",
    image: "/college360.png",
    featured: true,
  },
  {
    title: "Farm Direct D2C",
    description: "Modern direct-to-consumer platform for farmers featuring AI crop classification and voice controls.",
    longDescription: "Farm Direct is a Next.js 15 agriculture portal enabling direct farmer-to-consumer sales. It includes a voice command interface, YOLO11-based crop health and grading analysis, a KisanGPT assistant routed via NVIDIA NIM, and secure local SQLite storage.",
    tech: ["Next.js 15", "React 19", "YOLO11", "NVIDIA NIM", "SQLite", "Tailwind CSS"],
    github: "https://github.com/sivatejajetti/FarmDirect",
    live: "https://tejafarmdirect.vercel.app",
    image: "/farmdirect.png",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern technologies, animations, and search optimizations.",
    longDescription: "My personal developer portfolio, which you're looking at right now! It features custom glassmorphic aesthetics, a structured Person schema for search engines, a responsive contact form, and high-performance preloads. Fully responsive across mobile, tablet, and desktop viewports.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/sivatejajetti/protfolio",
    live: "https://tejajetti.vercel.app",
    image: "/placeholder.svg",
    featured: false,
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            &lt;projects /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-16 mb-24 max-w-6xl mx-auto">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center glass-card rounded-2xl p-8 hover-glow group`}
              >
                {/* Image Section */}
                <div
                  className="w-full lg:w-1/2 overflow-hidden rounded-xl border border-border/40 relative aspect-video cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="code-font text-white bg-primary/80 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Eye className="w-4 h-4" /> View Details
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <span className="code-font text-primary text-xs uppercase tracking-wider font-semibold">
                    Featured Project
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors cursor-pointer"
                    onClick={() => openModal(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="code-font text-xs px-3 py-1 bg-secondary border border-border rounded-full text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border hover:border-primary/50 hover:bg-primary/10"
                        asChild
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
                        asChild
                      >
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} live demo`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => openModal(project)}
                      aria-label={`View details modal for ${project.title}`}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Other Projects Grid */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-center mb-8"
        >
          Other Projects
        </motion.h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 hover-glow group flex flex-col h-full cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="flex items-center justify-between mb-4">
                <Folder className="w-10 h-10 text-primary" />
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors z-10"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${project.title} GitHub repository`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors z-10"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${project.title} live demo website`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span key={tech} className="code-font text-xs text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
};

export default Projects;
