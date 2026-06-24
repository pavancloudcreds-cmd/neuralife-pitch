import { SV } from '../tokens';

type Status = 'done' | 'progress' | 'spec';

interface Props {
  layer: string;
  status: Status;
  notes: string;
}

const statusConfig: Record<Status, { label: string; bg: string; color: string }> = {
  done:     { label: '✅ Complete',     bg: '#D1FAE5', color: '#065F46' },
  progress: { label: '🔄 In Progress',  bg: '#FEF3C7', color: '#92400E' },
  spec:     { label: '📄 Spec Ready',   bg: '#F3F4F6', color: '#374151' },
};

export default function ProgressRow({ layer, status, notes }: Props) {
  const cfg = statusConfig[status];
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      borderBottom: `1px solid ${SV.divider}`,
      padding: '12px 16px',
    }}>
      <span style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        fontSize: 14,
        color: SV.textPrimary,
        flex: 1,
        minWidth: 0,
      }}>
        {layer}
      </span>
      <span style={{
        background: cfg.bg,
        color: cfg.color,
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 100,
        whiteSpace: 'nowrap',
      }}>
        {cfg.label}
      </span>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
        color: SV.textMuted,
        maxWidth: 340,
        textAlign: 'right',
        flexShrink: 0,
      }}>
        {notes}
      </span>
    </div>
  );
}
