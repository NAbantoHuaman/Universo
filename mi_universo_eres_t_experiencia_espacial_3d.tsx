import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// ============================================================================
// SISTEMA DE ICONOGRAFÍA ASTRONÓMICA Y EDITORIAL A MEDIDA (TRAZO FINO)
// Diseñados específicamente para la experiencia (sin emojis ni iconos genéricos)
// ============================================================================
type GlyphProps = { className?: string };

const GlyphOrigin = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="8.5" strokeOpacity="0.35" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="4.5" strokeOpacity="0.6" />
    <path d="M12 1.5V22.5M1.5 12H22.5" strokeOpacity="0.45" />
    <path d="M12 6.5L13.3 10.7L17.5 12L13.3 13.3L12 17.5L10.7 13.3L6.5 12L10.7 10.7L12 6.5Z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

const GlyphExoplanet = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="5.5" />
    <path d="M9.5 7.2C11.5 9.5 11.5 14.5 9.5 16.8" strokeOpacity="0.45" />
    <ellipse cx="12" cy="12" rx="10.5" ry="3.4" transform="rotate(-22 12 12)" />
    <circle cx="19.8" cy="6.8" r="1.1" fill="currentColor" />
  </svg>
);

const GlyphSupernova = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="3.2" />
    <circle cx="12" cy="12" r="6.8" strokeOpacity="0.35" strokeDasharray="1.5 2.5" />
    <path d="M12 1V23M1 12H23" strokeLinecap="round" />
    <path d="M5.2 5.2L18.8 18.8M18.8 5.2L5.2 18.8" strokeOpacity="0.55" strokeLinecap="round" />
  </svg>
);

const GlyphConstellation = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <path d="M4.5 16.5L8.5 7.5L15 10.5L19.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 7.5L12.5 18L19.5 14" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="4.5" cy="16.5" r="1.4" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r="1.6" fill="currentColor" />
    <circle cx="15" cy="10.5" r="1.4" fill="currentColor" />
    <circle cx="19.5" cy="5.5" r="1.6" fill="currentColor" />
    <circle cx="12.5" cy="18" r="1.3" fill="currentColor" />
    <circle cx="19.5" cy="14" r="1.3" fill="currentColor" />
  </svg>
);

const GlyphSpiralGalaxy = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <path d="M12 12C12 9.5 14.5 8 16.8 9.2C19.5 10.6 19.8 14.5 17.2 16.8C14 19.6 8.5 18.8 6 15.2C3.2 11.2 4.8 5.2 9.5 3.5" strokeLinecap="round" />
    <path d="M12 12C12 14.5 9.5 16 7.2 14.8C4.5 13.4 4.2 9.5 6.8 7.2C10 4.4 15.5 5.2 18 8.8C20.8 12.8 19.2 18.8 14.5 20.5" strokeOpacity="0.65" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
  </svg>
);

const GlyphHeartSingularity = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="9.5" strokeOpacity="0.3" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(-30 12 12)" strokeOpacity="0.35" />
    <path
      d="M12 17.2C12 17.2 6.8 13.6 6.8 9.9C6.8 8.1 8.2 6.8 9.8 6.8C10.9 6.8 11.6 7.4 12 8.2C12.4 7.4 13.1 6.8 14.2 6.8C15.8 6.8 17.2 8.1 17.2 9.9C17.2 13.6 12 17.2 12 17.2Z"
      fill="currentColor"
      fillOpacity="0.18"
    />
  </svg>
);

const GlyphBlackHole = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <ellipse cx="12" cy="12" rx="10.5" ry="2.6" strokeOpacity="0.7" />
    <path d="M5.2 9.2C6.3 6.3 8.9 4.6 12 4.6C15.1 4.6 17.7 6.3 18.8 9.2" strokeOpacity="0.45" />
    <path d="M5.2 14.8C6.3 17.7 8.9 19.4 12 19.4C15.1 19.4 17.7 17.7 18.8 14.8" strokeOpacity="0.3" />
    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.85" />
  </svg>
);

const GlyphBinaryComet = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="8.2" cy="13.5" r="2.6" fill="currentColor" fillOpacity="0.25" />
    <circle cx="15.8" cy="10.5" r="2.1" fill="currentColor" fillOpacity="0.25" />
    <path d="M4.5 16.5C6.5 18.5 11.5 18.2 15.8 14.5" strokeOpacity="0.45" strokeLinecap="round" />
    <path d="M19.5 7.5C17.5 5.5 12.5 5.8 8.2 9.5" strokeOpacity="0.45" strokeLinecap="round" />
    <path d="M3.5 6.5C8.5 5.2 14.5 4.2 20.5 3.5" strokeOpacity="0.75" strokeLinecap="round" />
    <circle cx="20.2" cy="3.6" r="1.3" fill="currentColor" />
  </svg>
);

