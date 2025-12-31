'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, GraduationCap, BookOpen, MapPin, Home } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        gpa: '',
        sat: '',
        act: '',
        major: '',
        location: '',
        tuition: ''
    })

    const handleNext = () => setStep(step + 1)
    const handleBack = () => setStep(step - 1)

    const handleSubmit = () => {
        localStorage.setItem('studentProfile', JSON.stringify(formData))
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 mb-8">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <GraduationCap className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold text-slate-900">AI College Counselor</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-slate-600 hover:text-slate-900">Home</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay</Link>
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarships</Link>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2 text-sm font-medium text-slate-500">
                            <span>Academic Stats</span>
                            <span>Interests</span>
                            <span>Preferences</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
                                style={{ width: `${(step / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step 1: Academic Stats */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="text-center mb-6">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Let's start with your academics</h2>
                                <p className="text-slate-500">This helps us find schools where you'll thrive.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">GPA (4.0 Scale)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="3.8"
                                        value={formData.gpa}
                                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">SAT Score (Optional)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="1400"
                                        value={formData.sat}
                                        onChange={(e) => setFormData({ ...formData, sat: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Interests */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="text-center mb-6">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">What do you want to study?</h2>
                                <p className="text-slate-500">It's okay if you're not 100% sure yet.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Intended Major</label>
                                <select
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    value={formData.major}
                                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                >
                                    <option value="">Select a major...</option>
                                    <option value="cs">Computer Science</option>
                                    <option value="eng">Engineering</option>
                                    <option value="bio">Biology / Pre-med</option>
                                    <option value="bus">Business / Economics</option>
                                    <option value="art">Arts & Humanities</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Preferences */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="text-center mb-6">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-purple-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Where do you want to go?</h2>
                                <p className="text-slate-500">Help us narrow down the location.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Preferred Region</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="e.g. Northeast, California, Texas"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Max Annual Tuition ($)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="30000"
                                        value={formData.tuition}
                                        onChange={(e) => setFormData({ ...formData, tuition: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={step === 1}
                            className={step === 1 ? 'invisible' : ''}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>

                        <Button
                            onClick={step === 3 ? handleSubmit : handleNext}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {step === 3 ? 'See My Matches' : 'Next Step'}
                            {step !== 3 && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>

                    {/* Back to Home Button */}
                    <div className="mt-6 text-center">
                        <Link href="/">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Home className="w-4 h-4 mr-2" /> Home
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
