import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { C } from '../tokens';

interface SceneProps { onNext: () => void; onPrev: () => void; }

const SPECS = [
  {
    label: 'Display', icon: '🖥️', highlight: 'E-Ink Carta HD',
    detail: '10.3" · 227 DPI · 1404×1872\nPaper-like surface · Zero blue light\nFully readable in direct sunlight\nA2 / GL16 / GC16 refresh modes',
  },
  {
    label: 'Stylus (EMR)', icon: '✒️', highlight: '4096 pressure levels',
    detail: '200Hz report rate\nTilt + azimuth sensing\nNo battery — powered by pad\nNever runs out. Never needs charging.',
  },
  {
    label: 'Processor', icon: '⚡', highlight: 'ARM Cortex-A55',
    detail: 'Quad-core 2.0GHz\n4 GB LPDDR4 RAM\n32 GB eMMC storage\nAI models: 120 MB reserved',
  },
  {
    label: 'Connectivity', icon: '📡', highlight: 'WiFi Only — by design',
    detail: 'No cellular. No distraction.\n802.11ac WiFi · BLE 5.0\nGPS fleet tracking\nUSB-C · Pogo pin dock',
  },
  {
    label: 'AI Engine', icon: '🧠', highlight: 'On-device inference',
    detail: 'HWR-1-S: handwriting recognition\nGAP-1: gap analysis\nHDE: intelligent hint engine\nAll runs offline. No cloud needed.',
  },
  {
    label: 'Battery', icon: '🔋', highlight: '2–3 weeks typical use',
    detail: 'E-Ink uses power only when\ndisplay changes — not while static\nFull school day on 2% battery\nOTA updates at 2 AM silently',
  },
  {
    label: 'Build', icon: '🛡️', highlight: 'Military-grade durability',
    detail: 'Anthracite aluminum chassis\nTPU hexagonal corner bumpers\nMatte nano-texture surface\nDrop tested · 360g weight',
  },
];

const AI_MODELS = [
  {
    id: 'HWR-1', label: 'HWR-1', fullName: 'Handwriting Recognition', color: '#0d9488',
    detail: 'Reads Telugu + English handwriting\nin real-time as the student writes.\nTrains on real classroom data daily.\nAccuracy improves every week.',
  },
  {
    id: 'GAP-1', label: 'GAP-1', fullName: 'Gap Analysis', color: '#F59E0B',
    detail: "Identifies exactly which concept\nthe student doesn't understand.\nNot what they got wrong —\nWHY they got it wrong.",
  },
  {
    id: 'HDE', label: 'HDE', fullName: 'Hint Delivery Engine', color: '#A78BFA',
    detail: 'Delivers the right hint at\nthe right moment.\nNot the answer — the nudge\nthat builds real understanding.',
  },
  {
    id: 'CNN-GRU', label: 'CNN-GRU-CTC', fullName: 'On-device OCR Model', color: '#60A5FA',
    detail: '2.1M parameters · 8MB INT8\n<10ms on RK3566 NPU\nWorks completely offline\nBuilt specifically for Indian scripts.',
  },
];

// ---------- 2D image views — actual device renders ----------

const BASE = import.meta.env.BASE_URL;

function Device2D({ face }: { face: 'front' | 'back' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={face}
        src={`${BASE}assets/neurapad-${face}.png`}
        alt={`NeuraPad ${face}`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.7))',
        }}
      />
    </AnimatePresence>
  );
}

// ---------- Three.js 3D viewer ----------

function ThreeViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cameraTargetRef = useRef({ x: 0, y: 0, z: 5 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060D1A');
    scene.fog = new THREE.FogExp2('#060D1A', 0.06);

    // Body
    const bodyGeo = new THREE.BoxGeometry(2.8, 4.0, 0.10);
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#1C1C1E', roughness: 0.88, metalness: 0.45 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    scene.add(body);

    // Display
    const displayGeo = new THREE.PlaneGeometry(2.5, 3.6);
    const displayMat = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.95, metalness: 0.0 });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.z = 0.051;
    scene.add(display);

    // Screen canvas texture
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512; screenCanvas.height = 700;
    const ctx = screenCanvas.getContext('2d')!;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 512, 700);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    [60, 100, 140].forEach(r => {
      ctx.beginPath(); ctx.arc(256, 280, r, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NeuraOS', 256, 440);
    ctx.fillStyle = 'rgba(148,163,184,0.7)';
    ctx.font = '24px sans-serif';
    ctx.fillText('Initialising...', 256, 480);
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(156, 600, 100, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(256, 600, 200, 4);
    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 3.45),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    screenMesh.position.z = 0.052;
    scene.add(screenMesh);

    // Corner bumpers
    const bumperMat = new THREE.MeshStandardMaterial({ color: '#0D0D0D', roughness: 0.95, metalness: 0.0 });
    [[-1.3, 1.9], [1.3, 1.9], [-1.3, -1.9], [1.3, -1.9]].forEach(([x, y]) => {
      const bm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.15), bumperMat);
      bm.position.set(x, y, 0);
      scene.add(bm);
    });

    // Stylus
    const stylusGeo = new THREE.CylinderGeometry(0.04, 0.035, 3.8, 16);
    const stylusMat = new THREE.MeshStandardMaterial({ color: '#1A1A1A', roughness: 0.6, metalness: 0.6 });
    const stylus = new THREE.Mesh(stylusGeo, stylusMat);
    stylus.rotation.z = Math.PI / 2;
    stylus.position.set(1.58, 0, 0);
    scene.add(stylus);

    // Back wordmark texture
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 512; backCanvas.height = 700;
    const bctx = backCanvas.getContext('2d')!;
    bctx.fillStyle = '#1C1C1E';
    bctx.fillRect(0, 0, 512, 700);
    const grad = bctx.createLinearGradient(106, 0, 406, 0);
    grad.addColorStop(0, '#8B6B1F');
    grad.addColorStop(0.5, '#F5D67D');
    grad.addColorStop(1, '#8B6B1F');
    bctx.fillStyle = grad;
    bctx.font = 'bold 60px sans-serif';
    bctx.textAlign = 'center';
    bctx.fillText('NeuraLife', 256, 345);
    bctx.font = '22px sans-serif';
    bctx.fillStyle = '#C9A84C';
    bctx.fillText('S  m  a  r  t  P  a  d', 256, 385);
    const backTex = new THREE.CanvasTexture(backCanvas);
    const backMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 3.45),
      new THREE.MeshBasicMaterial({ map: backTex })
    );
    backMesh.rotation.y = Math.PI;
    backMesh.position.z = -0.052;
    scene.add(backMesh);

    // Lighting
    scene.add(new THREE.AmbientLight('#ffffff', 0.4));
    const key = new THREE.DirectionalLight('#ffffff', 1.4);
    key.position.set(3, 4, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight('#ffffff', 0.5);
    fill.position.set(-3, -2, 2);
    scene.add(fill);
    const tealLight = new THREE.PointLight('#0d9488', 1.2, 8);
    tealLight.position.set(-2, 2, 2);
    scene.add(tealLight);
    const goldLight = new THREE.PointLight('#F59E0B', 0.8, 8);
    goldLight.position.set(1, -1, -2);
    scene.add(goldLight);

    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 12;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      if (resumeRef.current) clearTimeout(resumeRef.current);
    });
    controls.addEventListener('end', () => {
      resumeRef.current = setTimeout(() => { controls.autoRotate = true; }, 2000);
    });

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      controls.update();
      // Lerp camera to target
      camera.position.x += (cameraTargetRef.current.x - camera.position.x) * 0.05;
      camera.position.z += (cameraTargetRef.current.z - camera.position.z) * 0.05;
      // Float
      const floatY = Math.sin(Date.now() * 0.001) * 0.05;
      body.position.y = floatY;
      stylus.position.y = floatY;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 48, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 12,
      }}>
        <button
          onClick={() => { cameraTargetRef.current = { x: 0, y: 0, z: 8 }; }}
          style={{
            background: 'rgba(13,148,136,0.2)', border: '1px solid rgba(13,148,136,0.4)',
            color: '#0d9488', fontFamily: "'Inter', sans-serif", fontSize: 12,
            padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
          }}>
          Front View
        </button>
        <button
          onClick={() => { cameraTargetRef.current = { x: 0, y: 0, z: -8 }; }}
          style={{
            background: 'rgba(245,214,125,0.1)', border: '1px solid rgba(245,214,125,0.3)',
            color: '#F5D67D', fontFamily: "'Inter', sans-serif", fontSize: 12,
            padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
          }}>
          Back View
        </button>
      </div>
      <p style={{
        position: 'absolute', bottom: 20, left: 0, right: 0,
        textAlign: 'center', fontFamily: "'Inter', sans-serif",
        fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0,
      }}>
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  );
}

