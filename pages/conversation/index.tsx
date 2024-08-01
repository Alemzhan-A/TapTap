import { useState } from 'react'
import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import ConversationHistory from '../../components/ConversationHistory'

export default function Conversation() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <ConversationHistory />
        </div>
      </div>
    </Layout>
  )
}