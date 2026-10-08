import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title =
      searchParams.get('title') || 'Prit Patel — Backend & AI Systems Architect';
    const category = searchParams.get('category') || 'DISTRIBUTED SYSTEMS & COMPILERS';
    const tag = searchParams.get('tag') || 'PRODUCTION ARTIFACT';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0A0908',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
            color: '#EDE8DF',
            border: '12px solid #14110F',
          }}
        >
          {/* Top Film Metadata Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid rgba(237, 232, 223, 0.15)',
              paddingBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#FF5B2E',
                }}
              />
              <span
                style={{
                  fontSize: '20px',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: '#FF5B2E',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                }}
              >
                // DARKROOM · {tag}
              </span>
            </div>

            <span
              style={{
                fontSize: '18px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#A39B8F',
                fontFamily: 'monospace',
              }}
            >
              PRIT PATEL · VADODARA, IN
            </span>
          </div>

          {/* Center Main Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '1040px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '20px',
                letterSpacing: '3px',
                color: '#A39B8F',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              TOPIC: {category}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: title.length > 50 ? '54px' : '68px',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-2px',
                color: '#EDE8DF',
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid rgba(237, 232, 223, 0.15)',
              paddingTop: '24px',
              fontFamily: 'monospace',
              fontSize: '18px',
              color: '#A39B8F',
            }}
          >
            <span>HTTPS://PRITPATEL.DEV</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#FF5B2E',
                }}
              />
              <span style={{ color: '#EDE8DF', fontWeight: 600 }}>
                AVAILABLE FOR HIRE
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('[OG Image Error]', e);
    return new Response('Failed to generate OpenGraph image', { status: 500 });
  }
}
