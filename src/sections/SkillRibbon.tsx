const ribbonItems = [
  'NumPy',
  'Matplotlib',
  'React',
  'TypeScript',
  'Next.js',
  'JavaScript',
  'HTML/CSS',
  'Git & GitHub',
];

const tickerItems = [...ribbonItems, ...ribbonItems, ...ribbonItems];

const SkillRibbon = () => {
  return (
    <section className="skill-ribbon" aria-label="Selected skills">
      <div className="skill-ribbon-track">
        {tickerItems.map((item, index) => (
          <span key={`${item}-${index}`} className="skill-ribbon-item">
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

        .skill-ribbon{
          overflow:hidden;
          border-top:1px solid rgba(176,137,73,.12);
          border-bottom:1px solid rgba(176,137,73,.12);
          padding:8px 0;
          background:
            radial-gradient(circle at 14% 50%, rgba(212,170,112,0.12), transparent 20%),
            radial-gradient(circle at 82% 50%, rgba(176,137,73,0.08), transparent 18%),
            linear-gradient(180deg, #fffaf3 0%, #f8efe2 100%);
        }

        .skill-ribbon-track{
          display:flex;
          width:max-content;
          animation:skill-ribbon-move 26s linear infinite;
        }

        .skill-ribbon-track:hover{
          animation-play-state:paused;
        }

        @keyframes skill-ribbon-move{
          to{transform:translateX(-33.333%);}
        }

        .skill-ribbon-item{
          position:relative;
          flex:0 0 auto;
          padding:0 22px;
          font-family:'DM Mono',monospace;
          font-size:10px;
          letter-spacing:.24em;
          text-transform:uppercase;
          color:rgba(122,88,43,.6);
          white-space:nowrap;
        }

        .skill-ribbon-item::before{
          content:'•';
          margin-right:22px;
          color:rgba(176,137,73,.52);
        }

        @media (max-width: 720px){
          .skill-ribbon{
            padding:7px 0;
          }

          .skill-ribbon-item{
            padding:0 16px;
            font-size:9px;
            letter-spacing:.18em;
          }

          .skill-ribbon-item::before{
            margin-right:16px;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillRibbon;