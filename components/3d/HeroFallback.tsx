// SVG animated sphere — mobile fallback for the 3D Hero (no WebGL needed)

const CX = 130;
const CY = 130;

// Pentagon vertices at given radius and start angle (degrees)
function pentagon(radius: number, startDeg: number) {
  return Array.from({ length: 5 }, (_, i) => {
    const a = ((startDeg + i * 72) * Math.PI) / 180;
    return [
      +(CX + radius * Math.cos(a)).toFixed(1),
      +(CY - radius * Math.sin(a)).toFixed(1),
    ] as [number, number];
  });
}

const outer = pentagon(85, 90);   // top vertex at index 0
const inner = pentagon(42, 126);  // rotated 36° relative to outer

const outerPts = outer.map((p) => p.join(',')).join(' ');
const innerPts = inner.map((p) => p.join(',')).join(' ');

// Pentagram: connect each outer vertex to the one 2 places ahead
const star = outer.map((p, i) => ({ x1: p[0], y1: p[1], x2: outer[(i + 2) % 5][0], y2: outer[(i + 2) % 5][1] }));

// Outer→inner spokes
const spokes = outer.flatMap((p, i) => [
  { x1: p[0], y1: p[1], x2: inner[i][0], y2: inner[i][1] },
  { x1: p[0], y1: p[1], x2: inner[(i + 4) % 5][0], y2: inner[(i + 4) % 5][1] },
]);

// Twinkling scatter particles (outside sphere)
const scatterDots = [
  { x: 30, y: 62, r: 2, dur: '3.2s', delay: '0s' },
  { x: 222, y: 52, r: 1.5, dur: '4.5s', delay: '0.8s' },
  { x: 18, y: 158, r: 1.5, dur: '3.8s', delay: '1.2s' },
  { x: 238, y: 172, r: 2, dur: '5.0s', delay: '0.3s' },
  { x: 68, y: 230, r: 1.5, dur: '4.1s', delay: '1.7s' },
  { x: 196, y: 226, r: 2, dur: '3.5s', delay: '0.6s' },
  { x: 202, y: 34, r: 1.5, dur: '6.0s', delay: '2.0s' },
  { x: 55, y: 38, r: 2, dur: '4.8s', delay: '1.0s' },
];

export default function HeroFallback() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 300, width: 260 }}>
      {/* CSS ambient glow behind SVG */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 65%)',
        }}
      />

      <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ── Glass sphere body ─────────────────── */}
        <circle cx={CX} cy={CY} r={92}
          fill="rgba(68,102,136,0.07)"
          stroke="rgba(245,158,11,0.13)"
          strokeWidth="0.8"
        />

        {/* ── Outer wireframe (rotating CW) ──────── */}
        <g stroke="#F59E0B" strokeWidth="1" opacity="0.42">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="28s"
            repeatCount="indefinite"
          />
          {/* Outer pentagon */}
          <polygon points={outerPts} fill="none" />
          {/* Pentagram star diagonals */}
          {star.map((l, i) => (
            <line key={`s${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity="0.55" />
          ))}
          {/* Outer→inner spokes */}
          {spokes.map((l, i) => (
            <line key={`sp${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity="0.45" />
          ))}
          {/* Inner pentagon */}
          <polygon points={innerPts} fill="none" opacity="0.65" />
        </g>

        {/* ── Inner octahedron (counter-rotating) ── */}
        <g stroke="#FCD34D" strokeWidth="1.2" opacity="0.55">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`-360 ${CX} ${CY}`}
            dur="16s"
            repeatCount="indefinite"
          />
          {/* Diamond */}
          <line x1={CX}      y1={CY - 52} x2={CX + 52} y2={CY} />
          <line x1={CX + 52} y1={CY}      x2={CX}      y2={CY + 52} />
          <line x1={CX}      y1={CY + 52} x2={CX - 52} y2={CY} />
          <line x1={CX - 52} y1={CY}      x2={CX}      y2={CY - 52} />
          {/* Cross */}
          <line x1={CX} y1={CY - 52} x2={CX} y2={CY + 52} opacity="0.6" />
          <line x1={CX - 52} y1={CY} x2={CX + 52} y2={CY} opacity="0.6" />
        </g>

        {/* ── Orbital ring 1 + particle ─────────── */}
        <g transform={`rotate(-22, ${CX}, ${CY})`}>
          <ellipse cx={CX} cy={CY} rx="110" ry="28"
            stroke="rgba(245,158,11,0.22)" strokeWidth="0.75" />
          <circle r="3" fill="#F59E0B" opacity="0.95">
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              path={`M ${CX + 110},${CY} A 110,28 0 1,0 ${CX - 110},${CY} A 110,28 0 1,0 ${CX + 110},${CY}`}
            />
          </circle>
        </g>

        {/* ── Orbital ring 2 + 2 particles ─────── */}
        <g transform={`rotate(55, ${CX}, ${CY})`}>
          <ellipse cx={CX} cy={CY} rx="90" ry="24"
            stroke="rgba(245,158,11,0.17)" strokeWidth="0.7" />
          <circle r="2.5" fill="#FCD34D" opacity="0.85">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path={`M ${CX + 90},${CY} A 90,24 0 1,0 ${CX - 90},${CY} A 90,24 0 1,0 ${CX + 90},${CY}`}
            />
          </circle>
          <circle r="2" fill="#F59E0B" opacity="0.7">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              begin="-5s"
              path={`M ${CX + 90},${CY} A 90,24 0 1,0 ${CX - 90},${CY} A 90,24 0 1,0 ${CX + 90},${CY}`}
            />
          </circle>
        </g>

        {/* ── Orbital ring 3 + particle ─────────── */}
        <g transform={`rotate(12, ${CX}, ${CY})`}>
          <ellipse cx={CX} cy={CY} rx="118" ry="20"
            stroke="rgba(245,158,11,0.13)" strokeWidth="0.6" />
          <circle r="2" fill="#F59E0B" opacity="0.75">
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              begin="-6s"
              path={`M ${CX + 118},${CY} A 118,20 0 1,0 ${CX - 118},${CY} A 118,20 0 1,0 ${CX + 118},${CY}`}
            />
          </circle>
        </g>

        {/* ── Scatter / twinkling particles ─────── */}
        {scatterDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#F59E0B">
            <animate
              attributeName="opacity"
              values="0.12;0.65;0.12"
              dur={d.dur}
              begin={d.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* ── Pulsing core ──────────────────────── */}
        <circle cx={CX} cy={CY} r="7" fill="#FFB300">
          <animate attributeName="r"       values="5;9;5"          dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.65;0.3"   dur="2.2s" repeatCount="indefinite" />
        </circle>

      </svg>
    </div>
  );
}
