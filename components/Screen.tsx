import React from 'react';
import Image from 'next/image';

const Screen: React.FC = () => {
  return (
    <section className="bg-[#1E0033] min-h-screen flex items-center justify-center py-8 sm:py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-2/5 lg:pr-12 mb-8 lg:mb-0 z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 sm:mb-8 leading-tight">
            Автоматизированная торговля с помощью ИИ для выгодных покупок на OLX.kz
          </h2>
          <ul className="text-white text-base sm:text-lg lg:text-xl space-y-4 sm:space-y-6">
            <li className="flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#916bfa] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>ИИ торгуется с продавцом за вас</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#916bfa] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Получайте лучшие скидки без усилий</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#916bfa] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Экономьте время на переговорах</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#916bfa] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Максимальная выгода при каждой покупке</span>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-3/5 relative mt-8 lg:mt-0">
          <div className="relative w-full max-w-[400px] h-[500px] sm:h-[600px] md:h-[700px] lg:h-[809px] mx-auto lg:mr-0 lg:ml-auto">
            <div className="absolute inset-x-0 bottom-0 top-[10%] bg-gradient-to-br from-[#916bfa] to-[#6B6BFA] opacity-30 blur-3xl rounded-3xl"></div>
            <Image
              src="/Screenshot.png"
              alt="Чат с продавцом на OLX.kz"
              layout="fill"
              objectFit="contain"
              className="drop-shadow-2xl relative z-10"
            />
            <div className="absolute -top-6 -left-6 lg:-left-2 bg-white rounded-full p-3 sm:p-4 shadow-lg z-20">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#916bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </div>
            <div className="absolute -top-6 -right-6 lg:-right-2 bg-[#916bfa] rounded-full p-3 sm:p-4 shadow-lg z-20">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <div className="text-center mt-4 sm:mt-6 lg:text-right lg:pr-4">
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg italic bg-[#1E0033] inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
              Все сообщения покупателя в этом чате были написаны ИИ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screen;