import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const rows = [
  'School Operations',
  'Fee & Compliance',
  'Learning Content',
  'Real Understanding Data',
  'Regional Language',
  'Government Curriculum',
  'One Unified Login',
];

const columns = [
  { label: 'School ERPs', values: [true, true, false, false, false, false, false] },
  { label: 'Learning Apps', values: [false, false, true, false, false, false, false] },
  { label: 'NeuraLife', values: [true, true, true, true, true, true, true], highlight: true },
];

interface CompetitiveMatrixProps {
  highlightCol?: number | null;
}

export default function CompetitiveMatrix({ highlightCol }: CompetitiveMatrixProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 pr-4 font-inter text-gray-500 font-medium w-48"></th>
            {columns.map((col, ci) => (
              <th
                key={col.label}
                className={`py-3 px-4 font-poppins font-semibold text-center rounded-t-lg transition-all duration-500 ${
                  col.highlight ? 'text-teal' : 'text-gray-700'
                } ${highlightCol !== undefined && highlightCol !== null && highlightCol !== ci ? 'opacity-25' : ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <motion.tr
              key={row}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ri * 0.06 }}
              className="border-t border-gray-100"
            >
              <td className="py-3 pr-4 font-inter text-gray-600 text-sm">{row}</td>
              {columns.map((col, ci) => (
                <td
                  key={col.label}
                  className={`py-3 px-4 text-center transition-all duration-500 ${
                    col.highlight ? 'bg-teal/5' : ''
                  } ${highlightCol !== undefined && highlightCol !== null && highlightCol !== ci ? 'opacity-25' : ''}`}
                >
                  {col.values[ri] ? (
                    <Check size={18} className="mx-auto text-green-500" />
                  ) : (
                    <X size={18} className="mx-auto text-gray-300" />
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
