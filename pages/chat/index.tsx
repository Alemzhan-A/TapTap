import { useState } from 'react'
import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import ChatArea from '../../components/ChatArea'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <ChatArea onOpenSidebar={() => setSidebarOpen(true)} />
      </div>
    </Layout>
  )
}