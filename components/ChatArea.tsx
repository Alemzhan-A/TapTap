import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import HeaderChat from './HeaderChat'
import { IoBookmark, IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoSearch } from 'react-icons/io5'

type ChatAreaProps = {
  onOpenSidebar: () => void;
}

type Recommendation = {
  productName: string;
  features: string[];
  pros: string[];
  cons: string[];
  priceRange: string;
  explanation: string;
  olxProducts: Array<{
    title: string;
    price: string;
    link: string;
    imageUrl: string;
  }>;
}

type SearchResult = {
  recommendations: Recommendation[];
  redditResults: Array<{
    title: string;
    url: string;
    score: number;
  }>;
}

const extractNumberFromPrice = (price: string): number => {
  const numericString = price.replace(/[^0-9]/g, '');
  return parseInt(numericString, 10);
};

const ProgressBar: React.FC<{ onComplete: () => void; isProductFound: boolean }> = ({ onComplete, isProductFound }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prevProgress + (95 / 600);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  

  useEffect(() => {
    if (isProductFound) {
      setProgress(100);
      onComplete();
    }
  }, [isProductFound, onComplete]);

  return (
    <div className="w-full mb-4">
      <div className="bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 text-center">
        {progress < 95 ? "Обычно поиск занимает меньше 1 минуты. Мы подбираем самые лучшие варианты." : "Почти готово! Ждем результатов..."}
      </p>
    </div>
  );
};

export default function ChatArea({ onOpenSidebar }: ChatAreaProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentProductLink, setCurrentProductLink] = useState('');
  const [loginStatus, setLoginStatus] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [isProductFound, setIsProductFound] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsLoggedIn(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowProgressBar(true);
    setIsProductFound(false);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при поиске продуктов');
      }
      const data = await response.json();
      setResults(data);
      setIsProductFound(true); 
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  const handleProgressComplete = () => {
    setIsLoading(false);
    setShowProgressBar(false);
  };

  const handleOpenModal = async (productName: string, productPrice: string, productLink: string) => {
    if (isAuthenticated) {
      setIsModalOpen(true);
      setLoginStatus('Добавление продукта в очередь...');
      try {
        const token = localStorage.getItem('token');
        const numericPrice = extractNumberFromPrice(productPrice);
        
        const response = await fetch('/api/add-product-to-queue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            productLink,
            product_name: productName, 
            initial_price: numericPrice, 
            current_price: numericPrice, 
            conversation_link: "Ссылка на диалог",
            seller_phone: "Ожидается",
            chat_history: []
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
    setEmail('');
    setPassword('');
    setLoginStatus('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus('Выполняется вход...');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/olx-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productLink: currentProductLink }),
      });
      if (!response.ok) {
        throw new Error('Ошибка входа');
      }
      const result = await response.json();
      setLoginStatus(result.message);
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setLoginStatus('Ошибка при входе. Пожалуйста, попробуйте снова.');
    }
    setTimeout(() => {
      handleCloseModal();
    }, 3000);
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

  return (
    <main className="flex-grow bg-gradient-to-b from-[#EDF7FF] to-[#E2EEFF] flex flex-col w-full relative">
      <MeshGradientBackground />
      <HeaderChat onOpenSidebar={onOpenSidebar} />
      <div className="flex-grow flex flex-col items-center justify-start px-4 py-8 z-10 relative">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#8B5CF6]">Что хотите купить?</h1>
          <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center border-2 border-[#8B5CF6] rounded-full overflow-hidden bg-white shadow-lg">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Например: лучший смартфон для бравл старса"
                className="w-full p-4 focus:outline-none text-[#8B5CF6] text-base md:text-lg"
              />
              <button
                type="submit"
                className="bg-[#8B5CF6] w-1/7 h-16 text-white px-6 py-4 hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? 'Поиск...' : <IoSearch size={24} />}
              </button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Лучший смартфон для бравл старса', 'Наушники с шумоподавлением', 'Топовые кроссовки на лето 2024'].map((suggestion) => (
              <span
                key={suggestion}
                className="bg-white border-2 border-[#8B5CF6] px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-[#8B5CF6] hover:text-white text-[#8B5CF6] transition-colors duration-200"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </span>
            ))}
          </div>
          {showProgressBar && (
            <ProgressBar 
              onComplete={handleProgressComplete} 
              isProductFound={isProductFound}
            />
          )}
          {results && (
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-[#8B5CF6] flex items-center">
                <IoBookmark className="mr-2" />
                Результаты поиска
              </h2>
              {results.recommendations.map((rec, index) => (
                <div key={index} className="mb-8 border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                  <h3 className="font-bold text-xl mb-4 text-[#8B5CF6]">{rec.productName}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Feature 
                      title="Особенности" 
                      items={rec.features}
                    />
                    
                    <Feature 
                      title="Преимущества" 
                      items={rec.pros}
                      icon={<IoCheckmarkCircle className="text-green-500" />}
                    />
                    
                    <Feature 
                      title="Недостатки" 
                      items={rec.cons}
                      icon={<IoCloseCircle className="text-red-500" />}
                    />
                    
                    <div>
                      <h4 className="font-semibold text-[#4A4AFA] flex items-center mb-2">
                        <IoInformationCircle className="mr-2 text-blue-500" />
                        Ценовой диапазон:
                      </h4>
                      <p className="text-gray-700">{rec.priceRange}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-[#4A4AFA] mb-2">Объяснение:</h4>
                    <p className="text-gray-700">{rec.explanation}</p>
                  </div>

                  {rec.olxProducts && rec.olxProducts.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-xl text-[#4A4AFA] mb-4">Товары на OLX:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rec.olxProducts.map((product, idx) => (
                          <div 
                            key={idx}
                            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                          >
                            <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="relative w-full pb-[75%]">
                                <img
                                  src={product.imageUrl}
                                  alt={product.title}
                                  className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                                  }}
                                />
                              </div>
                              <div className="p-4">
                                <h5 className="font-semibold text-[#4A4AFA] mb-2 line-clamp-2">
                                  <a href={product.link}>{product.title}</a>
                                </h5>
                                <p className="text-gray-600 font-bold">{product.price}</p>
                              </div>
                            </div>
                            <div className="p-4 pt-0">
                              <button
                                className="bg-[#4A4AFA] text-white px-4 py-2 w-full rounded hover:bg-opacity-90 transition-colors duration-200"
                                onClick={() => handleOpenModal(product.title, product.price, product.link)}
                              >
                                {isAuthenticated ? 'Поручить ИИ снизить цену' : 'Войдите, чтобы воспользоваться ИИ'}
                              </button>
                            </div>
                          </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <h2 className="text-xl font-bold mt-8 mb-4 text-[#4A4AFA]">Результаты с Reddit:</h2>
              <ul className="bg-gray-50 p-4 rounded-lg">
                {results.redditResults.map((result, index) => (
                  <li key={index} className="mb-2">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-[#4A4AFA] hover:underline">
                      {result.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Статус</h2>
        <p>{loginStatus}</p>
      </Modal>
    </main>
  )
}

type FeatureProps = {
  title: string
  items: string[]
  icon?: React.ReactNode
}

const Feature = ({ title, items, icon }: FeatureProps) => (
  <div className="mb-3">
    <h4 className="font-semibold text-[#6B6BFA] flex items-center mb-1">
      {icon || <IoInformationCircle className="mr-2 text-blue-500" />}
      {title}:
    </h4>
    <ul className="list-disc list-inside text-gray-700 space-y-1">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

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