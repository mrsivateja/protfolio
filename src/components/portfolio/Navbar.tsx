import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "About", href: "#about", isRoute: false },
  { label: "Skills", href: "#skills", isRoute: false },
  { label: "Projects", href: "#projects", isRoute: false },
  { label: "Education", href: "#education", isRoute: false },
  { label: "Contact", href: "#contact", isRoute: false },
  { label: "Graphify", href: "/graphify", isRoute: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLink = (item: typeof navItems[0], className: string, onClick?: () => void) => {
    if (item.isRoute) {
      const isCurrent = location.pathname === item.href;
      return (
        <Link
          key={item.label}
          to={item.href}
          className={`${className} flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/15 ${
            isCurrent ? "text-primary border-primary/40 font-semibold" : ""
          }`}
          onClick={onClick}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>{item.label}</span>
        </Link>
      );
    } else {
      if (isHome) {
        return (
          <a
            key={item.label}
            href={item.href}
            className={className}
            onClick={onClick}
          >
            {item.label}
          </a>
        );
      } else {
        return (
          <Link
            key={item.label}
            to={`/${item.href}`}
            className={className}
            onClick={onClick}
          >
            {item.label}
          </Link>
        );
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-4" : "py-6"
      }`}
    >
      <div className="container px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold gradient-text">
          TJ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            renderLink(item, "text-muted-foreground hover:text-primary transition-colors code-font text-sm")
          )}
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            Resume
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-card mt-4 mx-6 rounded-xl p-6"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) =>
              renderLink(
                item,
                "text-muted-foreground hover:text-primary transition-colors code-font text-sm py-2",
                () => setIsMenuOpen(false)
              )
            )}
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Resume
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
