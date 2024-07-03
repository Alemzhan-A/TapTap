import { useState } from 'react'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [historyItems] = useState<string[]>([])

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#1E293B] p-4 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-0
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-[#8B5CF6] text-2xl font-bold">TapTap</div>
        <button onClick={onClose} className="md:hidden text-[#8B5CF6]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <button className="w-full bg-[#8B5CF6] text-white py-2 px-4 rounded mb-4 hover:bg-opacity-90 transition-colors duration-200">
        Новый Запрос
      </button>

      <div className="flex-grow overflow-auto">
        <h2 className="font-semibold mb-2 text-[#A78BFA]">История</h2>
        <ul>
          {historyItems.map((item, index) => (
            <li key={index} className="mb-2 text-sm text-[#A78BFA] hover:text-opacity-75 cursor-pointer transition-opacity duration-200">
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