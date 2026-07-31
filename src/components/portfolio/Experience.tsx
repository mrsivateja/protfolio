import { motion } from "framer-motion";
import { Briefcase, Trophy, Award, Terminal, Calendar } from "lucide-react";

const experienceItems = [
  {
    type: "Internship",
    title: "Ethical Hacking Virtual Intern",
    organization: "EduSkills Foundation",
    period: "March 2026",
    icon: Terminal,
    description: "Participated in security assessments, vulnerability analysis, and cryptographic modeling. Gained hands-on experience in networking configurations, cryptographic algorithms, and system defense.",
  },
  {
    type: "Hackathon",
    title: "Full Stack & AI Innovator",
    organization: "College Hackathons & Projects",
    period: "2025 - 2026",
    icon: Trophy,
    description: "Collaborated in development teams to build production-grade web solutions under timed constraints. Built prototypes including Farm Direct (voice commands, YOLO11 crop grading) and College360 (geofenced Coordinate ERP).",
  },
  {
    type: "Certification",
    title: "EduSkills Ethical Hacking Certification",
    organization: "EduSkills Foundation",
    period: "March 2026",
    icon: Award,
    description: "Completed comprehensive training on system penetration, cyber security protocols, data encryption, and network defense strategies.",
  },
  {
    type: "Achievement",
    title: "Deployed Production-Grade Web Utilities",
    organization: "Self-Directed Projects",
    period: "2024 - 2026",
    icon: Trophy,
    description: "Designed, built, and launched VitalMe (AI health tracker integrated with Google Fit REST APIs and MediaPipe vision telemetry) and Mr.Cypher (cipher encoding sandbox). Both apps are optimized, fully responsive, and deployed.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />
      
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            &lt;experience /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Professional <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />

            {experienceItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-20 pb-12 last:pb-0"
              >
                {/* Timeline dot with icon */}
                <div className="absolute left-3 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-primary glow-effect z-10">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>

                <div className="glass-card rounded-xl p-6 hover-glow">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-xs font-semibold text-primary rounded-full mb-2">
                        {item.type}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Briefcase className="w-4 h-4 text-primary shrink-0" />
                        {item.organization}
                      </p>
                    </div>
                    <span className="code-font text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
