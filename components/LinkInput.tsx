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
      setLoginStatus('ИИ начинает переговоры с продавцом...');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/olx-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productLink: link }),
        });
        const data = await response.json();
        if (data.success) {
          setLoginStatus('ИИ начал вести переговоры с продавцом чтобы снизить цену');
        } else {
          setLoginStatus(data.message || 'Произошла ошибка');
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
    <main className="flex-grow bg-gradient-to-b from-[#EDF7FF] to-[#E2EEFF] flex flex-col w-full">
      <HeaderChat onOpenSidebar={onOpenSidebar} />
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#4A4AFA] text-center">Введите ссылку на товар</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://www.olx.kz/d/obyavlenie/..."
            className="w-full p-3 border-2 border-[#4A4AFA] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4A4AFA] focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#4A4AFA] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
          >
            {isAuthenticated ? 'Отправить' : 'Войдите, чтобы отправить'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Наш ИИ добьется самой низкой цены для вас
        </p>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Статус</h2>
        <p>{loginStatus}</p>
      </Modal>
    </main>
  );
}