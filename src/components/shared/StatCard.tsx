import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  sublabels?: string[];
  isProgress?: boolean;
}

export default function StatCard({ value, label, sublabels, isProgress }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="font-poppins font-extrabold text-6xl text-teal leading-none mb-3">
        {value}
        {isProgress && <span className="text-3xl text-teal/60 ml-1">%</span>}
      </div>
      <div className="font-inter text-gray-500 text-base max-w-[180px]">{label}</div>
      {sublabels && sublabels.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {sublabels.map(s => (
            <span key={s} className="text-xs text-gray-400 font-inter">{s}</span>
          ))}
        </div>
      )}
      {isProgress && (
        <div className="mt-3 w-full max-w-[160px] h-2 bg-teal/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      )}
    </motion.div>
  );
}
