import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CTASection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  return (
    <section className="py-32 bg-[#EDF7FF] relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 text-[#7225B4]"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          Готовы найти идеальную вещь?
        </motion.h2>
        <motion.p 
          className="text-xl mb-12 text-[#33334D] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Начните поиск прямо сейчас и получите лучшие предложения, подобранные нашим ИИ специально для вас!
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Что вы хотите найти?"
            className="bg-white text-[#33334D] px-6 py-4 rounded-full text-lg w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-[#6B6BFA]"
          />
          <motion.button 
            className="bg-[#7225B4] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5A5AE6] transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Начать поиск
            <ArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full opacity-10"></div>
      </motion.div>
    </section>
  );
};

export default CTASection;
