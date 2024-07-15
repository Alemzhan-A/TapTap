import React, { useState } from 'react';
import HeaderChat from './HeaderChat'

type HeaderProps = {
  onOpenSidebar: () => void;
}

export default function LinkInput({ onOpenSidebar }: HeaderProps) {
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="flex-grow bg-gradient-to-b from-[#EDF7FF] to-[#E2EEFF] flex flex-col w-full">
    <HeaderChat onOpenSidebar={onOpenSidebar} />
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-12">
      
      <h2 className="text-2xl font-bold mb-4 text-[#4A4AFA] text-center">Введите ссылку на товар</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://www.olx.kz/d/obyavlenie/..."
          className="w-full p-3 border-2 border-[#4A4AFA] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4A4AFA] focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#4A4AFA] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
        >
          Отправить
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Наш ИИ добьется самой низкой цены для вас
      </p>
    </div>
    </main>
  );
}