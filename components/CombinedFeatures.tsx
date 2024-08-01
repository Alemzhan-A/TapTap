import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, PencilLine, ThumbsUp, Search, Star, ShoppingCart } from 'lucide-react';

interface MeshGradientBackgroundProps {
  children: ReactNode;
}

const MeshGradientBackground: React.FC<MeshGradientBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1E0033]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="gradient1" cx="20%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#300050" />
              <stop offset="100%" stopColor="#1E0033" />
            </radialGradient>
            <radialGradient id="gradient2" cx="80%" cy="80%" r="80%">
              <stop offset="0%" stopColor="#3B0062" />
              <stop offset="100%" stopColor="#1E0033" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4A007D" />
              <stop offset="100%" stopColor="#300050" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="#1E0033" />
          <rect width="100%" height="100%" fill="url(#gradient1)" opacity="0.7" />
          <rect width="100%" height="100%" fill="url(#gradient2)" opacity="0.7" />
          <rect width="100%" height="100%" fill="url(#gradient3)" opacity="0.6" />
          
          <g>
            <circle cx="10%" cy="30%" r="5%" fill="#4A007D" opacity="0.3" />
            <rect x="80%" y="60%" width="15%" height="15%" fill="#3B0062" opacity="0.2" />
            <path d="M 50 10 Q 100 50 50 90 Q 0 50 50 10" fill="#300050" opacity="0.2" />
          </g>
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const steps = [
    { icon: Search, title: 'Введите запрос', description: 'Опишите, что вы хотите купить' },
    { icon: Star, title: 'ИИ анализирует', description: 'Мы изучаем отзывы и рекомендации' },
    { icon: ShoppingCart, title: 'Получите предложения', description: 'Выбирайте лучшие варианты для вас' },
  ];

  return (
    <section className="py-24 bg-purple-900/40 backdrop-blur-sm rounded-lg" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">
          Как это работает
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-purple-600/60 rounded-full p-6 inline-block mb-6 shadow-lg">
                <step.icon size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
              <p className="text-lg text-gray-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIFeatures: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const features = [
    { icon: Brain, title: 'Умный анализ', description: 'Наш ИИ анализирует тысячи отзывов и рекомендаций' },
    { icon: PencilLine, title: 'Автоматические торги', description: 'Наш ИИ-агент способен торговаться с продавцами и получать наименьшую цену' },
    { icon: ThumbsUp, title: 'Персонализация', description: 'ИИ учитывает ваши предпочтения и историю поиска' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm rounded-lg" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-[#EDF7FF]">
          Преимущества нашего ИИ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-600/60 to-[#6B6BFA]/30 rounded-2xl p-8 shadow-lg backdrop-blur-md border border-white/10"
            >
              <div className="bg-white/80 rounded-full p-4 inline-block mb-6">
                <feature.icon size={48} className="text-[#916bfa]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#EDF7FF]">{feature.title}</h3>
              <p className="text-lg text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CombinedFeatures: React.FC = () => {
  return (
    <MeshGradientBackground>
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          <HowItWorks />
          <AIFeatures />
        </div>
      </div>
    </MeshGradientBackground>
  );
};

export default CombinedFeatures;