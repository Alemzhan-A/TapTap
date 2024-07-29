import { useState, useEffect } from 'react';
import Link from 'next/link';

type HeaderProps = {
  onOpenSidebar: () => void;
}

export default function HeaderChat({ onOpenSidebar }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const buttonStyle = "text-gray-700 bg-white hover:bg-gray-100 text-sm font-medium rounded-full px-4 py-2 border border-gray-300 transition-colors duration-300";

  return (
    <header className="bg-[#33334D] text-[#7225B4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="flex justify-between items-center py-4">
          <button onClick={onOpenSidebar} className="md:hidden text-[#7225B4]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <nav className="hidden md:block">
          </nav>
          <div className="flex items-center space-x-2 md:space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/profile" legacyBehavior>
                  <a className={buttonStyle}>Профиль</a>
                </Link>
                <button onClick={handleLogout} className={buttonStyle}>
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" legacyBehavior>
                  <a className={buttonStyle}>Войти</a>
                </Link>
                <Link href="/auth/register" legacyBehavior>
                  <a className={buttonStyle}>Регистрация</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}