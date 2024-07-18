import React, { useState, useEffect } from 'react';

type ProgressBarProps = {
  duration: number;
  onComplete: () => void;
  isProductFound: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onComplete, isProductFound }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return isProductFound ? 100 : 95;
        }
        return prevProgress + (95 / (duration / 1000));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, isProductFound]);

  useEffect(() => {
    if (progress === 100) {
      onComplete();
    }
  }, [progress, onComplete]);

  return (
    <div className="w-full mb-4">
      <div className="bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 text-center">
        {progress < 95 ? "Обычно поиск занимает 1-2 минуты. Мы подбираем самые лучшие варианты." : 
         (isProductFound ? "Поиск завершен!" : "Завершаем поиск...")}
      </p>
    </div>
  );
};

export default ProgressBar;