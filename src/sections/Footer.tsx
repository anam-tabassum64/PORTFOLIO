import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/content/portfolio';

const Footer = () => {
  return (
    <footer className="border-t border-olive-200 bg-olive-50 px-6 py-10 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-olive-500">Portfolio</p>
          <h3 className="mt-3 text-3xl font-medium text-olive-700">{profile.name}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-olive-600">
            Clean portfolio frontends, credible project presentation, and a backend contact flow that can actually be deployed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-olive-600">
          <a href="#about" className="hover:text-olive-700">About</a>
          <a href="#projects" className="hover:text-olive-700">Projects</a>
          <a href="#contact" className="hover:text-olive-700">Contact</a>
          <a href={profile.resumePath} download={profile.resumeFileName} className="hover:text-olive-700">Resume</a>
        </div>

        <div className="flex gap-3">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="rounded-full border border-olive-200 p-3 text-olive-600 hover:text-olive-700">
            <Github size={18} />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-olive-200 p-3 text-olive-600 hover:text-olive-700">
            <Linkedin size={18} />
          </a>
          <a href={profile.links.email} className="rounded-full border border-olive-200 p-3 text-olive-600 hover:text-olive-700">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
