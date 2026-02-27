import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Smartphone, Globe, Zap } from "lucide-react";

// Import project images
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const featuredProjects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive admin dashboard for managing online stores with real-time analytics and inventory management.",
    image: project1,
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "FitTrack Mobile App",
    description:
      "Cross-platform fitness tracking application with workout plans, progress tracking, and social features.",
    image: project2,
    tags: ["React Native", "Firebase", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Analytics SaaS Platform",
    description:
      "Enterprise-grade analytics platform with customizable dashboards, reports, and data visualization.",
    image: project3,
    tags: ["Next.js", "PostgreSQL", "D3.js", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites built with the latest technologies.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform mobile applications for iOS and Android.",
  },
  {
    icon: Code,
    title: "Full-Stack Solutions",
    description: "End-to-end development from database to user interface.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized applications that load fast and scale well.",
  },
];

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <SectionHeading
            title="What I Do"
            subtitle="I specialize in building digital products that are fast, accessible, and beautiful."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-glow p-6 text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4"
                >
                  <service.icon size={28} />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of my recent work that showcases my skills and expertise."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
            >
              View All Projects
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Build Something{" "}
              <span className="text-gradient">Amazing Together</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have a project in mind? I'd love to hear about it. Let's discuss how
              we can work together to bring your ideas to life.
            </p>
            <Link to="/contact" className="btn-glow inline-flex items-center gap-2">
              Start a Project
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
