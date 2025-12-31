'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap, BarChart3, FileEdit, Award, TrendingUp, Map, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export default function AdPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <GraduationCap className="w-8 h-8 text-orange-500" />
                        <span className="text-xl font-bold">AI College Counselor <span className="text-orange-500">MCP Server</span></span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-slate-300 hover:text-white transition">Launch Server</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-orange-400 text-sm font-medium mb-8 animate-fade-in-up">
                    <Zap className="w-4 h-4" />
                    <span>New: Multi-Agent System Live</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    Your Personal Team of <br />
                    <span className="text-orange-500">AI Agents</span>
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Stop struggling with college apps alone. Deploy a dedicated squad of specialized AI agents to handle matching, essays, scholarships, and career planning.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-900/20 transition-all hover:scale-105">
                            Launch MCP Server <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Agents Showcase */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Your AI Agents</h2>
                    <p className="text-slate-400">Nine specialized agents working in perfect harmony.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Match Agent */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition group">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <BarChart3 className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Match Agent</h3>
                        <p className="text-slate-400">Analyzes 10,000+ universities to find your perfect fit based on academic profile and preferences.</p>
                    </div>

                    {/* Essay Agent */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-pink-500/50 transition group">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <FileEdit className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Essay Agent</h3>
                        <p className="text-slate-400">Provides real-time feedback and structural improvements for your personal statement.</p>
                    </div>

                    {/* Career Path Agent */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-green-500/50 transition group">
                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <Map className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Career Path Agent</h3>
                        <p className="text-slate-400">Maps your skills to potential majors and career trajectories with data-driven insights.</p>
                    </div>

                    {/* Progress Agent */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-purple-500/50 transition group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Progress Agent</h3>
                        <p className="text-slate-400">Tracks your milestones and keeps you accountable throughout the application journey.</p>
                    </div>

                    {/* Scholarship Agent */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-yellow-500/50 transition group">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                            <Award className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Scholarship Agent</h3>
                        <p className="text-slate-400">Scans databases to find financial aid opportunities tailored to your background.</p>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Deploy?</h3>
                        <Link href="/">
                            <Button className="bg-white text-orange-600 hover:bg-slate-100 w-full">
                                Access MCP Server
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800 py-12 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-slate-500 text-sm mb-4 md:mb-0">
                        © 2026 AI College Counselor MCP Server. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <Link href="/" className="text-slate-500 hover:text-white transition text-sm">Privacy Policy</Link>
                        <Link href="/" className="text-slate-500 hover:text-white transition text-sm">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
