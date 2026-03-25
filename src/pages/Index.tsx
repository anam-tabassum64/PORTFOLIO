import Navbar from '@/components/Navbar';
import FloatingSocialRail from '@/components/FloatingSocialRail';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';

import Certificates from '@/sections/Certificates';
import Resume from '@/sections/Resume';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

const Index = () => {
  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <FloatingSocialRail />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
