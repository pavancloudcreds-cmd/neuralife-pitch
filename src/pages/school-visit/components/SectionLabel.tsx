import { SV } from '../tokens';

interface Props {
  number: string;
  title: string;
  color?: string;
  dark?: boolean;
}

export default function SectionLabel({ number, title, color = SV.teal, dark = false }: Props) {
  return (
    <div style={{ marginBottom: 24 }}>
      <span style={{
        display: 'inline-block',
        background: color + '26',
        color,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        padding: '4px 12px',
        borderRadius: 100,
        marginBottom: 12,
      }}>
        {number}
      </span>
      <h2 style={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        fontSize: dark ? 48 : 32,
        color: dark ? '#ffffff' : SV.textPrimary,
        margin: 0,
        lineHeight: 1.2,
      }}>
        {title}
      </h2>
    </div>
  );
}
