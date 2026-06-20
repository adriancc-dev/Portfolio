import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Adrián Cabedo Canós | Full Stack Developer & AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0A0A0F',
          padding: '80px 100px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span
            style={{
              fontSize: '13px',
              color: '#F59E0B',
              letterSpacing: '0.3em',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Full Stack Developer · AI Engineer
          </span>
          <span
            style={{
              fontSize: '76px',
              fontWeight: 700,
              color: '#F59E0B',
              lineHeight: 1.05,
            }}
          >
            Adrián Cabedo{'\n'}Canós
          </span>
          <span
            style={{
              fontSize: '20px',
              color: '#475569',
              fontWeight: 400,
              marginTop: '4px',
            }}
          >
            Mobile apps · Full Stack Web · Applied AI
          </span>
        </div>

        <div
          style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '96px', color: '#F59E0B', fontWeight: 700, lineHeight: 1 }}>
            A
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
