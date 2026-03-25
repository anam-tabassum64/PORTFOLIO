import { profile } from '@/content/portfolio';

const menuLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Portfolio', href: '#projects' },
  { label: 'My process', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: profile.links.linkedin },
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'GitHub', href: profile.links.github },
];

const headingStyle = {
  fontSize: '13px',
  letterSpacing: '0.42em',
  textTransform: 'uppercase' as const,
  color: 'rgba(52, 40, 31, 0.62)',
  margin: 0,
};

const Footer = () => {
  return (
    <>
      <footer
        style={{
          position: 'relative',
          overflow: 'hidden',
          color: '#1f1510',
          background:
            'linear-gradient(180deg, #f6f0e8 0%, #f2ddd1 14%, #ecb6a4 42%, #e99279 72%, #ea7d60 100%)',
          padding: '22px 36px 20px',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '0 0 auto 0',
            height: '180px',
            background:
              'linear-gradient(180deg, rgba(250,247,241,0.95) 0%, rgba(250,247,241,0.45) 32%, rgba(250,247,241,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '-80px',
            top: '36px',
            width: '300px',
            height: '300px',
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(255,245,238,0.72) 0%, rgba(255,245,238,0) 72%)',
            pointerEvents: 'none',
          }}
        />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '72%',
            top: '35%',
            width: '40px',
            height: '40px',
            borderRadius: '999px',
            border: '1px solid rgba(189, 149, 93, 0.72)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: '-4px',
              top: '0px',
              width: '7px',
              height: '7px',
              borderRadius: '999px',
              background: '#c59b61',
              display: 'block',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            maxWidth: '1840px',
            margin: '0 auto',
            borderTop: '1px solid rgba(48, 32, 22, 0.22)',
            paddingTop: '48px',
            paddingBottom: '12px',
          }}
          className="footer-transition-shell"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1.25fr',
              alignItems: 'start',
              gap: '44px',
            }}
            className="footer-transition-grid"
          >
            <div>
              <p style={headingStyle}>(Menu)</p>
              <nav
                style={{
                  marginTop: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                {menuLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      width: 'fit-content',
                      textDecoration: 'none',
                      color: '#231812',
                      fontSize: '23px',
                      lineHeight: 1.25,
                      fontWeight: 500,
                      transition: 'transform 220ms ease, opacity 220ms ease',
                    }}
                    onMouseEnter={(event) => {
                      const el = event.currentTarget;
                      el.style.transform = 'translateX(6px)';
                      el.style.opacity = '0.72';
                    }}
                    onMouseLeave={(event) => {
                      const el = event.currentTarget;
                      el.style.transform = 'translateX(0)';
                      el.style.opacity = '1';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p style={headingStyle}>(Socials)</p>
              <div
                style={{
                  marginTop: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: 'fit-content',
                      textDecoration: 'none',
                      color: '#231812',
                      fontSize: '23px',
                      lineHeight: 1.25,
                      fontWeight: 500,
                      transition: 'transform 220ms ease, opacity 220ms ease',
                    }}
                    onMouseEnter={(event) => {
                      const el = event.currentTarget;
                      el.style.transform = 'translateX(6px)';
                      el.style.opacity = '0.72';
                    }}
                    onMouseLeave={(event) => {
                      const el = event.currentTarget;
                      el.style.transform = 'translateX(0)';
                      el.style.opacity = '1';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'right' }} className="footer-transition-contact">
              <p style={headingStyle}>(Say "Hello")</p>
              <a
                href={profile.links.email}
                style={{
                  marginTop: '32px',
                  display: 'inline-block',
                  color: '#16100d',
                  textDecoration: 'none',
                  fontSize: '21px',
                  lineHeight: 1.15,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {profile.email}
              </a>
            </div>
          </div>

          <div
            style={{
              marginTop: '54px',
              width: '100%',
              textAlign: 'center',
              fontSize: 'clamp(74px, 9.4vw, 188px)',
              lineHeight: 0.84,
              fontWeight: 900,
              letterSpacing: '-0.015em',
              color: '#070403',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
            className="footer-transition-wordmark"
          >
            ANAM.PORTFOLIO
          </div>

          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '18px',
              color: '#3e2b22',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: '14px',
              letterSpacing: '0.01em',
            }}
            className="footer-transition-meta"
          >
            <p style={{ margin: 0 }}>© 2026 {profile.name}</p>
            <p style={{ margin: 0 }}>From India with love</p>
          </div>

        </div>
      </footer>

      <style>{`
        @media (max-width: 1100px) {
          .footer-transition-shell {
            padding-top: 38px !important;
            padding-bottom: 10px !important;
          }

          .footer-transition-grid {
            grid-template-columns: 1fr 1fr !important;
          }

          .footer-transition-contact {
            grid-column: 1 / -1;
            text-align: left !important;
          }

          .footer-transition-wordmark {
            margin-top: 48px !important;
            white-space: normal !important;
          }
        }

        @media (max-width: 720px) {
          .footer-transition-grid {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
          }

          .footer-transition-wordmark {
            margin-top: 38px !important;
            font-size: clamp(54px, 16vw, 96px) !important;
            line-height: 0.92 !important;
          }

          .footer-transition-meta {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
