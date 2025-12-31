'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Wand2, CheckCircle2, AlertCircle, FileEdit, FileText, Home } from 'lucide-react'
import Link from 'next/link'

export default function EssayPage() {
    const [essay, setEssay] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [feedback, setFeedback] = useState<null | {
        score: number,
        strengths: string[],
        improvements: string[]
    }>(null)

    const handleAnalyze = async () => {
        if (!essay.trim()) return

        setIsAnalyzing(true)
        setFeedback(null)

        try {
            const response = await fetch('/api/essay/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: essay }),
            })

            if (!response.ok) {
                throw new Error(`Analysis failed: ${response.status}`)
            }

            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format')
            }

            const data = await response.json()
            setFeedback(data)
        } catch (error) {
            console.error("Error analyzing essay:", error)
            alert("Failed to analyze essay. Please try again.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 mb-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <FileEdit className="w-10 h-10 text-pink-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900 font-bold">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarship Agent</Link>
                        <Link href="/internship" className="text-slate-600 hover:text-slate-900">Internship Agent</Link>
                        <Link href="/competition" className="text-slate-600 hover:text-slate-900">Competition Agent</Link>
                        <Link href="/club" className="text-slate-600 hover:text-slate-900">Club Agent</Link>
                        <Link href="/financial-aid" className="text-slate-600 hover:text-slate-900">Financial Aid Agent</Link>
                    </div>
                </div>
            </nav>

            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Essay Agent</h1>
                            <p className="text-slate-500">Get AI-powered feedback on your personal statement.</p>
                        </div>
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !essay.trim()}
                            className="bg-amber-500 hover:bg-amber-600 text-white"
                        >
                            {isAnalyzing ? (
                                <>Analyzing...</>
                            ) : (
                                <><Wand2 className="w-4 h-4 mr-2" /> Analyze Essay</>
                            )}
                        </Button>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
                        {/* Editor Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                            <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-pink-50 rounded-t-xl">
                                <div className="flex items-center space-x-2 font-semibold text-pink-700">
                                    <FileText className="w-4 h-4" />
                                    <span>Your Draft</span>
                                </div>
                                <span className="text-xs text-slate-400">{essay.length} chars</span>
                            </div>
                            <Textarea
                                className="flex-1 p-6 text-lg leading-relaxed border-0 focus-visible:ring-0 resize-none rounded-b-xl"
                                placeholder="Paste your essay here..."
                                value={essay}
                                onChange={(e) => setEssay(e.target.value)}
                            />
                        </div>

                        {/* Feedback Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
                            <div className="p-4 border-b border-pink-100 bg-pink-50 rounded-t-xl">
                                <h2 className="font-semibold text-pink-700">AI Feedback</h2>
                            </div>

                            <div className="p-6">
                                {!feedback ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 mt-20">
                                        <Wand2 className="w-12 h-12 opacity-20" />
                                        <p>Paste your essay and click Analyze to get started.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        {/* Score */}
                                        <div className="flex items-center space-x-4">
                                            <div className="relative w-20 h-20 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="40" cy="40" r="36" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                                                    <circle
                                                        cx="40" cy="40" r="36"
                                                        stroke={feedback.score > 80 ? "#22c55e" : "#eab308"}
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeDasharray={`${2 * Math.PI * 36}`}
                                                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - feedback.score / 100)}`}
                                                        className="transition-all duration-1000 ease-out"
                                                    />
                                                </svg>
                                                <span className="absolute text-xl font-bold text-slate-700">{feedback.score}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">Overall Score</h3>
                                                <p className="text-sm text-slate-500">Based on structure, clarity, and impact.</p>
                                            </div>
                                        </div>

                                        {/* Strengths */}
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                                                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Strengths
                                            </h3>
                                            <ul className="space-y-3">
                                                {feedback.strengths.map((item, i) => (
                                                    <li key={i} className="flex items-start text-sm text-slate-600 bg-green-50 p-3 rounded-lg border border-green-100">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Improvements */}
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-2 text-amber-500" /> Areas for Improvement
                                            </h3>
                                            <ul className="space-y-3">
                                                {feedback.improvements.map((item, i) => (
                                                    <li key={i} className="flex items-start text-sm text-slate-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
