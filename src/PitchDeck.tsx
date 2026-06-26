import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDeck, SCENES } from './useDeck';
import Scene1Device      from './scenes/Scene1Device';
import Scene2Impact      from './scenes/Scene2Impact';
import Scene3Roadmap     from './scenes/Scene3Roadmap';
import Scene4Competition from './scenes/Scene4Competition';
import Scene5Moats       from './scenes/Scene5Moats';
import Scene6Ask         from './scenes/Scene6Ask';
import Scene7Legal       from './scenes/Scene7Legal';
import { GoldWordmark }  from './components/GoldWordmark';
import { C } from './tokens';

const COMPONENTS = [
  Scene1Device, Scene2Impact, Scene3Roadmap,
  Scene4Competition, Scene5Moats, Scene6Ask, Scene7Legal,
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function PitchDeck() {
  const { scene, goTo, total } = useDeck();
  const [dir, setDir] = useState(1);

  const navigate = (newScene: number) => {
    if (newScene < 0 || newScene >= total) return;
    setDir(newScene > scene ? 1 : -1);
    goTo(newScene);
  };

  const SceneComponent = COMPONENTS[scene];

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      background: C.dark, position: 'relative',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Top-left wordmark */}
      <div style={{ position: 'fixed', top: 20, left: 28, zIndex: 100 }}>
        <GoldWordmark size={22} />
      </div>

      {/* Scene counter top-right */}
      <div style={{
        position: 'fixed', top: 24, right: 28, zIndex: 100,
        fontFamily: "'Poppins', sans-serif",
        fontSize: 13, color: C.faint, letterSpacing: '0.1em',
      }}>
        {String(scene + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Main scene — starts at y=60 to clear the persistent wordmark/counter */}
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={scene}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'absolute',
            top: 60, left: 0, right: 0, bottom: 0,
          }}
        >
          <SceneComponent
            onNext={() => navigate(scene + 1)}
            onPrev={() => navigate(scene - 1)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom nav dots — frosted pill so it's visible on any background */}
      <div style={{
        position: 'fixed', bottom: 24,
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,0,0,0.28)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 20, padding: '8px 16px',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        {SCENES.map((s, i) => (
          <button key={s.id}
            onClick={() => navigate(i)}
            title={s.label}
            style={{
              width: i === scene ? 32 : 8, height: 8,
              borderRadius: 4, border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease', padding: 0,
              background: i === scene ? C.tealVib : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      {/* Arrow hints — frosted glass, visible on any background */}
      {scene > 0 && (
        <button onClick={() => navigate(scene - 1)} style={{
          position: 'fixed', left: 14, top: '50%', transform: 'translateY(-50%)',
          zIndex: 100,
          background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 10, width: 36, height: 36, cursor: 'pointer',
          color: 'white', fontSize: 20, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>‹</button>
      )}
      {scene < total - 1 && (
        <button onClick={() => navigate(scene + 1)} style={{
          position: 'fixed', right: 14, top: '50%', transform: 'translateY(-50%)',
          zIndex: 100,
          background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 10, width: 36, height: 36, cursor: 'pointer',
          color: 'white', fontSize: 20, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>›</button>
      )}
    </div>
  );
}
