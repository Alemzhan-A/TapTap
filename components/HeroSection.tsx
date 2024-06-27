import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-[#EDF7FF] py-32 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 text-center relative">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-[#6B6BFA]"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          Удобный и умный поиск вещей
        </motion.h1>
        <motion.p 
          className="text-2xl mb-12 text-[#6B6BFA]"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Купи что-угодно за свою цену
        </motion.p>
        <motion.button 
          className="bg-[#6B6BFA] text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-[#5A5AE6] transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Начать поиск
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
