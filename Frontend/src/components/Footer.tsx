import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/tanmaypal", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/tanmaypal", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@tanmay.dev", label: "Email" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <Link to="/" className="font-display text-xl font-bold">
              <span className="text-gradient">Tanmay</span>
              <span className="text-foreground">.dev</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Crafting digital experiences that matter.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8">
            {["Projects", "About", "Contact"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} Tanmay Pal. Built with{" "}
            <Heart size={14} className="text-primary fill-primary" /> using React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
