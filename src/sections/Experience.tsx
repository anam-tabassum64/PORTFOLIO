import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { timeline } from '@/content/portfolio';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  // Item animation with enhanced effects
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      },
    },
  };

  // Hover effects
  const hoverVariants = {
    hover: {
      y: -8,
      boxShadow: '0 24px 48px rgba(107, 114, 74, 0.12)',
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
  };

  // Timeline connector animation
  const connectorVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' as const },
    },
  };

  // Staggered text animation
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="section-padding relative overflow-hidden bg-olive-100/40"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 0.08, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-olive-300 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 0.06, scale: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-olive-200 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeader
          overline="Journey"
          title="Education, training, and proof of momentum"
          align="center"
        />

        {/* Timeline container */}
        <motion.div
          className="relative mt-12 space-y-0"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Timeline vertical line */}
          <div className="absolute left-0 top-8 bottom-0 w-1 origin-top md:left-[90px]">
            <motion.div
              variants={connectorVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="h-full w-full bg-gradient-to-b from-olive-300 via-olive-200 to-transparent"
            />
          </div>

          {/* Experience items */}
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="relative mb-8 md:mb-12"
            >
              {/* Dot on timeline */}
              <motion.div
                className="absolute left-0 top-6 w-5 h-5 rounded-full bg-white border-3 border-olive-400 md:left-[82px] z-20 transition-all duration-300"
                whileHover={{ scale: 1.4, boxShadow: '0 0 20px rgba(107, 114, 74, 0.4)' }}
              />

              {/* Content card */}
              <motion.article
                variants={hoverVariants}
                whileHover="hover"
                className="ml-12 md:ml-48 rounded-2xl border border-olive-200/60 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 md:p-8 shadow-sm transition-all duration-300 cursor-default"
              >
                {/* Step number badge */}
                <motion.div
                  custom={0}
                  variants={textVariants}
                  className="inline-block mb-4"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-olive-100 to-olive-50 border border-olive-200">
                    <span className="text-sm font-bold text-olive-600">{index + 1}</span>
                  </span>
                </motion.div>

                {/* Content grid */}
                <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-8">
                  {/* Left: Date/Meta */}
                  <motion.div
                    custom={1}
                    variants={textVariants}
                    className="mb-4 md:mb-0"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-olive-500 mb-2">
                      {item.meta}
                    </p>
                    <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-olive-300 to-transparent rounded-full" />
                  </motion.div>

                  {/* Right: Main content */}
                  <motion.div
                    custom={2}
                    variants={textVariants}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold text-olive-900 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-olive-700">
                      {item.description}
                    </p>

                    {/* Accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      viewport={{ once: true, margin: '-50px' }}
                      className="h-0.5 w-16 bg-gradient-to-r from-olive-400 to-olive-300 origin-left mt-4"
                    />
                  </motion.div>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0, borderColor: 'rgba(107, 114, 74, 0)' }}
                  whileHover={{
                    opacity: 1,
                    borderColor: 'rgba(107, 114, 74, 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ border: '2px solid' }}
                />
              </motion.article>

              {/* Stagger animation for text reveal */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true, margin: '-50px' }}
                className="absolute left-0 top-6 w-1 h-1 rounded-full bg-olive-400 opacity-0 md:left-[88px]"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 mx-auto h-1 w-24 bg-gradient-to-r from-olive-300 via-olive-400 to-olive-300 rounded-full origin-center"
        />
      </div>
    </section>
  );
};

export default Experience;