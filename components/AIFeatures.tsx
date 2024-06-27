import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, PencilLine, ThumbsUp } from 'lucide-react';

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
    <section className="py-24 bg-[#EDF7FF]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 text-[#33334D]"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          Преимущества нашего ИИ
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon size={48} className="text-[#6B6BFA] mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-[#33334D]">{feature.title}</h3>
              <p className="text-lg text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
