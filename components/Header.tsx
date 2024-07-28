import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MeshGradientBackground from './MeshGradientBackground';


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: 'Главная', href: '/' },
    { label: 'О нас', href: '/about' },
    { label: 'Как это работает', href: '/how-it-works' },
    { label: 'Контакты', href: '/contact' },
  ];

  return (
    <header className="relative text-white w-full z-50">
      <MeshGradientBackground />
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-[#6B6BFA] md:ml-20 ml-4">TapTap</a>
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
            className="md:hidden bg-gradient-to-r from-[#1E0033] to-[#300050] overflow-hidden"
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
  );
};

export default Header;
