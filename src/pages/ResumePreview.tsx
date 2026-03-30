import { ExternalLink, Github, Linkedin, Mail, Phone, ArrowLeft, Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile, timeline, projects } from '@/content/portfolio';

type ResumeProject = {
  title: string;
  period: string;
  bullets: string[];
  tech: string;
  link?: string;
};

type ResumeTraining = {
  title: string;
  period: string;
  role: string;
  bullets: string[];
  tech: string;
};

type ResumeCertificate = {
  title: string;
  period: string;
  link?: string;
};

type ResumeExtracurricular = {
  title: string;
  organizer: string;
  achievement: string;
  link: string;
};

const resumeProjects: ResumeProject[] = [
  {
    title: 'EmotionScope - Real-time Sentiment Analysis Tool',
    period: "May 2025",
    bullets: [
      'Developed EmotionScope to classify text sentiment in real time as positive, negative, and neutral.',
      'Implemented machine learning pipelines using TF-IDF and Count Vectorizers with Logistic Regression.',
      'Built a lightweight Streamlit interface and deployed reusable trained models for fast, consistent predictions.',
    ],
    tech: 'Python, Scikit-learn, Pandas, NumPy, TF-IDF/Count Vectorizer, Logistic Regression',
    link: projects.find((item) => item.title === 'EmotionScope')?.github ?? profile.links.github,
  },
  {
    title: 'Data Analysis on EV Vehicle Adoption - Shareable Dashboard with Analysis',
    period: "Apr 2025",
    bullets: [
      'Analyzed Washington State EV adoption data to uncover usage trends and policy-driven impacts.',
      'Performed exploratory data analysis, automated data cleaning, and created interactive dashboards.',
      'Delivered accurate and efficient analytical insights to support data-driven planning.',
    ],
    tech: 'Python, Pandas, Matplotlib, Seaborn, Jupyter Notebook',
    link: projects.find((item) => item.title.includes('EV Adoption'))?.github ?? profile.links.github,
  },
  {
    title: 'Crime Patterns Analysis Across New York - Interactive Dashboard',
    period: "Jan 2025",
    bullets: [
      'Conducted an in-depth analysis of New York crime data to identify spatial and temporal patterns across boroughs and neighborhoods.',
      'Cleaned and processed crime datasets using Excel with pivot tables and structured transformations.',
      'Performed hotspot analysis to highlight high-crime areas and support data-driven safety insights.',
    ],
    tech: 'Python (Pandas, NumPy, Matplotlib, Seaborn) and Excel',
    link: projects.find((item) => item.title.includes('Crime Patterns'))?.github ?? profile.links.github,
  },
];

const trainings: ResumeTraining[] = [
  {
    title: 'A Hands-On Approach to Data Science - Lovely Professional University',
    period: "Jul 2025",
    role: 'Data Analyst Trainee',
    bullets: [
      'Completed industry-focused Data Science training covering SQL, Excel, Power BI, Python, and basic machine learning.',
      'Handled data cleaning, transformation, exploratory analysis, and analytical report/dashboard creation.',
      'Applied ML fundamentals by preparing datasets, training models, and evaluating performance.',
    ],
    tech: 'SQL, Excel, Power BI, Python, Machine Learning, Data Visualization Tools',
  },
];

const certificates: ResumeCertificate[] = [
  {
    title: 'GenAI Powered Data Analytics Job Simulation by Tata',
    period: "Aug 2025",
    link: 'https://drive.google.com/file/d/1I3Ng1K3cRghVKLrCLNCglfoTiVdlcCx8/view?usp=sharing',
  },
  {
    title: 'NPTEL Cloud Computing',
    period: "May 2025",
    link: 'https://drive.google.com/file/d/1Lx_C0WiR5uHeZ3aN_efEDYDOohF5R6BS/view?usp=sharing',
  },
  {
    title: 'Introduction to Hardware and Operating Systems by Coursera',
    period: "Sep 2024",
    link: 'https://drive.google.com/file/d/19xMhXPuNeIUi_6lgKl85KDQiraf2RCK5/view?usp=sharing',
  },
];

const extracurriculars: ResumeExtracurricular[] = [
  {
    title: 'Code Off Duty - A Web Hackathon',
    organizer: 'Coding Wise',
    achievement: 'Ranked among top 5 participants in the hackathon conducted by Coding Wise.',
    link: 'https://drive.google.com/file/d/1QsbHqdouLSgJVyfaaEKudv3yzrf79lD_/view?usp=sharing',
  },
  {
    title: 'Arena - A Web Hackathon',
    organizer: 'Coding Blocks',
    achievement: 'Ranked among top 10 participants in the hackathon conducted by Coding Blocks.',
    link: 'https://drive.google.com/file/d/1b0nwfKYZVeyHjEsZRJIcM2Wbir7_rkxg/view?usp=sharing',
  },
];

const sectionTitleClass =
  'mb-4 border-b border-olive-200 pb-2 font-syne text-xs font-bold uppercase tracking-[0.22em] text-olive-600';

