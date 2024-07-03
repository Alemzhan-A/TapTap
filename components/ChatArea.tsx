import { useState } from 'react'
import HeaderChat from './HeaderChat'
import { IoBookmark, IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from 'react-icons/io5'

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
}

type SearchResult = {
  recommendations: Recommendation[];
  redditResults: Array<{
    title: string;
    url: string;
    score: number;
  }>;
}

export default function ChatArea({ onOpenSidebar }: ChatAreaProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow bg-[#EDF7FF] flex flex-col w-full">
      <HeaderChat onOpenSidebar={onOpenSidebar} />
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-[#6B6BFA]">Что хотите купить?</h1>
          <form onSubmit={handleSearch} className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row items-center border-2 border-[#6B6BFA] rounded-lg overflow-hidden">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="дешевый, но хороший ноутбук для инкубатора"
                className="w-full p-3 md:p-4 focus:outline-none bg-white text-[#6B6BFA]"
              />
              <button type="submit" className="w-full md:w-auto bg-[#6B6BFA] text-white px-4 py-3 md:px-6 md:py-4 hover:bg-opacity-90 mt-2 md:mt-0" disabled={isLoading}>
                {isLoading ? 'Поиск...' : 'Найти'}
              </button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {['Хорошие часы для тоя, чтобы все были в шоке', 'Наушники, которые заглушат храп соседа', 'Топовые кроссовки на лето 2024', 'Очки как у Кайрата Нуртаса'].map((suggestion) => (
              <span
                key={suggestion}
                className="bg-white border border-[#6B6BFA] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm cursor-pointer hover:bg-[#6B6BFA] hover:text-white text-[#6B6BFA] mb-2"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </span>
            ))}
          </div>
          {results && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-[#6B6BFA] flex items-center">
                <IoBookmark className="mr-2" />
                Рекомендации:
              </h2>
              {results.recommendations.map((rec, index) => (
                <div key={index} className="bg-white p-6 rounded-lg mb-6 shadow-md">
                  <h3 className="font-bold text-lg mb-4 text-[#6B6BFA]">{rec.productName}</h3>
                  
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
                  
                  <div className="mt-3">
                    <h4 className="font-semibold text-[#6B6BFA] flex items-center mb-1">
                      <IoInformationCircle className="mr-2 text-blue-500" />
                      Ценовой диапазон:
                    </h4>
                    <p className="text-gray-700">{rec.priceRange}</p>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#6B6BFA] mb-2">Объяснение:</h4>
                    <p className="text-gray-700">{rec.explanation}</p>
                  </div>
                </div>
              ))}
              <h2 className="text-xl font-bold mt-6 mb-4 text-[#6B6BFA]">Результаты с Reddit:</h2>
              <ul className="bg-white p-4 rounded-lg">
                {results.redditResults.map((result, index) => (
                  <li key={index} className="mb-2">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-[#6B6BFA] hover:underline">
                      {result.title}
                    </a>
                    <span className="ml-2 text-sm text-gray-500">Score: {result.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
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