import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, ThumbsUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const StatsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const stats = [
    { icon: Users, value: '100+', label: 'Довольных пользователей' },
    { icon: ShoppingBag, value: '200+', label: 'Успешных покупок' },
    { icon: ThumbsUp, value: '98%', label: 'Положительных отзывов' },
  ];

  return (
    <section className="py-24 bg-[#7225B4]" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div 
                className="inline-block mb-4"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon size={48} />
              </motion.div>
              <motion.h3 
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-xl">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
