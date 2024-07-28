import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const AnimatedPhrase: React.FC = () => {
  const words = ['Найдем', 'Предложим', 'Сторгуемся','За ВАС!'];
  const { scrollY } = useScroll();
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContainerHeight(window.innerHeight * 4); // Высота для трех слов
    }
  }, []);

  return (
    <section className="bg-[#EDF7FF] relative" style={{ height: `${containerHeight}px` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {words.map((word, index) => (
          <WordSection key={index} word={word} index={index} scrollY={scrollY} />
        ))}
      </div>
    </section>
  );
};

const WordSection: React.FC<{ word: string; index: number; scrollY: MotionValue<number> }> = ({ word, index, scrollY }) => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  const y = useTransform(
    scrollY,
    [index * windowHeight, (index + 1) * windowHeight],
    ['100%', '0%']
  );

  const opacity = useTransform(
    scrollY,
    [index * windowHeight, (index + 0.5) * windowHeight],
    [0, 1]
  );

  return (
    <motion.h2
      className="text-5xl md:text-7xl font-bold mb-6 text-[#6B6BFA]"
      style={{ y, opacity }}
    >
      {word}
    </motion.h2>
  );
};

export default AnimatedPhrase;