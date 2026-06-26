import type { ReactNode, CSSProperties } from 'react';
import { C } from '../tokens';

interface Props {
  children: ReactNode;
  accent?: string;
  style?: CSSProperties;
}

export default function GlassCard({ children, accent = C.tealVib, style }: Props) {
  return (
    <div style={{
      background: C.surface,
      borderLeft: `3px solid ${accent}`,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  );
}
