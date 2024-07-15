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
      <div className="container mx-auto px-4 flex flex-col justify-center items-start h-full relative z-10">
        <div className="w-full md:w-3/4 p-4 md:pl-20">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-14 leading-tight text-[#EDF7FF]"
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            TapTap - удобный и умный
            <TypeAnimation
              sequence={[
                ' поиск кроссовок',
                2000,
                ' поиск техники',
                2000,
                ' поиск косметики',
                2000,
                ' поиск мебели',
                2000,
                ' поиск одежды',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 text-[#6B6BFA]"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Купи что-угодно за свою цену
          </motion.p>
          <div className="relative w-full flex justify-center mt-8 sm:hidden">
            <img src="/Cart(1).svg" className="w-80 h-80 object-contain" alt="Shopping cart" />
          </div>
          <motion.div className="max-w-96 relative">
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-8 mt-8 sm:mt-32 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Совершенно новый поиск с ИИ, который найдет подходящий вам товар и договорится о покупке с продавцом за вас
            </motion.p>
          </motion.div>
          <div className="text-center sm:text-left">
            <Link href="/chat" passHref>
              <motion.button
                className="bg-[#916bfa] text-white px-8 sm:px- py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:bg-[#795acf] transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto md:ml-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Начать поиск
              </motion.button>
            </Link>
          </div>
        </div>
        <div className="hidden sm:block absolute -bottom-1/4 -right-1 w-1/2 md:w-1/2">
          <img src="/Cart(1).svg" className="w-full h-auto object-contain" alt="Shopping cart" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
