// A generic "official school stamp" ink-seal graphic — original artwork,
// not tied to any real institution. Slightly rotated + translucent to read
// as a hand-stamped impression rather than a flat printed badge.
interface Props {
  size?: number;
}

export default function SchoolStamp({ size = 44 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="School stamp" style={{ flexShrink: 0 }}>
      <g transform="rotate(-9 50 50)" opacity={0.7}>
        <circle cx="50" cy="50" r="46" fill="none" stroke="#1E3A5F" strokeWidth="3" />
        <circle cx="50" cy="50" r="39" fill="none" stroke="#1E3A5F" strokeWidth="1.2" />

        <text x="50" y="31" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontWeight={700}
          fontSize="10" fill="#1E3A5F" letterSpacing="0.5">VIKAS HIGH</text>
        <text x="50" y="43" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontWeight={700}
          fontSize="10" fill="#1E3A5F" letterSpacing="1">SCHOOL</text>

        <line x1="28" y1="50" x2="72" y2="50" stroke="#1E3A5F" strokeWidth="1" />

        <text x="50" y="61.5" textAnchor="middle" fontFamily="'Poppins', sans-serif" fontWeight={600}
          fontSize="7.5" fill="#1E3A5F" letterSpacing="0.4">RAJAHMUNDRY · A.P.</text>

        <path
          d="M50 68 L52.2 73.2 L58 73.7 L53.6 77.4 L55 83 L50 79.9 L45 83 L46.4 77.4 L42 73.7 L47.8 73.2 Z"
          fill="#1E3A5F"
        />
      </g>
    </svg>
  );
}
