import anamResumePdf from '@/content/resume/anam_resume.pdf';

export const profile = {
  name: "Anam Tabassum",
  role: "Backend Developer and Data-Focused Software Engineer",
  shortRole: "Backend Developer",
  location: "Hyderabad, Telangana, India",
  email: "anamtabassum.at@gmail.com",
  phone: "+91 9502974049",
  intro:
    "I build practical web products with clean backend architecture, clear data flows, and interfaces that feel deliberate instead of generic.",
  summary:
    "Computer Science student focused on backend systems, APIs, databases, and analytics-heavy products. I care about shipping reliable software, understanding the data behind it, and presenting the work with clarity.",
  availability: "Open to internships, freelance work, and entry-level software roles.",
  resumePath: anamResumePdf,
  resumeFileName: "anam_resume.pdf",
  links: {
    github: "https://github.com/anam-tabassum64",
    linkedin: "https://linkedin.com/in/anam64/",
    email: "mailto:anamtabassum.at@gmail.com",
  },
};

export const highlights = [
  { label: "Projects shipped", value: "10+" },
  { label: "Hackathon placements", value: "Top 5 / Top 10" },
  { label: "Primary focus", value: "APIs, data, dashboards" },
];

export const strengths = [
  {
    title: "Backend-first thinking",
    description:
      "I start with data models, API contracts, validation, and deployment constraints before polishing the interface.",
  },
  {
    title: "Analytical execution",
    description:
      "I turn messy datasets into dashboards, reports, and models that make the outcome measurable and easy to explain.",
  },
  {
    title: "Production mindset",
    description:
      "I aim for maintainable structure, clear documentation, form validation, and deployment-ready configuration instead of demo-only builds.",
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    items: ["Python", "Java", "C", "C++", "SQL", "JavaScript"],
  },
  {
    title: "Backend & Databases",
    items: ["Flask", "Django", "REST APIs", "MySQL", "MongoDB", "PostgreSQL", "DBMS"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React.js", "HTML", "CSS", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    title: "Tools & Platforms",
    items: ["GitHub", "Docker", "Jupyter Notebook", "Kaggle", "GCP", "Power BI", "Excel"],
  },
];

export const projects = [
  {
    title: "EmotionScope",
    period: "2025",
    summary:
      "Real-time sentiment analysis tool built around reusable preprocessing and lightweight inference.",
    details:
      "Built an ML pipeline using TF-IDF and Logistic Regression, then wrapped it in a fast interface for consistent classification of positive, negative, and neutral text.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
    outcome: "Focused on model reuse, quick predictions, and clean feature preparation.",
    github: "https://github.com/anam-tabassum64",
  },
  {
    title: "EV Adoption Analysis Dashboard",
    period: "2025",
    summary:
      "Exploratory analysis of Washington EV adoption trends with shareable visual reporting.",
    details:
      "Cleaned and analyzed raw data, identified trend shifts, and built charts to communicate policy impact and adoption patterns clearly.",
    stack: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    outcome: "Turned raw public data into a structured, presentation-ready analytical story.",
    github: "https://github.com/anam-tabassum64",
  },
  {
    title: "Crime Patterns Across New York",
    period: "2025",
    summary:
      "Data investigation project focused on spatial hotspots and temporal crime trends.",
    details:
      "Used Excel and Python to process records, compare incident patterns, and surface high-risk periods and locations in a way that supports decision-making.",
    stack: ["Python", "Pandas", "Excel", "NumPy", "Matplotlib"],
    outcome: "Combined spreadsheet-based cleaning with repeatable notebook analysis.",
    github: "https://github.com/anam-tabassum64",
  },
];

export const certificates: Array<{
  title: string;
  issuer: string;
  year: string;
  summary: string;
  skills: string[];
  link?: string;
}> = [
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata",
    year: "2025",
    summary:
      "Completed a practical simulation focused on AI-assisted analytics workflows, business problem solving, and turning data findings into decision-ready insights.",
    skills: ["GenAI", "Analytics", "Business Insights"],
    link: "https://drive.google.com/file/d/1I3Ng1K3cRghVKLrCLNCglfoTiVdlcCx8/view?usp=sharing",
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    year: "2025",
    summary:
      "Completed NPTEL Cloud Computing coursework covering cloud service models, virtualization, distributed systems foundations, and scalable cloud architecture concepts.",
    skills: ["Cloud Computing", "Virtualization", "Distributed Systems"],
    link: "https://drive.google.com/file/d/1Lx_C0WiR5uHeZ3aN_efEDYDOohF5R6BS/view?usp=sharing",
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "Coursera",
    year: "2024",
    summary:
      "Built foundational understanding of computer hardware, operating system concepts, system components, and how software interacts with underlying machines.",
    skills: ["Hardware", "Operating Systems", "Systems"],
    link: "https://drive.google.com/file/d/19xMhXPuNeIUi_6lgKl85KDQiraf2RCK5/view?usp=sharing",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2025",
    summary:
      "Completed hands-on training in responsive layouts, semantic HTML, CSS styling, and accessible interface construction for modern web experiences.",
    skills: ["HTML", "CSS", "Responsive Design"],
    link: "https://drive.google.com/file/d/1nhxpWAEUx2E16m1O9bXYBdmELKQQg8ZN/view?usp=sharing",
  },
];

export const timeline = [
  {
    title: "Bachelor of Technology in Computer Science and Engineering",
    meta: "Lovely Professional University • Phagwara, Punjab • 2023 - Present",
    description: "CGPA: 7.3",
  },
  {
    title: "Intermediate",
    meta: "Sri Chaitanya Junior College • Hyderabad, Telangana • 2021 - 2023",
    description: "Percentage: 93.2%",
  },
  {
    title: "Matriculation",
    meta: "Bhagavathi E/M High School • Karimnagar, Telangana • 2020 - 2021",
    description: "Percentage: 95%",
  },
];
