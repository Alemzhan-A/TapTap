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
      className="relative bg-[#1E0033] overflow-hidden min-h-screen flex flex-col justify-between z-10"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E0033] to-[#300050] z-0"></div>
      <div className="container mx-auto px-4 flex flex-col justify-center items-center h-full relative z-10">
        <div className="absolute top-1 left-20 w-full md:w-3/4 p-4">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-7xl font-bold mt-14 leading-tight text-[#EDF7FF] "
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            TapTap - удобный и умный
            <TypeAnimation
              sequence={[
                ' поиск вещей',
                2000,
                ' поиск техники',
                2000,
                ' поиск косметики',
                2000,
                ' поиск мебели',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h1>
          <motion.p
            className="text-2xl md:text-4xl mb-10 text-[#9c49bd] "
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Купи что-угодно за свою цену
          </motion.p>
          <motion.div className="max-w-96">
          <motion.p
            className="text-xl md:text-2xl mb-8 mt-28 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Совершенно новый поиск с ИИ, который найдет подходящий вам товар и договорится о покупке с продавцом за вас
          </motion.p>
        </motion.div>
          <Link href="/chat" passHref>
            <motion.button
              className="bg-[#9c49bd] text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-[#8038a0] transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Начать поиск
            </motion.button>
          </Link>
        </div>
        <div className="absolute top-1/4 -right-20 w-full md:w-3/5 flex justify-center">
          <img src="/Cart(1).svg" className="w-5/6 h-4/5 object-cover" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
