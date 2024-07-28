import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';

const MeshGradientBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="gradient1" cx="20%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#300050" />
            <stop offset="100%" stopColor="#1E0033" />
          </radialGradient>
          <radialGradient id="gradient2" cx="80%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#3B0062" />
            <stop offset="100%" stopColor="#1E0033" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4A007D" />
            <stop offset="100%" stopColor="#300050" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="#1E0033" />
        <rect width="100%" height="100%" fill="url(#gradient1)" />
        <rect width="100%" height="100%" fill="url(#gradient2)" opacity="0.7" />
        <rect width="100%" height="100%" fill="url(#gradient3)" opacity="0.6" />
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feComposite operator="in" in2="SourceGraphic" result="noisy"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
      </svg>
    </div>
  );
};

const HeaderHero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const menuItems = [
    { label: 'Главная', href: '/' },
    { label: 'О нас', href: '/about' },
    { label: 'Как это работает', href: '/how-it-works' },
    { label: 'Контакты', href: '/contact' },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <MeshGradientBackground />
      
      {/* Header */}
      <header className="relative text-white w-full z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-[#916bfa] md:ml-20 ml-4">TapTap</a>
          </Link>
          <nav className="hidden md:block mr-24">
            <ul className="flex space-x-6">
              {menuItems.map((item, index) => (
                <motion.li key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link href={item.href} legacyBehavior>
                    <a className="hover:text-[#6B6BFA] transition duration-300 md:ml-6 ml-4">{item.label}</a>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden relative z-10 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4">
                <ul className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href} legacyBehavior>
                        <a className="block hover:text-[#6B6BFA] transition duration-300 md:ml-6 ml-4" onClick={toggleMenu}>
                          {item.label}
                        </a>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center relative z-10 overflow-x-hidden" ref={ref}>
        <div className="container mx-auto px-4 flex flex-col justify-center items-start h-full relative max-w-full">
          <div className="w-full md:w-3/4 p-2 md:p-4 md:pl-20">
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
                className="block"
              />
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-10 text-[#916bfa] max-w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Купи что-угодно за свою цену
            </motion.p>
            <div className="relative w-full flex justify-center mt-8 sm:hidden">
              <img src="/Cart (2).svg" className="w-80 h-80 object-contain" alt="Shopping cart" />
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
          <div className="hidden sm:block absolute bottom-4 -right-40 w-1/3 md:w-1/2 ">
            <img src="/Cart (2).svg" className="w-3/5 h-auto object-contain" alt="Shopping cart" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeaderHero;