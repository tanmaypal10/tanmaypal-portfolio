import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillBadgeProps {
  name: string;
  icon?: LucideIcon;
  index: number;
}

const SkillBadge = ({ name, icon: Icon, index }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="skill-badge flex items-center gap-2"
    >
      {Icon && <Icon size={16} className="text-primary" />}
      <span>{name}</span>
    </motion.div>
  );
};

export default SkillBadge;