const GlyphProjector = ({ className = 'w-4 h-4', active = false }: GlyphProps & { active?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <path d="M3 7V5C3 4.4 3.4 4 4 4H6M18 4H20C20.6 4 21 4.4 21 5V7M21 17V19C21 19.6 20.6 20 20 20H18M6 20H4C3.4 20 3 19.6 3 19V17" strokeLinecap="round" />
    {active ? (
      <path d="M10 9V15M14 9V15" strokeWidth="1.5" strokeLinecap="round" />
    ) : (
      <path d="M10 8.8L15.8 12L10 15.2V8.8Z" fill="currentColor" fillOpacity="0.25" strokeLinejoin="round" />
    )}
  </svg>
);

const GlyphSoundWave = ({ className = 'w-4 h-4', muted = false }: GlyphProps & { muted?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.3">
    {muted ? (
      <>
        <path d="M4 12H20" strokeOpacity="0.4" strokeLinecap="round" />
        <path d="M7 7L17 17" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M4 10V14" strokeLinecap="round" />
        <path d="M8 7V17" strokeLinecap="round" />
        <path d="M12 4V20" strokeLinecap="round" />
        <path d="M16 8V16" strokeLinecap="round" />
        <path d="M20 10.5V13.5" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const GlyphAperture = ({ className = 'w-4 h-4', hiddenHud = false }: GlyphProps & { hiddenHud?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="8" strokeOpacity={hiddenHud ? '0.9' : '0.55'} />
    <circle cx="12" cy="12" r="2.8" fill={hiddenHud ? 'currentColor' : 'none'} fillOpacity="0.3" />
    <path d="M12 2V4.5M12 19.5V22M2 12H4.5M19.5 12H22" strokeLinecap="round" />
  </svg>
);

const GlyphLetterSeal = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6L12 12.5L20.5 6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12.5" r="2.2" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

const GlyphArrowRight = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.25">
    <path d="M4 12H19.5M14.5 7L19.5 12L14.5 17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GlyphArrowLeft = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.25">
    <path d="M20 12H4.5M9.5 7L4.5 12L9.5 17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GlyphClose = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.25">
    <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
  </svg>
);

const GlyphReturn = ({ className = 'w-4 h-4' }: GlyphProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.25">
    <path d="M4.5 9.5H15.5C17.7 9.5 19.5 11.3 19.5 13.5C19.5 15.7 17.7 17.5 15.5 17.5H9" strokeLinecap="round" />
    <path d="M8 6L4.5 9.5L8 13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================================================
// CONTENIDO NARRATIVO DEL VIAJE (edita aquí nombres, fechas y textos)
// ============================================================================
const CONTENT = {
  recipientName: 'Matilde',
  senderSignature: 'Siempre tuyo',
  phase1Badge: 'Mi universo eres tú',
  phase1Subtitle: 'Antes de ti, todo esto era solo oscuridad.',
  phase2Quote: 'Entre tantos mundos posibles, siempre elegiría el tuyo.',
  phase2Detail:
    'Recorrería cada órbita, cada océano de luz, cada rincón sin nombre… y aun así volvería, una y otra vez, al instante en que te conocí.',
  phase3Quote: 'Hay estrellas que se apagan antes de que su luz nos alcance. La tuya llegó a tiempo.',
  phase3Detail: 'Millones de soles arden en la oscuridad, pero ninguno abriga como tu mirada.',
  phase4Quote: 'Las estrellas ya estaban ahí. Nadie las había unido hasta que llegaste tú.',
  constellationNodes: [
    {
      id: 'alfa',
      label: 'La primera luz',
      date: 'El primer destello',
      text: 'Entre tantas probabilidades, tú y yo coincidimos. El universo no suele ser tan generoso.'
    },
    {
      id: 'beta',
      label: 'Nuestra órbita',
      date: 'Nuestra fecha',
      text: 'El día en que dejamos de viajar solos y empezamos a girar alrededor del mismo sueño.'
    },
    {
      id: 'gamma',
      label: 'El mismo cielo',
      date: 'Mismo cielo',
      text: 'Estés donde estés, si miras hacia arriba, estamos mirando el mismo cielo.'
    },
    {
      id: 'delta',
      label: 'Para siempre',
      date: 'Siempre',
      text: 'Cada risa, cada momento, cada promesa: una estrella más que nadie podrá apagar.'
    }
  ],
  phase5Quote:
    'Dicen que cerca de un agujero negro una hora vale siete años. Contigo lo entendí: el tiempo se detiene cuando me miras.',
  phase5Detail:
    'Hay fuerzas que no se explican, solo se sienten. La tuya me atrajo sin pedir permiso, y nunca quise escapar.',
  phase6Quote:
    'Existen estrellas binarias que nacen del mismo cielo y giran abrazadas por toda la eternidad.',
  phase6Detail:
    'Mientras danzan juntas, un cometa de hielo y oro cruza la noche una vez cada mil años. Pide un deseo conmigo.',
  galaxyMemories: [
    {
      id: 'mem1',
      title: 'Tu sonrisa',
      text: 'La única gravedad capaz de encender en oro mis días más callados.'
    },
    {
      id: 'mem2',
      title: 'Nuestros momentos',
      text: 'Instantes pequeños que guardo como supernovas, ardiendo en el centro de mi memoria.'
    },
    {
      id: 'mem3',
      title: 'Lo que viene',
      text: 'Todo lo que aún no hemos vivido, expandiéndose más allá del horizonte.'
    }
  ],
  phase8Quote: 'De todos los lugares del universo, mi favorito siempre será donde estés tú.',
  letterTitle: 'Para ti, mi universo entero',
  letterBody: `Matilde:\n\nA veces miro la noche y pienso en lo improbable que es todo esto. Un universo de trece mil millones de años, y tú y yo coincidiendo justo aquí, justo ahora.\n\nAntes de ti, las estrellas eran solo puntos lejanos. Después de ti aprendieron a decir algo. Te volviste el planeta donde quiero quedarme, la luz que encuentro cuando todo se apaga, los dos soles que nunca dejan de buscarse y la galaxia entera que no me alcanza la vida para recorrer.\n\nGracias por tu ternura, por tu risa, por esa forma tuya de hacer que lo cotidiano brille.\n\nQue el cosmos sea infinito si quiere. Yo ya encontré mi lugar en él: a tu lado.`
};

const TOTAL_PHASES = 8;

const PHASES_METADATA = [
  { id: 1, roman: 'I', code: 'I · El comienzo', title: 'Antes de ti', icon: GlyphOrigin },
  { id: 2, roman: 'II', code: 'II · Mi mundo', title: 'Eres mi mundo', icon: GlyphExoplanet },
  { id: 3, roman: 'III', code: 'III · Mi estrella', title: 'Eres mi estrella favorita', icon: GlyphSupernova },
  { id: 4, roman: 'IV', code: 'IV · Nuestra constelación', title: 'Un destino entre millones', icon: GlyphConstellation },
  { id: 5, roman: 'V', code: 'V · Gargantúa', title: 'Donde el tiempo se detiene', icon: GlyphBlackHole },
  { id: 6, roman: 'VI', code: 'VI · Almas binarias', title: 'Dos soles y un deseo', icon: GlyphBinaryComet },
  { id: 7, roman: 'VII', code: 'VII · Mi galaxia', title: 'Eres toda mi galaxia', icon: GlyphSpiralGalaxy },
  { id: 8, roman: 'VIII', code: 'VIII · Mi lugar favorito', title: 'Donde estés tú', icon: GlyphHeartSingularity }
];

// Banda sonora fija (Interstellar · Hans Zimmer) servida desde /public
const SOUNDTRACK_VOLUME = 0.8;

// ============================================================================
// SHADERS GLSL CINEMATOGRÁFICOS (RUIDO SIMPLEX 3D, PLANETA, SUPERNOVA, GALAXIA)
// ============================================================================
const GLSL_NOISE_3D = `
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.08;
      amplitude *= 0.48;
    }
    return value;
  }
`;

// Generador de texturas suaves para nebulosas y destellos
function createRadialGlowTexture(
  inner = 'rgba(255,255,255,1)',
  mid = 'rgba(192,132,252,0.55)',
  outer = 'rgba(76,29,149,0.12)'
) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.18, mid);
  grad.addColorStop(0.55, outer);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function createOrganicNebulaTexture(r: number, g: number, b: number, secondaryR: number, secondaryG: number, secondaryB: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 512, 512);
  // Nube orgánica compuesta por múltiples lóbulos difusos (evita círculos planos)
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = Math.pow(Math.random(), 0.7) * 115;
    const cx = 256 + Math.cos(angle) * dist;
    const cy = 256 + Math.sin(angle) * dist;
    const rad = 65 + Math.random() * 115;
    const useSec = i % 3 === 0;
    const cr = useSec ? secondaryR : r;
    const cg = useSec ? secondaryG : g;
    const cb = useSec ? secondaryB : b;
    const alpha = 0.035 + Math.random() * 0.045;

    const gGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, rad);
    gGrad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${alpha})`);
    gGrad.addColorStop(0.45, `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.45})`);
    gGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

// ============================================================================
// COMPONENTE PRINCIPAL DE LA EXPERIENCIA CINEMATOGRÁFICA
// ============================================================================
export default function App() {
  const content = CONTENT;

  const [phase, setPhase] = useState(1);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [autoPilot, setAutoPilot] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [introDone, setIntroDone] = useState(true);

  // Interacciones cinematográficas por fase
  const [planetDive, setPlanetDive] = useState(false); // Acto II: Vuelo rasante sobre el océano y auroras
  const [starTouched, setStarTouched] = useState(false); // Acto III: Erupción de luz de la estrella
  const [selectedStarNode, setSelectedStarNode] = useState(0); // Acto IV: Estrella activa en la constelación
  const [horizonDive, setHorizonDive] = useState(false); // Acto V: Congelación relativista del tiempo en Gargantúa
  const [cometWish, setCometWish] = useState(false); // Acto VI: Deseo en los dos soles binarios y el gran cometa
  const [activeGalaxyMemory, setActiveGalaxyMemory] = useState(0); // Acto VII: Recuerdo activo en la galaxia
  const [letterOpen, setLetterOpen] = useState(false); // Acto VIII: Carta final
  const [hudHidden, setHudHidden] = useState(false); // Modo película pura

  // Banda sonora fija
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Referencias para Three.js y estado reactivo dentro del loop 60fps
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    phase: 1,
    journeyStarted: false,
    introDone: true,
    planetDive: false,
    starTouched: false,
    selectedStarNode: 0,
    horizonDive: false,
    cometWish: false,
    activeGalaxyMemory: 0,
    letterOpen: false,
    starPulseTime: 0,
    nodePulseTime: 0,
    timeFreezePulse: 0,
    cometPulseTime: 0,
    galaxyPulseTime: 0,
    meteorShowerQueue: 0,
    warpBurst: 0,
    mouseX: 0,
    mouseY: 0
  });

  // Sincronizar estado con el motor 3D
  useEffect(() => {
    stateRef.current.phase = phase;
    stateRef.current.journeyStarted = journeyStarted;
    stateRef.current.planetDive = planetDive;
    stateRef.current.starTouched = starTouched;
    stateRef.current.selectedStarNode = selectedStarNode;
    stateRef.current.horizonDive = horizonDive;
    stateRef.current.cometWish = cometWish;
    stateRef.current.activeGalaxyMemory = activeGalaxyMemory;
    stateRef.current.letterOpen = letterOpen;

    if (phase !== 2) setPlanetDive(false);
    if (phase !== 5) setHorizonDive(false);
    if (phase !== 6) setCometWish(false);
  }, [
    phase,
    journeyStarted,
    planetDive,
    starTouched,
    selectedStarNode,
    horizonDive,
    cometWish,
    activeGalaxyMemory,
    letterOpen
  ]);

  // Transición suave de textos flotantes al cambiar de fase
  useEffect(() => {
    setTextVisible(false);
    const t = setTimeout(() => setTextVisible(true), 240);
    return () => clearTimeout(t);
  }, [phase]);

  // ------------------------------------------------------------------------
  // BANDA SONORA (Interstellar) · suena desde el primer instante
  // ------------------------------------------------------------------------
  const fadeAudioTo = (target: number, durationMs: number) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    const start = a.volume;
    const t0 = performance.now();
    fadeTimerRef.current = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / durationMs);
      const eased = k * k * (3 - 2 * k);
      try {
        a.volume = Math.max(0, Math.min(1, start + (target - start) * eased));
      } catch {
        // iOS no permite controlar el volumen por código
      }
      if (k >= 1 && fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    }, 50);
  };

  // Debe llamarse de forma síncrona dentro de un gesto del usuario
  const ensureSoundtrack = (): Promise<boolean> => {
    const a = audioRef.current;
    if (!a) return Promise.resolve(false);
    if (!a.paused) return Promise.resolve(true);
    try {
      a.volume = 0;
    } catch {
      // iOS
    }
    const p = a.play();
    if (!p) {
      fadeAudioTo(SOUNDTRACK_VOLUME, 4500);
      return Promise.resolve(true);
    }
    return p
      .then(() => {
        fadeAudioTo(SOUNDTRACK_VOLUME, 4500);
        return true;
      })
      .catch(() => false);
  };

  const beginUniverse = () => {
    stateRef.current.introDone = true;
    setIntroDone(true);
  };

  useEffect(() => {
    ensureSoundtrack().then((ok) => {
      if (ok) beginUniverse();
    });

    const unlock = () => {
      ensureSoundtrack();
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('touchend', unlock, { passive: true });
    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);

    const handleVisibility = () => {
      const a = audioRef.current;
      if (!a || !stateRef.current.introDone) return;
      if (document.hidden) a.pause();
      else a.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('touchend', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    };
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const a = audioRef.current;
    if (a) {
      a.muted = nextMuted;
      if (!nextMuted) ensureSoundtrack();
    }
  };

  const goToPhase = (targetPhase: number) => {
    const clamped = Math.max(1, Math.min(TOTAL_PHASES, targetPhase));
    if (!journeyStarted && clamped > 1) {
      setJourneyStarted(true);
    }
    ensureSoundtrack();
    stateRef.current.warpBurst = 1.05;
    setPhase(clamped);
  };

  const handleStartJourney = () => {
    setJourneyStarted(true);
    ensureSoundtrack();
    stateRef.current.warpBurst = 1.25;
    setPhase(2);
  };

  const handleTouchStar = () => {
    setStarTouched(true);
    stateRef.current.starPulseTime = 1.0;
    stateRef.current.meteorShowerQueue = Math.max(stateRef.current.meteorShowerQueue, 2);
  };

  const handleSelectConstellationNode = (idx: number) => {
    setSelectedStarNode(idx);
    stateRef.current.selectedStarNode = idx;
    stateRef.current.nodePulseTime = 1.0;
    stateRef.current.meteorShowerQueue = Math.max(stateRef.current.meteorShowerQueue, idx === 2 ? 3 : 2);
  };

  const handleToggleTimeFreeze = () => {
    const next = !horizonDive;
    setHorizonDive(next);
    stateRef.current.horizonDive = next;
    stateRef.current.timeFreezePulse = 1.0;
  };

  const handleTriggerCometWish = () => {
    const next = !cometWish;
    setCometWish(next);
    stateRef.current.cometWish = next;
    stateRef.current.cometPulseTime = 1.0;
    if (next) {
      stateRef.current.meteorShowerQueue = Math.max(stateRef.current.meteorShowerQueue, 5);
    }
  };

  const handleSelectGalaxyMemory = (idx: number) => {
    setActiveGalaxyMemory(idx);
    stateRef.current.activeGalaxyMemory = idx;
    stateRef.current.galaxyPulseTime = 1.0;
    if (idx === 2) {
      stateRef.current.meteorShowerQueue = Math.max(stateRef.current.meteorShowerQueue, 4);
    }
  };

  const handleToggleAutoPilot = () => {
    ensureSoundtrack();
    if (!autoPilot) {
      setAutoPilot(true);
      setAutoProgress(0);
      if (phase === 1) {
        setJourneyStarted(true);
        stateRef.current.warpBurst = 1.25;
        setPhase(2);
      } else if (phase >= TOTAL_PHASES) {
        setLetterOpen(false);
        setJourneyStarted(true);
        stateRef.current.warpBurst = 1.25;
        setPhase(2);
      }
    } else {
      setAutoPilot(false);
      setAutoProgress(0);
    }
  };

  // Modo Director / Recorrido Automático con barra de progreso y coreografía por acto
  useEffect(() => {
    if (!autoPilot) {
      setAutoProgress(0);
      return;
    }

    const durationMs = phase === 4 || phase === 7 ? 11500 : 9200;
    const t0 = performance.now();
    const firedSteps = new Set<string>();

    const interval = setInterval(() => {
      const elapsedMs = performance.now() - t0;
      const pct = Math.min(100, (elapsedMs / durationMs) * 100);
      setAutoProgress(pct);

      if (phase === 2 && pct > 38 && !firedSteps.has('dive')) {
        firedSteps.add('dive');
        setPlanetDive(true);
      } else if (phase === 3 && pct > 36 && !firedSteps.has('star')) {
        firedSteps.add('star');
        handleTouchStar();
      } else if (phase === 4) {
        if (pct > 22 && !firedSteps.has('n1')) {
          firedSteps.add('n1');
          handleSelectConstellationNode(1);
        } else if (pct > 48 && !firedSteps.has('n2')) {
          firedSteps.add('n2');
          handleSelectConstellationNode(2);
        } else if (pct > 74 && !firedSteps.has('n3')) {
          firedSteps.add('n3');
          handleSelectConstellationNode(3);
        }
      } else if (phase === 5 && pct > 38 && !firedSteps.has('bh')) {
        firedSteps.add('bh');
        setHorizonDive(true);
        stateRef.current.horizonDive = true;
        stateRef.current.timeFreezePulse = 1.0;
      } else if (phase === 6 && pct > 36 && !firedSteps.has('wish')) {
        firedSteps.add('wish');
        setCometWish(true);
        stateRef.current.cometWish = true;
        stateRef.current.cometPulseTime = 1.0;
        stateRef.current.meteorShowerQueue = 5;
      } else if (phase === 7) {
        if (pct > 32 && !firedSteps.has('m1')) {
          firedSteps.add('m1');
          handleSelectGalaxyMemory(1);
        } else if (pct > 66 && !firedSteps.has('m2')) {
          firedSteps.add('m2');
          handleSelectGalaxyMemory(2);
        }
      } else if (phase === 8 && pct > 62 && !firedSteps.has('letter')) {
        firedSteps.add('letter');
        setLetterOpen(true);
      }

      if (elapsedMs >= durationMs) {
        clearInterval(interval);
        if (phase < TOTAL_PHASES) {
          goToPhase(phase + 1);
        } else {
          setAutoPilot(false);
          setAutoProgress(0);
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [autoPilot, phase]);

  // Navegación con teclado (Flechas / Espacio) para sensación de película
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (letterOpen || !introDone) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (phase === 1 && !journeyStarted) {
          handleStartJourney();
        } else if (phase < TOTAL_PHASES) {
          goToPhase(phase + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (phase > 1) goToPhase(phase - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, journeyStarted, letterOpen, introDone]);

  // ============================================================================
  // ESCENA 3D CONTINUA CON SHADERS GLSL PERSONALIZADOS Y TRAYECTORIA SPLINE
  // ============================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const getContainerSize = () => {
      const w = container.clientWidth || window.innerWidth || 1280;
      const h = container.clientHeight || window.innerHeight || 720;
      return {
        width: Math.max(1, w),
        height: Math.max(1, h)
      };
    };

    const initialSize = getContainerSize();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020207);
    scene.fog = new THREE.FogExp2(0x020207, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      52,
      initialSize.width / initialSize.height,
      0.1,
      1600
    );
    camera.position.set(0, 0, 165);
    scene.add(camera); // Necesario para las estrellas fugaces ancladas a la cámara

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(initialSize.width, initialSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Texturas orgánicas generadas en memoria
    const whiteGlowTex = createRadialGlowTexture(
      'rgba(255,255,255,1)',
      'rgba(224,242,254,0.75)',
      'rgba(56,189,248,0.12)'
    );
    const goldGlowTex = createRadialGlowTexture(
      'rgba(255,255,255,1)',
      'rgba(253,224,71,0.82)',
      'rgba(244,114,182,0.18)'
    );
    const magentaGlowTex = createRadialGlowTexture(
      'rgba(255,255,255,1)',
      'rgba(232,121,249,0.85)',
      'rgba(147,51,234,0.22)'
    );

    const nebulaCyanTex = createOrganicNebulaTexture(34, 211, 238, 59, 130, 246);
    const nebulaVioletTex = createOrganicNebulaTexture(168, 85, 247, 236, 72, 153);
    const nebulaRoseGoldTex = createOrganicNebulaTexture(244, 114, 182, 251, 191, 36);

    // ------------------------------------------------------------------------
    // 1. CAMPO ESTELAR RELATIVISTA (12,000 ESTRELLAS CON SHADER DE CENTELLEO Y WARP)
    // ------------------------------------------------------------------------
    const starCount = 12000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount);

    const starPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#e0f2fe'),
      new THREE.Color('#bae6fd'),
      new THREE.Color('#e9d5ff'),
      new THREE.Color('#fbcfe8'),
      new THREE.Color('#fef08a')
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Distribución cilíndrica profunda a lo largo de todo el viaje (Z: +220 a -420)
      const r = 12 + Math.pow(Math.random(), 1.3) * 280;
      const theta = Math.random() * Math.PI * 2;
      starPositions[i3] = Math.cos(theta) * r;
      starPositions[i3 + 1] = Math.sin(theta) * r * 0.75;
      starPositions[i3 + 2] = 220 - Math.random() * 640;

      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;

      starSizes[i] = 0.7 + Math.pow(Math.random(), 2.6) * 3.4;
      starPhases[i] = Math.random() * Math.PI * 2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));
    starGeo.setAttribute('aPhase', new THREE.BufferAttribute(starPhases, 1));

    const starFieldMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAwakening: { value: 0.1 },
        uWarp: { value: 0.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float uTime;
        uniform float uWarp;
        uniform float uPixelRatio;

        void main() {
          vColor = aColor;
          vTwinkle = 0.65 + 0.35 * sin(uTime * 2.4 + aPhase);
          vec3 pos = position;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float dist = max(1.0, -mvPosition.z);
          gl_PointSize = (aSize * (1.0 + uWarp * 1.35) * uPixelRatio * 155.0) / dist;
          gl_PointSize = clamp(gl_PointSize, 0.8, 32.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float uAwakening;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;
          float core = exp(-d * 9.5);
          float halo = smoothstep(0.5, 0.0, d) * 0.45;
          float alpha = (core + halo) * vTwinkle * uAwakening;
          gl_FragColor = vec4(vColor + vec3(core * 0.4), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(starGeo, starFieldMat);
    scene.add(starField);

    // Volúmenes nebulosos profundos a lo largo del corredor espacial
    const nebulaGroup = new THREE.Group();
    const nebulaDefs = [
      // Acto I: Nebulosa origen
      { x: -24, y: 12, z: 105, s: 85, tex: nebulaVioletTex, op: 0.48 },
      { x: 28, y: -15, z: 92, s: 75, tex: nebulaCyanTex, op: 0.36 },
      // Acto II: Resplandor detrás del exoplaneta azul
      { x: 42, y: 14, z: 28, s: 95, tex: nebulaCyanTex, op: 0.68 },
      { x: 18, y: -6, z: 36, s: 70, tex: nebulaVioletTex, op: 0.38 },
      // Acto III: Gran nebulosa magenta/violeta de la Supernova
      { x: -42, y: -10, z: -46, s: 105, tex: nebulaVioletTex, op: 0.78 },
      { x: -34, y: -18, z: -38, s: 85, tex: nebulaRoseGoldTex, op: 0.65 },
      // Acto IV: Dosel cósmico alrededor de la constelación (sin mancha inferior)
      { x: -8, y: 36, z: -138, s: 82, tex: nebulaCyanTex, op: 0.42 },
      { x: 36, y: 32, z: -136, s: 82, tex: nebulaVioletTex, op: 0.38 },
      // Acto VI: Pilares nebulosos de los Dos Soles Binarios y el Gran Cometa
      { x: 54, y: -4, z: -258, s: 98, tex: nebulaCyanTex, op: 0.56 },
      { x: 38, y: -14, z: -252, s: 88, tex: nebulaRoseGoldTex, op: 0.52 }
    ];

    nebulaDefs.forEach((n) => {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: n.tex,
          transparent: true,
          opacity: n.op,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      sp.position.set(n.x, n.y, n.z);
      sp.scale.set(n.s, n.s, 1);
      nebulaGroup.add(sp);
    });
    scene.add(nebulaGroup);

    // Polvo cósmico volumétrico 3D flotando en el corredor de cámara (bokeh tipo película)
    const dustCount = 1400;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustCol = new Float32Array(dustCount * 3);
    const dustScale = new Float32Array(dustCount);
    const dustSeed = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPos[i3] = (Math.random() - 0.5) * 150;
      dustPos[i3 + 1] = (Math.random() - 0.5) * 95;
      dustPos[i3 + 2] = 175 - Math.random() * 560;
      const c = i % 3 === 0 ? new THREE.Color('#fde68a') : i % 3 === 1 ? new THREE.Color('#7dd3fc') : new THREE.Color('#f5d0fe');
      dustCol[i3] = c.r;
      dustCol[i3 + 1] = c.g;
      dustCol[i3 + 2] = c.b;
      dustScale[i] = 1.2 + Math.pow(Math.random(), 2.2) * 3.8;
      dustSeed[i] = Math.random() * Math.PI * 2;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('aColor', new THREE.BufferAttribute(dustCol, 3));
    dustGeo.setAttribute('aScale', new THREE.BufferAttribute(dustScale, 1));
    dustGeo.setAttribute('aSeed', new THREE.BufferAttribute(dustSeed, 1));
    const cosmicDustMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aColor;
        attribute float aScale;
        attribute float aSeed;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        void main() {
          vColor = aColor;
          vec3 p = position;
          p.x += sin(uTime * 0.35 + aSeed) * 1.4;
          p.y += cos(uTime * 0.28 + aSeed * 1.3) * 1.4;
          p.z += sin(uTime * 0.22 + aSeed * 0.7) * 1.1;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float dist = max(1.0, -mv.z);
          float fadeNear = smoothstep(2.0, 14.0, dist);
          float fadeFar = 1.0 - smoothstep(95.0, 180.0, dist);
          vAlpha = fadeNear * fadeFar * (0.28 + 0.22 * sin(uTime * 1.8 + aSeed * 3.0));
          gl_PointSize = clamp((aScale * uPixelRatio * 120.0) / dist, 1.0, 26.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float bokeh = smoothstep(0.5, 0.12, d) * (0.65 + 0.35 * exp(-d * 6.0));
          gl_FragColor = vec4(vColor, bokeh * vAlpha);
        }
      `
    });
    scene.add(new THREE.Points(dustGeo, cosmicDustMat));

    // ------------------------------------------------------------------------
    // 2. FASE 02 · EXOPLANETA PROCEDURAL 3D ("KEPLER-MEL 02") EN (35, 8, 45)
    //    Con océanos especulares, continentes FBM 3D, luces nocturnas bioluminiscentes,
    //    auroras polares, nubes dinámicas, atmósfera Rayleigh y anillos de hielo.
    // ------------------------------------------------------------------------
    const planetGroup = new THREE.Group();
    planetGroup.position.set(35, 8, 45);
    planetGroup.rotation.z = 0.22; // Inclinación axial realista
    scene.add(planetGroup);

    const sunDirection = new THREE.Vector3(-1.0, 0.45, 0.75).normalize();

    const planetGeo = new THREE.SphereGeometry(9.6, 128, 128);
    const planetMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunDir: { value: sunDirection }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;

        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPosition.xyz;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        uniform float uTime;
        uniform vec3 uSunDir;

        void main() {
          vec3 p = normalize(vPosition) * 2.35;
          // Domain warping para costas, archipiélagos y cordilleras realistas
          vec3 q = vec3(
            fbm(p + vec3(0.0, 0.0, 0.0)),
            fbm(p + vec3(5.2, 1.3, 2.8)),
            fbm(p + vec3(1.7, 9.2, 3.4))
          );
          float elevation = fbm(p + 1.85 * q);
          float detail = fbm(p * 6.0 + q * 2.0);

          // Perturbación sutil de la normal para relieve topográfico en tierra
          float isLand = smoothstep(0.02, 0.07, elevation);
          vec3 N = normalize(vWorldNormal + vec3(detail * 0.14 * isLand));
          vec3 V = normalize(cameraPosition - vWorldPos);
          vec3 L = normalize(uSunDir);

          float ndotl = dot(N, L);
          float dayFactor = smoothstep(-0.18, 0.28, ndotl);
          float twilight = smoothstep(-0.22, 0.08, ndotl) * (1.0 - smoothstep(0.08, 0.38, ndotl));

          // Paleta oceánica y continental cinematográfica
          vec3 deepOcean = vec3(0.015, 0.07, 0.19);
          vec3 midOcean = vec3(0.02, 0.24, 0.48);
          vec3 shallowLagoon = vec3(0.08, 0.68, 0.85);
          vec3 coastSand = vec3(0.55, 0.72, 0.68);
          vec3 lushContinent = vec3(0.06, 0.34, 0.28);
          vec3 highland = vec3(0.24, 0.26, 0.32);
          vec3 snowPeak = vec3(0.92, 0.96, 1.0);

          vec3 surfaceColor = deepOcean;
          if (elevation < 0.04) {
            float t = smoothstep(-0.45, 0.04, elevation);
            surfaceColor = mix(deepOcean, midOcean, t);
            surfaceColor = mix(surfaceColor, shallowLagoon, smoothstep(-0.04, 0.04, elevation));
          } else {
            float tLand = smoothstep(0.04, 0.48, elevation + detail * 0.08);
            surfaceColor = mix(coastSand, lushContinent, smoothstep(0.04, 0.11, elevation));
            surfaceColor = mix(surfaceColor, highland, smoothstep(0.18, 0.34, elevation + detail * 0.06));
            surfaceColor = mix(surfaceColor, snowPeak, smoothstep(0.35, 0.52, elevation + abs(vPosition.y) * 0.025));
          }

          // Casquetes polares suaves
          float latitude = abs(normalize(vPosition).y);
          float iceCap = smoothstep(0.76, 0.92, latitude + detail * 0.08);
          surfaceColor = mix(surfaceColor, snowPeak, iceCap);

          // Reflejo especular solar en los océanos (Sun Glint tipo Interstellar)
          vec3 H = normalize(L + V);
          float oceanMask = (1.0 - isLand) * (1.0 - iceCap * 0.8);
          float spec = pow(max(dot(N, H), 0.0), 48.0) * oceanMask * max(0.0, ndotl);
          float broadSpec = pow(max(dot(N, H), 0.0), 10.0) * oceanMask * max(0.0, ndotl);
          vec3 specColor = vec3(0.65, 0.92, 1.0) * spec * 1.35 + vec3(0.18, 0.62, 0.95) * broadSpec * 0.45;

          // Iluminación diurna + color cálido en el terminador (atardecer planetario)
          vec3 litColor = surfaceColor * (0.06 + 1.25 * max(0.0, ndotl));
          litColor += vec3(0.95, 0.42, 0.25) * twilight * 0.28 * (0.5 + 0.5 * isLand);
          litColor += specColor;

          // Lado nocturno: filamentos bioluminiscentes / ciudades de luz dorada y cian
          float nightMask = smoothstep(0.08, -0.25, ndotl);
          float cityPattern = smoothstep(0.24, 0.29, abs(detail)) * smoothstep(0.05, 0.25, elevation) * (1.0 - iceCap);
          float cityCluster = smoothstep(0.1, 0.55, snoise(p * 3.5));
          vec3 nightLights = mix(vec3(1.0, 0.78, 0.35), vec3(0.25, 0.88, 1.0), 0.4) * cityPattern * cityCluster * nightMask * 1.4;

          // Auroras polares esmeralda/violeta en las regiones altas
          float auroraBand = smoothstep(0.62, 0.78, latitude) * (1.0 - smoothstep(0.78, 0.92, latitude));
          float auroraWave = snoise(vec3(p.x * 4.0 + uTime * 0.35, p.z * 4.0, uTime * 0.2));
          vec3 auroraColor = mix(vec3(0.15, 0.95, 0.75), vec3(0.72, 0.35, 0.98), 0.5 + 0.5 * auroraWave);
          litColor += auroraColor * auroraBand * smoothstep(0.1, 0.7, auroraWave) * (0.4 + 0.6 * nightMask) * 0.65;

          // Fresnel atmosférico integrado en la superficie
          float fresnel = pow(max(0.0, 1.0 - max(dot(N, V), 0.0)), 3.2);
          vec3 rimAtmos = mix(vec3(0.12, 0.58, 0.98), vec3(0.55, 0.85, 1.0), dayFactor) * fresnel * (0.35 + 0.65 * dayFactor);

          gl_FragColor = vec4(litColor + nightLights + rimAtmos, 1.0);
        }
      `
    });

    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Capa de nubes volumétricas animadas con shader FBM
    const cloudsGeo = new THREE.SphereGeometry(9.78, 96, 96);
    const cloudsMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunDir: { value: sunDirection }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPos;
        void main() {
          vPosition = position;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vPosition;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform vec3 uSunDir;

        void main() {
          vec3 p = normalize(vPosition) * 2.8;
          vec3 swirl = vec3(
            snoise(p + vec3(uTime * 0.025, 0.0, 0.0)),
            snoise(p + vec3(0.0, uTime * 0.02, 2.1)),
            snoise(p + vec3(4.3, 1.2, uTime * 0.025))
          );
          float n = fbm(p * 1.4 + swirl * 0.85);
          float cloudDensity = smoothstep(0.05, 0.48, n);

          float ndotl = dot(vWorldNormal, normalize(uSunDir));
          float day = smoothstep(-0.22, 0.32, ndotl);
          float sunset = smoothstep(-0.2, 0.05, ndotl) * (1.0 - smoothstep(0.05, 0.35, ndotl));

          vec3 cloudCol = mix(vec3(0.08, 0.16, 0.32), vec3(0.96, 0.98, 1.0), day);
          cloudCol += vec3(0.98, 0.52, 0.68) * sunset * 0.55;

          gl_FragColor = vec4(cloudCol, cloudDensity * (0.18 + 0.72 * day));
        }
      `,
      transparent: true,
      depthWrite: false
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    planetGroup.add(cloudsMesh);

    // Halo atmosférico exterior Rayleigh
    const atmosGeo = new THREE.SphereGeometry(10.85, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      uniforms: {
        uSunDir: { value: sunDirection }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vWorldNormal;
        uniform vec3 uSunDir;
        void main() {
          float viewRim = pow(max(0.0, 0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.9);
          float sunSide = smoothstep(-0.35, 0.65, dot(vWorldNormal, normalize(uSunDir)));
          vec3 col = mix(vec3(0.15, 0.45, 0.95), vec3(0.38, 0.82, 1.0), sunSide);
          gl_FragColor = vec4(col, 1.0) * viewRim * (0.45 + 0.95 * sunSide);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    planetGroup.add(atmosMesh);

    // Sistema de Anillos Planetarios (Shader con bandas radiales y división Cassini + partículas de hielo)
    const ringGeo = new THREE.RingGeometry(12.2, 21.5, 128);
    const ringMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPos;
        void main() {
          float r = length(vPos.xy);
          float normR = (r - 12.2) / (21.5 - 12.2);
          if (normR < 0.0 || normR > 1.0) discard;

          // Bandas concéntricas y división de Cassini
          float bands = 0.5 + 0.5 * sin(normR * 65.0) * cos(normR * 23.0);
          float cassiniGap = 1.0 - smoothstep(0.56, 0.60, normR) * (1.0 - smoothstep(0.63, 0.67, normR));
          float edgeFade = smoothstep(0.0, 0.12, normR) * (1.0 - smoothstep(0.82, 1.0, normR));

          vec3 innerCol = vec3(0.45, 0.85, 1.0);
          vec3 outerCol = vec3(0.75, 0.58, 0.98);
          vec3 col = mix(innerCol, outerCol, normR);

          float alpha = (0.12 + 0.26 * bands) * cassiniGap * edgeFade;
          gl_FragColor = vec4(col, alpha);
        }
      `
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2 - 0.28;
    ringMesh.rotation.y = 0.18;
    planetGroup.add(ringMesh);

    // Cristales de hielo orbitando en el anillo
    const ringIceCount = 1200;
    const ringIceGeo = new THREE.BufferGeometry();
    const ringIcePos = new Float32Array(ringIceCount * 3);
    for (let i = 0; i < ringIceCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const rad = 12.6 + Math.random() * 8.5;
      ringIcePos[i * 3] = Math.cos(a) * rad;
      ringIcePos[i * 3 + 1] = (Math.random() - 0.5) * 0.28;
      ringIcePos[i * 3 + 2] = Math.sin(a) * rad;
    }
    ringIceGeo.setAttribute('position', new THREE.BufferAttribute(ringIcePos, 3));
    const ringIcePoints = new THREE.Points(
      ringIceGeo,
      new THREE.PointsMaterial({
        size: 0.32,
        map: whiteGlowTex,
        color: 0xbae6fd,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    ringIcePoints.rotation.x = -0.28;
    ringIcePoints.rotation.z = 0.18;
    planetGroup.add(ringIcePoints);

    // Luna orbital acompañante
    const moonGroup = new THREE.Group();
    planetGroup.add(moonGroup);
    const moonGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const moonMat = new THREE.ShaderMaterial({
      uniforms: { uSunDir: { value: sunDirection } },
      vertexShader: `
        varying vec3 vPos;
        varying vec3 vWorldNormal;
        void main() {
          vPos = position;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vPos;
        varying vec3 vWorldNormal;
        uniform vec3 uSunDir;
        void main() {
          float n = fbm(normalize(vPos) * 4.5);
          float light = max(0.06, dot(vWorldNormal, normalize(uSunDir)));
          vec3 col = mix(vec3(0.45, 0.52, 0.65), vec3(0.85, 0.9, 0.98), n * 0.5 + 0.5);
          gl_FragColor = vec4(col * light * 1.2, 1.0);
        }
      `
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(16.5, 2.4, 8.0);
    moonGroup.add(moonMesh);

    // Estrella anfitriona brillante que ilumina al planeta azul desde la distancia
    const hostStarGroup = new THREE.Group();
    hostStarGroup.position.set(-28, 34, 82);
    scene.add(hostStarGroup);

    const hostStarCore = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: whiteGlowTex,
        color: 0xe0f2fe,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    hostStarCore.scale.set(18, 18, 1);
    hostStarGroup.add(hostStarCore);

    const hostStarFlare = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: whiteGlowTex,
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    hostStarFlare.scale.set(46, 1.4, 1);
    hostStarGroup.add(hostStarFlare);

    // ------------------------------------------------------------------------
    // 3. FASE 03 · LA ESTRELLA SUPERNOVA 3D ("ERES MI ESTRELLA FAVORITA") EN (-40, -12, -35)
    //    Con Fotosfera de Plasma Turbulento 3D (GLSL), Corona Solar, Rayos Volumétricos y Onda de Choque
    // ------------------------------------------------------------------------
    const supernovaGroup = new THREE.Group();
    supernovaGroup.position.set(-40, -12, -35);
    scene.add(supernovaGroup);

    const starSphereGeo = new THREE.SphereGeometry(4.6, 96, 96);
    const starSphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBoost: { value: 0 }
      },
      vertexShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uBoost;

        void main() {
          vPos = position;
          vNormal = normalize(normalMatrix * normal);
          float displacement = fbm(normalize(position) * 3.2 + vec3(uTime * 0.45)) * (0.22 + uBoost * 0.35);
          vec3 newPos = position + normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uBoost;

        void main() {
          vec3 p = normalize(vPos) * 4.0;
          float n1 = fbm(p + vec3(uTime * 0.5, -uTime * 0.35, uTime * 0.25));
          float n2 = fbm(p * 2.2 - vec3(uTime * 0.7));
          float plasma = smoothstep(-0.35, 0.65, n1 * 0.6 + n2 * 0.4);

          vec3 deepPlasma = vec3(0.88, 0.28, 0.82); // Magenta estelar
          vec3 midPlasma = vec3(1.0, 0.76, 0.28);  // Oro solar
          vec3 hotCore = vec3(1.0, 0.98, 0.95);    // Blanco incandescente

          vec3 col = mix(deepPlasma, midPlasma, plasma);
          col = mix(col, hotCore, smoothstep(0.45, 0.9, plasma + uBoost * 0.35));

          float rim = pow(max(0.0, 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)))), 1.8);
          col += vec3(1.0, 0.65, 0.95) * rim * 0.85;

          gl_FragColor = vec4(col * (1.25 + uBoost * 0.6), 1.0);
        }
      `
    });
    const supernovaMesh = new THREE.Mesh(starSphereGeo, starSphereMat);
    supernovaMesh.userData = { interactiveType: 'supernova' };
    supernovaGroup.add(supernovaMesh);

    // Corona volumétrica 3D exterior
    const coronaGeo = new THREE.SphereGeometry(6.4, 64, 64);
    const coronaMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uBoost: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vPos = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uBoost;
        void main() {
          float fresnel = pow(max(0.0, 0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.4);
          float prominences = 0.5 + 0.5 * snoise(normalize(vPos) * 5.0 + vec3(uTime * 0.6));
          vec3 col = mix(vec3(0.92, 0.35, 0.98), vec3(1.0, 0.85, 0.45), prominences);
          gl_FragColor = vec4(col, 1.0) * fresnel * (1.35 + uBoost * 1.1) * (0.65 + 0.5 * prominences);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    supernovaGroup.add(coronaMesh);

    // Halos y destellos anamórficos de lente cinematográfico
    const coreGlowSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: goldGlowTex,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    coreGlowSprite.scale.set(22, 22, 1);
    supernovaGroup.add(coreGlowSprite);

    const outerSupernovaNebula = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: magentaGlowTex,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    outerSupernovaNebula.scale.set(48, 48, 1);
    supernovaGroup.add(outerSupernovaNebula);

    const anamorphicHoriz = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: whiteGlowTex,
        color: 0xfdf4ff,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    anamorphicHoriz.scale.set(74, 2.2, 1);
    supernovaGroup.add(anamorphicHoriz);

    const anamorphicVert = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: goldGlowTex,
        color: 0xfef08a,
        transparent: true,
        opacity: 0.62,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    anamorphicVert.scale.set(2.2, 32, 1);
    supernovaGroup.add(anamorphicVert);

    // Nube de filamentos de eyección alrededor de la supernova
    const ejectaCount = 1800;
    const ejectaGeo = new THREE.BufferGeometry();
    const ejectaBasePos = new Float32Array(ejectaCount * 3);
    const ejectaCurPos = new Float32Array(ejectaCount * 3);
    const ejectaCols = new Float32Array(ejectaCount * 3);
    for (let i = 0; i < ejectaCount; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const rad = 5.5 + Math.pow(Math.random(), 1.6) * 22.0;

      const x = rad * Math.sin(phi) * Math.cos(theta);
      const y = rad * Math.sin(phi) * Math.sin(theta);
      const z = rad * Math.cos(phi);

      ejectaBasePos[i3] = x;
      ejectaBasePos[i3 + 1] = y;
      ejectaBasePos[i3 + 2] = z;
      ejectaCurPos[i3] = x;
      ejectaCurPos[i3 + 1] = y;
      ejectaCurPos[i3 + 2] = z;

      const c = i % 3 === 0 ? new THREE.Color('#fde047') : i % 3 === 1 ? new THREE.Color('#e879f9') : new THREE.Color('#38bdf8');
      ejectaCols[i3] = c.r;
      ejectaCols[i3 + 1] = c.g;
      ejectaCols[i3 + 2] = c.b;
    }
    ejectaGeo.setAttribute('position', new THREE.BufferAttribute(ejectaCurPos, 3));
    ejectaGeo.setAttribute('color', new THREE.BufferAttribute(ejectaCols, 3));
    const ejectaPoints = new THREE.Points(
      ejectaGeo,
      new THREE.PointsMaterial({
        size: 0.75,
        map: whiteGlowTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    supernovaGroup.add(ejectaPoints);

    // Onda expansiva esférica al tocar la estrella
    const shockwaveGeo = new THREE.RingGeometry(1.0, 1.45, 96);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const shockwaveRing = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    supernovaGroup.add(shockwaveRing);

    // Estrellas compañeras cercanas a la Supernova que se conectan al tocar su luz (Fase 03)
    const companionStarOffsets = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-12, 7, -4),
      new THREE.Vector3(-18, -3, 2),
      new THREE.Vector3(11, 9, -3),
      new THREE.Vector3(17, -4, 3),
      new THREE.Vector3(4, -11, -2)
    ];
    const supernovaFilamentMat = new THREE.LineBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    const supernovaFilamentLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        companionStarOffsets[1],
        companionStarOffsets[0],
        companionStarOffsets[3],
        companionStarOffsets[4],
        companionStarOffsets[5],
        companionStarOffsets[0],
        companionStarOffsets[2]
      ]),
      supernovaFilamentMat
    );
    supernovaGroup.add(supernovaFilamentLine);

    companionStarOffsets.slice(1).forEach((pos, idx) => {
      const compSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: idx % 2 === 0 ? goldGlowTex : whiteGlowTex,
          color: 0xfef9c3,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      compSprite.position.copy(pos);
      const s = 2.6 + (idx % 3) * 0.9;
      compSprite.scale.set(s, s, 1);
      supernovaGroup.add(compSprite);
    });

    // ------------------------------------------------------------------------
    // 4. ACTO IV · SANTUARIO 3D DE NUESTRA CONSTELACIÓN Y ASTROLABIO ARMILAR EN (15, 28, -125)
    // ------------------------------------------------------------------------
    const constellationGroup = new THREE.Group();
    constellationGroup.position.set(15, 28, -125);
    scene.add(constellationGroup);

    // 4.1 Esfera Armilar Giroscópica 3D (3 anillos celestes inclinados + 420 marcas graduadas de luz)
    const astrolabeGroup = new THREE.Group();
    constellationGroup.add(astrolabeGroup);

    const astroRing1Mat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const astroRing1 = new THREE.Mesh(new THREE.TorusGeometry(18.5, 0.065, 16, 180), astroRing1Mat);
    astrolabeGroup.add(astroRing1);

    // 180 marcas graduadas de astrolabio en el anillo interior
    const ticks1Count = 180;
    const ticks1Geo = new THREE.BufferGeometry();
    const ticks1Pos = new Float32Array(ticks1Count * 3);
    for (let i = 0; i < ticks1Count; i++) {
      const a = (i / ticks1Count) * Math.PI * 2;
      const r = i % 15 === 0 ? 19.15 : 18.82;
      ticks1Pos[i * 3] = Math.cos(a) * r;
      ticks1Pos[i * 3 + 1] = Math.sin(a) * r;
      ticks1Pos[i * 3 + 2] = 0;
    }
    ticks1Geo.setAttribute('position', new THREE.BufferAttribute(ticks1Pos, 3));
    const ticks1Mat = new THREE.PointsMaterial({
      size: 0.55,
      map: goldGlowTex,
      color: 0xfef08a,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    astroRing1.add(new THREE.Points(ticks1Geo, ticks1Mat));

    const astroRing2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const astroRing2 = new THREE.Mesh(new THREE.TorusGeometry(23.2, 0.055, 16, 180), astroRing2Mat);
    astroRing2.rotation.x = 0.52;
    astroRing2.rotation.y = 0.28;
    astrolabeGroup.add(astroRing2);

    const ticks2Count = 240;
    const ticks2Geo = new THREE.BufferGeometry();
    const ticks2Pos = new Float32Array(ticks2Count * 3);
    for (let i = 0; i < ticks2Count; i++) {
      const a = (i / ticks2Count) * Math.PI * 2;
      const r = i % 20 === 0 ? 23.85 : 23.52;
      ticks2Pos[i * 3] = Math.cos(a) * r;
      ticks2Pos[i * 3 + 1] = Math.sin(a) * r;
      ticks2Pos[i * 3 + 2] = 0;
    }
    ticks2Geo.setAttribute('position', new THREE.BufferAttribute(ticks2Pos, 3));
    const ticks2Mat = new THREE.PointsMaterial({
      size: 0.48,
      map: whiteGlowTex,
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    astroRing2.add(new THREE.Points(ticks2Geo, ticks2Mat));

    const astroRing3Mat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const astroRing3 = new THREE.Mesh(new THREE.TorusGeometry(27.4, 0.048, 16, 180), astroRing3Mat);
    astroRing3.rotation.x = -0.62;
    astroRing3.rotation.y = -0.42;
    astrolabeGroup.add(astroRing3);

    // 4.2 Coordenadas 3D con volumen espacial real para el Corazón y las Alas Celestes
    const heartConstellationPoints = [
      new THREE.Vector3(0, -10.8, 0.8),
      new THREE.Vector3(-8.6, -2.2, 2.6),
      new THREE.Vector3(-13.8, 5.2, -1.2),
      new THREE.Vector3(-9.4, 11.6, 1.8),
      new THREE.Vector3(-3.3, 10.3, 2.5),
      new THREE.Vector3(0, 5.4, 0.4),
      new THREE.Vector3(3.3, 10.3, 2.5),
      new THREE.Vector3(9.4, 11.6, 1.8),
      new THREE.Vector3(13.8, 5.2, -1.2),
      new THREE.Vector3(8.6, -2.2, 2.6),
      new THREE.Vector3(0, -10.8, 0.8)
    ];

    const wingLeftPoints = [
      new THREE.Vector3(-13.8, 5.2, -1.2),
      new THREE.Vector3(-21.5, 2.4, -3.5),
      new THREE.Vector3(-28.0, -4.6, -2.0),
      new THREE.Vector3(-34.5, -2.4, -5.2)
    ];
    const wingRightPoints = [
      new THREE.Vector3(13.8, 5.2, -1.2),
      new THREE.Vector3(22.5, 9.4, -3.0),
      new THREE.Vector3(29.8, 14.2, -4.4),
      new THREE.Vector3(36.0, 10.4, -2.0)
    ];

    const heartConstellationCurve = new THREE.CatmullRomCurve3(heartConstellationPoints, false, 'catmullrom', 0.22);
    const wingLeftCurve = new THREE.CatmullRomCurve3(wingLeftPoints, false, 'catmullrom', 0.35);
    const wingRightCurve = new THREE.CatmullRomCurve3(wingRightPoints, false, 'catmullrom', 0.35);

    // 4.3 Velo Volumétrico 3D de Polvo de Estrellas (7,200 partículas en GPU con pulsos y aurora)
    const veilCount = 7200;
    const veilGeo = new THREE.BufferGeometry();
    const veilBasePos = new Float32Array(veilCount * 3);
    const veilCurveT = new Float32Array(veilCount);
    const veilRibbonType = new Float32Array(veilCount); // 0 = corazón, 1 = alas, 2 = santuario interior
    const veilRandom = new Float32Array(veilCount);
    const veilSize = new Float32Array(veilCount);

    for (let i = 0; i < veilCount; i++) {
      const i3 = i * 3;
      const rnd = Math.random();
      veilRandom[i] = rnd;

      if (i < 4400) {
        // Cinta volumétrica principal alrededor del contorno 3D del corazón
        const u = (i / 4400 + (Math.random() - 0.5) * 0.02 + 1.0) % 1.0;
        const pt = heartConstellationCurve.getPointAt(u);
        const angle = u * Math.PI * 16.0 + Math.random() * Math.PI * 2.0;
        const rad = Math.pow(Math.random(), 1.65) * 3.4;
        veilBasePos[i3] = pt.x + Math.cos(angle) * rad;
        veilBasePos[i3 + 1] = pt.y + Math.sin(angle) * rad;
        veilBasePos[i3 + 2] = pt.z + (Math.random() - 0.5) * 3.8;
        veilCurveT[i] = u;
        veilRibbonType[i] = 0.0;
        veilSize[i] = 0.75 + Math.pow(Math.random(), 2.4) * 2.2;
      } else if (i < 5900) {
        // Plumas estelares a lo largo de las dos alas celestes
        const isRight = i % 2 === 0;
        const u = Math.pow(Math.random(), 0.9);
        const pt = (isRight ? wingRightCurve : wingLeftCurve).getPointAt(u);
        const spread = (0.4 + u * 2.6) * Math.pow(Math.random(), 1.4);
        const a = Math.random() * Math.PI * 2;
        veilBasePos[i3] = pt.x + Math.cos(a) * spread;
        veilBasePos[i3 + 1] = pt.y + Math.sin(a) * spread - u * 1.2 * Math.random();
        veilBasePos[i3 + 2] = pt.z + (Math.random() - 0.5) * 3.2;
        veilCurveT[i] = u;
        veilRibbonType[i] = isRight ? 1.0 : -1.0;
        veilSize[i] = 0.65 + Math.pow(Math.random(), 2.2) * 1.9;
      } else {
        // Nube interior del santuario del corazón y halo del astrolabio
        const t = Math.random() * Math.PI * 2;
        const shell = Math.pow(Math.random(), 0.75) * 0.88;
        const hx = 16.0 * Math.pow(Math.sin(t), 3) * 0.82 * shell;
        const hy =
          (13.0 * Math.cos(t) - 5.0 * Math.cos(2.0 * t) - 2.0 * Math.cos(3.0 * t) - Math.cos(4.0 * t)) *
            0.82 *
            shell +
          2.0;
        const hz = (Math.random() - 0.5) * 9.0;
        veilBasePos[i3] = hx;
        veilBasePos[i3 + 1] = hy;
        veilBasePos[i3 + 2] = hz;
        veilCurveT[i] = (t / (Math.PI * 2)) % 1.0;
        veilRibbonType[i] = 2.0;
        veilSize[i] = 0.6 + Math.pow(Math.random(), 2.6) * 2.4;
      }
    }

    veilGeo.setAttribute('position', new THREE.BufferAttribute(veilBasePos, 3));
    veilGeo.setAttribute('aCurveT', new THREE.BufferAttribute(veilCurveT, 1));
    veilGeo.setAttribute('aRibbon', new THREE.BufferAttribute(veilRibbonType, 1));
    veilGeo.setAttribute('aRandom', new THREE.BufferAttribute(veilRandom, 1));
    veilGeo.setAttribute('aSize', new THREE.BufferAttribute(veilSize, 1));

    const constellationVeilMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uModeWeights: { value: new THREE.Vector4(1, 0, 0, 0) },
        uBurstPos: { value: new THREE.Vector3(0, -10.8, 0.8) },
        uBurstProgress: { value: -1.0 },
        uWingOpen: { value: 0.0 },
        uHeartbeat: { value: 1.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aCurveT;
        attribute float aRibbon;
        attribute float aRandom;
        attribute float aSize;
        uniform float uTime;
        uniform vec4 uModeWeights;
        uniform vec3 uBurstPos;
        uniform float uBurstProgress;
        uniform float uWingOpen;
        uniform float uHeartbeat;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 p = position;

          // Movimiento orgánico 3D y respiración de la nebulosa de la constelación
          float swirlAngle = uTime * 0.45 + aCurveT * 12.566 + aRandom * 6.283;
          p.x += cos(swirlAngle) * 0.38;
          p.y += sin(swirlAngle) * 0.38;
          p.z += sin(uTime * 0.7 + aRandom * 10.0) * 0.55;

          // Apertura tridimensional de las alas en el modo "Mismo cielo"
          if (abs(aRibbon) > 0.5 && abs(aRibbon) < 1.5) {
            float side = sign(aRibbon);
            p.x += side * aCurveT * uWingOpen * 3.2;
            p.y += aCurveT * uWingOpen * 2.4 + sin(aCurveT * 5.0 - uTime * 2.2) * 0.85 * uModeWeights.z;
            p.z += aCurveT * uWingOpen * 2.8;
          }

          // En el modo "Siempre", el corazón entero late con ritmo cardíaco y eleva brasas doradas
          p *= mix(1.0, uHeartbeat, 0.85);
          if (aRibbon > 1.5) {
            p.y += fract(uTime * 0.14 + aRandom) * 3.5 * uModeWeights.w;
          }

          // Onda esférica 3D al presionar cualquiera de los 4 recuerdos
          float distToBurst = distance(p, uBurstPos);
          float burstRadius = uBurstProgress * 38.0;
          float burstWave = exp(-pow((distToBurst - burstRadius) / 4.2, 2.0)) * step(0.0, uBurstProgress);
          vec3 burstDir = normalize(p - uBurstPos + vec3(0.0001));
          p += burstDir * burstWave * 1.65;

          // Ríos de luz viajando continuamente por el corazón y las alas
          float streamWave1 = exp(-pow(sin((aCurveT - uTime * 0.16) * 3.14159265) * 4.5, 2.0));
          float streamWave2 = exp(-pow(sin((aCurveT + uTime * 0.12 + 0.5) * 3.14159265) * 4.5, 2.0));
          float streamGlow = max(streamWave1, streamWave2 * 0.8);

          // Paletas cromáticas cinematográficas según el recuerdo activo
          vec3 colMode0 = mix(vec3(0.45, 0.84, 1.0), vec3(1.0, 0.93, 0.58), streamGlow); // El primer destello: Cian celeste + Oro génesis
          vec3 colMode1 = mix(vec3(0.82, 0.48, 1.0), vec3(1.0, 0.62, 0.82), 0.5 + 0.5 * sin(aCurveT * 6.283 + uTime)); // Nuestra fecha: Rosa estelar + Violeta
          float auroraWave = 0.5 + 0.5 * sin(p.x * 0.18 + uTime * 2.1 + aRandom * 2.0);
          vec3 colMode2 = mix(vec3(0.18, 0.88, 0.82), vec3(0.38, 0.78, 1.0), auroraWave); // Mismo cielo: Aurora boreal turquesa y zafiro
          vec3 colMode3 = mix(vec3(1.0, 0.84, 0.35), vec3(1.0, 0.96, 0.82), streamGlow); // Siempre: Oro eterno incandescente

          vec3 baseColor =
            colMode0 * uModeWeights.x +
            colMode1 * uModeWeights.y +
            colMode2 * uModeWeights.z +
            colMode3 * uModeWeights.w;

          vColor = baseColor + vec3(1.0, 0.95, 0.8) * (streamGlow * 0.38 + burstWave * 0.85);

          float twinkle = 0.58 + 0.42 * sin(uTime * (2.6 + aRandom * 2.5) + aRandom * 30.0);
          vAlpha = twinkle * (0.48 + streamGlow * 0.42 + burstWave * 0.75);

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          float boostSize = 1.0 + streamGlow * 0.55 + burstWave * 1.15 + (uHeartbeat - 1.0) * 3.0;
          gl_PointSize = clamp((aSize * boostSize * uPixelRatio * 125.0) / max(1.0, -mvPosition.z), 0.8, 26.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;
          float core = exp(-d * 7.8);
          float halo = smoothstep(0.5, 0.0, d) * 0.52;
          gl_FragColor = vec4(vColor + vec3(core * 0.35), (core + halo) * vAlpha);
        }
      `
    });

    const constellationVeilPoints = new THREE.Points(veilGeo, constellationVeilMat);
    constellationGroup.add(constellationVeilPoints);

    // 4.4 Conductos de Luz Volumétricos 3D (TubeGeometry con shader de pulsos de energía viajera)
    const constellationConduitMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPrimaryColor: { value: new THREE.Color(0x7dd3fc) },
        uAccentColor: { value: new THREE.Color(0xfef08a) },
        uPulseBoost: { value: 0.0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        uniform float uTime;
        uniform vec3 uPrimaryColor;
        uniform vec3 uAccentColor;
        uniform float uPulseBoost;

        void main() {
          float core = pow(max(0.0, abs(dot(vNormal, vViewDir))), 0.65);
          // Dos trenes de pulsos luminosos recorriendo los filamentos 3D de estrella a estrella
          float wave1 = pow(0.5 + 0.5 * sin(vUv.x * 25.1327 - uTime * 3.8), 6.0);
          float wave2 = pow(0.5 + 0.5 * sin(vUv.x * 12.5663 + uTime * 2.6), 8.0);
          float energy = max(wave1, wave2) + uPulseBoost * 0.75;
          vec3 col = mix(uPrimaryColor, uAccentColor, clamp(energy * 0.85, 0.0, 1.0));
          col += vec3(1.0, 0.98, 0.92) * pow(max(wave1, wave2), 3.0) * 0.75;
          float alpha = core * (0.42 + energy * 0.58);
          gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
        }
      `
    });

    const conduitHaloMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    const mainConstellationTube = new THREE.Mesh(
      new THREE.TubeGeometry(heartConstellationCurve, 180, 0.14, 12, false),
      constellationConduitMat
    );
    const mainConstellationHaloTube = new THREE.Mesh(
      new THREE.TubeGeometry(heartConstellationCurve, 120, 0.46, 10, false),
      conduitHaloMat
    );
    const mainHeartMeshGroup = new THREE.Group();
    mainHeartMeshGroup.add(mainConstellationTube);
    mainHeartMeshGroup.add(mainConstellationHaloTube);
    constellationGroup.add(mainHeartMeshGroup);

    const wingLeftGroup = new THREE.Group();
    wingLeftGroup.add(new THREE.Mesh(new THREE.TubeGeometry(wingLeftCurve, 72, 0.1, 10, false), constellationConduitMat));
    wingLeftGroup.add(new THREE.Mesh(new THREE.TubeGeometry(wingLeftCurve, 48, 0.34, 8, false), conduitHaloMat));
    constellationGroup.add(wingLeftGroup);

    const wingRightGroup = new THREE.Group();
    wingRightGroup.add(
      new THREE.Mesh(new THREE.TubeGeometry(wingRightCurve, 72, 0.1, 10, false), constellationConduitMat)
    );
    wingRightGroup.add(new THREE.Mesh(new THREE.TubeGeometry(wingRightCurve, 48, 0.34, 8, false), conduitHaloMat));
    constellationGroup.add(wingRightGroup);

    // Filamentos interiores de geometría sagrada que conectan las estrellas principales a través del corazón
    const innerWebMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xfde047) },
        uOpacity: { value: 0.28 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          float pulse = 0.45 + 0.55 * pow(0.5 + 0.5 * sin(vUv.x * 18.849 - uTime * 4.2), 4.0);
          gl_FragColor = vec4(uColor + vec3(0.35) * pulse, uOpacity * pulse);
        }
      `
    });

    const chordPairs: [number, number][] = [
      [0, 5],
      [3, 7],
      [2, 8],
      [1, 9],
      [0, 3],
      [0, 7],
      [2, 5],
      [8, 5]
    ];
    const innerChordsGroup = new THREE.Group();
    chordPairs.forEach(([aIdx, bIdx]) => {
      const curve = new THREE.LineCurve3(heartConstellationPoints[aIdx], heartConstellationPoints[bIdx]);
      const chordMesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.045, 6, false), innerWebMat);
      innerChordsGroup.add(chordMesh);
    });
    constellationGroup.add(innerChordsGroup);

    // 4.5 Estrellas Esculpidas en 3D con Shaders de Difracción de 8 Puntas (estilo James Webb) y Satélites Orbitales
    const createStarDiffractionMaterial = (hexColor: number, isPrincipal: boolean) =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(hexColor) },
          uHighlight: { value: isPrincipal ? 1.0 : 0.65 },
          uSeed: { value: Math.random() * 10.0 }
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv - vec2(0.5);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uHighlight;
          uniform float uSeed;

          void main() {
            float d = length(vUv);
            if (d > 0.5) discard;

            // Núcleo incandescente exponencial
            float core = exp(-d * 15.0);
            float halo = exp(-d * 5.2) * 0.55;

            // Rayos de difracción de 8 puntas (horizontal, vertical y diagonales a 45 grados)
            float shimmer = 0.85 + 0.15 * sin(uTime * 3.8 + uSeed);
            float spikeH = exp(-abs(vUv.y) * 52.0) * exp(-abs(vUv.x) * 3.8);
            float spikeV = exp(-abs(vUv.x) * 52.0) * exp(-abs(vUv.y) * 3.8);
            vec2 rotUv = vec2(vUv.x * 0.7071 - vUv.y * 0.7071, vUv.x * 0.7071 + vUv.y * 0.7071);
            float spikeD1 = exp(-abs(rotUv.y) * 68.0) * exp(-abs(rotUv.x) * 6.5) * 0.65;
            float spikeD2 = exp(-abs(rotUv.x) * 68.0) * exp(-abs(rotUv.y) * 6.5) * 0.65;

            float spikes = (spikeH + spikeV + spikeD1 + spikeD2) * shimmer * uHighlight;
            float alpha = clamp((core + halo + spikes) * smoothstep(0.5, 0.38, d), 0.0, 1.0);

            vec3 col = mix(uColor, vec3(1.0, 0.99, 0.95), clamp(core + spikes * 0.55, 0.0, 1.0));
            gl_FragColor = vec4(col, alpha);
          }
        `
      });

    const principalNodeIndices = [0, 3, 5, 7];
    const interactiveNodeMeshes: THREE.Mesh[] = [];
    const constellationStarNodes: {
      group: THREE.Group;
      flareMesh: THREE.Mesh;
      flareMat: THREE.ShaderMaterial;
      orbitRingGroup?: THREE.Group;
      baseScale: number;
      isPrincipal: boolean;
      nodeIdx: number;
    }[] = [];

    const allConstellationPts = [
      ...heartConstellationPoints.slice(0, 10),
      ...wingLeftPoints.slice(1),
      ...wingRightPoints.slice(1)
    ];

    allConstellationPts.forEach((pt, idx) => {
      const principalIdx = principalNodeIndices.indexOf(idx);
      const isPrincipal = principalIdx !== -1;

      const starNodeGroup = new THREE.Group();
      starNodeGroup.position.copy(pt);
      constellationGroup.add(starNodeGroup);

      // Esfera 3D de fotosfera estelar en el centro de cada nodo
      const coreRadius = isPrincipal ? 0.48 : 0.24;
      const coreMesh = new THREE.Mesh(
        new THREE.SphereGeometry(coreRadius, 20, 20),
        new THREE.MeshBasicMaterial({
          color: isPrincipal ? 0xfffbeb : 0xe0f2fe
        })
      );
      starNodeGroup.add(coreMesh);

      // Billboard con shader de difracción de 8 puntas
      const flareMat = createStarDiffractionMaterial(isPrincipal ? 0xfde047 : 0x7dd3fc, isPrincipal);
      const baseScale = isPrincipal ? 8.2 : 4.2;
      const flareMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), flareMat);
      flareMesh.scale.set(baseScale, baseScale, 1);
      starNodeGroup.add(flareMesh);

      let orbitRingGroup: THREE.Group | undefined;
      if (isPrincipal) {
        // Doble anillo micro-orbital 3D + lucero compañero girando alrededor de cada una de las 4 estrellas principales
        orbitRingGroup = new THREE.Group();
        const miniRing1 = new THREE.Mesh(
          new THREE.TorusGeometry(1.45, 0.025, 12, 64),
          new THREE.MeshBasicMaterial({
            color: 0xfef08a,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        miniRing1.rotation.x = 0.65;
        orbitRingGroup.add(miniRing1);

        const miniRing2 = new THREE.Mesh(
          new THREE.TorusGeometry(1.95, 0.02, 12, 64),
          new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.38,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        miniRing2.rotation.y = 0.78;
        miniRing2.rotation.x = -0.35;
        orbitRingGroup.add(miniRing2);

        const companionSprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: goldGlowTex,
            color: 0xfffbeb,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        companionSprite.position.set(1.45, 0, 0);
        companionSprite.scale.set(1.15, 1.15, 1);
        miniRing1.add(companionSprite);

        starNodeGroup.add(orbitRingGroup);

        // Esfera de colisión táctil/click para seleccionar la estrella en 3D
        const hitMesh = new THREE.Mesh(
          new THREE.SphereGeometry(3.2, 16, 16),
          new THREE.MeshBasicMaterial({
            color: 0xfde047,
            transparent: true,
            opacity: 0.0,
            depthWrite: false
          })
        );
        hitMesh.position.copy(pt);
        hitMesh.userData = { interactiveType: 'constellationNode', nodeIndex: principalIdx };
        constellationGroup.add(hitMesh);
        interactiveNodeMeshes.push(hitMesh);
      }

      constellationStarNodes.push({
        group: starNodeGroup,
        flareMesh,
        flareMat,
        orbitRingGroup,
        baseScale,
        isPrincipal,
        nodeIdx: idx
      });
    });

    // 4.6 Retícula Celestial Giroscópica 3D para la estrella activa
    const activeStarSelector = new THREE.Group();
    constellationGroup.add(activeStarSelector);

    const activeStarSelectorMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const selectorInnerRing = new THREE.Mesh(new THREE.RingGeometry(2.05, 2.32, 64), activeStarSelectorMat);
    activeStarSelector.add(selectorInnerRing);

    const selectorOuterRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const selectorOuterRing = new THREE.Mesh(new THREE.RingGeometry(2.75, 2.9, 64), selectorOuterRingMat);
    activeStarSelector.add(selectorOuterRing);

    // 4 Punteros cardinales de brújula estelar alrededor de la retícula activa
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const pointer = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.34, 4), activeStarSelectorMat);
      pointer.position.set(Math.cos(a) * 3.25, Math.sin(a) * 3.25, 0);
      pointer.rotation.z = a;
      activeStarSelector.add(pointer);
    }

    // 4.7 Doble Onda de Choque 3D y Estallido de 140 Chispas al cambiar de estrella
    const constellationBurstMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const constellationBurstRing = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.45, 72), constellationBurstMat);
    constellationGroup.add(constellationBurstRing);

    const constellationBurstRing2 = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.15, 72), constellationBurstMat);
    constellationBurstRing2.rotation.x = 0.85;
    constellationBurstRing2.rotation.y = 0.45;
    constellationGroup.add(constellationBurstRing2);

    const sparkCount = 140;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkDirs: THREE.Vector3[] = [];
    for (let i = 0; i < sparkCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 5 + Math.random() * 18;
      sparkDirs.push(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed * 0.65
        )
      );
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 1.55,
      map: goldGlowTex,
      color: 0xfef08a,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const constellationSparks = new THREE.Points(sparkGeo, sparkMat);
    constellationGroup.add(constellationSparks);

    // 4.8 Río de Fotones Viajeros (120 luceros recorriendo en doble sentido el corazón y las alas)
    const flowCount = 120;
    const flowGeo = new THREE.BufferGeometry();
    const flowPositions = new Float32Array(flowCount * 3);
    flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
    const flowMat = new THREE.PointsMaterial({
      size: 1.45,
      map: goldGlowTex,
      color: 0xfffbeb,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const flowPoints = new THREE.Points(flowGeo, flowMat);
    constellationGroup.add(flowPoints);

    // ------------------------------------------------------------------------
    // 5. ACTO V · GARGANTÚA: AGUJERO NEGRO CON LENTE GRAVITACIONAL Y CONGELACIÓN DEL TIEMPO
    // ------------------------------------------------------------------------
    const BH_POS = new THREE.Vector3(-70, 12, -172);
    const blackHoleGroup = new THREE.Group();
    blackHoleGroup.position.copy(BH_POS);
    scene.add(blackHoleGroup);

    const bhTilt = new THREE.Group();
    bhTilt.rotation.z = 0.1;
    blackHoleGroup.add(bhTilt);

    // Horizonte de sucesos: negro absoluto
    const horizonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(5, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000, fog: false })
    );
    bhTilt.add(horizonMesh);

    // Disco de acreción con rotación diferencial kepleriana
    const diskPlane = new THREE.Group();
    diskPlane.rotation.x = -Math.PI / 2 + 0.16;
    bhTilt.add(diskPlane);

    const DISK_IN = 6.2;
    const DISK_OUT = 21.0;
    const accretionMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vPos;
        uniform float uTime;
        void main() {
          float r = length(vPos.xy);
          float t = (r - ${DISK_IN.toFixed(1)}) / (${DISK_OUT.toFixed(1)} - ${DISK_IN.toFixed(1)});
          if (t < 0.0 || t > 1.0) discard;
          float ang = atan(vPos.y, vPos.x);
          float omega = 1.35 / pow(0.32 + t, 1.5);
          float a2 = ang - uTime * omega * 0.35;
          vec3 q = vec3(cos(a2) * r * 0.22, sin(a2) * r * 0.22, r * 1.6);
          float streaks = fbm(q + vec3(0.0, 0.0, uTime * 0.05));
          float fine = snoise(vec3(cos(a2) * 3.0, sin(a2) * 3.0, r * 4.5));
          float density = 0.55 + 0.6 * streaks + 0.18 * fine;

          vec3 hot = vec3(1.0, 0.96, 0.88);
          vec3 warm = vec3(1.0, 0.68, 0.28);
          vec3 ember = vec3(0.62, 0.18, 0.05);
          vec3 col = mix(hot, warm, smoothstep(0.0, 0.35, t));
          col = mix(col, ember, smoothstep(0.35, 1.0, t));

          float falloff = pow(1.0 - t, 1.7);
          float innerEdge = smoothstep(0.0, 0.04, t);
          float outerEdge = 1.0 - smoothstep(0.75, 1.0, t);
          float doppler = 1.0 + 0.7 * cos(ang + 0.4);

          float intensity = density * falloff * innerEdge * outerEdge * doppler * 1.9;
          gl_FragColor = vec4(col * intensity, intensity);
        }
      `
    });
    const accretionDisk = new THREE.Mesh(new THREE.RingGeometry(DISK_IN, DISK_OUT, 256, 8), accretionMat);
    diskPlane.add(accretionDisk);

    // Partículas cayendo en espiral hacia el horizonte (se detienen al 100% cuando el tiempo se congela)
    const infallCount = 2200;
    const infallGeo = new THREE.BufferGeometry();
    const infallPos = new Float32Array(infallCount * 3);
    const infallRadius = new Float32Array(infallCount);
    const infallAngle = new Float32Array(infallCount);
    const infallHeight = new Float32Array(infallCount);
    for (let i = 0; i < infallCount; i++) {
      infallRadius[i] = Math.random();
      infallAngle[i] = Math.random() * Math.PI * 2;
      infallHeight[i] = (Math.random() - 0.5) * 0.35;
    }
    infallGeo.setAttribute('position', new THREE.BufferAttribute(infallPos, 3));
    infallGeo.setAttribute('aRadius', new THREE.BufferAttribute(infallRadius, 1));
    infallGeo.setAttribute('aAngle', new THREE.BufferAttribute(infallAngle, 1));
    infallGeo.setAttribute('aHeight', new THREE.BufferAttribute(infallHeight, 1));
    const infallMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aRadius;
        attribute float aAngle;
        attribute float aHeight;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vT;
        void main() {
          float t = fract(aRadius - uTime * 0.018);
          float r = ${DISK_IN.toFixed(1)} + t * (${DISK_OUT.toFixed(1)} + 4.0 - ${DISK_IN.toFixed(1)});
          float ang = aAngle + uTime * 1.6 / pow(r / ${DISK_IN.toFixed(1)}, 1.5);
          vec3 p = vec3(cos(ang) * r, sin(ang) * r, aHeight * (0.4 + t));
          vT = t;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = clamp((1.6 * uPixelRatio * 120.0) / max(1.0, -mv.z), 0.8, 9.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vT;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = exp(-d * 7.0) * smoothstep(0.0, 0.08, vT) * (1.0 - smoothstep(0.7, 1.0, vT));
          vec3 col = mix(vec3(1.0, 0.95, 0.85), vec3(1.0, 0.55, 0.22), vT);
          gl_FragColor = vec4(col * a, a);
        }
      `
    });
    diskPlane.add(new THREE.Points(infallGeo, infallMat));

    // Halo de brasas relativistas 3D alrededor de Gargantúa que quedan suspendidas en el aire al detener el tiempo
    const chrononCount = 520;
    const chrononGeo = new THREE.BufferGeometry();
    const chrononBase = new Float32Array(chrononCount * 3);
    const chrononPos = new Float32Array(chrononCount * 3);
    for (let i = 0; i < chrononCount; i++) {
      const i3 = i * 3;
      const r = 7.5 + Math.random() * 18.0;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 11.0;
      chrononBase[i3] = r;
      chrononBase[i3 + 1] = theta;
      chrononBase[i3 + 2] = y;
      chrononPos[i3] = Math.cos(theta) * r;
      chrononPos[i3 + 1] = y;
      chrononPos[i3 + 2] = Math.sin(theta) * r;
    }
    chrononGeo.setAttribute('position', new THREE.BufferAttribute(chrononPos, 3));
    const chrononPoints = new THREE.Points(
      chrononGeo,
      new THREE.PointsMaterial({
        size: 0.72,
        map: goldGlowTex,
        color: 0xfde68a,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    blackHoleGroup.add(chrononPoints);

    // Onda de choque temporal cuando se detiene o reanuda el tiempo
    const timeRippleMat = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const timeRippleRing = new THREE.Mesh(new THREE.RingGeometry(5.0, 5.6, 96), timeRippleMat);
    blackHoleGroup.add(timeRippleRing);

    // Imagen del disco curvada por la gravedad (el halo icónico de Interstellar)
    const lensBillboard = new THREE.Group();
    blackHoleGroup.add(lensBillboard);
    const LENS_IN = 5.12;
    const LENS_OUT = 12.5;
    const lensMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vPos;
        uniform float uTime;
        void main() {
          float r = length(vPos.xy);
          float ang = atan(vPos.y, vPos.x);
          float t = (r - ${LENS_IN.toFixed(2)}) / (${LENS_OUT.toFixed(1)} - ${LENS_IN.toFixed(2)});
          if (t < 0.0 || t > 1.0) discard;
          float photonRing = exp(-t * 60.0) * 1.6;
          float vertical = abs(sin(ang));
          float width = mix(0.08, 0.42, pow(vertical, 0.8));
          float band = exp(-t / width) * (0.35 + 0.65 * vertical);
          float a2 = ang - uTime * 0.25;
          float streaks = 0.65 + 0.5 * fbm(vec3(cos(a2) * 2.2, sin(a2) * 2.2, r * 1.4));
          float doppler = 1.0 + 0.55 * cos(ang + 0.4);
          vec3 col = mix(vec3(1.0, 0.95, 0.86), vec3(1.0, 0.62, 0.25), smoothstep(0.0, 0.5, t));
          float intensity = (band * streaks * doppler * 1.25 + photonRing) * (1.0 - smoothstep(0.85, 1.0, t));
          gl_FragColor = vec4(col * intensity, intensity);
        }
      `
    });
    lensBillboard.add(new THREE.Mesh(new THREE.RingGeometry(LENS_IN, LENS_OUT, 256, 4), lensMat));

    const bhGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: goldGlowTex,
        color: 0xffb066,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    bhGlow.scale.set(64, 64, 1);
    blackHoleGroup.add(bhGlow);

    // ------------------------------------------------------------------------
    // 6. ACTO VI · ALMAS BINARIAS (DOS SOLES EN DANZA + GRAN COMETA DE HIELO Y ORO)
    // ------------------------------------------------------------------------
    const BINARY_POS = new THREE.Vector3(52, -8, -248);
    const binaryCometGroup = new THREE.Group();
    binaryCometGroup.position.copy(BINARY_POS);
    scene.add(binaryCometGroup);

    const binaryOrbitPivot = new THREE.Group();
    binaryOrbitPivot.rotation.x = 0.32;
    binaryOrbitPivot.rotation.z = -0.15;
    binaryCometGroup.add(binaryOrbitPivot);

    // Sol A (Dorado Cálido)
    const goldSunGroup = new THREE.Group();
    goldSunGroup.position.set(-5.8, 0, 0);
    binaryOrbitPivot.add(goldSunGroup);

    const binarySunGeo = new THREE.SphereGeometry(3.1, 64, 64);
    const goldSunMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uBoost: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vPos = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uBoost;
        void main() {
          vec3 p = normalize(vPos) * 3.8;
          float n = fbm(p + vec3(uTime * 0.45, -uTime * 0.3, uTime * 0.2));
          float plasma = smoothstep(-0.3, 0.65, n);
          vec3 c1 = vec3(0.95, 0.45, 0.12);
          vec3 c2 = vec3(1.0, 0.85, 0.38);
          vec3 c3 = vec3(1.0, 0.99, 0.92);
          vec3 col = mix(c1, c2, plasma);
          col = mix(col, c3, smoothstep(0.45, 0.88, plasma + uBoost * 0.3));
          float rim = pow(max(0.0, 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)))), 1.8);
          col += vec3(1.0, 0.8, 0.4) * rim * 0.7;
          gl_FragColor = vec4(col * (1.2 + uBoost * 0.45), 1.0);
        }
      `
    });
    const goldSunMesh = new THREE.Mesh(binarySunGeo, goldSunMat);
    goldSunMesh.userData = { interactiveType: 'binaryComet' };
    goldSunGroup.add(goldSunMesh);

    const goldSunHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: goldGlowTex,
        color: 0xfde047,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    goldSunHalo.scale.set(17, 17, 1);
    goldSunGroup.add(goldSunHalo);

    // Sol B (Zafiro Cian)
    const cyanSunGroup = new THREE.Group();
    cyanSunGroup.position.set(5.8, 0, 0);
    binaryOrbitPivot.add(cyanSunGroup);

    const cyanSunMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uBoost: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vPos = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        ${GLSL_NOISE_3D}
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uBoost;
        void main() {
          vec3 p = normalize(vPos) * 4.2;
          float n = fbm(p - vec3(uTime * 0.5, uTime * 0.35, -uTime * 0.25));
          float plasma = smoothstep(-0.3, 0.65, n);
          vec3 c1 = vec3(0.08, 0.42, 0.88);
          vec3 c2 = vec3(0.32, 0.86, 1.0);
          vec3 c3 = vec3(0.95, 0.99, 1.0);
          vec3 col = mix(c1, c2, plasma);
          col = mix(col, c3, smoothstep(0.45, 0.88, plasma + uBoost * 0.3));
          float rim = pow(max(0.0, 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)))), 1.8);
          col += vec3(0.45, 0.9, 1.0) * rim * 0.75;
          gl_FragColor = vec4(col * (1.2 + uBoost * 0.45), 1.0);
        }
      `
    });
    const cyanSunMesh = new THREE.Mesh(new THREE.SphereGeometry(2.65, 64, 64), cyanSunMat);
    cyanSunMesh.userData = { interactiveType: 'binaryComet' };
    cyanSunGroup.add(cyanSunMesh);

    const cyanSunHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: whiteGlowTex,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    cyanSunHalo.scale.set(15.5, 15.5, 1);
    cyanSunGroup.add(cyanSunHalo);

    // Puente de plasma estelar (intercambio de luz entre los dos soles gemelos)
    const bridgeCount = 2000;
    const bridgeGeo = new THREE.BufferGeometry();
    const bridgePos = new Float32Array(bridgeCount * 3);
    const bridgeT = new Float32Array(bridgeCount);
    const bridgeOffset = new Float32Array(bridgeCount * 3);
    for (let i = 0; i < bridgeCount; i++) {
      bridgeT[i] = Math.random();
      bridgeOffset[i * 3] = (Math.random() - 0.5) * 1.4;
      bridgeOffset[i * 3 + 1] = (Math.random() - 0.5) * 1.1;
      bridgeOffset[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    }
    bridgeGeo.setAttribute('position', new THREE.BufferAttribute(bridgePos, 3));
    bridgeGeo.setAttribute('aT', new THREE.BufferAttribute(bridgeT, 1));
    bridgeGeo.setAttribute('aOffset', new THREE.BufferAttribute(bridgeOffset, 3));
    const bridgeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSeparation: { value: 5.8 },
        uBoost: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aT;
        attribute vec3 aOffset;
        uniform float uTime;
        uniform float uSeparation;
        uniform float uBoost;
        uniform float uPixelRatio;
        varying float vFlow;
        void main() {
          float flow = fract(aT + uTime * (0.28 + uBoost * 0.25));
          vFlow = flow;
          float x = mix(-uSeparation, uSeparation, flow);
          float s = sin(flow * 6.2831853);
          float pinch = sin(flow * 3.14159265);
          vec3 p = vec3(
            x,
            s * 1.65 + aOffset.y * (0.45 + 0.55 * pinch),
            cos(flow * 6.2831853) * 1.35 + aOffset.z * (0.45 + 0.55 * pinch)
          );
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = clamp(((1.8 + uBoost * 1.1) * uPixelRatio * 130.0) / max(1.0, -mv.z), 1.0, 18.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vFlow;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = exp(-d * 6.5);
          vec3 gold = vec3(1.0, 0.82, 0.35);
          vec3 cyan = vec3(0.35, 0.88, 1.0);
          vec3 white = vec3(1.0, 0.98, 0.95);
          vec3 col = mix(gold, cyan, vFlow);
          col = mix(col, white, exp(-pow((vFlow - 0.5) * 4.0, 2.0)) * 0.65);
          gl_FragColor = vec4(col, a * 0.88);
        }
      `
    });
    binaryOrbitPivot.add(new THREE.Points(bridgeGeo, bridgeMat));

    // El Gran Cometa 3D con núcleo incandescente y doble estela (polvo dorado + iones cian)
    const cometGroup = new THREE.Group();
    cometGroup.position.set(-6.0, 9.2, -3.0);
    cometGroup.rotation.z = -0.22;
    binaryCometGroup.add(cometGroup);

    const cometHeadSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: whiteGlowTex,
        color: 0xe0f2fe,
        transparent: true,
        opacity: 0.98,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    cometHeadSprite.scale.set(9.5, 9.5, 1);
    cometGroup.add(cometHeadSprite);

    const cometFlareSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: goldGlowTex,
        color: 0xfef08a,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    cometFlareSprite.scale.set(34, 1.4, 1);
    cometGroup.add(cometFlareSprite);

    const cometTailCount = 2800;
    const cometTailGeo = new THREE.BufferGeometry();
    const cometTailPos = new Float32Array(cometTailCount * 3);
    const cometTailParam = new Float32Array(cometTailCount * 3); // x: progress [0..1], y: spread, z: tailType (0=dust, 1=ion)
    for (let i = 0; i < cometTailCount; i++) {
      const i3 = i * 3;
      cometTailParam[i3] = Math.random();
      cometTailParam[i3 + 1] = (Math.random() - 0.5) * 2.0;
      cometTailParam[i3 + 2] = i % 3 === 0 ? 1.0 : 0.0;
    }
    cometTailGeo.setAttribute('position', new THREE.BufferAttribute(cometTailPos, 3));
    cometTailGeo.setAttribute('aParam', new THREE.BufferAttribute(cometTailParam, 3));
    const cometTailMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBoost: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aParam;
        uniform float uTime;
        uniform float uBoost;
        uniform float uPixelRatio;
        varying float vProgress;
        varying float vType;
        void main() {
          float u = fract(aParam.x - uTime * (0.22 + uBoost * 0.2));
          vProgress = u;
          vType = aParam.z;
          float len = mix(28.0, 34.0, aParam.z) * (1.0 + uBoost * 0.25);
          float x = u * len;
          // La cola de polvo se curva suavemente; la cola iónica es recta y vibrante
          float curve = (1.0 - aParam.z) * pow(u, 1.7) * 4.8;
          float wave = sin(u * 10.0 - uTime * 3.2 + aParam.y * 2.0) * 0.35 * u;
          float spread = (0.25 + pow(u, 1.15) * mix(3.4, 1.4, aParam.z)) * aParam.y;
          vec3 p = vec3(x, curve + spread + wave, aParam.y * (1.0 - u * 0.5) * 1.4);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float sz = mix(2.2, 1.4, u) * (1.0 + uBoost * 0.45);
          gl_PointSize = clamp((sz * uPixelRatio * 135.0) / max(1.0, -mv.z), 0.8, 22.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vProgress;
        varying float vType;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float core = exp(-d * 6.5);
          float fade = smoothstep(0.0, 0.05, vProgress) * pow(1.0 - vProgress, 1.45);
          vec3 dustCol = mix(vec3(1.0, 0.96, 0.85), vec3(0.98, 0.68, 0.32), vProgress);
          vec3 ionCol = mix(vec3(0.75, 0.95, 1.0), vec3(0.22, 0.68, 1.0), vProgress);
          vec3 col = mix(dustCol, ionCol, vType);
          gl_FragColor = vec4(col, core * fade * 0.85);
        }
      `
    });
    cometGroup.add(new THREE.Points(cometTailGeo, cometTailMat));

    // Onda expansiva de deseo en Acto VI
    const wishShockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const wishShockwaveRing = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.7, 96), wishShockwaveMat);
    binaryCometGroup.add(wishShockwaveRing);

    // ------------------------------------------------------------------------
    // 7 & 8. ACTO VII (GALAXIA ESPIRAL INTERACTIVA) Y ACTO VIII (CORAZÓN CÓSMICO)
    //        Ubicada en (0, -25, -340) y oculta durante los Actos I–V para no
    //        aparecer detrás de la constelación.
    // ------------------------------------------------------------------------
    const GALAXY_POS = new THREE.Vector3(0, -25, -340);
    const galaxyGroup = new THREE.Group();
    galaxyGroup.position.copy(GALAXY_POS);
    scene.add(galaxyGroup);

    const galaxyParticleCount = 38000;
    const galaxyGeo = new THREE.BufferGeometry();
    const spiralCoords = new Float32Array(galaxyParticleCount * 3);
    const heartCoords = new Float32Array(galaxyParticleCount * 3);
    const galaxyColors = new Float32Array(galaxyParticleCount * 3);
    const particleSizes = new Float32Array(galaxyParticleCount);
    const particleRandoms = new Float32Array(galaxyParticleCount);

    const cCore = new THREE.Color('#fffbeb');
    const cBulge = new THREE.Color('#fde047');
    const cArmInner = new THREE.Color('#f472b6');
    const cArmMid = new THREE.Color('#a855f7');
    const cArmOuter = new THREE.Color('#38bdf8');

    for (let i = 0; i < galaxyParticleCount; i++) {
      const i3 = i * 3;
      const rnd = Math.random();
      particleRandoms[i] = rnd;

      // A) Coordenadas en la Galaxia Espiral Logarítmica (Acto VII)
      const radius = Math.pow(Math.random(), 1.65) * 56.0;
      const branches = 5;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * 0.23;

      const spread = 0.65 + (radius / 56.0) * 3.8;
      const rx = Math.pow(Math.random(), 2.8) * (Math.random() < 0.5 ? 1 : -1) * spread;
      const ry = Math.pow(Math.random(), 3.2) * (Math.random() < 0.5 ? 1 : -1) * (1.8 * (1.0 - radius / 70.0) + 0.35);
      const rz = Math.pow(Math.random(), 2.8) * (Math.random() < 0.5 ? 1 : -1) * spread;

      spiralCoords[i3] = Math.cos(branchAngle + spinAngle) * radius + rx;
      spiralCoords[i3 + 1] = ry;
      spiralCoords[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;

      // B) Coordenadas en el Corazón Cósmico Volumétrico (Acto VIII)
      const t = Math.random() * Math.PI * 2;
      const rawHx = 16.0 * Math.pow(Math.sin(t), 3);
      const rawHy =
        13.0 * Math.cos(t) -
        5.0 * Math.cos(2.0 * t) -
        2.0 * Math.cos(3.0 * t) -
        Math.cos(4.0 * t);

      const shell = 0.16 + Math.pow(Math.random(), 0.82) * 1.48;
      const swirl = (1.45 - shell) * 0.32;
      const cs = Math.cos(swirl);
      const sn = Math.sin(swirl);

      const hx = (rawHx * cs - rawHy * sn) * shell;
      const hy = (rawHx * sn + rawHy * cs) * shell;
      const hz = (Math.random() - 0.5) * 6.5 * (1.25 - shell * 0.45);

      heartCoords[i3] = hx + (Math.random() - 0.5) * 1.4;
      heartCoords[i3 + 1] = hy + 3.2 + (Math.random() - 0.5) * 1.4;
      heartCoords[i3 + 2] = hz;

      const ratio = radius / 56.0;
      const col = new THREE.Color();
      if (ratio < 0.08) {
        col.lerpColors(cCore, cBulge, ratio / 0.08);
      } else if (ratio < 0.26) {
        col.lerpColors(cBulge, cArmInner, (ratio - 0.08) / 0.18);
      } else if (ratio < 0.62) {
        col.lerpColors(cArmInner, cArmMid, (ratio - 0.26) / 0.36);
      } else {
        col.lerpColors(cArmMid, cArmOuter, (ratio - 0.62) / 0.38);
      }

      galaxyColors[i3] = col.r;
      galaxyColors[i3 + 1] = col.g;
      galaxyColors[i3 + 2] = col.b;

      particleSizes[i] = (0.8 + Math.pow(Math.random(), 3.0) * 3.2) * (ratio < 0.15 ? 1.35 : 1.0);
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(spiralCoords, 3));
    galaxyGeo.setAttribute('aHeartPos', new THREE.BufferAttribute(heartCoords, 3));
    galaxyGeo.setAttribute('aColor', new THREE.BufferAttribute(galaxyColors, 3));
    galaxyGeo.setAttribute('aSize', new THREE.BufferAttribute(particleSizes, 1));
    galaxyGeo.setAttribute('aRandom', new THREE.BufferAttribute(particleRandoms, 1));

    const galaxyShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uSceneVis: { value: 0 },
        uPulseWave: { value: -1.0 },
        uModeWeights: { value: new THREE.Vector3(1, 0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      vertexShader: `
        attribute vec3 aHeartPos;
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aRandom;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uMorph;
        uniform float uSceneVis;
        uniform float uPulseWave;
        uniform vec3 uModeWeights;
        uniform float uPixelRatio;

        void main() {
          float rad = length(position.xz);
          float normRad = clamp(rad / 56.0, 0.0, 1.0);

          // Onda radial interactiva al presionar los recuerdos de la galaxia
          float waveFront = uPulseWave * 62.0;
          float waveRing = exp(-pow((rad - waveFront) / 5.5, 2.0)) * step(0.0, uPulseWave) * (1.0 - uMorph);

          // Tinte dinámico según el recuerdo seleccionado:
          // Mode 0 (Tu sonrisa): Oro cálido y rosa solar
          // Mode 1 (Nuestros momentos): Destellos de supernovas violeta/dorado
          // Mode 2 (Lo que viene): Expansión cian aurora y zafiro
          vec3 smileCol = mix(vec3(1.0, 0.93, 0.65), vec3(1.0, 0.62, 0.78), normRad);
          vec3 memoryCol = mix(vec3(1.0, 0.88, 0.55), vec3(0.85, 0.48, 1.0), normRad);
          vec3 futureCol = mix(vec3(0.65, 0.96, 1.0), vec3(0.25, 0.68, 1.0), normRad);

          vec3 modeCol = aColor * 0.45
            + smileCol * uModeWeights.x * 0.55
            + memoryCol * uModeWeights.y * 0.55
            + futureCol * uModeWeights.z * 0.55;

          vColor = mix(modeCol, aColor, uMorph) + vec3(0.45, 0.38, 0.2) * waveRing;

          float swirlPhase = sin(uMorph * 3.14159265);
          float angle = swirlPhase * (1.8 + aRandom * 2.2);
          mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

          vec3 spiralPos = position;
          // En "Lo que viene" la galaxia respira y se expande hacia el horizonte
          spiralPos.xz *= 1.0 + uModeWeights.z * 0.1 * (1.0 - uMorph);
          // La onda interactiva eleva suavemente los brazos espirales a su paso
          spiralPos.y += waveRing * 2.6 * sin(aRandom * 6.283);

          vec3 blended = mix(spiralPos, aHeartPos, uMorph);
          blended.xz = mix(blended.xz, rot * blended.xz, swirlPhase * 0.45);

          float beat = 1.0 + sin(uTime * 2.4 + aRandom * 3.0) * 0.032 * uMorph;
          blended *= beat;

          vec4 mvPosition = modelViewMatrix * vec4(blended, 1.0);
          float dist = max(1.0, -mvPosition.z);
          float twinkle = 0.72 + 0.28 * sin(uTime * 3.0 + aRandom * 25.0);
          vAlpha = twinkle * uSceneVis * (1.0 + waveRing * 0.7);

          float sizeBoost = 1.0 + waveRing * 0.85 + uModeWeights.x * 0.15;
          gl_PointSize = (aSize * sizeBoost * uPixelRatio * 145.0) / dist;
          gl_PointSize = clamp(gl_PointSize, 0.8, 30.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          if (vAlpha <= 0.002) discard;
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;
          float core = exp(-d * 8.5);
          float glow = smoothstep(0.5, 0.0, d) * 0.55;
          gl_FragColor = vec4(vColor + vec3(core * 0.35), (core + glow) * vAlpha * 0.92);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyShaderMat);
    galaxyGroup.add(galaxyPoints);

    // Resplandor volumétrico del núcleo galáctico
    const galaxyCoreMat = new THREE.SpriteMaterial({
      map: goldGlowTex,
      color: 0xfffbeb,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const galaxyCoreSprite = new THREE.Sprite(galaxyCoreMat);
    galaxyCoreSprite.scale.set(32, 32, 1);
    galaxyGroup.add(galaxyCoreSprite);

    const galaxyPinkHaloMat = new THREE.SpriteMaterial({
      map: magentaGlowTex,
      color: 0xf472b6,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const galaxyPinkHaloSprite = new THREE.Sprite(galaxyPinkHaloMat);
    galaxyPinkHaloSprite.scale.set(62, 62, 1);
    galaxyGroup.add(galaxyPinkHaloSprite);

    // Cúmulos de Supernovas de la Memoria dentro de los brazos de la galaxia (se encienden en "Nuestros momentos")
    const galaxyMemoryClusterGroup = new THREE.Group();
    galaxyGroup.add(galaxyMemoryClusterGroup);
    const clusterCoords = [
      new THREE.Vector3(14, 1.2, 8),
      new THREE.Vector3(-18, -0.8, 12),
      new THREE.Vector3(8, 1.5, -22),
      new THREE.Vector3(-24, 0.5, -15),
      new THREE.Vector3(26, -1.0, -6),
      new THREE.Vector3(-10, 1.2, 26),
      new THREE.Vector3(19, 0.8, 21),
      new THREE.Vector3(0, 0, 0)
    ];
    const clusterSprites: THREE.Sprite[] = [];
    clusterCoords.slice(0, 7).forEach((pt, idx) => {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: idx % 2 === 0 ? goldGlowTex : magentaGlowTex,
          color: idx % 2 === 0 ? 0xfef08a : 0xf472b6,
          transparent: true,
          opacity: 0.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      sp.position.copy(pt);
      sp.scale.set(9.5, 9.5, 1);
      galaxyMemoryClusterGroup.add(sp);
      clusterSprites.push(sp);
    });
    const clusterWebMat = new THREE.LineBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    const clusterWebLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        clusterCoords[7],
        clusterCoords[0],
        clusterCoords[6],
        clusterCoords[5],
        clusterCoords[1],
        clusterCoords[3],
        clusterCoords[2],
        clusterCoords[4],
        clusterCoords[7]
      ]),
      clusterWebMat
    );
    galaxyMemoryClusterGroup.add(clusterWebLine);

    // ------------------------------------------------------------------------
    // ESTRELLAS FUGACES (ANCLADAS A LA CÁMARA, CON COLA DE DESEOS INTERACTIVA)
    // ------------------------------------------------------------------------
    const meteorGeo = new THREE.PlaneGeometry(1, 1);
    type Meteor = {
      mesh: THREE.Mesh;
      mat: THREE.ShaderMaterial;
      active: boolean;
      life: number;
      duration: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      speed: number;
      length: number;
    };
    const meteors: Meteor[] = [];
    for (let i = 0; i < 8; i++) {
      const mat = new THREE.ShaderMaterial({
        uniforms: { uOpacity: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uOpacity;
          void main() {
            float across = 1.0 - abs(vUv.y - 0.5) * 2.0;
            float tail = pow(vUv.x, 2.6);
            float head = smoothstep(0.9, 1.0, vUv.x);
            float a = tail * pow(across, 2.2) * uOpacity;
            vec3 col = mix(vec3(0.55, 0.82, 1.0), vec3(1.0, 0.96, 0.82), head * 0.8 + tail * 0.3);
            gl_FragColor = vec4(col * a * (1.0 + head * 2.0), a);
          }
        `
      });
      const mesh = new THREE.Mesh(meteorGeo, mat);
      mesh.visible = false;
      mesh.position.z = -60;
      camera.add(mesh);
      meteors.push({ mesh, mat, active: false, life: 0, duration: 1, x: 0, y: 0, dx: 0, dy: 0, speed: 0, length: 10 });
    }
    let nextMeteorIn = 2.5;

    const spawnMeteor = () => {
      const m = meteors.find((mm) => !mm.active);
      if (!m) return;
      const halfH = 60 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
      const halfW = halfH * camera.aspect;
      const dir = Math.random() < 0.5 ? -1 : 1;
      const angle = dir > 0 ? -0.35 - Math.random() * 0.45 : Math.PI + 0.35 + Math.random() * 0.45;
      m.dx = Math.cos(angle);
      m.dy = Math.sin(angle);
      m.x = (Math.random() * 1.4 - 0.7) * halfW - m.dx * halfW * 0.3;
      m.y = halfH * (0.12 + Math.random() * 0.78);
      m.speed = halfH * (0.95 + Math.random() * 0.75);
      m.length = halfH * (0.24 + Math.random() * 0.22);
      m.duration = 0.85 + Math.random() * 0.65;
      m.life = 0;
      m.active = true;
      m.mesh.visible = true;
      m.mesh.rotation.z = angle;
      m.mesh.scale.set(m.length, Math.max(0.08, halfH * 0.0065), 1);
    };

    // ------------------------------------------------------------------------
    // RAYCASTER 3D Y GESTOS TÁCTILES (MÓVIL + ESCRITORIO)
    // ------------------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const triggerRaycasterAt = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      if (stateRef.current.phase === 3) {
        const hits = raycaster.intersectObject(supernovaMesh);
        if (hits.length > 0) {
          setStarTouched(true);
          stateRef.current.starPulseTime = 1.0;
          stateRef.current.meteorShowerQueue = 2;
        }
      } else if (stateRef.current.phase === 4) {
        const hits = raycaster.intersectObjects(interactiveNodeMeshes);
        if (hits.length > 0) {
          const idx = hits[0].object.userData.nodeIndex;
          if (typeof idx === 'number') {
            setSelectedStarNode(idx);
            stateRef.current.selectedStarNode = idx;
            stateRef.current.nodePulseTime = 1.0;
            stateRef.current.meteorShowerQueue = 2;
          }
        }
      } else if (stateRef.current.phase === 6) {
        const hits = raycaster.intersectObjects([goldSunMesh, cyanSunMesh]);
        if (hits.length > 0) {
          const next = !stateRef.current.cometWish;
          setCometWish(next);
          stateRef.current.cometWish = next;
          stateRef.current.cometPulseTime = 1.0;
          stateRef.current.meteorShowerQueue = 5;
        }
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      triggerRaycasterAt(e.clientX, e.clientY);
    };
    renderer.domElement.addEventListener('click', handleCanvasClick);

    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Soporte táctil completo para celulares: parallax al arrastrar y swipe para cambiar de fase
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchStartTime = performance.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      stateRef.current.mouseX = (t.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.mouseY = -(t.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      const dt = performance.now() - touchStartTime;

      if (Math.abs(dx) < 14 && Math.abs(dy) < 14 && dt < 350) {
        triggerRaycasterAt(t.clientX, t.clientY);
        return;
      }

      if (dt < 550 && Math.abs(dx) > 58 && Math.abs(dx) > Math.abs(dy) * 1.35) {
        const curPhase = stateRef.current.phase;
        if (dx < 0 && stateRef.current.journeyStarted && curPhase < TOTAL_PHASES) {
          goToPhase(curPhase + 1);
        } else if (dx > 0 && curPhase > 1) {
          goToPhase(curPhase - 1);
        }
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    domElem.addEventListener('touchmove', handleTouchMove, { passive: true });
    domElem.addEventListener('touchend', handleTouchEnd, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const sz = getContainerSize();
      camera.aspect = sz.width / sz.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sz.width, sz.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }

    // ------------------------------------------------------------------------
    // CURVA SPLINE 3D CATMULL-ROM (8 ACTOS) Y BUCLE CINEMATOGRÁFICO 60FPS
    // ------------------------------------------------------------------------
    const cameraSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 148),           // Acto I: El comienzo
      new THREE.Vector3(24.5, 9.2, 68.5),     // Acto II: Órbita del planeta azul
      new THREE.Vector3(-39.5, -10.8, -5.5),  // Acto III: La estrella supernova
      new THREE.Vector3(15.0, 28.0, -86.0),   // Acto IV: Nuestra constelación
      new THREE.Vector3(-54.0, 15.0, -140.0), // Acto V: Gargantúa
      new THREE.Vector3(46.0, -4.5, -212.0),  // Acto VI: Almas binarias y el gran cometa
      new THREE.Vector3(0.0, -7.0, -262.0),   // Acto VII: Galaxia espiral
      new THREE.Vector3(0.0, -21.0, -286.0)   // Acto VIII: Corazón cósmico
    ]);

    const lookAtSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 20),
      new THREE.Vector3(31.5, 7.6, 45),
      new THREE.Vector3(-40, -12, -35),
      new THREE.Vector3(15, 28, -125),
      new THREE.Vector3(-70, 11.0, -172),
      new THREE.Vector3(51, -6.5, -248),
      new THREE.Vector3(0, -25, -340),
      new THREE.Vector3(0, -23, -340)
    ]);

    // Sujetos a encuadrar en pantallas verticales (celular).
    // r calibrado para que cada astro luzca grande, cercano e imponente en celular:
    const PLANET_POS = new THREE.Vector3(35, 8, 45);
    const portraitSubjects: Record<number, { c: THREE.Vector3; r: number }> = {
      2: { c: PLANET_POS, r: 17.5 },
      3: { c: new THREE.Vector3(-40, -12, -35), r: 14.5 },
      4: { c: new THREE.Vector3(15, 28, -125), r: 19.5 }, // Constelación más cercana y protagonista
      5: { c: BH_POS, r: 12.6 },                           // Gargantúa mucho más cerca en vista móvil
      6: { c: BINARY_POS, r: 15.5 },                       // Dos soles binarios + gran cometa en primer plano
      7: { c: GALAXY_POS, r: 38.0 },
      8: { c: new THREE.Vector3(0, -22, -340), r: 24.5 }
    };
    const tmpDir = new THREE.Vector3();
    const bhViewDir = new THREE.Vector3(16, 3, 32).normalize();

    let splineProgress = 0.0; // 0.0 (Acto I) a 1.0 (Acto VIII)
    let heartMorphFactor = 0.0;
    let galaxySceneVis = 0.0;
    let awakeningOpacity = 0.08;
    let supernovaBoost = 0.0;
    let binaryBoost = 0.0;
    let binarySeparation = 5.8;
    let binaryAngle = 0.0;
    let galaxySpinAngle = 0.0;
    let galaxyWaveProgress = -1.0;
    const smoothGalaxyWeights = new THREE.Vector3(1, 0, 0);
    const targetGalaxyWeights = new THREE.Vector3(1, 0, 0);
    const smoothConstellationWeights = new THREE.Vector4(1, 0, 0, 0);
    const targetConstellationWeights = new THREE.Vector4(1, 0, 0, 0);
    let smoothWingOpen = 0.0;
    const lineTargetColor = new THREE.Color(0x7dd3fc);
    const wingTargetColor = new THREE.Color(0xfef08a);
    let timeScale = 1.0; // Congelación relativista en Gargantúa
    let simTime = 0.0;
    let introTime = -1;
    const smoothCamPos = new THREE.Vector3(0, 0, 148);
    const smoothLookAt = new THREE.Vector3(0, 0, 20);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(0.05, clock.getDelta());
      const {
        phase: activePhase,
        journeyStarted: started,
        introDone,
        planetDive: diving,
        selectedStarNode: starNodeIdx,
        horizonDive,
        cometWish: wishActive,
        activeGalaxyMemory: memIdx,
        letterOpen: letterIsOpen,
        mouseX,
        mouseY
      } = stateRef.current;

      // En Gargantúa, al activar "Detener el tiempo contigo", timeScale baja a 0.0 absoluto:
      // TODAS las partículas, discos, polvo cósmico y meteoros quedan congelados en el instante.
      const crossingHorizon = activePhase === 5 && horizonDive;
      const targetTimeScale = crossingHorizon ? 0.0 : 1.0;
      timeScale += (targetTimeScale - timeScale) * (crossingHorizon ? 0.1 : 0.05);
      if (crossingHorizon && timeScale < 0.001) timeScale = 0.0;
      const scaledDelta = delta * timeScale;
      simTime += scaledDelta;
      const elapsed = simTime;

      // 1. Uniforms de tiempo (congelables con simTime)
      starFieldMat.uniforms.uTime.value = elapsed;
      cosmicDustMat.uniforms.uTime.value = elapsed;
      planetMat.uniforms.uTime.value = elapsed;
      cloudsMat.uniforms.uTime.value = elapsed;
      starSphereMat.uniforms.uTime.value = elapsed;
      coronaMat.uniforms.uTime.value = elapsed;
      constellationVeilMat.uniforms.uTime.value = elapsed;
      constellationConduitMat.uniforms.uTime.value = elapsed;
      innerWebMat.uniforms.uTime.value = elapsed;
      galaxyShaderMat.uniforms.uTime.value = elapsed;
      accretionMat.uniforms.uTime.value = elapsed;
      infallMat.uniforms.uTime.value = elapsed;
      lensMat.uniforms.uTime.value = elapsed;
      goldSunMat.uniforms.uTime.value = elapsed;
      cyanSunMat.uniforms.uTime.value = elapsed;
      bridgeMat.uniforms.uTime.value = elapsed;
      cometTailMat.uniforms.uTime.value = elapsed;

      if (introDone && introTime < 0) introTime = elapsed;
      const sinceIntro = introTime < 0 ? 0 : elapsed - introTime;
      const targetAwake = !introDone ? 0.08 : started ? 0.96 : Math.min(0.92, 0.16 + sinceIntro * 0.18);
      awakeningOpacity += (targetAwake - awakeningOpacity) * 0.035;
      starFieldMat.uniforms.uAwakening.value = awakeningOpacity;

      // Factor de verticalidad para pantallas de celular (portrait: aspect < 1.0)
      const safeAspect =
        Number.isFinite(camera.aspect) && camera.aspect > 0
          ? camera.aspect
          : (window.innerWidth || 1280) / Math.max(1, window.innerHeight || 720);
      const portraitFactor = Math.max(0, Math.min(0.68, 1.05 - safeAspect));
      const portraitFit = Math.max(0, Math.min(1, (1 - safeAspect) / 0.35));

      // Efecto Warp y FOV dinámico
      stateRef.current.warpBurst *= 0.94;
      starFieldMat.uniforms.uWarp.value = stateRef.current.warpBurst;
      const baseFov = 52 + portraitFactor * 24;
      const targetFov =
        baseFov +
        stateRef.current.warpBurst * 8.5 -
        (diving ? 5 : 0) -
        (crossingHorizon ? 5 : 0);
      if (!Number.isFinite(camera.fov)) camera.fov = 52;
      camera.fov += (targetFov - camera.fov) * 0.06;
      camera.updateProjectionMatrix();

      // 2. Rotación realista del planeta, nubes, anillos y luna (Acto II)
      planetMesh.rotation.y = elapsed * 0.065;
      cloudsMesh.rotation.y = elapsed * 0.092;
      ringIcePoints.rotation.y = -elapsed * 0.04;
      moonGroup.rotation.y = elapsed * 0.18;

      // 3. Dinámica de la estrella supernova y su onda expansiva (Acto III)
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.09;
      coreGlowSprite.scale.set(22 * pulse, 22 * pulse, 1);
      anamorphicHoriz.scale.set(74 * pulse, 2.2, 1);
      ejectaPoints.rotation.y = elapsed * 0.05;
      ejectaPoints.rotation.z = elapsed * 0.03;

      if (stateRef.current.starPulseTime > 0.01) {
        stateRef.current.starPulseTime *= 0.955;
        const p = 1.0 - stateRef.current.starPulseTime;
        const ringScale = 1.0 + p * 38.0;
        shockwaveRing.scale.set(ringScale, ringScale, 1);
        shockwaveMat.opacity = stateRef.current.starPulseTime * 0.95;
        supernovaBoost += (1.0 - supernovaBoost) * 0.1;
      } else {
        shockwaveMat.opacity = 0;
        supernovaBoost *= 0.95;
      }
      starSphereMat.uniforms.uBoost.value = supernovaBoost;
      coronaMat.uniforms.uBoost.value = supernovaBoost;
      const targetFilamentOp = stateRef.current.starTouched ? 0.65 : 0.0;
      supernovaFilamentMat.opacity += (targetFilamentOp - supernovaFilamentMat.opacity) * 0.05;

      // 4. Santuario 3D de la Constelación: Velo Volumétrico, Tubos de Luz, Astrolabio Armilar y Estrellas 3D (Acto IV)
      constellationGroup.rotation.y = Math.sin(elapsed * 0.32) * 0.11;
      constellationGroup.rotation.x = Math.cos(elapsed * 0.24) * 0.05;

      targetConstellationWeights.set(
        starNodeIdx === 0 ? 1 : 0,
        starNodeIdx === 1 ? 1 : 0,
        starNodeIdx === 2 ? 1 : 0,
        starNodeIdx === 3 ? 1 : 0
      );
      smoothConstellationWeights.lerp(targetConstellationWeights, 0.065);
      constellationVeilMat.uniforms.uModeWeights.value.copy(smoothConstellationWeights);

      // Rotación giroscópica 3D de los 3 anillos armilares
      const ringSpeedMult = starNodeIdx === 1 ? 3.2 : 1.0;
      astroRing1.rotation.z += scaledDelta * 0.11 * ringSpeedMult;
      astroRing1.rotation.x = Math.sin(elapsed * 0.45) * 0.18 * (starNodeIdx === 1 ? 2.2 : 1.0);
      astroRing2.rotation.z -= scaledDelta * 0.085 * ringSpeedMult;
      astroRing2.rotation.x = 0.52 + Math.sin(elapsed * 0.9) * (starNodeIdx === 1 ? 0.32 : 0.08);
      astroRing3.rotation.z += scaledDelta * 0.065 * ringSpeedMult;
      astroRing3.rotation.y = -0.42 + Math.cos(elapsed * 0.75) * (starNodeIdx === 1 ? 0.35 : 0.1);

      if (starNodeIdx === 0) {
        lineTargetColor.setHex(0x38bdf8); // Cian estelar y oro génesis en "El primer destello"
        wingTargetColor.setHex(0xfef08a);
      } else if (starNodeIdx === 1) {
        lineTargetColor.setHex(0xf472b6); // Rosa supernova y violeta en "Nuestra fecha"
        wingTargetColor.setHex(0xc084fc);
      } else if (starNodeIdx === 2) {
        lineTargetColor.setHex(0x2dd4bf); // Turquesa aurora y zafiro en "Mismo cielo"
        wingTargetColor.setHex(0x7dd3fc);
      } else {
        lineTargetColor.setHex(0xfde047); // Oro incandescente en "Siempre"
        wingTargetColor.setHex(0xfffbeb);
      }
      constellationConduitMat.uniforms.uPrimaryColor.value.lerp(lineTargetColor, 0.08);
      constellationConduitMat.uniforms.uAccentColor.value.lerp(wingTargetColor, 0.08);
      conduitHaloMat.color.lerp(lineTargetColor, 0.08);
      innerWebMat.uniforms.uColor.value.lerp(wingTargetColor, 0.08);
      const targetWebOp = starNodeIdx === 1 || starNodeIdx === 3 ? 0.62 : 0.24;
      innerWebMat.uniforms.uOpacity.value += (targetWebOp - innerWebMat.uniforms.uOpacity.value) * 0.08;

      // Despliegue 3D de las alas celestes en "Mismo cielo"
      const targetWingOpen = starNodeIdx === 2 ? 1.0 : 0.0;
      smoothWingOpen += (targetWingOpen - smoothWingOpen) * 0.06;
      constellationVeilMat.uniforms.uWingOpen.value = smoothWingOpen;
      const wingSpread = smoothWingOpen * (0.16 + Math.sin(elapsed * 2.0) * 0.08);
      wingLeftGroup.rotation.y = -wingSpread;
      wingRightGroup.rotation.y = wingSpread;
      wingLeftGroup.rotation.z = smoothWingOpen * 0.06;
      wingRightGroup.rotation.z = -smoothWingOpen * 0.06;

      // Latido cardíaco realista (lub-dub) en "Siempre"
      const lub = Math.pow(Math.max(0, Math.sin(elapsed * 3.8)), 10.0) * 0.075;
      const dub = Math.pow(Math.max(0, Math.sin(elapsed * 3.8 - 0.85)), 14.0) * 0.045;
      const constellationBeat = 1.0 + (lub + dub) * (0.25 + 0.75 * smoothConstellationWeights.w);
      constellationVeilMat.uniforms.uHeartbeat.value = constellationBeat;
      mainHeartMeshGroup.scale.set(constellationBeat, constellationBeat, constellationBeat);
      innerChordsGroup.scale.set(constellationBeat, constellationBeat, constellationBeat);

      // Actualización 3D de las 16 estrellas esculpidas, sus 8 puntas de difracción y sus anillos micro-orbitales
      constellationStarNodes.forEach((item, idx) => {
        item.flareMat.uniforms.uTime.value = elapsed;
        item.flareMesh.quaternion.copy(camera.quaternion);

        const isSelectedPrincipal = item.isPrincipal && principalNodeIndices[starNodeIdx] === idx;
        const targetHighlight = isSelectedPrincipal
          ? 1.55
          : item.isPrincipal
          ? 1.1 + smoothConstellationWeights.w * 0.25
          : 0.68 + smoothConstellationWeights.x * 0.2;
        item.flareMat.uniforms.uHighlight.value +=
          (targetHighlight - item.flareMat.uniforms.uHighlight.value) * 0.1;

        const starColorTarget = isSelectedPrincipal
          ? wingTargetColor
          : item.isPrincipal
          ? new THREE.Color(0xfef08a)
          : lineTargetColor;
        item.flareMat.uniforms.uColor.value.lerp(starColorTarget, 0.08);

        const pulseStar =
          starNodeIdx === 3
            ? 1.22 + (lub + dub) * 2.8
            : isSelectedPrincipal
            ? 1.38 + Math.sin(elapsed * 4.2) * 0.12
            : 1.0 + Math.sin(elapsed * 2.5 + idx) * 0.08;
        const targetS = item.baseScale * pulseStar;
        item.flareMesh.scale.lerp(new THREE.Vector3(targetS, targetS, 1), 0.12);

        if (item.orbitRingGroup) {
          item.orbitRingGroup.rotation.z = elapsed * (isSelectedPrincipal ? 1.8 : 0.75) + idx;
          item.orbitRingGroup.rotation.y = elapsed * (isSelectedPrincipal ? 1.2 : 0.5) - idx;
          const ringScale = isSelectedPrincipal ? 1.35 : 1.0;
          item.orbitRingGroup.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), 0.1);
        }
      });

      // Río de 120 fotones viajeros recorriendo el corazón y las alas
      const flowSpeed = starNodeIdx === 0 ? 0.22 : 0.11;
      const flowAttr = flowGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < flowCount; i++) {
        if (i < 84) {
          const u = (i / 84 + elapsed * flowSpeed) % 1.0;
          const pt = heartConstellationCurve.getPointAt(u);
          flowAttr.setXYZ(i, pt.x * constellationBeat, pt.y * constellationBeat, pt.z * constellationBeat);
        } else {
          const isR = i % 2 === 0;
          const u = ((i - 84) / 36 + elapsed * (flowSpeed * 1.4)) % 1.0;
          const pt = (isR ? wingRightCurve : wingLeftCurve).getPointAt(u);
          flowAttr.setXYZ(i, pt.x, pt.y, pt.z);
        }
      }
      flowAttr.needsUpdate = true;

      const targetStarPt = heartConstellationPoints[principalNodeIndices[starNodeIdx] ?? 0];
      if (targetStarPt) {
        activeStarSelector.position.lerp(targetStarPt, 0.15);
        activeStarSelector.quaternion.copy(camera.quaternion);
        selectorInnerRing.rotation.z = elapsed * 0.9;
        selectorOuterRing.rotation.z = -elapsed * 0.65;
        const selScale = 1.0 + Math.sin(elapsed * 4.0) * 0.12;
        activeStarSelector.scale.set(selScale, selScale, 1);
      }

      // Doble onda de choque 3D, onda en el velo de 7,200 partículas y lluvia de 140 chispas
      if (stateRef.current.nodePulseTime > 0.01 && targetStarPt) {
        stateRef.current.nodePulseTime *= 0.945;
        const np = 1.0 - stateRef.current.nodePulseTime;
        constellationVeilMat.uniforms.uBurstPos.value.copy(targetStarPt);
        constellationVeilMat.uniforms.uBurstProgress.value = np;
        constellationConduitMat.uniforms.uPulseBoost.value = stateRef.current.nodePulseTime;

        constellationBurstRing.position.copy(targetStarPt);
        constellationBurstRing.quaternion.copy(camera.quaternion);
        const rScale = 1.0 + np * 24.0;
        constellationBurstRing.scale.set(rScale, rScale, 1);

        constellationBurstRing2.position.copy(targetStarPt);
        constellationBurstRing2.rotation.z = elapsed * 2.0;
        constellationBurstRing2.scale.set(rScale * 0.85, rScale * 0.85, 1);
        constellationBurstMat.opacity = stateRef.current.nodePulseTime * 0.95;

        const spAttr = sparkGeo.attributes.position as THREE.BufferAttribute;
        const easeOut = 1.0 - Math.pow(1.0 - np, 2.2);
        for (let i = 0; i < sparkCount; i++) {
          const d = sparkDirs[i];
          spAttr.setXYZ(
            i,
            targetStarPt.x + d.x * easeOut * 1.45,
            targetStarPt.y + d.y * easeOut * 1.45,
            targetStarPt.z + d.z * easeOut * 1.45
          );
        }
        spAttr.needsUpdate = true;
        sparkMat.opacity = stateRef.current.nodePulseTime;
      } else {
        constellationVeilMat.uniforms.uBurstProgress.value = -1.0;
        constellationConduitMat.uniforms.uPulseBoost.value *= 0.9;
        constellationBurstMat.opacity = 0;
        sparkMat.opacity = 0;
      }

      // 5. Gargantúa: rotación de brasas relativistas (se congelan a 0 cuando crossingHorizon es true)
      lensBillboard.quaternion.copy(camera.quaternion);
      const glowPulse = 1 + Math.sin(elapsed * 0.8) * 0.05;
      bhGlow.scale.set(64 * glowPulse, 64 * glowPulse, 1);

      const chAttr = chrononGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < chrononCount; i++) {
        const i3 = i * 3;
        const r = chrononBase[i3];
        const baseTheta = chrononBase[i3 + 1];
        const y = chrononBase[i3 + 2];
        const ang = baseTheta + elapsed * (2.2 / Math.pow(r * 0.25, 1.25));
        chAttr.setXYZ(i, Math.cos(ang) * r, y + Math.sin(elapsed * 1.2 + baseTheta) * 0.35, Math.sin(ang) * r);
      }
      chAttr.needsUpdate = true;

      if (stateRef.current.timeFreezePulse > 0.01) {
        stateRef.current.timeFreezePulse *= 0.94;
        const tp = 1.0 - stateRef.current.timeFreezePulse;
        const trScale = 1.0 + tp * 4.5;
        timeRippleRing.scale.set(trScale, trScale, 1);
        timeRippleRing.quaternion.copy(camera.quaternion);
        timeRippleMat.opacity = stateRef.current.timeFreezePulse * 0.85;
      } else {
        timeRippleMat.opacity = 0;
      }

      // 6. Acto VI: Danza de los Dos Soles Binarios y el Gran Cometa
      const targetSep = wishActive ? 3.8 : 5.8;
      binarySeparation += (targetSep - binarySeparation) * 0.05;
      goldSunGroup.position.x = -binarySeparation;
      cyanSunGroup.position.x = binarySeparation;
      bridgeMat.uniforms.uSeparation.value = binarySeparation;

      const binarySpeed = wishActive ? 1.35 : 0.55;
      binaryAngle += scaledDelta * binarySpeed;
      binaryOrbitPivot.rotation.y = binaryAngle;

      if (stateRef.current.cometPulseTime > 0.01) {
        stateRef.current.cometPulseTime *= 0.95;
        const cp = 1.0 - stateRef.current.cometPulseTime;
        const ws = 1.0 + cp * 26.0;
        wishShockwaveRing.scale.set(ws, ws, 1);
        wishShockwaveRing.quaternion.copy(camera.quaternion);
        wishShockwaveMat.opacity = stateRef.current.cometPulseTime * 0.9;
        binaryBoost += (1.0 - binaryBoost) * 0.12;
      } else {
        wishShockwaveMat.opacity = 0;
        binaryBoost += ((wishActive ? 0.65 : 0.0) - binaryBoost) * 0.05;
      }
      goldSunMat.uniforms.uBoost.value = binaryBoost;
      cyanSunMat.uniforms.uBoost.value = binaryBoost;
      bridgeMat.uniforms.uBoost.value = binaryBoost;
      cometTailMat.uniforms.uBoost.value = binaryBoost;
      cometHeadSprite.scale.set(9.5 + binaryBoost * 4.5, 9.5 + binaryBoost * 4.5, 1);
      cometGroup.position.x = -6.0 + Math.sin(elapsed * 0.25) * 3.2;
      cometGroup.position.y = 9.2 + Math.cos(elapsed * 0.2) * 1.4;

      // 7. Acto VII (Galaxia Espiral) & Acto VIII (Corazón Cósmico)
      // Ocultar completamente la galaxia durante los Actos I a V para que jamás aparezca
      // detrás de la constelación en el Acto IV.
      const targetGalVis = activePhase >= 7 || splineProgress > 0.68 ? 1.0 : 0.0;
      galaxySceneVis += (targetGalVis - galaxySceneVis) * 0.06;
      galaxyShaderMat.uniforms.uSceneVis.value = galaxySceneVis;
      galaxyGroup.visible = galaxySceneVis > 0.005;

      const targetMorph = activePhase === 8 ? 1.0 : 0.0;
      heartMorphFactor += (targetMorph - heartMorphFactor) * 0.032;
      galaxyShaderMat.uniforms.uMorph.value = heartMorphFactor;

      // Pesos de transformación interactiva de la galaxia (Tu sonrisa / Nuestros momentos / Lo que viene)
      targetGalaxyWeights.set(memIdx === 0 ? 1 : 0, memIdx === 1 ? 1 : 0, memIdx === 2 ? 1 : 0);
      smoothGalaxyWeights.lerp(targetGalaxyWeights, 0.06);
      galaxyShaderMat.uniforms.uModeWeights.value.copy(smoothGalaxyWeights);

      if (stateRef.current.galaxyPulseTime > 0.01) {
        stateRef.current.galaxyPulseTime *= 0.96;
        galaxyWaveProgress = 1.0 - stateRef.current.galaxyPulseTime;
      } else {
        galaxyWaveProgress = -1.0;
      }
      galaxyShaderMat.uniforms.uPulseWave.value = galaxyWaveProgress;

      galaxyCoreMat.opacity = galaxySceneVis * (0.88 + smoothGalaxyWeights.x * 0.12);
      const coreScale = (32 + smoothGalaxyWeights.x * 10) * (1 + Math.sin(elapsed * 2.0) * 0.05);
      galaxyCoreSprite.scale.set(coreScale, coreScale, 1);
      galaxyPinkHaloMat.opacity = galaxySceneVis * (0.62 + smoothGalaxyWeights.y * 0.25);

      // Supernovas de la memoria dentro de los brazos espirales (modo "Nuestros momentos")
      const clusterAlpha = galaxySceneVis * smoothGalaxyWeights.y * (1.0 - heartMorphFactor);
      clusterWebMat.opacity = clusterAlpha * 0.48;
      clusterSprites.forEach((sp, idx) => {
        sp.material.opacity = clusterAlpha * (0.75 + 0.25 * Math.sin(elapsed * 3.5 + idx));
        const cs = (8.5 + Math.sin(elapsed * 3.0 + idx) * 2.2) * (0.6 + 0.6 * smoothGalaxyWeights.y);
        sp.scale.set(cs, cs, 1);
      });

      const targetGalRotX = activePhase === 8 ? 0.04 : memIdx === 2 ? 0.78 : memIdx === 1 ? 0.42 : 0.56;
      const targetGalRotZ = activePhase === 8 ? 0.0 : memIdx === 0 ? -0.18 : -0.28;
      galaxyGroup.rotation.x += (targetGalRotX - galaxyGroup.rotation.x) * 0.035;
      galaxyGroup.rotation.z += (targetGalRotZ - galaxyGroup.rotation.z) * 0.035;

      const galSpinSpeed = activePhase === 8 ? 0.0 : 0.085 + smoothGalaxyWeights.z * 0.18;
      if (activePhase === 8) {
        galaxySpinAngle += (0 - galaxySpinAngle) * 0.05;
      } else {
        galaxySpinAngle += scaledDelta * galSpinSpeed;
      }
      galaxyGroup.rotation.y = galaxySpinAngle;

      // 8. Estrellas fugaces (con soporte para ráfagas de deseos y congelación temporal)
      if (stateRef.current.meteorShowerQueue > 0 && timeScale > 0.1) {
        spawnMeteor();
        stateRef.current.meteorShowerQueue--;
      }
      nextMeteorIn -= scaledDelta;
      if (introDone && nextMeteorIn <= 0) {
        spawnMeteor();
        const shower = activePhase === 8 || letterIsOpen || (activePhase === 6 && wishActive);
        nextMeteorIn = shower ? 0.45 + Math.random() * 1.1 : 3.2 + Math.random() * 5.2;
      }
      for (const m of meteors) {
        if (!m.active) continue;
        m.life += scaledDelta;
        const k = m.life / m.duration;
        if (k >= 1) {
          m.active = false;
          m.mesh.visible = false;
          continue;
        }
        m.x += m.dx * m.speed * scaledDelta;
        m.y += m.dy * m.speed * scaledDelta;
        m.mesh.position.set(m.x - (m.dx * m.length) / 2, m.y - (m.dy * m.length) / 2, -60);
        m.mat.uniforms.uOpacity.value = Math.sin(Math.PI * Math.min(1, k * 1.15)) * 0.95;
      }

      // 9. Progreso continuo sobre el Spline 3D (8 Actos) + encuadres orbitales
      const targetSplineT = (activePhase - 1) / (TOTAL_PHASES - 1);
      splineProgress += (targetSplineT - splineProgress) * 0.028;
      const clampedT = Math.max(0, Math.min(1, splineProgress));

      const baseCamPos = cameraSpline.getPoint(clampedT);
      const baseLookAt = lookAtSpline.getPoint(clampedT);

      const parallaxScale = portraitFactor > 0.1 ? 1.25 : 2.0;
      const parallaxX = mouseX * parallaxScale;
      const parallaxY = mouseY * (parallaxScale * 0.7);
      baseCamPos.x += parallaxX;
      baseCamPos.y += parallaxY;

      if (activePhase === 1) {
        baseCamPos.x += Math.sin(elapsed * 0.2) * 2.5;
        baseCamPos.y += Math.cos(elapsed * 0.16) * 1.8;
        baseCamPos.z += portraitFactor * 14.0;
      } else if (activePhase === 2) {
        if (diving) {
          baseCamPos.set(
            28.8 + Math.sin(elapsed * 0.45) * 1.2 + parallaxX * 0.35,
            9.2 + Math.cos(elapsed * 0.35) * 0.6 + parallaxY * 0.35,
            55.2
          );
          baseLookAt.set(35.0, 8.2, 45.0);
        } else {
          baseCamPos.x += Math.sin(elapsed * 0.22) * 2.0;
          baseCamPos.y += Math.cos(elapsed * 0.18) * 1.1;
        }
      } else if (activePhase === 3) {
        baseCamPos.x += Math.sin(elapsed * 0.28) * 2.6;
        baseCamPos.y += Math.cos(elapsed * 0.22) * 1.4;
      } else if (activePhase === 4) {
        const nodeCamShiftX = (starNodeIdx - 1.5) * 2.8;
        baseCamPos.x += Math.sin(elapsed * 0.28) * 3.2 + nodeCamShiftX;
        baseCamPos.y += Math.cos(elapsed * 0.22) * 1.8;
        if (targetStarPt) {
          // La cámara enfoca y orbita suavemente en 3D hacia la estrella seleccionada en la constelación
          baseLookAt.x += targetStarPt.x * 0.28;
          baseLookAt.y += targetStarPt.y * 0.24;
        }
      } else if (activePhase === 5) {
        if (crossingHorizon) {
          // Acercamiento íntimo al horizonte de sucesos congelado en el tiempo
          baseCamPos
            .copy(BH_POS)
            .addScaledVector(bhViewDir, 17.5)
            .add(tmpDir.set(parallaxX * 0.35, 1.2 + parallaxY * 0.35, 0));
          baseLookAt.copy(BH_POS);
        } else {
          baseCamPos.x += Math.sin(elapsed * 0.18) * 2.2;
          baseCamPos.y += Math.cos(elapsed * 0.15) * 1.2;
        }
      } else if (activePhase === 6) {
        baseCamPos.x += Math.sin(elapsed * 0.22) * 2.4;
        baseCamPos.y += Math.cos(elapsed * 0.18) * 1.4;
        if (wishActive) {
          baseCamPos.z -= 4.5;
        }
      } else if (activePhase === 7) {
        const memAngleOffset = (memIdx - 1) * 0.48;
        const orbitAmp = portraitFactor > 0.1 ? 11.5 : 17.5;
        baseCamPos.x += Math.sin(elapsed * 0.16 + memAngleOffset) * orbitAmp;
        baseCamPos.y += Math.cos(elapsed * 0.14) * 3.2 + (memIdx === 2 ? 6.5 : memIdx === 1 ? -3.0 : 0);
      } else if (activePhase === 8) {
        baseCamPos.x += Math.sin(elapsed * 0.15) * 2.0;
        baseCamPos.y += Math.cos(elapsed * 0.15) * 1.1;
      }

      // Encuadre automático en celular: ajusta la distancia para que cada astro se vea
      // con presencia cinematográfica en la mitad superior y el texto libre abajo.
      const subject = portraitSubjects[activePhase];
      if (subject && portraitFit > 0) {
        let r = subject.r;
        if (activePhase === 2 && diving) r = 9.0;
        if (crossingHorizon) r = 9.0;
        if (activePhase === 6 && wishActive) r = 12.8;
        if (activePhase === 7 && memIdx === 1) r = 31.0;
        const tanV = Math.tan(THREE.MathUtils.degToRad(baseFov * 0.5));
        const tanH = tanV * safeAspect;
        const need = Math.max(r / tanH, r / (tanV * 0.55)) * 1.04;
        tmpDir.copy(baseCamPos).sub(subject.c);
        const cur = tmpDir.length();
        if (cur > 0.001 && cur < need) {
          const newDist = cur + (need - cur) * portraitFit;
          tmpDir.multiplyScalar(1 / cur);
          baseCamPos.copy(subject.c).addScaledVector(tmpDir, newDist);
          baseLookAt.lerp(subject.c, portraitFit);
          if (activePhase === 4 && targetStarPt) {
            baseLookAt.x += targetStarPt.x * 0.22 * portraitFit;
            baseLookAt.y += targetStarPt.y * 0.18 * portraitFit;
          }
          baseLookAt.y -= newDist * tanV * 0.27 * portraitFit;
        }
      }

      if (!Number.isFinite(smoothCamPos.x) || !Number.isFinite(smoothCamPos.y) || !Number.isFinite(smoothCamPos.z)) {
        smoothCamPos.copy(baseCamPos);
      }
      if (!Number.isFinite(smoothLookAt.x) || !Number.isFinite(smoothLookAt.y) || !Number.isFinite(smoothLookAt.z)) {
        smoothLookAt.copy(baseLookAt);
      }

      const lateralVel = (baseCamPos.x - smoothCamPos.x) * 0.012;
      const bankAngle = Math.max(-0.12, Math.min(0.12, -lateralVel));
      camera.up.set(Math.sin(bankAngle), Math.cos(bankAngle), 0).normalize();

      smoothCamPos.lerp(baseCamPos, crossingHorizon ? 0.035 : 0.045);
      smoothLookAt.lerp(baseLookAt, 0.055);

      camera.position.copy(smoothCamPos);
      camera.lookAt(smoothLookAt);

      renderer.render(scene, camera);
    };


    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      domElem.removeEventListener('click', handleCanvasClick);
      domElem.removeEventListener('touchstart', handleTouchStart);
      domElem.removeEventListener('touchmove', handleTouchMove);
      domElem.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      renderer.dispose();
    };
  }, []);

  const currentMeta = PHASES_METADATA[phase - 1] || PHASES_METADATA[0];
  const PhaseIcon = currentMeta.icon;

  return (
    <div
      className="relative w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#020207] text-white select-none font-sans touch-manipulation"
      style={{ width: '100vw', height: '100dvh', minHeight: '100vh' }}
    >
      {/* Tipografías editoriales, cinematográficas y soporte Safe-Area móvil */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Space+Mono&display=swap');
        .font-serif-Select {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans-Select {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .font-mono-Select {
          font-family: 'Space Mono', monospace;
        }
        @keyframes cinematicFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-cinematic-float {
          animation: cinematicFloat 7s ease-in-out infinite;
        }
        .text-cinema-glow {
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.96), 0 0 38px rgba(230, 211, 167, 0.25);
        }
        .safe-top {
          padding-top: max(0.75rem, env(safe-area-inset-top));
        }
        .safe-bottom {
          padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Banda sonora fija de Interstellar desde el inicio */}
      <audio ref={audioRef} autoPlay loop preload="auto" playsInline className="hidden">
        <source src="/interstellar.mp3" type="audio/mpeg" />
      </audio>

      {/* LIENZO 3D CONTINUO (THREE.JS + SHADERS GLSL) */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      {/* Barra luminosa superior de progreso cuando el Recorrido Automático está activo */}
      {autoPilot && (
        <div className="pointer-events-none fixed top-0 inset-x-0 h-[2px] bg-white/10 z-50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#e6d3a7]/60 via-[#fef08a] to-[#38bdf8] shadow-[0_0_12px_rgba(254,240,138,0.9)] transition-all duration-100 ease-linear"
            style={{ width: `${autoProgress}%` }}
          />
        </div>
      )}

      {/* Viñeta cinematográfica suave que deja libre la bóveda celeste central/superior */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(2,2,7,0.0) 0%, rgba(2,2,7,0.14) 62%, rgba(1,2,6,0.86) 100%)'
        }}
      />

      {/* Degradados sutiles superior e inferior para legibilidad perfecta sin opacar el fondo */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-b from-black/75 via-black/25 to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-44 sm:h-36 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10" />

      {/* ==================================================================== */}
      {/* BARRA SUPERIOR MINIMALISTA Y RECORRIDO AUTOMÁTICO FUNCIONAL          */}
      {/* ==================================================================== */}
      <header className="relative z-30 shrink-0 flex items-center justify-between px-3.5 sm:px-9 safe-top sm:pt-6 gap-2">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#060711]/65 border border-white/[0.12] backdrop-blur-xl">
            <PhaseIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e6d3a7] shrink-0" />
            <span className="font-mono-Select text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#f4f1ea]/95 truncate">
              {currentMeta.code}
            </span>
          </div>
          <span className="hidden md:inline-block font-serif-Select italic text-sm text-[#e6d3a7]/80 tracking-wide truncate">
            {currentMeta.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handleToggleAutoPilot}
            title={autoPilot ? 'Pausar recorrido automático' : 'Iniciar recorrido automático'}
            className={`relative overflow-hidden flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-mono-Select border transition-all backdrop-blur-xl cursor-pointer active:scale-95 ${
              autoPilot
                ? 'bg-[#e6d3a7]/20 border-[#e6d3a7]/80 text-[#f4f1ea] shadow-[0_0_25px_rgba(230,211,167,0.3)]'
                : 'bg-[#060711]/65 border-white/[0.12] text-slate-300 hover:text-white hover:border-white/30'
            }`}
          >
            <GlyphProjector className="w-3.5 h-3.5 text-[#e6d3a7] shrink-0" active={autoPilot} />
            <span className="hidden sm:inline">
              {autoPilot ? 'En curso' : 'Recorrido'}
            </span>
          </button>

          <button
            onClick={handleToggleMute}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-1.5 rounded-full bg-[#060711]/65 hover:bg-[#0b0d1e]/85 border border-white/[0.12] hover:border-white/30 text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-mono-Select text-slate-200 transition-all backdrop-blur-xl cursor-pointer active:scale-95"
            title={isMuted ? 'Activar música' : 'Silenciar música'}
          >
            <GlyphSoundWave
              className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isMuted ? 'text-slate-500' : 'text-[#e6d3a7]'}`}
              muted={isMuted}
            />
            <span className="hidden sm:inline">
              {isMuted ? 'Silencio' : 'Melodía'}
            </span>
          </button>

          <button
            onClick={() => setHudHidden(!hudHidden)}
            className={`p-2 rounded-full border transition-all backdrop-blur-xl cursor-pointer active:scale-95 ${
              hudHidden
                ? 'bg-[#e6d3a7]/20 border-[#e6d3a7]/60 text-[#f4f1ea]'
                : 'bg-[#060711]/65 hover:bg-[#0b0d1e]/85 border-white/[0.12] hover:border-white/30 text-slate-300 hover:text-white'
            }`}
            title={hudHidden ? 'Mostrar versos' : 'Contemplar solo el universo'}
          >
            <GlyphAperture className="w-4 h-4" hiddenHud={hudHidden} />
          </button>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* NARRATIVA POÉTICA Y COMPOSICIÓN ESPACIAL ADAPTADA A MÓVIL Y PC        */}
      {/* ==================================================================== */}
      {!hudHidden ? (
        <main
          className={`relative z-20 flex-1 min-h-0 flex flex-col justify-between px-4 sm:px-14 py-2 sm:py-4 pointer-events-none transition-all duration-700 ${
            textVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-3 blur-sm'
          }`}
        >
          {/* ---------------------------------------------------------------- */}
          {/* ACTO I · EL COMIENZO                                             */}
          {/* ---------------------------------------------------------------- */}
          {phase === 1 && (
            <div className="flex-1 flex flex-col justify-between items-center text-center max-w-3xl w-full mx-auto pt-3 sm:pt-8 pb-2 sm:pb-5">
              <div className="pointer-events-auto flex flex-col items-center px-2 animate-cinematic-float">
                <div className="mb-3.5 sm:mb-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#060711]/55 border border-[#e6d3a7]/30 text-[#e6d3a7] text-[10px] sm:text-[11px] font-mono-Select tracking-[0.28em] uppercase backdrop-blur-md">
                  <GlyphOrigin className="w-3.5 h-3.5 text-[#e6d3a7]" />
                  <span>{content.phase1Badge}</span>
                </div>

                <h1 className="font-serif-Select text-5xl sm:text-8xl md:text-9xl font-light tracking-[0.08em] bg-gradient-to-b from-[#ffffff] via-[#f4f1ea] to-[#d8c7a8] bg-clip-text text-transparent drop-shadow-[0_4px_45px_rgba(230,211,167,0.28)] py-0.5 sm:py-2">
                  {content.recipientName}
                </h1>

                <p className="font-serif-Select italic text-lg sm:text-3xl md:text-4xl text-[#f4f1ea]/90 mt-2.5 sm:mt-4 max-w-md sm:max-w-2xl leading-relaxed text-cinema-glow px-3 font-light">
                  “{content.phase1Subtitle}”
                </p>
              </div>

              <div className="flex-1 min-h-[16vh] sm:min-h-[12vh]" />

              <div className="pointer-events-auto flex flex-col items-center pb-1 sm:pb-2">
                <button
                  onClick={handleStartJourney}
                  className="group relative inline-flex items-center justify-center gap-3.5 sm:gap-4 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#080a18]/75 hover:bg-[#10142d]/85 text-[#f4f1ea] font-mono-Select text-[10px] sm:text-xs tracking-[0.26em] uppercase border border-[#e6d3a7]/50 hover:border-[#e6d3a7]/90 shadow-[0_0_45px_rgba(230,211,167,0.2)] hover:shadow-[0_0_65px_rgba(230,211,167,0.38)] backdrop-blur-xl transition-all duration-500 active:scale-95 cursor-pointer"
                >
                  <GlyphOrigin className="w-4 h-4 text-[#e6d3a7] transition-transform duration-700 group-hover:rotate-90" />
                  <span>Iniciar la travesía</span>
                  <GlyphArrowRight className="w-4 h-4 text-[#e6d3a7] transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>

                <p className="mt-3.5 sm:mt-4 font-serif-Select italic text-xs sm:text-sm text-slate-300/75 tracking-wider">
                  Desliza suavemente el cielo o toca para viajar
                </p>
              </div>
            </div>
          )}

          {/* Epígrafe sutil para los actos II a VIII */}
          {phase > 1 && (
            <div className="hidden sm:flex items-center gap-2.5 text-[11px] text-[#e6d3a7]/75 tracking-[0.24em] uppercase font-mono-Select">
              <span className="w-5 h-[1px] bg-[#e6d3a7]/45" />
              <span className="truncate">{currentMeta.title}</span>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ACTO II · MI MUNDO (PLANETA COMPLETO ARRIBA EN MÓVIL, TEXTO ABAJO) */}
          {/* ---------------------------------------------------------------- */}
          {phase === 2 && (
            <div className="mt-auto mb-0.5 sm:my-auto max-w-xl w-full mx-auto sm:mx-0 text-center sm:text-left pointer-events-auto">
              <div className="inline-flex items-center gap-2 font-mono-Select text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-sky-200/90 mb-1 sm:mb-2">
                <GlyphExoplanet className="w-3.5 h-3.5 text-sky-300" />
                <span>
                  {planetDive ? 'Donde el cielo toca tu mar' : 'Un mundo para quedarme'}
                </span>
              </div>

              <h2 className="font-serif-Select italic text-2xl sm:text-5xl text-[#f4f1ea] leading-snug sm:leading-tight text-cinema-glow font-light">
                “{content.phase2Quote}”
              </h2>

              <p className="text-xs sm:text-base text-slate-200/85 mt-1.5 sm:mt-3.5 leading-relaxed font-light max-w-lg mx-auto sm:mx-0 drop-shadow">
                {content.phase2Detail}
              </p>

              <div className="mt-3.5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-2 sm:gap-3">
                <button
                  onClick={() => setPlanetDive(!planetDive)}
                  className={`inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-full font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border backdrop-blur-xl transition-all cursor-pointer active:scale-95 ${
                    planetDive
                      ? 'bg-sky-500/20 border-sky-300/75 text-white shadow-[0_0_25px_rgba(56,189,248,0.3)]'
                      : 'bg-[#060711]/75 hover:bg-sky-950/50 border-white/20 text-sky-100'
                  }`}
                >
                  <GlyphExoplanet className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>
                    {planetDive ? 'Mirarlo a la distancia' : 'Acercarme a su cielo'}
                  </span>
                </button>

                <button
                  onClick={() => goToPhase(3)}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-[#060711]/75 hover:bg-white/[0.12] text-[#f4f1ea] font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border border-[#e6d3a7]/40 hover:border-[#e6d3a7]/80 backdrop-blur-xl transition-all cursor-pointer active:scale-95"
                >
                  <span>Ir hacia tu estrella</span>
                  <GlyphArrowRight className="w-4 h-4 text-[#e6d3a7] shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ACTO III · MI ESTRELLA (SUPERNOVA 3D ARRIBA, POESÍA ABAJO)       */}
          {/* ---------------------------------------------------------------- */}
          {phase === 3 && (
            <div className="mt-auto mb-0.5 sm:mb-2 mx-auto text-center max-w-2xl w-full pointer-events-auto">
              <div className="inline-flex items-center gap-2 font-mono-Select text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#e6d3a7]/90 mb-1">
                <GlyphSupernova className="w-3.5 h-3.5 text-[#e6d3a7]" />
                <span>Toca la estrella para encender su pulso</span>
              </div>

              <h2 className="font-serif-Select italic text-2xl sm:text-5xl text-[#f4f1ea] leading-snug sm:leading-tight text-cinema-glow font-light">
                “{content.phase3Quote}”
              </h2>

              <p className="text-xs sm:text-base text-slate-200/85 mt-1.5 sm:mt-3 font-light max-w-xl mx-auto drop-shadow">
                {content.phase3Detail}
              </p>

              <div className="mt-3.5 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={handleTouchStar}
                  className={`inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border backdrop-blur-xl transition-all active:scale-95 cursor-pointer ${
                    starTouched
                      ? 'bg-[#e6d3a7]/20 border-[#e6d3a7]/80 text-[#f4f1ea] shadow-[0_0_30px_rgba(230,211,167,0.3)]'
                      : 'bg-[#060711]/75 hover:bg-[#e6d3a7]/15 border-[#e6d3a7]/45 text-[#e6d3a7]'
                  }`}
                >
                  <GlyphSupernova className="w-4 h-4 text-[#e6d3a7] shrink-0" />
                  <span>{starTouched ? 'Su luz ya lleva tu nombre' : 'Hacerla brillar'}</span>
                </button>

                <button
                  onClick={() => goToPhase(4)}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-[#060711]/75 hover:bg-white/[0.12] text-[#f4f1ea] font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border border-white/25 hover:border-white/50 backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
                >
                  <span>Unir nuestras estrellas</span>
                  <GlyphArrowRight className="w-4 h-4 text-[#e6d3a7] shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ACTO IV · NUESTRA CONSTELACIÓN (CUADRÍCULA 2x2 EN MÓVIL SIN      */}
          {/* RECORTES EN EL BORDE Y CON REACCIONES 3D EN CADA ESTRELLA)       */}
          {/* ---------------------------------------------------------------- */}
          {phase === 4 && (
            <div className="mt-auto mb-0.5 mx-auto w-full max-w-3xl pointer-events-auto text-center">
              <h2 className="font-serif-Select italic text-xl sm:text-4xl text-[#f4f1ea] leading-snug text-cinema-glow px-1 font-light">
                “{content.phase4Quote}”
              </h2>

              <div className="mt-2 sm:mt-3.5 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-md sm:max-w-none mx-auto px-1">
                {content.constellationNodes.map((node, idx) => (
                  <button
                    key={node.id}
                    onClick={() => handleSelectConstellationNode(idx)}
                    className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full font-mono-Select text-[9px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.12em] uppercase border backdrop-blur-xl transition-all cursor-pointer active:scale-95 ${
                      selectedStarNode === idx
                        ? 'bg-[#e6d3a7]/20 border-[#e6d3a7]/80 text-[#f4f1ea] shadow-[0_0_20px_rgba(230,211,167,0.28)]'
                        : 'bg-[#060711]/75 border-white/15 text-slate-300 hover:border-white/35'
                    }`}
                  >
                    <GlyphSupernova
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                        selectedStarNode === idx ? 'text-[#e6d3a7]' : 'text-slate-500'
                      }`}
                    />
                    <span className="truncate">{node.date}</span>
                  </button>
                ))}
              </div>

              {content.constellationNodes[selectedStarNode] && (
                <div className="mt-2 sm:mt-3 mx-auto max-w-2xl px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl bg-[#05060f]/80 border border-white/[0.14] backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-5 text-left">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono-Select tracking-[0.16em] uppercase text-[#e6d3a7]">
                      <GlyphConstellation className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{content.constellationNodes[selectedStarNode].label}</span>
                    </div>
                    <p className="font-serif-Select italic text-sm sm:text-lg text-slate-100/95 mt-0.5 leading-snug">
                      “{content.constellationNodes[selectedStarNode].text}”
                    </p>
                  </div>

                  <button
                    onClick={() => goToPhase(5)}
                    className="group shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-[#f4f1ea] font-mono-Select text-[10px] sm:text-[11px] tracking-[0.16em] uppercase border border-[#e6d3a7]/45 transition active:scale-95 cursor-pointer"
                  >
                    <span>Donde el tiempo se detiene</span>
                    <GlyphArrowRight className="w-3.5 h-3.5 text-[#e6d3a7] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ACTO V · GARGANTÚA (CONGELACIÓN TOTAL DEL TIEMPO Y ENCUADRE)     */}
          {/* ---------------------------------------------------------------- */}
          {phase === 5 && (
            <div className="mt-auto mb-0.5 sm:mb-2 mx-auto text-center max-w-2xl w-full pointer-events-auto">
              <div className="inline-flex items-center gap-2 font-mono-Select text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-amber-200/90 mb-1">
                <GlyphBlackHole className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {horizonDive ? 'Instante eterno · El universo entero se ha detenido' : 'Gargantúa · Gravedad imposible'}
                </span>
              </div>

              <h2 className="font-serif-Select italic text-xl sm:text-4xl text-[#f4f1ea] leading-snug text-cinema-glow font-light px-1">
                “{content.phase5Quote}”
              </h2>

              <p className="text-xs sm:text-base text-slate-200/85 mt-1.5 sm:mt-3 font-light max-w-xl mx-auto drop-shadow">
                {content.phase5Detail}
              </p>

              <div className="mt-3.5 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={handleToggleTimeFreeze}
                  className={`inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-full font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border backdrop-blur-xl transition-all active:scale-95 cursor-pointer ${
                    horizonDive
                      ? 'bg-amber-500/25 border-amber-300/85 text-white shadow-[0_0_28px_rgba(251,191,36,0.35)]'
                      : 'bg-[#060711]/75 hover:bg-amber-950/40 border-amber-200/35 text-amber-100'
                  }`}
                >
                  <GlyphBlackHole className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{horizonDive ? 'Dejar que el tiempo vuelva a correr' : 'Detener el tiempo contigo'}</span>
                </button>

                <button
                  onClick={() => goToPhase(6)}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-[#060711]/75 hover:bg-white/[0.12] text-[#f4f1ea] font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border border-[#e6d3a7]/45 hover:border-[#e6d3a7]/85 backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
                >
                  <span>Seguir hacia los dos soles</span>
                  <GlyphArrowRight className="w-4 h-4 text-[#e6d3a7] shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ACTO VI · ALMAS BINARIAS Y EL GRAN COMETA DE LOS DESEOS          */}
          {/* ---------------------------------------------------------------- */}
          {phase === 6 && (
            <div className="mt-auto mb-0.5 sm:mb-2 mx-auto text-center max-w-2xl w-full pointer-events-auto">
              <div className="inline-flex items-center gap-2 font-mono-Select text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-cyan-200/90 mb-1">
                <GlyphBinaryComet className="w-3.5 h-3.5 text-[#e6d3a7]" />
                <span>
                  {cometWish ? 'Deseo concedido · Dos almas girando en una sola luz' : 'Sistema binario y el cometa del milenio'}
                </span>
              </div>

              <h2 className="font-serif-Select italic text-xl sm:text-4xl text-[#f4f1ea] leading-snug text-cinema-glow font-light px-1">
                “{content.phase6Quote}”
              </h2>

              <p className="text-xs sm:text-base text-slate-200/85 mt-1.5 sm:mt-3 font-light max-w-xl mx-auto drop-shadow">
                {content.phase6Detail}
              </p>

              <div className="mt-3.5 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={handleTriggerCometWish}
                  className={`inline-flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-full font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border backdrop-blur-xl transition-all active:scale-95 cursor-pointer ${
                    cometWish
                      ? 'bg-[#e6d3a7]/25 border-[#e6d3a7]/85 text-white shadow-[0_0_30px_rgba(230,211,167,0.35)]'
                      : 'bg-[#060711]/75 hover:bg-cyan-950/40 border-[#e6d3a7]/45 text-[#f4f1ea]'
                  }`}
                >
                  <GlyphBinaryComet className="w-4 h-4 text-[#e6d3a7] shrink-0" />
                  <span>{cometWish ? 'Nuestro deseo brilla en el cielo' : 'Pedir un deseo juntos'}</span>
                </button>

                <button
                  onClick={() => goToPhase(7)}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-[#060711]/75 hover:bg-white/[0.12] text-[#f4f1ea] font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border border-white/25 hover:border-white/50 backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
                >
                  <span>Contemplar nuestra galaxia</span>
                  <GlyphArrowRight className="w-4 h-4 text-[#e6d3a7] shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ACTO VII · MI GALAXIA (INTERACCIONES 3D AL PRESIONAR RECUERDOS)  */}
          {/* ---------------------------------------------------------------- */}
          {phase === 7 && (
            <div className="mt-auto mb-0.5 mx-auto w-full max-w-3xl text-center pointer-events-auto">
              <h2 className="font-serif-Select italic text-2xl sm:text-5xl text-[#f4f1ea] leading-snug sm:leading-tight text-cinema-glow px-1 font-light">
                “No eres solamente mi mundo, {content.recipientName}… eres toda mi galaxia.”
              </h2>

              <div className="mt-2 sm:mt-3.5 flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap">
                {content.galaxyMemories.map((mem, idx) => (
                  <button
                    key={mem.id}
                    onClick={() => handleSelectGalaxyMemory(idx)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono-Select text-[10px] sm:text-[11px] tracking-[0.14em] uppercase border backdrop-blur-xl transition-all cursor-pointer active:scale-95 ${
                      activeGalaxyMemory === idx
                        ? 'bg-[#e6d3a7]/20 border-[#e6d3a7]/80 text-[#f4f1ea] shadow-[0_0_22px_rgba(230,211,167,0.3)]'
                        : 'bg-[#060711]/75 border-white/15 text-slate-300 hover:border-white/35'
                    }`}
                  >
                    <GlyphOrigin
                      className={`w-3.5 h-3.5 shrink-0 ${
                        activeGalaxyMemory === idx ? 'text-[#e6d3a7]' : 'text-slate-500'
                      }`}
                    />
                    <span>{mem.title}</span>
                  </button>
                ))}
              </div>

              {content.galaxyMemories[activeGalaxyMemory] && (
                <p className="mt-2 sm:mt-3 max-w-xl mx-auto font-serif-Select italic text-base sm:text-2xl text-slate-100/95 leading-relaxed drop-shadow px-2">
                  “{content.galaxyMemories[activeGalaxyMemory].text}”
                </p>
              )}

              <div className="mt-3 sm:mt-5 flex justify-center">
                <button
                  onClick={() => goToPhase(8)}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-2.5 sm:py-3.5 rounded-full bg-[#080a18]/80 hover:bg-[#12162f]/90 text-[#f4f1ea] font-mono-Select text-[10px] sm:text-[11px] tracking-[0.22em] uppercase border border-[#e6d3a7]/55 hover:border-[#e6d3a7]/90 shadow-[0_0_35px_rgba(230,211,167,0.22)] backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
                >
                  <GlyphHeartSingularity className="w-4 h-4 text-[#e6d3a7] shrink-0" />
                  <span>Ir al corazón de todo</span>
                  <GlyphArrowRight className="w-4 h-4 text-[#e6d3a7] shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* ACTO VIII · MI LUGAR FAVORITO (CORAZÓN CÓSMICO + CARTA ÍNTIMA)   */}
          {/* ---------------------------------------------------------------- */}
          {phase === 8 && (
            <div className="mt-auto mb-0.5 sm:mb-2 mx-auto text-center max-w-2xl w-full pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#060711]/70 border border-[#e6d3a7]/35 text-[#e6d3a7] text-[10px] sm:text-[11px] font-mono-Select uppercase tracking-[0.24em] mb-1.5 sm:mb-2.5 backdrop-blur-xl">
                <GlyphHeartSingularity className="w-3.5 h-3.5 text-[#e6d3a7] shrink-0" />
                <span>Mi lugar favorito</span>
              </div>

              <h2 className="font-serif-Select italic text-2xl sm:text-5xl text-[#f4f1ea] leading-snug sm:leading-tight text-cinema-glow px-1 font-light">
                “{content.phase8Quote}”
              </h2>

              <div className="mt-3.5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3.5">
                <button
                  onClick={() => setLetterOpen(true)}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-3 sm:py-3.5 rounded-full bg-[#0a0c1d]/85 hover:bg-[#131735]/95 text-[#f4f1ea] font-mono-Select text-[11px] sm:text-xs tracking-[0.22em] uppercase border border-[#e6d3a7]/65 hover:border-[#e6d3a7] shadow-[0_0_45px_rgba(230,211,167,0.28)] backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
                >
                  <GlyphLetterSeal className="w-4 h-4 text-[#e6d3a7] shrink-0" />
                  <span>Leer mi carta para ti</span>
                </button>

                <button
                  onClick={() => goToPhase(1)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3.5 rounded-full bg-[#060711]/70 hover:bg-white/[0.1] text-slate-300 font-mono-Select text-[10px] sm:text-[11px] tracking-[0.18em] uppercase border border-white/15 backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
                >
                  <GlyphReturn className="w-3.5 h-3.5 shrink-0 text-[#e6d3a7]" />
                  <span>Volver al comienzo</span>
                </button>
              </div>
            </div>
          )}
        </main>
      ) : (
        <div className="flex-1" />
      )}

      {/* ==================================================================== */}
      {/* LÍNEA DE TIEMPO INFERIOR (8 ACTOS CON NÚMEROS ROMANOS)               */}
      {/* ==================================================================== */}
      <footer className="relative z-30 shrink-0 px-3.5 sm:px-9 safe-bottom sm:pb-5 pt-1 flex items-center justify-between gap-2 sm:gap-4">
        <button
          onClick={() => goToPhase(Math.max(1, phase - 1))}
          disabled={phase === 1}
          className={`flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full font-mono-Select text-[10px] sm:text-[11px] tracking-[0.16em] uppercase border backdrop-blur-xl transition-all active:scale-95 ${
            phase === 1
              ? 'opacity-25 cursor-not-allowed bg-black/20 border-white/10 text-slate-600'
              : 'bg-[#060711]/75 hover:bg-white/[0.1] border-white/[0.16] text-slate-200 cursor-pointer'
          }`}
          aria-label="Acto anterior"
        >
          <GlyphArrowLeft className="w-3.5 h-3.5 text-[#e6d3a7]" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-full bg-[#060711]/75 border border-white/[0.14] backdrop-blur-xl">
          {PHASES_METADATA.map((item) => {
            const active = phase === item.id;
            const visited = phase > item.id;
            return (
              <button
                key={item.id}
                onClick={() => goToPhase(item.id)}
                className="group flex items-center gap-1.5 px-1 sm:px-1.5 py-1 rounded-full transition-all cursor-pointer"
                title={`${item.code}: ${item.title}`}
              >
                <span
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    active
                      ? 'w-4 sm:w-7 bg-[#e6d3a7] shadow-[0_0_10px_rgba(230,211,167,0.85)]'
                      : visited
                      ? 'w-1.5 sm:w-2 bg-[#e6d3a7]/45 group-hover:bg-[#e6d3a7]/75'
                      : 'w-1.5 sm:w-2 bg-slate-700 group-hover:bg-slate-500'
                  }`}
                />
                <span
                  className={`hidden lg:inline text-[10px] font-mono-Select tracking-widest transition-colors ${
                    active ? 'text-[#e6d3a7] font-semibold' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  {item.roman}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goToPhase(Math.min(TOTAL_PHASES, phase + 1))}
          disabled={phase === TOTAL_PHASES}
          className={`flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full font-mono-Select text-[10px] sm:text-[11px] tracking-[0.16em] uppercase border backdrop-blur-xl transition-all active:scale-95 ${
            phase === TOTAL_PHASES
              ? 'opacity-25 cursor-not-allowed bg-black/20 border-white/10 text-slate-600'
              : 'bg-[#060711]/75 hover:bg-white/[0.1] border-white/[0.16] text-slate-200 cursor-pointer'
          }`}
          aria-label="Siguiente acto"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <GlyphArrowRight className="w-3.5 h-3.5 text-[#e6d3a7]" />
        </button>
      </footer>

      {/* ==================================================================== */}
      {/* CARTA ÍNTIMA FINAL                                                   */}
      {/* ==================================================================== */}
      {letterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl max-h-[86dvh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#0b0c19] via-[#070812] to-[#04040a] border border-[#e6d3a7]/35 p-6 sm:p-12 shadow-[0_0_90px_rgba(0,0,0,0.95)] text-[#f4f1ea]">
            <button
              onClick={() => setLetterOpen(false)}
              className="sticky top-0 float-right z-10 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Cerrar carta"
            >
              <GlyphClose className="w-4 h-4" />
            </button>

            <h3 className="font-serif-Select italic text-3xl sm:text-5xl text-[#f4f1ea] font-normal border-b border-[#e6d3a7]/20 pb-4 sm:pb-5 pr-8">
              {content.letterTitle}
            </h3>

            <div className="mt-6 sm:mt-8 space-y-5 font-serif-Select text-xl sm:text-2xl text-[#f4f1ea]/90 leading-relaxed whitespace-pre-line font-light">
              {content.letterBody}
            </div>

            <div className="mt-8 sm:mt-10 pt-6 border-t border-[#e6d3a7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif-Select italic text-2xl sm:text-3xl text-[#e6d3a7]">
                  {content.senderSignature}
                </p>
              </div>

              <button
                onClick={() => setLetterOpen(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#e6d3a7]/15 hover:bg-[#e6d3a7]/25 border border-[#e6d3a7]/60 text-[#f4f1ea] font-mono-Select text-[11px] tracking-[0.2em] uppercase transition active:scale-95 cursor-pointer"
              >
                <GlyphHeartSingularity className="w-4 h-4 text-[#e6d3a7]" />
                <span>Guardar en el corazón</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

