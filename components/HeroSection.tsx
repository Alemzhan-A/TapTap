import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';

const HeroSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      className="bg-[#EDF7FF] py-32 overflow-hidden min-h-0 md:h-screen" 
      ref={ref}
    >
      <div className="container mx-auto px-4 text-center relative flex flex-col justify-center h-full">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-[#6B6BFA]"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          <TypeAnimation
      sequence={[
        'Удобный и умный поиск вещей',
        2000,
        'Удобный и умный поиск техники',
        2000,
        'Удобный и умный поиск косметики',
        2000,
        'Удобный и умный поиск мебели',
        2000
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
        </motion.h1>
        <motion.p 
          className="text-2xl mb-12 text-[#6B6BFA]"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Купи что-угодно за свою цену
        </motion.p>
        <Link href="/chat" passHref>
        <motion.button 
          className="bg-[#6B6BFA] text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-[#5A5AE6] transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Начать поиск
        </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
