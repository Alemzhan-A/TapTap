import { useState } from 'react'

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [historyItems] = useState([

  ])

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#EDF7FF] p-4 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-0`}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-[#6B6BFA] text-2xl font-bold">TapTap</div>
        <button onClick={onClose} className="md:hidden text-[#6B6BFA]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <button className="w-full bg-[#6B6BFA] text-white py-2 px-4 rounded mb-4 hover:bg-opacity-90">
        Новый Запрос
      </button>
      <div className="flex-grow overflow-auto">
        <h2 className="font-semibold mb-2 text-[#6B6BFA]">История</h2>
        <ul>
          {historyItems.map((item, index) => (
            <li key={index} className="mb-2 text-sm text-[#6B6BFA] hover:text-opacity-75 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-start space-x-4">
        {/* Social icons here */}
      </div>
    </aside>
  )
}