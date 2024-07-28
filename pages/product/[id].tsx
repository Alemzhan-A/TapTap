import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import HeaderChat from '../../components/HeaderChat';

interface Product {
  _id: string;
  product_name: string;
  initial_price: number;
  current_price: number;
  conversation_link: string;
  link: string;
}

export default function ProductPage({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Вход не выполнен');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post('/api/fetchProduct', { id, token });
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  if (!product) return <div className="flex items-center justify-center h-screen">Product not found</div>;

  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-grow bg-gradient-to-b from-[#EDF7FF] to-[#E2EEFF] flex flex-col w-full">
          <HeaderChat onOpenSidebar={() => setSidebarOpen(true)} />
          <div className="flex flex-grow items-center justify-center">
            <div className="w-full max-w-2xl px-4 py-8 mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{product.product_name}</h1>
                <div className="flex justify-between gap-6 mb-8">
                  <div className="flex-1 bg-blue-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-blue-800">Начальная Цена</p>
                    <p className="text-2xl font-bold text-blue-600 relative">
                      <span className="absolute left-12 right-12 top-1/2 h-0.5 bg-blue-600"></span>
                      ₸{product.initial_price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex-1 bg-green-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-green-800">Нынешняя Цена</p>
                    <p className="text-2xl font-bold text-green-600">₸{product.current_price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <a
                    href={product.conversation_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 text-center w-48"
                  >
                    View Conversation
                  </a>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 text-center w-48"
                  >
                    View on OLX
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;
  return {
    props: { id },
  };
}