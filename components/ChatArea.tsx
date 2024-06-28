import HeaderChat from './HeaderChat'

type ChatAreaProps = {
  onOpenSidebar: () => void;
}

export default function ChatArea({ onOpenSidebar }: ChatAreaProps) {
  return (
    <main className="flex-grow bg-[#EDF7FF] flex flex-col w-full">
      <HeaderChat onOpenSidebar={onOpenSidebar} />
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-[#6B6BFA]">Что хотите купить?</h1>
          <form className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row items-center border-2 border-[#6B6BFA] rounded-lg overflow-hidden">
              <input 
                type="text" 
                placeholder="дешевый, но хороший ноутбук для инкубатора" 
                className="w-full p-3 md:p-4 focus:outline-none bg-white text-[#6B6BFA]"
              />
              <button type="submit" className="w-full md:w-auto bg-[#6B6BFA] text-white px-4 py-3 md:px-6 md:py-4 hover:bg-opacity-90 mt-2 md:mt-0">
                Найти
              </button>
            </div>
            <div className="mt-4 text-center">
              <button type="button" className="text-[#6B6BFA] hover:underline">
                Пример
              </button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {['Хорошие часы для тоя, чтобы все были в шоке', 'Наушники, которые заглушат храп соседа', 'Топовые кроссовки на лето 2024', 'Очки как у Кайрата Нуртаса'].map((suggestion) => (
              <span key={suggestion} className="bg-white border border-[#6B6BFA] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm cursor-pointer hover:bg-[#6B6BFA] hover:text-white text-[#6B6BFA] mb-2">
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}