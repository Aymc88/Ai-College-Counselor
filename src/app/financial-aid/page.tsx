'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { DollarSign, Home, Calendar, Award, BookOpen, Bot, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function FinancialAidPage() {
    const [question, setQuestion] = useState('')
    const [checklist, setChecklist] = useState([
        { id: 1, task: 'Create FSA ID', completed: false },
        { id: 2, task: 'Gather Tax Documents (2024)', completed: false },
        { id: 3, task: 'Complete FAFSA Form', completed: false },
        { id: 4, task: 'Check State Aid Deadlines', completed: false },
        { id: 5, task: 'Complete CSS Profile (if required)', completed: false },
        { id: 6, task: 'Review Student Aid Report (SAR)', completed: false },
    ])

    const toggleChecklist = (id: number) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ))
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-slate-200 mb-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <DollarSign className="w-10 h-10 text-emerald-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarship Agent</Link>
                        <Link href="/internship" className="text-slate-600 hover:text-slate-900">Internship Agent</Link>
                        <Link href="/competition" className="text-slate-600 hover:text-slate-900">Competition Agent</Link>
                        <Link href="/club" className="text-slate-600 hover:text-slate-900">Club Agent</Link>
                        <Link href="/financial-aid" className="text-slate-600 hover:text-slate-900 font-bold">Financial Aid Agent</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Financial Aid Agent
                    </h1>
                    <p className="text-slate-600">Navigate the complex world of college financing with AI-powered guidance.</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-emerald-50 border-emerald-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-emerald-600 font-medium">Avg. Aid Package</p>
                                    <p className="text-3xl font-bold text-emerald-700">$28,400</p>
                                </div>
                                <DollarSign className="w-12 h-12 text-emerald-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600 font-medium">FAFSA Deadline</p>
                                    <p className="text-3xl font-bold text-blue-700">June 30</p>
                                </div>
                                <Calendar className="w-12 h-12 text-blue-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600 font-medium">Pell Grant Max</p>
                                    <p className="text-3xl font-bold text-purple-700">$7,395</p>
                                </div>
                                <Award className="w-12 h-12 text-purple-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Resources */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Understanding Aid Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                <BookOpen className="w-6 h-6 mr-2 text-emerald-600" />
                                Understanding Financial Aid
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="hover:shadow-md transition cursor-pointer border-l-4 border-l-emerald-500">
                                    <CardHeader>
                                        <CardTitle className="text-lg">FAFSA Guide</CardTitle>
                                        <CardDescription>The Free Application for Federal Student Aid is the key to most aid.</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="hover:shadow-md transition cursor-pointer border-l-4 border-l-blue-500">
                                    <CardHeader>
                                        <CardTitle className="text-lg">CSS Profile</CardTitle>
                                        <CardDescription>Required by many private colleges to award non-federal aid.</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="hover:shadow-md transition cursor-pointer border-l-4 border-l-yellow-500">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Grants vs. Loans</CardTitle>
                                        <CardDescription>Learn the difference between "gift aid" and money you must repay.</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="hover:shadow-md transition cursor-pointer border-l-4 border-l-purple-500">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Work-Study</CardTitle>
                                        <CardDescription>Part-time jobs for students with financial need.</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </section>

                        {/* Ask AI Section */}
                        <section>
                            <Card className="border-emerald-200">
                                <CardHeader className="bg-emerald-50 rounded-t-lg">
                                    <CardTitle className="flex items-center text-emerald-800">
                                        <Bot className="w-5 h-5 mr-2" />
                                        Ask the Financial Aid Expert
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <p className="text-slate-600">
                                            Confused about "EFC", "Cost of Attendance", or how to appeal an aid offer? Ask here!
                                        </p>
                                        <Textarea
                                            placeholder="e.g., How does my parents' income affect my aid eligibility?"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                            Get AI Advice
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    {/* Sidebar - Checklist */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
                                    Aid Checklist
                                </CardTitle>
                                <CardDescription>Track your financial aid progress</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {checklist.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                                            onClick={() => toggleChecklist(item.id)}
                                        >
                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                                                }`}>
                                                {item.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className={`text-sm ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                {item.task}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                                        <span>Progress</span>
                                        <span>{Math.round((checklist.filter(i => i.completed).length / checklist.length) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 transition-all duration-500"
                                            style={{ width: `${(checklist.filter(i => i.completed).length / checklist.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Home Button */}
                <div className="mt-12 text-center">
                    <Link href="/">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
