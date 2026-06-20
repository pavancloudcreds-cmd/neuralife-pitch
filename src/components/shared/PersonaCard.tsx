import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface PersonaCardProps {
  title: string;
  icon: LucideIcon;
  quote: string;
  isActive?: boolean;
  isPast?: boolean;
  className?: string;
}

export default function PersonaCard({ title, icon: Icon, quote, isActive = false, isPast = false, className = '' }: PersonaCardProps) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : isPast ? 0.95 : 1,
        opacity: isPast ? 0.6 : 1,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`bg-white rounded-xl shadow-md border-l-4 border-teal p-5 ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
          <Icon size={20} className="text-teal" />
        </div>
        <h3 className="font-poppins font-semibold text-xl text-gray-800">{title}</h3>
      </div>
      <p className="font-inter text-base text-gray-600 italic leading-relaxed">"{quote}"</p>
    </motion.div>
  );
}
