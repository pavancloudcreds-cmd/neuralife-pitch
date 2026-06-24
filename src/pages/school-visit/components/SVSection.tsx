import { SV } from '../tokens';

type Theme = 'light' | 'dark' | 'teal' | 'purple';

interface Props {
  id?: string;
  theme?: Theme;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const bgMap: Record<Theme, string> = {
  light:  SV.pageBg,
  dark:   SV.darkBg,
  teal:   SV.teal,
  purple: SV.rtihPurple,
};

export default function SVSection({ id, theme = 'light', children, style }: Props) {
  return (
    <section
      id={id}
      style={{
        background: bgMap[theme],
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 32px',
        ...style,
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', width: '100%' }}>
        {children}
      </div>
    </section>
  );
}
