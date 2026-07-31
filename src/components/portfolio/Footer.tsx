import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border" aria-label="Site Footer">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm space-y-1 text-center md:text-left">
            <p className="font-semibold text-foreground">© 2026 Teja Jetti</p>
            <p className="text-xs">Built with React + Node.js</p>
          </div>

          <div className="flex gap-4" aria-label="Social Links">
            <a
              href="https://github.com/sivatejajetti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile Link"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/teja-jetti-970158353"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile Link"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/t3ja_j"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram Profile Link"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:sivatejajetti@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
