import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import SkillBadge from "@/components/SkillBadge";
import { Download, Calendar, MapPin, Briefcase } from "lucide-react";
import profileImage from "@/assets/TAN (1).jpg";

const frontendSkills = [
  "React",  "TypeScript", "JavaScript",
  "HTML", "CSS3", "Tailwind CSS"
];

const backendSkills = [
  "Node.js", "Express", "Python", "Django", 
  "MongoDB", 
];

const toolsSkills = [
  "Git",  "Vercel", "Figma",
  "VS Code",  "Linux",
];

const About = () => {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl transform rotate-3" />
                <img
                  src={profileImage}
                  alt="Tanmay Pal"
                  className="relative rounded-2xl shadow-2xl object-cover w-full h-full"
                />
                <div className="absolute -bottom-6 -right-6 p-4 bg-card rounded-xl border border-border shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Available for work</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                About <span className="text-gradient">Me</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                I'm Tanmay Pal, a passionate Web & App Developer based in India with over
                1 years of experience crafting digital experiences. I specialize in building
                modern, performant, and user-friendly applications.
              </p>
              <p className="text-muted-foreground mb-8">
                My journey in tech started with curiosity and has evolved into a deep
                passion for creating solutions that make a difference. I believe in clean
                code, thoughtful design, and continuous learning.
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={18} className="text-primary" />
                  <span>India</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase size={18} className="text-primary" />
                  <span>Full-time & Freelance</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={18} className="text-primary" />
                  <span> 1 Years Experience</span>
                </div>
              </div>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow inline-flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Technologies I work with to bring ideas to life."
          />

          <div className="space-y-12">
            {/* Frontend */}
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Frontend Development
              </h3>
              <div className="flex flex-wrap gap-3">
                {frontendSkills.map((skill, index) => (
                  <SkillBadge key={skill} name={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Backend Development
              </h3>
              <div className="flex flex-wrap gap-3">
                {backendSkills.map((skill, index) => (
                  <SkillBadge key={skill} name={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-3">
                {toolsSkills.map((skill, index) => (
                  <SkillBadge key={skill} name={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
