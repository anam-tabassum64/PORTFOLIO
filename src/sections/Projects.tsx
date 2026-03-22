import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { projects } from '@/content/portfolio';

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          overline="Selected Work"
          title="Projects with clearer outcomes"
          description="Each project below has a stronger structure: what it does, how it was built, and what kind of problem it solved."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="flex h-full flex-col rounded-[30px] border border-olive-200 bg-white p-7 shadow-[0_30px_70px_-55px_rgba(108,82,45,0.75)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-olive-500">{project.period}</p>
                  <h3 className="mt-3 text-2xl font-medium leading-tight text-olive-700">{project.title}</h3>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-olive-200 p-3 text-olive-600 transition hover:border-olive-300 hover:text-olive-700"
                  aria-label={`Open ${project.title} source`}
                >
                  <Github size={18} />
                </a>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-olive-700">{project.summary}</p>
              <p className="mt-4 flex-1 leading-relaxed text-olive-600">{project.details}</p>
              <div className="mt-5 rounded-[22px] bg-olive-100/60 p-4 text-sm text-olive-700">
                <span className="font-semibold">Outcome:</span> {project.outcome}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full bg-olive-50 px-3 py-1.5 text-xs font-semibold text-olive-600 ring-1 ring-olive-200">
                    {item}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-olive-700 hover:text-olive-500"
              >
                View repository <ArrowUpRight size={16} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