const ResumePreview = () => {
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-olive-800">
      <div className="sticky top-0 z-20 border-b border-olive-200/90 bg-[#f7f3ed]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-olive-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-olive-700 transition hover:border-olive-300 hover:bg-white"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-olive-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-olive-700 transition hover:border-olive-300 hover:bg-white"
            >
              <Printer size={14} />
              Print
            </button>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 rounded-full bg-olive-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-olive-50 transition hover:bg-olive-600"
            >
              <Download size={14} />
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <article className="rounded-[26px] border border-olive-200 bg-white/70 p-6 shadow-[0_28px_70px_rgba(60,42,20,0.1)] lg:p-9">
          <header className="border-b border-olive-200 pb-6">
            <h1 className="font-playfair text-[clamp(2rem,4.8vw,3.25rem)] font-semibold tracking-[-0.02em] text-olive-800">
              {profile.name}
            </h1>
            <p className="mt-1 font-cormorant text-[clamp(1.15rem,2.6vw,1.75rem)] italic text-olive-600">
              Software Development Engineer | Backend & Data-Focused Builder
            </p>

            <div className="mt-5 grid gap-3 text-sm text-olive-700 md:grid-cols-2 lg:grid-cols-4">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Linkedin size={15} className="text-olive-500" />
                LinkedIn
              </a>
              <a href={profile.links.email} className="inline-flex items-center gap-2">
                <Mail size={15} className="text-olive-500" />
                {profile.email}
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Github size={15} className="text-olive-500" />
                GitHub
              </a>
              <span className="inline-flex items-center gap-2">
                <Phone size={15} className="text-olive-500" />
                +91-9502974049
              </span>
            </div>
          </header>

          <section className="mt-7">
            <h2 className={sectionTitleClass}>Skills</h2>
            <div className="grid gap-4 text-sm leading-relaxed text-olive-700 md:grid-cols-2">
              <p>
                <span className="font-semibold text-olive-800">Languages:</span> C++, Java, C, Python, SQL, JavaScript
              </p>
              <p>
                <span className="font-semibold text-olive-800">Frameworks/Technologies:</span> HTML, CSS, React.js,
                Scikit-learn, Django, Flask
              </p>
              <p>
                <span className="font-semibold text-olive-800">Tools/Platforms:</span> MySQL, DBMS, REST APIs, Jupyter
                Notebook, Kaggle, GitHub, GCP, Docker, Power BI
              </p>
              <p>
                <span className="font-semibold text-olive-800">Soft Skills:</span> Leadership, Collaboration, Critical
                Thinking, Creativity, Adaptability, Time Management
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className={sectionTitleClass}>Projects</h2>
            <div className="space-y-5">
              {resumeProjects.map((project) => (
                <article key={project.title} className="rounded-2xl border border-olive-200 bg-white/70 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-olive-800">{project.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-olive-500">{project.period}</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-olive-700">
                    {project.bullets.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-olive-700">
                    <span className="font-semibold text-olive-800">Tech:</span> {project.tech}
                  </p>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-olive-600 hover:text-olive-800"
                    >
                      Project Link
                      <ExternalLink size={13} />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className={sectionTitleClass}>Trainings</h2>
            {trainings.map((training) => (
              <article key={training.title} className="rounded-2xl border border-olive-200 bg-white/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-semibold text-olive-800">{training.title}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-olive-500">{training.period}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-olive-700">{training.role}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-olive-700">
                  {training.bullets.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-olive-700">
                  <span className="font-semibold text-olive-800">Tech:</span> {training.tech}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-7 lg:grid-cols-2">
            <div>
              <h2 className={sectionTitleClass}>Certificates</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-olive-700">
                {certificates.map((certificate) => (
                  <li key={certificate.title} className="rounded-xl border border-olive-200 bg-white/70 px-4 py-3">
                    <p className="font-medium text-olive-800">{certificate.title}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-olive-500">{certificate.period}</p>
                    {certificate.link ? (
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-olive-600 hover:text-olive-800"
                      >
                        View Certificate
                        <ExternalLink size={13} />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={sectionTitleClass}>Extracurricular Activities</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-olive-700">
                {extracurriculars.map((activity) => (
                  <li key={activity.title} className="rounded-xl border border-olive-200 bg-white/70 px-4 py-3">
                    <p className="font-medium text-olive-800">{activity.title}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-olive-500">
                      {activity.organizer}
                    </p>
                    <p className="mt-2">{activity.achievement}</p>
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-olive-600 hover:text-olive-800"
                    >
                      View Link
                      <ExternalLink size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <h2 className={sectionTitleClass}>Education</h2>
            <div className="space-y-3">
              {timeline.map((item) => (
                <article key={item.title} className="rounded-xl border border-olive-200 bg-white/70 px-4 py-3.5">
                  <h3 className="font-serif text-lg font-semibold text-olive-800">{item.title}</h3>
                  <p className="mt-1 text-sm text-olive-700">{item.meta}</p>
                  <p className="mt-1 text-sm font-medium text-olive-600">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default ResumePreview;
