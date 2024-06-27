import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    name: 'Алемжан А.',
    text: 'TapTap помог мне найти идеальный ноутбук для работы. Я очень доволен рекомендациями!',
    rating: 5,
  },
  {
    name: 'Солтан Б.',
    text: 'Удивительно, насколько точно ИИ подобрал мне смартфон. Сэкономил кучу времени на поисках.',
    rating: 5,
  },
  {
    name: 'Ильяс Т.',
    text: 'Отличный сервис! Нашел красивую и удобную мебель для гостиной по хорошей цене.',
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gray-100" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-[#33334D]"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          Что говорят наши пользователи
        </motion.h2>
        <div className="relative">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto"
            >
              <p className="text-xl mb-6 text-gray-600 italic">&quot;{testimonials[currentIndex].text}&quot;</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#33334D]">{testimonials[currentIndex].name}</p>
                <div className="flex">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronLeft size={24} className="text-[#6B6BFA]" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <ChevronRight size={24} className="text-[#6B6BFA]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
