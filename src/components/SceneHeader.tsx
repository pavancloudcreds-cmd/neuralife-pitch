import type { ReactNode } from 'react';
import { C } from '../tokens';

interface Props {
  eyebrow: string;
  title: string | ReactNode;
  sub?: string;
  titleSize?: number;
}

export default function SceneHeader({ eyebrow, title, sub, titleSize = 48 }: Props) {
  return (
    <div>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 12,
        color: C.tealVib,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: 12,
        margin: '0 0 12px',
      }}>
        {eyebrow}
      </p>
      <div style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: titleSize,
        color: C.white,
        lineHeight: 1.15,
        margin: '0 0 12px',
      }}>
        {title}
      </div>
      {sub && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 18,
          color: C.muted,
          marginTop: 12,
          maxWidth: 640,
          lineHeight: 1.6,
          margin: '12px 0 0',
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}
