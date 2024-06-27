import React from 'react';
import { Search, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
    <section className="py-24 bg-gray-100" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 text-[#33334D]"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          Как это работает
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div 
                className="bg-indigo-100 rounded-full p-6 inline-block mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <step.icon size={48} className="text-indigo-600" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 text-[#33334D]">{step.title}</h3>
              <p className="text-lg text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
