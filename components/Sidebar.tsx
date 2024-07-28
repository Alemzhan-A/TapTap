import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

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

  useEffect(() => {
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
    fetchUserProducts();
  }, []);
  
  return (
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
      <div className="flex-grow overflow-auto">
        <h2 className="font-semibold mb-2 text-[#A78BFA]">Мои продукты</h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {userProducts.map((product) => (
            <li key={product._id} className="mb-2">
              <Link href={`/product/${product._id}`} legacyBehavior>
                <a className="block w-full">
                  {product.isOver ? (
                    <div className="bg-red-500 text-white text-sm py-1 px-2 rounded-t text-center">
                      Закончено
                    </div>
                  ) : (
                    <div className="bg-green-500 text-white text-sm py-1 px-2 rounded-t text-center">
                      В процессе
                    </div>
                  )}
                  <div className="bg-[#4B5563] text-white py-2 px-4 rounded-b hover:bg-opacity-90 transition-colors duration-200 text-center">
                    {product.product_name}
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}