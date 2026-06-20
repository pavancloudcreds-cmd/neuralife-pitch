import { motion } from 'framer-motion';

interface TimelineMarker {
  date: string;
  label: string;
  type: 'past' | 'present' | 'future';
  position: number; // 0-100 percent along track
}

interface TimelineTrackProps {
  markers: TimelineMarker[];
  visibleTypes: Array<'past' | 'present' | 'future'>;
}

export default function TimelineTrack({ markers, visibleTypes }: TimelineTrackProps) {
  const visible = markers.filter(m => visibleTypes.includes(m.type));

  return (
    <div className="relative w-full px-4" style={{ height: '160px' }}>
      {/* Track line */}
      <motion.div
        className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 -translate-y-1/2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Markers */}
      {visible.map((marker, i) => {
        const isAbove = i % 2 === 0;
        const color =
          marker.type === 'present' ? '#0B6E6E' :
          marker.type === 'past'    ? '#6B7280' : '#9CA3AF';

        return (
          <motion.div
            key={marker.label}
            className="absolute"
            style={{ left: `${marker.position}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, y: marker.type === 'present' ? 8 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            {/* Label above */}
            {isAbove && (
              <div className="absolute bottom-full mb-2 text-center" style={{ left: '50%', transform: 'translateX(-50%)', width: '100px' }}>
                <div className="text-xs font-poppins font-semibold leading-tight" style={{ color }}>{marker.label}</div>
                <div className="text-[10px] font-inter text-gray-400">{marker.date}</div>
              </div>
            )}

            {/* Dot */}
            <motion.div
              className="rounded-full border-2 relative z-10"
              style={{
                width: marker.type === 'present' ? 14 : 10,
                height: marker.type === 'present' ? 14 : 10,
                background: color,
                borderColor: color,
                marginLeft: marker.type === 'present' ? -7 : -5,
                marginTop: marker.type === 'present' ? -7 : -5,
              }}
              animate={marker.type === 'present' ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />

            {/* Label below */}
            {!isAbove && (
              <div className="absolute top-full mt-2 text-center" style={{ left: '50%', transform: 'translateX(-50%)', width: '100px' }}>
                <div className="text-xs font-poppins font-semibold leading-tight" style={{ color }}>{marker.label}</div>
                <div className="text-[10px] font-inter text-gray-400">{marker.date}</div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
