'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, GraduationCap, MapPin, DollarSign, TrendingUp, Target, Zap, Award, Home } from 'lucide-react'
import Link from 'next/link'

type University = {
    id: number
    name: string
    city: string
    state: string
    admission_rate: number | null
    in_state_tuition: number | null
    out_of_state_tuition: number | null
    median_earnings: number | null
}

type MatchResult = {
    category: string
    university: University
    match_score: number
}

export default function DashboardPage() {
    const [matches, setMatches] = useState<MatchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [gpa, setGpa] = useState(3.8)
    const [sat, setSat] = useState(1450)
    const [major, setMajor] = useState('Computer Science')
    const [state, setState] = useState('All')
    const [maxTuition, setMaxTuition] = useState(50000)
    const [schoolType, setSchoolType] = useState('All')


    const fetchMatches = async () => {
        setLoading(true)
        setHasSearched(true)
        try {
            // For demo purposes, we'll use hardcoded Ivy & UC schools
            // In a real app, this would come from the backend with a specific query
            const ivyAndUcSchools: MatchResult[] = [
                {
                    category: 'Safety', // Repurposed as Ivy/UC for this view
                    match_score: 95,
                    university: {
                        id: 101, name: "Harvard University", city: "Cambridge", state: "MA",
                        admission_rate: 0.034, in_state_tuition: 57261, out_of_state_tuition: 57261, median_earnings: 89700
                    }
                },
                {
                    category: 'Safety',
                    match_score: 92,
                    university: {
                        id: 102, name: "University of California, Berkeley", city: "Berkeley", state: "CA",
                        admission_rate: 0.114, in_state_tuition: 14226, out_of_state_tuition: 44008, median_earnings: 80000
                    }
                },
                {
                    category: 'Safety',
                    match_score: 90,
                    university: {
                        id: 103, name: "Stanford University", city: "Stanford", state: "CA",
                        admission_rate: 0.039, in_state_tuition: 56169, out_of_state_tuition: 56169, median_earnings: 94000
                    }
                },
                {
                    category: 'Safety',
                    match_score: 88,
                    university: {
                        id: 104, name: "UCLA", city: "Los Angeles", state: "CA",
                        admission_rate: 0.086, in_state_tuition: 13258, out_of_state_tuition: 43012, median_earnings: 75000
                    }
                }
            ]

            const response = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gpa: Number(gpa),
                    sat_score: Number(sat),
                    act_score: null,
                    intended_major: major,
                    state: state === 'All' ? null : state,
                    max_tuition: Number(maxTuition),
                    school_type: schoolType === 'All' ? null : schoolType
                })
            })

            // Check if API exists, if not use only Ivy/UC schools
            if (!response.ok) {
                console.warn('Match API not available, showing Ivy/UC schools only')
                setMatches(ivyAndUcSchools)
                return
            }

            const data = await response.json()

            // Filter out original Safety schools and combine with Ivy/UC
            const otherMatches = data.filter((m: MatchResult) => m.category !== 'Safety')
            setMatches([...ivyAndUcSchools, ...otherMatches])
        } catch (error) {
            console.error("Error fetching matches:", error)
        } finally {
            setLoading(false)
        }
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Safety': return <Target className="w-5 h-5 text-cyan-600" />
            case 'Match': return <Zap className="w-5 h-5 text-cyan-500" />
            case 'Reach': return <Award className="w-5 h-5 text-cyan-700" />
            default: return null
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Safety': return 'bg-cyan-50 border-cyan-200'
            case 'Match': return 'bg-cyan-100 border-cyan-300'
            case 'Reach': return 'bg-cyan-200 border-cyan-400'
            default: return 'bg-slate-50'
        }
    }

    const groupedMatches = {
        Safety: matches.filter(m => m.category === 'Safety'),
        Match: matches.filter(m => m.category === 'Match'),
        Reach: matches.filter(m => m.category === 'Reach')
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <BarChart3 className="w-10 h-10 text-cyan-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 font-bold">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarship Agent</Link>
                        <Link href="/internship" className="text-slate-600 hover:text-slate-900">Internship Agent</Link>
                        <Link href="/competition" className="text-slate-600 hover:text-slate-900">Competition Agent</Link>
                        <Link href="/club" className="text-slate-600 hover:text-slate-900">Club Agent</Link>
                        <Link href="/financial-aid" className="text-slate-600 hover:text-slate-900">Financial Aid Agent</Link>
                    </div>
                </div>
            </nav >

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Match Agent</h1>
                    <p className="text-slate-600">Based on your profile: GPA {gpa} • SAT {sat} • {major} Major</p>
                </div>

                {/* Profile Inputs */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">GPA</label>
                            <input
                                type="number"
                                step="0.01"
                                value={gpa}
                                onChange={(e) => setGpa(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">SAT Score</label>
                            <input
                                type="number"
                                value={sat}
                                onChange={(e) => setSat(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Intended Major</label>
                            <select
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                            >
                                <option value="Computer Science">Computer Science</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Business">Business</option>
                                <option value="Psychology">Psychology</option>
                                <option value="Biology">Biology</option>
                                <option value="Economics">Economics</option>
                                <option value="Political Science">Political Science</option>
                                <option value="English">English</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="History">History</option>
                                <option value="Art & Design">Art & Design</option>
                                <option value="Nursing">Nursing</option>
                                <option value="Communications">Communications</option>
                            </select>
                        </div>
                        {/* Empty div for alignment in first row */}
                        <div className="hidden md:block"></div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mt-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                            >
                                <option value="All">All States</option>
                                <option value="CA">California</option>
                                <option value="NY">New York</option>
                                <option value="TX">Texas</option>
                                <option value="MA">Massachusetts</option>
                                <option value="IL">Illinois</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="FL">Florida</option>
                                <option value="OH">Ohio</option>
                                <option value="MI">Michigan</option>
                                <option value="NC">North Carolina</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Max Tuition ($)</label>
                            <input
                                type="number"
                                value={maxTuition}
                                onChange={(e) => setMaxTuition(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">School Type</label>
                            <select
                                value={schoolType}
                                onChange={(e) => setSchoolType(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                            >
                                <option value="All">All Types</option>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>
                        </div>
                        <Button onClick={fetchMatches} className="bg-cyan-600 hover:bg-cyan-700 text-white w-full">
                            Update Matches
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-slate-600">Analyzing 10,000+ universities...</p>
                    </div>
                ) : hasSearched ? (
                    <div className="space-y-8">
                        {/* Ivy League & UC Schools (formerly Safety) */}
                        <section>
                            <div className="flex items-center space-x-2 mb-4">
                                <Award className="w-6 h-6 text-cyan-600" />
                                <h2 className="text-2xl font-bold text-slate-900">Ivy League & UC Schools</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {groupedMatches.Safety.map((match) => (
                                    <Card key={match.university.id} className={getCategoryColor('Safety')}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{match.university.name}</CardTitle>
                                            <CardDescription className="flex items-center space-x-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{match.university.city}, {match.university.state}</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-slate-500">Admission Rate</p>
                                                    <p className="font-semibold text-slate-900">
                                                        {match.university.admission_rate ? `${(match.university.admission_rate * 100).toFixed(1)}%` : 'N/A'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Tuition (Out-of-State)</p>
                                                    <p className="font-semibold text-slate-900">
                                                        {match.university.out_of_state_tuition ? `$${match.university.out_of_state_tuition.toLocaleString()}` : 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-slate-500">Median Earnings (10 yrs)</p>
                                                    <p className="font-semibold text-slate-900">
                                                        {match.university.median_earnings ? `$${match.university.median_earnings.toLocaleString()}` : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        <p>Enter your profile details and click "Update Matches" to see your results.</p>
                    </div>
                )}

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div >
    )
}
