import { SV } from '../tokens';

interface Props {
  icon: string;
  title: string;
  body: string;
  accent?: string;
}

export default function InfoCard({ icon, title, body, accent = SV.teal }: Props) {
  return (
    <div style={{
      background: SV.cardBg,
      border: `1px solid ${SV.border}`,
      borderRadius: 12,
      padding: 20,
      borderLeft: `4px solid ${accent}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: accent + '1F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <h3 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: 16,
          color: SV.textPrimary,
          margin: 0,
        }}>
          {title}
        </h3>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        color: SV.textSecondary,
        lineHeight: 1.6,
        margin: 0,
      }}>
        {body}
      </p>
    </div>
  );
}
