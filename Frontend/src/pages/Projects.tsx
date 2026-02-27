import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";

// Import project images
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const allProjects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive admin dashboard for managing online stores with real-time analytics and inventory management.",
    image: project1,
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    category: "Web",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "FitTrack Mobile App",
    description:
      "Cross-platform fitness tracking application with workout plans, progress tracking, and social features.",
    image: project2,
    tags: ["React Native", "Firebase", "TypeScript"],
    category: "Mobile",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Analytics SaaS Platform",
    description:
      "Enterprise-grade analytics platform with customizable dashboards, reports, and data visualization.",
    image: project3,
    tags: ["Next.js", "PostgreSQL", "D3.js", "AWS"],
    category: "Web",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Assistant Chatbot",
    description:
      "Intelligent chatbot powered by machine learning for customer support automation.",
    image: project4,
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    category: "AI/ML",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Crypto Portfolio Tracker",
    description:
      "Real-time cryptocurrency portfolio management with price alerts and market analysis.",
    image: project1,
    tags: ["Vue.js", "Node.js", "WebSocket", "Chart.js"],
    category: "Web",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Food Delivery App",
    description:
      "On-demand food delivery application with real-time tracking and payment integration.",
    image: project2,
    tags: ["Flutter", "Firebase", "Stripe", "Google Maps"],
    category: "Mobile",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const categories = ["All", "Web", "Mobile", "AI/ML"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <SectionHeading
            title="My Projects"
            subtitle="Explore my portfolio of web and mobile applications built with modern technologies."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Projects;
