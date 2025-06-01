'use client'

import React, { useState, useRef, useEffect } from 'react'
import chatWithAgent from '@/app/service/interview/chatWithAgent'

export default function ChatComponent({ report, chat, setChat }) {
  const [userMessage, setUserMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  const sendMessage = async () => {
    if (!userMessage.trim() || loading) return

    const updatedChat = [...chat, { role: 'user', content: userMessage }]
    setChat(updatedChat)
    setUserMessage('')
    setLoading(true)
    setError('')
 
    const response = await chatWithAgent(report, updatedChat)

    setLoading(false)

    if (!response.status) {
      setError(response.error || 'Something went wrong')
      return
    }

    const aiMessage = response.data
    setChat([...updatedChat, { role: 'assistant', content: aiMessage }])
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat, loading])

  return (
    <div className="bg-white w-full max-w-4xl mx-auto p-4 border border-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Interview Copilot</h2>

      <div className="h-[400px] overflow-y-auto border border-gray-200 rounded p-4 bg-white space-y-3">
        {Array.isArray(chat) &&
          chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-[75%] whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-left self-end ml-auto'
                  : 'bg-gray-200 text-left'
              }`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Jina'}:</strong> {msg.content}
            </div>
          ))}
        {loading && (
          <div className="text-sm text-gray-500 italic">Jina is thinking...</div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border border-gray-300 shadow rounded"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-900 cursor-pointer disabled:opacity-50"
        >
          Send
        </button>
      </div>

      {error && <div className="text-red-600 text-sm">⚠️ {error}</div>}
    </div>
  )
}