export default function Scene1Device({ onNext: _onNext }: SceneProps) {
  const [view, setView] = useState<'2d' | '3d'>('2d');
  const [activeSpec, setActiveSpec] = useState(0);
  const [activeModel, setActiveModel] = useState(0);
  const [face, setFace] = useState<'front' | 'back'>('front');

  const model = AI_MODELS[activeModel];
  const spec = SPECS[activeSpec];

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: C.dark, overflow: 'hidden',
    }}>
      {/* LEFT — Specs */}
      <div style={{
        width: '20%', height: '100%', borderRight: `1px solid rgba(255,255,255,0.06)`,
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 11, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          padding: '24px 20px 12px', margin: 0,
        }}>Hardware Specs</p>

        {SPECS.map((s, i) => (
          <button key={s.label} onClick={() => setActiveSpec(i)} style={{
            width: '100%', textAlign: 'left', background: 'none',
            border: 'none', borderLeft: `3px solid ${i === activeSpec ? C.tealVib : 'transparent'}`,
            cursor: 'pointer', padding: '10px 20px',
            backgroundColor: i === activeSpec ? C.tealLight : 'transparent',
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: C.white, fontWeight: 500 }}>
                  {s.label}
                </div>
                {i === activeSpec && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.tealVib, marginTop: 2 }}>
                    {s.highlight}
                  </motion.div>
                )}
              </div>
            </div>
          </button>
        ))}

        <div style={{ flex: 1 }} />
        <AnimatePresence mode="wait">
          <motion.div key={activeSpec}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            style={{
              margin: '0 16px 16px',
              background: 'rgba(11,110,110,0.08)',
              border: '1px solid rgba(11,110,110,0.2)',
              borderRadius: 10, padding: 12,
            }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: C.gold, fontWeight: 600, marginBottom: 6 }}>
              {spec.highlight}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12,
              color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, whiteSpace: 'pre-line',
            }}>
              {spec.detail}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CENTER — Viewer */}
      <div style={{ width: '60%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px 12px', flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: C.white }}>
              NeuraPad SmartPad
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, marginTop: 2 }}>
              Purpose-built for Indian students
            </div>
          </div>
          {/* View toggle */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.06)',
            borderRadius: 20, padding: 4, gap: 2,
          }}>
            {(['2d', '3d'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '6px 16px', borderRadius: 16, border: 'none', cursor: 'pointer',
                background: view === v ? C.tealVib : 'transparent',
                color: view === v ? 'white' : C.muted,
                fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600,
                transition: 'all 0.2s',
              }}>
                {v.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Viewer area */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 0, overflow: 'hidden' }}>
          {view === '2d' ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              width: '100%', height: '100%',
              padding: '12px 16px 8px',
              gap: 10, minHeight: 0,
            }}>
              {/* Face toggle */}
              <div style={{ display: 'flex', gap: 20, flexShrink: 0, justifyContent: 'center' }}>
                {(['front', 'back'] as const).map(f => (
                  <button key={f} onClick={() => setFace(f)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600,
                    color: face === f ? C.tealVib : C.muted,
                    borderBottom: face === f ? `2px solid ${C.tealVib}` : '2px solid transparent',
                    paddingBottom: 4, textTransform: 'capitalize', transition: 'all 0.2s',
                    letterSpacing: '0.05em',
                  }}>
                    {f === 'front' ? '◉ Front' : '◎ Back'}
                  </button>
                ))}
              </div>
              {/* Image fills remaining space */}
              <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Device2D face={face} />
              </div>
            </div>
          ) : (
            <ThreeViewer />
          )}
        </div>
      </div>

      {/* RIGHT — AI Models */}
      <div style={{
        width: '20%', height: '100%', borderLeft: `1px solid rgba(255,255,255,0.06)`,
        display: 'flex', flexDirection: 'column',
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 11, color: C.tealVib,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          padding: '24px 20px 12px', margin: 0,
        }}>AI Models on SmartPad</p>

        {AI_MODELS.map((m, i) => (
          <button key={m.id} onClick={() => setActiveModel(i)} style={{
            width: '100%', textAlign: 'left', background: 'none', border: 'none',
            borderLeft: `3px solid ${i === activeModel ? m.color : 'transparent'}`,
            cursor: 'pointer', padding: '10px 16px',
            backgroundColor: i === activeModel ? `${m.color}1F` : 'transparent',
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: `${m.color}33`, color: m.color,
                fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
                borderRadius: 4, padding: '2px 6px', flexShrink: 0,
              }}>{m.label}</span>
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: C.white, fontWeight: 500, marginTop: 4 }}>
              {m.label}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.muted }}>
              {m.fullName}
            </div>
          </button>
        ))}

        <AnimatePresence mode="wait">
          <motion.div key={activeModel}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            style={{
              margin: '16px',
              background: `${model.color}14`,
              border: `1px solid ${model.color}40`,
              borderRadius: 10, padding: 16,
            }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: model.color, fontWeight: 600, marginBottom: 8 }}>
              {model.fullName}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: C.muted, lineHeight: 1.7, whiteSpace: 'pre-line',
            }}>
              {model.detail}
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{ flex: 1 }} />
        <div style={{
          margin: '0 16px 16px',
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 8, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: C.tealVib, fontSize: 14 }}>⚡</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.muted }}>
            Running on RK3566 NPU
          </span>
        </div>
      </div>
    </div>
  );
}
