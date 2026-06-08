import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Printer,
  Mail,
  Github,
  Linkedin,
  MapPin,
  FileText,
  Briefcase,
  GraduationCap,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Resume: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative py-12 px-6 md:px-12">
      {/* Background patterns hidden on print */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40 no-print" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none no-print" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none no-print" />

      {/* Stylesheet specifically for printing */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: 'Times New Roman', Times, serif !important;
          }
          .no-print {
            display: none !important;
          }
          .print-shadow {
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            backdrop-filter: none !important;
            padding: 0 !important;
          }
          .print-text-black {
            color: #000000 !important;
          }
          .print-border-black {
            border-color: #000000 !important;
          }
          .print-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
          .print-full-width {
            grid-column: span 2 !important;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8 print-shadow">
        {/* Navigation & Actions Panel (hidden on print) */}
        <div className="flex items-center justify-between border-b border-border/40 pb-6 no-print">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group code-font"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            &lt; Back to Portfolio /&gt;
          </Link>
          <Button
            onClick={handlePrint}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect font-semibold flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </Button>
        </div>

        {/* Main Resume Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 border border-border/40 hover-glow print-shadow space-y-8">
          
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 border-b border-border/40 pb-6 print-border-black">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight print-text-black">
                Teja <span className="gradient-text print-text-black">Jetti</span>
              </h1>
              <p className="text-primary font-medium text-lg mt-1 code-font print-text-black">
                BTech Computer Science &amp; AI Student
              </p>
            </div>
            
            {/* Contact metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground code-font print-text-black">
              <a href="mailto:sivatejajetti@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary shrink-0 print-text-black" />
                <span>sivatejajetti@gmail.com</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 print-text-black" />
                <span>Andhra Pradesh, India</span>
              </span>
              <a href="https://github.com/sivatejajetti" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Github className="w-4 h-4 text-primary shrink-0 print-text-black" />
                <span>github.com/sivatejajetti</span>
              </a>
              <a href="https://linkedin.com/in/teja-jetti-970158353" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4 text-primary shrink-0 print-text-black" />
                <span>linkedin.com/in/teja-jetti-970158353</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/40 pb-2 print-border-black print-text-black">
              <FileText className="w-5 h-5 text-primary print-text-black" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed print-text-black">
              Aspiring Software Engineer and B.Tech 2nd Year student specializing in Artificial Intelligence. 
              Highly motivated to design and implement robust full-stack web solutions and intelligent workflows. 
              Skilled in structuring declarative single-page applications with React/Next.js, developing REST APIs in Node.js, 
              and exploring integrations with computer vision architectures (YOLO) and large language model assistants (Gemini, NVIDIA NIM).
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/40 pb-2 print-border-black print-text-black">
              <Code className="w-5 h-5 text-primary print-text-black" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm print-grid">
              <div className="space-y-1">
                <h3 className="font-bold text-foreground print-text-black">Languages</h3>
                <p className="text-muted-foreground print-text-black">Java, C, Python, JavaScript, TypeScript, SQL, HTML, CSS</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground print-text-black">Frameworks &amp; Styling</h3>
                <p className="text-muted-foreground print-text-black">React, Next.js 15, Node.js, Express, Tailwind CSS, Framer Motion, Recharts</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground print-text-black">Tools &amp; AI Integration</h3>
                <p className="text-muted-foreground print-text-black">Android Studio, MongoDB, SQLite, Git, Gemini API, YOLO11, NVIDIA NIM</p>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/40 pb-2 print-border-black print-text-black">
              <Briefcase className="w-5 h-5 text-primary print-text-black" />
              <span>Technical Projects</span>
            </h2>
            
            <div className="space-y-4">
              {/* Farm Direct */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-foreground print-text-black">Farm Direct (D2C Agriculture Application)</h3>
                  <span className="text-xs text-muted-foreground code-font print-text-black">Next.js 15, YOLO11, NIM</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed print-text-black">
                  • Engineered a modern farm-to-consumer application featuring voice command controls and localized SQLite storage.
                  <br />
                  • Integrated real-time AI crop classification/grading leveraging a customized YOLO11 model.
                  <br />
                  • Implemented a smart KisanGPT conversational assistant using LLMs routed through NVIDIA NIM.
                </p>
              </div>

              {/* Vital Me */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-foreground print-text-black">Vital Me (Personal Fitness Telemetry Hub)</h3>
                  <span className="text-xs text-muted-foreground code-font print-text-black">React, Node.js, MongoDB</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed print-text-black">
                  • Constructed an end-to-end fitness dashboard integrating wearable metrics using the Google Fit REST API.
                  <br />
                  • Designed sleep tracker matrices and an intelligent health companion assistant using Gemini AI.
                  <br />
                  • Embedded computer vision routines utilizing MediaPipe/YOLO to track and validate pushup telemetry.
                </p>
              </div>

              {/* College360 */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-foreground print-text-black">College360 ERP</h3>
                  <span className="text-xs text-muted-foreground code-font print-text-black">React, SQLite3, Gemini AI</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed print-text-black">
                  • Developed an academic operations dashboard with secure multi-tenant Role-Based Access Controls (RBAC).
                  <br />
                  • Integrated classroom attendance verification based on geofenced coordinate checks.
                  <br />
                  • Implemented student ID credential generation and campus helper chatbot modules.
                </p>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/40 pb-2 print-border-black print-text-black">
              <GraduationCap className="w-5 h-5 text-primary print-text-black" />
              <span>Education</span>
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground print-text-black">B.Tech in Computer Science &amp; Artificial Intelligence</h3>
                  <p className="text-xs text-primary print-text-black">Pydah College of Engineering (Autonomous)</p>
                </div>
                <span className="text-xs text-muted-foreground code-font print-text-black">2024 - 2028 | Pursuing</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground print-text-black">Higher Secondary Certification (12th, Science Stream PCM)</h3>
                  <p className="text-xs text-primary print-text-black">Pragathi Junior College</p>
                </div>
                <span className="text-xs text-muted-foreground code-font print-text-black">2022 - 2024</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground print-text-black">Secondary School Certificate (10th)</h3>
                  <p className="text-xs text-primary print-text-black">Lutheran English Medium School</p>
                </div>
                <span className="text-xs text-muted-foreground code-font print-text-black">2022 | Distinction</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer (hidden on print) */}
        <div className="text-center text-xs text-muted-foreground code-font pt-4 no-print">
          Designed with a print stylesheet. Select "Print / Save PDF" to download as a clean A4 resume.
        </div>
      </div>
    </div>
  );
};

export default Resume;
