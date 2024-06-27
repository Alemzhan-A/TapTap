import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#33334D] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} TapTap. Все права защищены.</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><Link href="/terms" legacyBehavior><a className="hover:text-[#6B6BFA]">Условия использования</a></Link></li>
              <li><Link href="/privacy" legacyBehavior><a className="hover:text-[#6B6BFA]">Политика конфиденциальности</a></Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;