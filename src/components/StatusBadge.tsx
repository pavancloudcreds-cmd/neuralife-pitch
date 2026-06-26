type BadgeType = 'done' | 'pending' | 'critical' | 'building';

interface Props {
  label: string;
  type: BadgeType;
}

const config: Record<BadgeType, { bg: string; color: string; prefix: string }> = {
  done:     { bg: 'rgba(52,211,153,0.15)',  color: '#34D399', prefix: '✅' },
  pending:  { bg: 'rgba(251,191,36,0.15)',  color: '#FBB024', prefix: '⏳' },
  critical: { bg: 'rgba(248,113,113,0.15)', color: '#F87171', prefix: '🔴' },
  building: { bg: 'rgba(96,165,250,0.15)',  color: '#60A5FA', prefix: '🔄' },
};

export default function StatusBadge({ label, type }: Props) {
  const { bg, color, prefix } = config[type];
  return (
    <span style={{
      background: bg,
      color,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 8px',
      borderRadius: 6,
      whiteSpace: 'nowrap',
      animation: type === 'critical' ? 'pulse 1.5s ease-in-out infinite' : undefined,
    }}>
      {prefix} {label}
    </span>
  );
}
