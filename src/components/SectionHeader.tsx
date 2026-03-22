import { motion } from 'framer-motion';

interface SectionHeaderProps {
  overline: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

const SectionHeader = ({ overline, title, description, align = 'left' }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'}`}
    >
      <span className="overline mb-4 block">{overline}</span>
      <h2 className="text-4xl lg:text-5xl font-serif text-olive-700 font-medium tracking-tight leading-[1.1] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-olive-600/80 text-lg leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
