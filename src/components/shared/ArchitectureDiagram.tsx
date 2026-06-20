import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Cpu, Cloud, Layers } from 'lucide-react';

interface NodeDef {
  id: string;
  label: string;
  Icon: typeof Monitor;
  x: number;
  y: number;
}

const NODES: NodeDef[] = [
  { id: 'admin',    label: 'Web Admin Console', Icon: Monitor,    x: 50,  y: 10  },
  { id: 'teacher',  label: 'Teacher App',        Icon: Tablet,     x: 15,  y: 45  },
  { id: 'family',   label: 'Family App',          Icon: Smartphone, x: 85,  y: 45  },
  { id: 'smartpad', label: 'SmartPad',            Icon: Cpu,        x: 50,  y: 78  },
  { id: 'cloud',    label: 'Cloud AI',            Icon: Cloud,      x: 50,  y: 44  },
  { id: 'edge',     label: 'Edge AI',             Icon: Layers,     x: 50,  y: 62  },
];

const EDGES: Array<[string, string]> = [
  ['teacher',  'admin'],
  ['family',   'admin'],
  ['smartpad', 'cloud'],
  ['cloud',    'admin'],
  ['cloud',    'teacher'],
  ['cloud',    'family'],
  ['edge',     'smartpad'],
  ['edge',     'cloud'],
];

function getNodeCenter(id: string) {
  const node = NODES.find(n => n.id === id)!;
  return { cx: node.x, cy: node.y };
}

interface ArchitectureDiagramProps {
  visibleCount: number;
}

export default function ArchitectureDiagram({ visibleCount }: ArchitectureDiagramProps) {
  const nodeOrder = ['admin', 'teacher', 'family', 'smartpad', 'cloud', 'edge'];
  const visibleNodeIds = new Set(nodeOrder.slice(0, visibleCount));

  return (
    <div className="relative w-full" style={{ aspectRatio: '2/1' }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {EDGES.map(([from, to]) => {
          if (!visibleNodeIds.has(from) || !visibleNodeIds.has(to)) return null;
          const a = getNodeCenter(from);
          const b = getNodeCenter(to);
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.cx} y1={a.cy}
              x2={b.cx} y2={b.cy}
              stroke="#0B6E6E"
              strokeWidth="0.5"
              strokeDasharray="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          );
        })}
      </svg>

      {NODES.map((node, i) => {
        if (!visibleNodeIds.has(node.id)) return null;
        const allVisible = visibleCount >= NODES.length;
        return (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: allVisible ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: allVisible ? i * 0.05 : 0 }}
          >
            <div className="bg-white border-2 border-teal rounded-lg px-2 py-1.5 flex flex-col items-center shadow-md min-w-[70px]">
              <node.Icon size={14} className="text-teal mb-0.5" />
              <span className="text-[8px] font-inter font-medium text-teal text-center leading-tight">{node.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
