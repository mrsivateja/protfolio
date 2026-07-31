import { motion } from "framer-motion";
import { Code2, Layout, Server, Database, Bot, Settings, Cloud } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Java", "C", "Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js 15", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Recharts"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "SQLite3", "SQL"],
  },
  {
    title: "AI & ML",
    icon: Bot,
    skills: ["Gemini AI", "YOLO11", "NVIDIA NIM", "Machine Learning", "Computer Vision"],
  },
  {
    title: "Tools",
    icon: Settings,
    skills: ["Android Studio", "Git", "VS Code", "Vite", "Postman"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    skills: ["Vercel", "Cloud Deployment", "Netlify"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="code-font text-primary text-sm tracking-wider">
            &lt;skills /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: catIndex * 0.05 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 hover-glow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3.5 py-1.5 rounded-lg bg-secondary/80 border border-border text-sm font-medium hover:border-primary/50 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
