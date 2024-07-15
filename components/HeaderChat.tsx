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

  return (
    <header className="bg-[#33334D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button onClick={onOpenSidebar} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <nav className="hidden md:block">
          </nav>
          <div className="flex items-center space-x-2 md:space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/profile" legacyBehavior>
                  <a className="text-white hover:text-[#6B6BFA] text-sm md:text-base">Профиль</a>
                </Link>
                <button onClick={handleLogout} className="text-white hover:text-[#6B6BFA] text-sm md:text-base">
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" legacyBehavior>
                  <a className="text-white hover:text-[#6B6BFA] text-sm md:text-base">Войти</a>
                </Link>
                <Link href="/auth/register" legacyBehavior>
                  <a className="text-white hover:text-[#6B6BFA] text-sm md:text-base">Регистрация</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}