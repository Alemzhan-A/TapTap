import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

type Message = {
  sender: string
  message: string
}

const MeshGradientBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="gradient1" cx="20%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#EDF7FF" />
            <stop offset="100%" stopColor="#E2EEFF" />
          </radialGradient>
          <radialGradient id="gradient2" cx="80%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#4A4AFA" />
            <stop offset="100%" stopColor="#E2EEFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6B6BFA" />
            <stop offset="100%" stopColor="#EDF7FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2EEFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#E2EEFF" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="#E2EEFF" />
        <rect width="100%" height="100%" fill="url(#gradient1)" />
        <rect width="100%" height="100%" fill="url(#gradient2)" opacity="0.5" />
        <rect width="100%" height="100%" fill="url(#gradient3)" opacity="0.4" />
        <rect width="100%" height="30%" y="70%" fill="url(#bottomGradient)" />
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feComposite operator="in" in2="SourceGraphic" result="noisy"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
      </svg>
    </div>
  );
};

const ConversationHistory: React.FC = () => {
  const router = useRouter()
  const { productId } = router.query
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      if (!productId) return
     
      const token = localStorage.getItem('token')
      if (!token) {
        setError('No token found. Please log in.')
        setLoading(false)
        return
      }
      try {
        const response = await axios.get(`https://web-production-8d99.up.railway.app/api/conversation/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setMessages(response.data.chat_history.reverse())
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
        setError('Failed to load conversation history. Please try again.')
        setLoading(false)
      }
    }
    fetchMessages()
  }, [productId])

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>
  if (error) return <div className="flex-1 flex items-center justify-center text-red-500">{error}</div>

  return (
    <div className="relative min-h-screen">
      <MeshGradientBackground />
      <div className="relative z-10 flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.sender === 'Покупатель' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg ${
              message.sender === 'Покупатель' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-800'
            } shadow-md`}>
              <p className="font-bold mb-1">{message.sender === 'Покупатель' ? 'ИИ' : 'Продавец'}</p>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationHistory