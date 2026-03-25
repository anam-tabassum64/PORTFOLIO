import { profile } from '@/content/portfolio';
import anamPhoto from '@/content/anam.jpg';

const About = () => {
  const name = profile?.name ?? 'Anam Tabassum';
  const photo = profile?.photo ?? anamPhoto;
  const role = 'Backend Developer';
  const paragraphs = [
    "I'm Anam Tabassum, an aspiring Software Development Engineer passionate about building data-driven and intelligent digital solutions.",
    'My interests lie in data science, machine learning, and full-stack development, where I enjoy combining analytical thinking with modern technologies.',
    "As a fresher, I'm driven to continuously learn, experiment, and develop impactful applications that address real-world challenges.",
  ];
  const hobbies = ['Music', 'Photography', 'Traveling', 'Reading'];

  return (
    <section
      id="about"
      style={{
        background: 'transparent',
        padding: '88px 20px 44px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 360px) minmax(0, 1fr)',
          gap: '56px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}
        className="about-layout"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              position: 'relative',
              maxWidth: '340px',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '1px solid rgba(212,170,112,0.35)',
              boxShadow: '0 28px 60px rgba(60,42,20,0.16)',
              background: 'rgba(255,255,255,0.45)',
            }}
          >
            <img
              src={photo}
              alt={name}
              style={{
                width: '100%',
                aspectRatio: '0.82',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '18px',
                bottom: '18px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(48,38,24,0.92)',
                color: '#f7f1e7',
                borderRadius: '999px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                border: '1px solid rgba(212,170,112,0.28)',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  background: '#5fe26f',
                  display: 'inline-block',
                  boxShadow: '0 0 0 6px rgba(95,226,111,0.18)',
                }}
              />
              Open to Work
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: '#b08949',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '999px',
                background: '#d4aa70',
                display: 'inline-block',
              }}
            />
            About Me
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p
              style={{
                margin: 0,
                color: '#9a7642',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Hi there, I&apos;m
            </p>

            <h2
              style={{
                margin: 0,
                color: '#7f622f',
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(30px, 4.2vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
              }}
            >
              {name}
            </h2>

            <p
              style={{
                margin: 0,
                color: '#6f4f28',
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(17px, 2vw, 24px)',
                fontStyle: 'italic',
                lineHeight: 1.2,
              }}
            >
              {role}
            </p>
          </div>

          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(212,170,112,0.55), rgba(212,170,112,0.1), transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {paragraphs.map((text, index) => (
              <p
                key={text}
                style={{
                  margin: 0,
                  color: '#4d3923',
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  lineHeight: 1.7,
                  maxWidth: '760px',
                  ...(index === 0 && {
                    borderLeft: '4px solid rgba(212,170,112,0.75)',
                    paddingLeft: '20px',
                  }),
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <div
            style={{
              marginTop: '2px',
              color: '#9a7642',
              fontSize: '12px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '999px',
                background: '#b08949',
                display: 'inline-block',
              }}
            />
            Available for internships &amp; collaborations
          </div>

          <div
            style={{
              marginTop: '10px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(212,170,112,0.22)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                color: '#b08949',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              Hobbies &amp; Interests
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {hobbies.map((hobby) => (
                <span
                  key={hobby}
                  style={{
                    border: '1px solid rgba(212,170,112,0.32)',
                    background: 'rgba(255,255,255,0.45)',
                    color: '#5b4327',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');

        @media (max-width: 900px) {
          .about-layout {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
