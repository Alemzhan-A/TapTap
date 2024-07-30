import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderChat from './HeaderChat';

type HeaderProps = {
  onOpenSidebar: () => void;
};

type Product = {
  _id: string;
  product_name: string;
  initial_price: number;
  current_price: number;
  conversation_link: string;
  link: string;
  isOver: boolean;
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

export default function ProductsPage({ onOpenSidebar }: HeaderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Вход не выполнен');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get<{ products: Product[] }>('https://web-production-8d99.up.railway.app/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <main className="flex-grow bg-gradient-to-b from-[#EDF7FF] to-[#E2EEFF] flex flex-col w-full relative min-h-screen">
      <MeshGradientBackground />
      <HeaderChat onOpenSidebar={onOpenSidebar} />
      <div className="flex-grow flex flex-col items-center justify-start px-4 py-8 z-10 relative">
        <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#8B5CF6] text-center">Мои товары</h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white">
                  <th className="px-4 py-3 text-left">Название</th>
                  <th className="px-4 py-3 text-left">Сэкономлено</th>
                  <th className="px-4 py-3 text-left">Текущая цена</th>
                  <th className="px-4 py-3 text-left">Начальная цена</th>
                  <th className="px-4 py-3 text-left">Статус</th>
                  <th className="px-4 py-3 text-left">Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}>
                    <td className="px-4 py-3">{product.product_name}</td>
                    <td className="px-4 py-3">
                      ₸{(product.initial_price - product.current_price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">₸{product.current_price.toFixed(2)}</td>
                    <td className="px-4 py-3"><span className="line-through">₸{product.initial_price.toFixed(2)}</span></td>
                    <td className="px-4 py-3">
                      {product.isOver ? (
                        <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs font-medium whitespace-nowrap">Закончено</span>
                      ) : (
                        <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-medium whitespace-nowrap">В процессе</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={product.conversation_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900 mr-2 transition-colors duration-150"
                      >
                        Чат
                      </a>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-900 transition-colors duration-150"
                      >
                        OLX
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
