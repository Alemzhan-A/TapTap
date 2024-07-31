import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HeaderChat from './HeaderChat';

type HeaderProps = {
  onOpenSidebar: () => void;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const extractNumberFromPrice = (price: string): number => {
  const numericString = price.replace(/[^0-9]/g, '');
  return parseInt(numericString, 10);
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const MeshGradientBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="gradient1" cx="20%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#EDF7FF" />
            <stop offset="100%" stopColor="#E2EEFF" />
          </radialGradient>
          <radialGradient id="gradient2" cx="80%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#4A4AFA" />
            <stop offset="100%" stopColor="#E2EEFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6B6BFA" />
            <stop offset="100%" stopColor="#EDF7FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2EEFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#E2EEFF" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="#E2EEFF" />
        <rect width="100%" height="100%" fill="url(#gradient1)" />
        <rect width="100%" height="100%" fill="url(#gradient2)" opacity="0.5" />
        <rect width="100%" height="100%" fill="url(#gradient3)" opacity="0.4" />
        <rect width="100%" height="30%" y="70%" fill="url(#bottomGradient)" />
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feComposite operator="in" in2="SourceGraphic" result="noisy"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
      </svg>
    </div>
  );
};

export default function LinkInput({ onOpenSidebar }: HeaderProps) {
  const [link, setLink] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      setIsModalOpen(true);
      setLoginStatus('Добавление продукта в очередь...');
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('/api/add-product-to-queue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            productLink: link,
            product_name: "Ожидается",
            initial_price: 0,
            current_price: 0,
            conversation_link: "Ссылка на диалог",
          }),
        });
        const data = await response.json();
        if (data.success) {
          setLoginStatus('Продукт успешно добавлен в очередь для переговоров. ИИ свяжется с продавцом в ближайшее время. Вы можете следить за этим в вкладке "Мои сделки" ');
        } else {
          setLoginStatus(data.message || 'Произошла ошибка при добавлении продукта');
        }
      } catch (error) {
        console.error('Error:', error);
        setLoginStatus('Произошла ошибка при обработке запроса');
      }
    } else {
      setIsModalOpen(true);
      setLoginStatus('Вы должны войти в аккаунт');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLoginStatus('');
  };

  return (
    <main className="flex-grow bg-gradient-to-b from-[#EDF7FF] to-[#E2EEFF] flex flex-col w-full relative">
      <MeshGradientBackground />
      <HeaderChat onOpenSidebar={onOpenSidebar} />
      <div className="flex-grow flex flex-col items-center justify-center px-4 pb-96 z-10 relative">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#8B5CF6] text-center">Введите ссылку на товар</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.olx.kz/d/obyavlenie/..."
              className="w-full p-3 border-2 border-[#8B5CF6] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4A4AFA] focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#8B5CF6] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
            >
              {isAuthenticated ? 'Отправить' : 'Войдите, чтобы отправить'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Наш ИИ добьется самой низкой цены для вас
          </p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Статус</h2>
        <p>{loginStatus}</p>
      </Modal>
    </main>
  );
}