import Link from 'next/link';
import { nav, footerLegal } from './data';
import { Icon } from './icons';

interface PageFooterProps {
  isLight: boolean;
}

export function PageFooter({ isLight: light }: PageFooterProps) {
  return (
    <footer
      style={{
        background: 'var(--color-cs-bg, #0c0d10)',
        color: light ? '#1a1a1a' : 'var(--color-cs-fg)',
        // asymmetric padding: 60px top, 32px sides, 24px bottom
        padding: '60px 32px 24px',
        borderTop: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
        ...(light ? { background: '#f4f1ea' } : {}),
      }}
      role="contentinfo"
    >
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        {/* Footer-top: border-bottom divider + padding-bottom 36px + margin-bottom 60px */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            borderBottom: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 36,
            marginBottom: 60,
            flexWrap: 'wrap',
          }}
        >
          {/* Brand — horizontal layout with tagline to the right */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: 'inherit' }}>
            <img src="/assets/isotype.png" alt="" width={40} height={40} aria-hidden="true" />
            <div
              style={{
                fontFamily: 'var(--font-display, "Red Hat Display", system-ui, sans-serif)',
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: '-.02em',
                color: light ? '#1a1b1e' : 'var(--color-cs-fg)',
              }}
            >
              knitsdigital
            </div>
          </div>
          <p
            style={{
              margin: 0,
              marginLeft: 'auto',
              maxWidth: '26ch',
              fontFamily: 'var(--font-display, "Red Hat Display", system-ui, sans-serif)',
              fontWeight: 700,
              fontSize: 21,
              lineHeight: 1.25,
              letterSpacing: '-.005em',
              color: light ? '#1a1b1e' : 'var(--color-cs-fg)',
            }}
          >
            Donde la tecnología, la <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, var(--color-kd-pistacho), var(--color-kd-turquesa) 60%, var(--color-kd-lila))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>creatividad</em> y las personas <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, var(--color-kd-pistacho), var(--color-kd-turquesa) 60%, var(--color-kd-lila))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>se entrelazan</em>.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Navega */}
          <div>
            {/* Column header: font-display, 12px, letter-spacing .14em — color kept from colorize pass */}
            <h3
              style={{
                margin: '0 0 16px',
                fontFamily: 'var(--font-display, "Red Hat Display", system-ui, sans-serif)',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: light ? 'var(--color-kd-turquesa-deep)' : 'var(--color-kd-pistacho)',
              }}
            >
              Navega
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    style={{
                      textDecoration: 'none',
                      color: light ? '#555' : 'var(--color-cs-fg-soft)',
                      fontWeight: 600,
                      // border-bottom underline-on-hover
                      borderBottom: '1px solid transparent',
                      transition: 'color .25s, border-color .25s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = light ? 'var(--color-kd-lila-deep)' : 'var(--color-kd-pistacho)';
                      el.style.borderBottomColor = light ? 'var(--color-kd-lila-deep)' : 'var(--color-kd-pistacho)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = light ? '#555' : 'var(--color-cs-fg-soft)';
                      el.style.borderBottomColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              style={{
                margin: '0 0 16px',
                fontFamily: 'var(--font-display, "Red Hat Display", system-ui, sans-serif)',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: light ? 'var(--color-kd-turquesa-deep)' : 'var(--color-kd-pistacho)',
              }}
            >
              Legal
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {footerLegal.map((item) => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    style={{
                      textDecoration: 'none',
                      color: light ? '#555' : 'var(--color-cs-fg-soft)',
                      fontWeight: 600,
                      borderBottom: '1px solid transparent',
                      transition: 'color .25s, border-color .25s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = light ? 'var(--color-kd-lila-deep)' : 'var(--color-kd-pistacho)';
                      el.style.borderBottomColor = light ? 'var(--color-kd-lila-deep)' : 'var(--color-kd-pistacho)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = light ? '#555' : 'var(--color-cs-fg-soft)';
                      el.style.borderBottomColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Síguenos — social links as 44×44px boxes, border-radius 12px */}
          <div>
            <h3
              style={{
                margin: '0 0 16px',
                fontFamily: 'var(--font-display, "Red Hat Display", system-ui, sans-serif)',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: light ? 'var(--color-kd-turquesa-deep)' : 'var(--color-kd-pistacho)',
              }}
            >
              Síguenos
            </h3>
            <div style={{ display: 'flex', gap: 12 }}>
              <a
                href="https://instagram.com/knitsdigital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de KnitsDigital"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: light ? '#fff' : 'var(--color-cs-bg-card)',
                  border: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: light ? '#555' : 'var(--color-cs-fg-soft)',
                  transition: 'background .25s, color .25s, border-color .25s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'var(--color-kd-pistacho)';
                  el.style.color = 'var(--color-kd-black)';
                  el.style.borderColor = 'var(--color-kd-pistacho)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = light ? '#fff' : 'var(--color-cs-bg-card)';
                  el.style.color = light ? '#555' : 'var(--color-cs-fg-soft)';
                  el.style.borderColor = light ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)';
                }}
              >
                <Icon name="instagram" width={20} height={20} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/knitsdigital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de KnitsDigital"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: light ? '#fff' : 'var(--color-cs-bg-card)',
                  border: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: light ? '#555' : 'var(--color-cs-fg-soft)',
                  transition: 'background .25s, color .25s, border-color .25s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'var(--color-kd-pistacho)';
                  el.style.color = 'var(--color-kd-black)';
                  el.style.borderColor = 'var(--color-kd-pistacho)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = light ? '#fff' : 'var(--color-cs-bg-card)';
                  el.style.color = light ? '#555' : 'var(--color-cs-fg-soft)';
                  el.style.borderColor = light ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)';
                }}
              >
                <Icon name="linkedin" width={20} height={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar — margin-top 40px, padding-top 24px, border-top, 13px (not mono) */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: light ? '#555' : 'var(--color-cs-fg-soft)',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ margin: 0 }}>© KnitsDigital {new Date().getFullYear()}</p>
          <p style={{ margin: 0 }}>Hecho con accesibilidad como hilo conductor.</p>
        </div>
      </div>
    </footer>
  );
}
