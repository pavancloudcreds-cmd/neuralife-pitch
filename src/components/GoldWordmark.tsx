export function GoldWordmark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size * 4.2} height={size} viewBox="0 0 168 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gw" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#8B6B1F"/>
          <stop offset="50%"  stopColor="#F5D67D"/>
          <stop offset="100%" stopColor="#8B6B1F"/>
        </linearGradient>
      </defs>
      <text x="0" y="32"
        fontFamily="'Poppins', sans-serif"
        fontWeight="800"
        fontSize="34"
        fill="url(#gw)"
        letterSpacing="-0.5">
        NeuraLife
      </text>
    </svg>
  );
}
