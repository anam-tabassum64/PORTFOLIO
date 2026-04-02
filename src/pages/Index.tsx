import Navbar from '@/components/Navbar';
import FloatingSocialDock from '@/components/FloatingSocialDock';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Education from '@/sections/Education';
import { motion, useReducedMotion } from 'framer-motion';

import Certificates from '@/sections/Certificates';
import Resume from '@/sections/Resume';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const revealTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.88, ease: sectionEase };

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
      };

  return (
    <div className="site-shell min-h-screen bg-[#faf7f1]">
      <Navbar />
      <FloatingSocialDock />
      <Hero />
      <div aria-hidden className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="h-px bg-olive-200/80" />
      </div>
      <motion.div {...revealProps} transition={revealTransition}>
        <About />
      </motion.div>
      <motion.div {...revealProps} transition={revealTransition}>
        <Skills />
      </motion.div>
      <motion.div {...revealProps} transition={revealTransition}>
        <Projects />
      </motion.div>
      <motion.div {...revealProps} transition={revealTransition}>
        <Education />
      </motion.div>
      <motion.div {...revealProps} transition={revealTransition}>
        <Certificates />
      </motion.div>
      <motion.div {...revealProps} transition={revealTransition}>
        <Resume />
      </motion.div>
      <motion.div {...revealProps} transition={revealTransition}>
        <Contact />
      </motion.div>
      <motion.div {...revealProps} transition={revealTransition}>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
