import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-[#33334D]">{question}</span>
        {isOpen ? <ChevronUp className="text-[#6B6BFA]" /> : <ChevronDown className="text-[#6B6BFA]" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-2 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const faqs = [
    {
      question: 'Как работает TapTap?',
      answer: 'TapTap использует искусственный интеллект для анализа отзывов и рекомендаций, чтобы найти идеальный товар по вашему запросу и бюджету.',
    },
    {
      question: 'Сколько стоит использование сервиса?',
      answer: 'Базовое использование TapTap бесплатно. Вы можете получить доступ ко всем эксклюзивным функциям всего лишь за 990 тг.',
    },
    {
      question: 'Могу ли я доверять рекомендациям TapTap?',
      answer: 'Да, наш ИИ анализирует тысячи реальных отзывов и рекомендаций, чтобы предоставить вам наиболее объективную информацию.',
    },
    {
      question: 'Как долго ждать результатов поиска?',
      answer: 'Обычно результаты поиска готовы в течение нескольких секунд, но сложные запросы могут занять до минуты.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-[#33334D]"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          Часто задаваемые вопросы
        </motion.h2>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
