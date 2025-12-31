'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileEdit, BarChart3, Map, TrendingUp, Award, Bot, Briefcase, Send, MessageSquare, Trophy, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI College Counselor. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(71, 85, 105) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(71, 85, 105) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5" />

      <div className="relative z-10 h-screen flex flex-col px-3 py-3" style={{ transform: 'scale(0.85)', transformOrigin: 'center center' }}>
        <div className="max-w-5xl mx-auto w-full flex flex-col h-full mt-20">

          {/* Top Section - Title (Further Scaled Down) */}
          <div className="mb-12 flex justify-center">
            <Link href="/home" className="group">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center leading-tight hover:text-orange-300 transition">
                AI College Counselor
                <span className="text-2xl md:text-4xl text-orange-400 ml-2 block md:inline md:ml-3">
                  MCP Server
                </span>
              </h1>
            </Link>
          </div>

          {/* Main Content - Chat on Left, Agents on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1 min-h-0">

            {/* Left Side - AI Chat (40% - 2 cols) */}
            <div className="lg:col-span-2 flex flex-col min-h-0">
              <div className="relative group h-full flex flex-col">
                {/* Glow Effect */}


                {/* Chat Container */}
                <div className="relative bg-slate-900 rounded-xl border border-orange-500 shadow-2xl flex flex-col ring-2 ring-orange-500/50" style={{ width: '400px', height: '565px' }}>

                  {/* Chat Header */}
                  <div className="px-2 py-1.5 border-b border-slate-700 flex-shrink-0">
                    <div className="flex items-center space-x-1.5">
                      <MessageSquare className="w-3 h-3 text-orange-400" />
                      <h2 className="text-xl font-bold text-white">AI Chat</h2>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto px-2 py-1.5 space-y-1.5 min-h-0">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded px-1.5 py-1 ${msg.role === 'user'
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-800 text-slate-200 border border-slate-700'
                          }`}>
                          <p className="text-xl">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="px-2 py-1.5 border-t border-slate-700 flex-shrink-0">
                    <div className="flex space-x-1">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about college..."
                        disabled={isLoading}
                        className="flex-1 bg-slate-800 text-white rounded px-1.5 py-1 text-xl border border-slate-700 focus:outline-none focus:border-orange-500 transition disabled:opacity-50"
                        suppressHydrationWarning
                      />
                      <Button
                        disabled={isLoading}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-1.5 disabled:opacity-50"
                      >
                        <Send className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Side - Agent Grid (60% - 3 cols) */}
            <div className="lg:col-span-3 flex flex-col">
              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-[16.24px]" style={{ width: '565px', height: '565px' }}>

                  {/* Match Card */}
                  <Link href="/dashboard" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-cyan-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <BarChart3 className="w-14 h-14 text-cyan-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Match Agent</span>
                      </div>
                    </div>
                  </Link>

                  {/* Career Path Card */}
                  <Link href="/pathway" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-orange-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <Map className="w-14 h-14 text-orange-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Career Agent</span>
                      </div>
                    </div>
                  </Link>

                  {/* Progress Card */}
                  <Link href="/progress" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-purple-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <TrendingUp className="w-14 h-14 text-purple-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Progress Agent</span>
                      </div>
                    </div>
                  </Link>


                  {/* Scholarship Card */}
                  <Link href="/scholarship" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-yellow-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <Award className="w-14 h-14 text-yellow-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Scholarship Agent</span>
                      </div>
                    </div>
                  </Link>

                  {/* Essay Card */}
                  <Link href="/essay" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-pink-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-pink-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <FileEdit className="w-14 h-14 text-pink-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Essay Agent</span>
                      </div>
                    </div>
                  </Link>

                  {/* Internship Card */}
                  <Link href="/internship" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-blue-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <Briefcase className="w-14 h-14 text-blue-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Internship Agent</span>
                      </div>
                    </div>
                  </Link>

                  {/* Placeholders for Future Agents */}
                  {/* Competition Card */}
                  <Link href="/competition" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-red-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <Trophy className="w-14 h-14 text-red-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Competition Agent</span>
                      </div>
                    </div>
                  </Link>

                  {/* Club Card */}
                  <Link href="/club" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-indigo-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <Users className="w-14 h-14 text-indigo-400" />
                        <span className="text-2xl font-bold text-white text-center leading-tight">Club Agent</span>
                      </div>
                    </div>
                  </Link>

                  {/* Startups Agent Card */}
                  <Link href="/startups" className="group">
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded blur opacity-50 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-slate-900 rounded p-1.5 border border-teal-500 flex flex-col items-center justify-center gap-0.5 hover:bg-slate-800 transition aspect-square h-full">
                        <svg className="w-14 h-14 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-2xl font-bold text-white text-center leading-tight">Startups Agent</span>
                      </div>
                    </div>
                  </Link>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
// End of Home component
