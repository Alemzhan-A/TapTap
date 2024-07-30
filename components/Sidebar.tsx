import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  product_name: string;
  isOver: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const fetchUserProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Вход не выполнен');
        return;
      }
      const response = await axios.get<{ products: Product[] }>('https://web-production-8d99.up.railway.app/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && Array.isArray(response.data.products)) {
        setUserProducts(response.data.products);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleMyProductsClick = () => {
    if (isAuthenticated) {
      router.push('/products');
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-[#1E293B] p-4 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-0
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-[#8B5CF6] text-2xl font-bold">
            <Link href="/" legacyBehavior>
              <a>TapTap</a>
            </Link>
          </div>
          <button onClick={onClose} className="md:hidden text-[#8B5CF6]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Link href="/chat" legacyBehavior>
          <a className="w-full bg-[#8B5CF6] text-white py-2 px-4 rounded mb-4 hover:bg-opacity-90 transition-colors duration-200 text-center">
            Новый Запрос
          </a>
        </Link>
        <Link href="/link" legacyBehavior>
          <a className="w-full bg-[#8B5CF6] text-white py-2 px-4 rounded mb-4 hover:bg-opacity-90 transition-colors duration-200 text-center">
            Выбор по ссылке
          </a>
        </Link>
        <button
          onClick={handleMyProductsClick}
          className="w-full bg-[#8B5CF6] text-white py-2 px-4 rounded mb-4 hover:bg-opacity-90 transition-colors duration-200 text-center"
        >
          Мои сделки
        </button>

        
      </aside>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Войдите в аккаунт</h2>
            <p className="mb-4">Для доступа к этому разделу необходимо войти в аккаунт.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[#8B5CF6] text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors duration-200"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}