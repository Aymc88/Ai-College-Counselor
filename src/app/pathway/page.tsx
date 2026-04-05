'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Map, GraduationCap, TrendingUp, Lightbulb, Users, Award, BarChart3, Home, CheckCircle } from 'lucide-react'
import Link from 'next/link'

type AbilityScore = {
    category: string
    score: number
    description: string
    value?: string
    fullMark?: number // Added fullMark type
}

const initialAbilities: AbilityScore[] = [
    { category: 'Academic', score: 85, fullMark: 100, description: 'Strong analytical and problem-solving skills' },
    { category: 'Interest', score: 85, fullMark: 100, description: 'Passion and curiosity for the field' },
    { category: 'MBTI', score: 0, fullMark: 100, value: 'INTJ', description: 'Personality alignment (Select MBTI)' },
    { category: 'Creative', score: 75, fullMark: 100, description: 'Innovation and design thinking' },
    { category: 'Social', score: 90, fullMark: 100, description: 'Communication and empathy' },
    { category: 'Leadership', score: 80, fullMark: 100, description: 'Team management and vision' },
    { category: 'Technical', score: 60, fullMark: 100, description: 'Analytical and coding skills' }
]

// Assuming Pathway type is implicitly defined or will be added later
const pathways = [
    {
        title: 'Computer Science & Engineering',
        match: 95,
        reasons: [
            'Your technical score (90%) aligns perfectly with CS/Engineering requirements',
            'High academic performance (85%) indicates strong STEM foundation',
            'Leadership skills (75%) valuable for tech team management'
        ],
        careers: ['Software Engineer', 'Data Scientist', 'AI/ML Specialist', 'Tech Lead'],
        schools: ['MIT', 'Stanford', 'Carnegie Mellon', 'UC Berkeley']
    },
    {
        title: 'Business & Technology Management',
        match: 82,
        reasons: [
            'Combination of technical (90%) and interest (65%) scores',
            'Leadership skills (75%) essential for management roles',
            'Balanced profile suits interdisciplinary programs'
        ],
        careers: ['Product Manager', 'Tech Consultant', 'Startup Founder', 'Business Analyst'],
        schools: ['UPenn Wharton', 'Northwestern Kellogg', 'NYU Stern', 'USC Marshall']
    }
]

const mbtiProfiles: Record<string, { Creative: number, Social: number, Leadership: number, Technical: number }> = {
    'INTJ': { Creative: 80, Social: 40, Leadership: 75, Technical: 90 },
    'INTP': { Creative: 85, Social: 35, Leadership: 50, Technical: 95 },
    'ENTJ': { Creative: 75, Social: 70, Leadership: 95, Technical: 80 },
    'ENTP': { Creative: 90, Social: 75, Leadership: 70, Technical: 85 },
    'INFJ': { Creative: 85, Social: 80, Leadership: 70, Technical: 50 },
    'INFP': { Creative: 90, Social: 75, Leadership: 40, Technical: 55 },
    'ENFJ': { Creative: 75, Social: 95, Leadership: 90, Technical: 50 },
    'ENFP': { Creative: 95, Social: 90, Leadership: 75, Technical: 50 },
    'ISTJ': { Creative: 40, Social: 45, Leadership: 80, Technical: 85 },
    'ISFJ': { Creative: 50, Social: 85, Leadership: 60, Technical: 45 },
    'ESTJ': { Creative: 45, Social: 70, Leadership: 90, Technical: 70 },
    'ESFJ': { Creative: 55, Social: 95, Leadership: 80, Technical: 40 },
    'ISTP': { Creative: 70, Social: 40, Leadership: 50, Technical: 95 },
    'ISFP': { Creative: 85, Social: 60, Leadership: 40, Technical: 60 },
    'ESTP': { Creative: 65, Social: 80, Leadership: 75, Technical: 80 },
    'ESFP': { Creative: 80, Social: 95, Leadership: 60, Technical: 40 }
}

export default function PathwayPage() {
    const [abilities, setAbilities] = useState<AbilityScore[]>(initialAbilities)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [gpa, setGpa] = useState<number>(3.4)
    const [interests, setInterests] = useState('')

    const handleGpaChange = (newGpa: string) => {
        const gpaValue = Math.min(4.0, Math.max(0, Number(newGpa) || 0))
        setGpa(gpaValue)

        // Calculate Academic score: (GPA / 4.0) * 100
        const academicScore = Math.round((gpaValue / 4.0) * 100)

        const newAbilities = [...abilities]
        const academicIndex = newAbilities.findIndex(a => a.category === 'Academic')
        if (academicIndex !== -1) {
            newAbilities[academicIndex] = { ...newAbilities[academicIndex], score: academicScore }
            setAbilities(newAbilities)
        }
    }

    const handleScoreChange = (index: number, newScore: string) => {
        const score = Math.min(100, Math.max(0, Number(newScore) || 0))
        const newAbilities = [...abilities]
        newAbilities[index] = { ...newAbilities[index], score }
        setAbilities(newAbilities)
    }

    const handleMbtiChange = (index: number, newValue: string) => {
        const newAbilities = [...abilities]
        newAbilities[index] = { ...newAbilities[index], value: newValue }

        // Update dependent scores based on MBTI
        const profile = mbtiProfiles[newValue]
        if (profile) {
            newAbilities.forEach((ability, i) => {
                if (ability.category === 'Creative') newAbilities[i] = { ...ability, score: profile.Creative }
                if (ability.category === 'Social') newAbilities[i] = { ...ability, score: profile.Social }
                if (ability.category === 'Leadership') newAbilities[i] = { ...ability, score: profile.Leadership }
                if (ability.category === 'Technical') newAbilities[i] = { ...ability, score: profile.Technical }
            })
        }

        setAbilities(newAbilities)
    }

    // Generate radar chart points
    const generatePolygonPoints = () => {
        const chartAbilities = abilities.filter(a => a.category !== 'MBTI')
        const angleStep = (Math.PI * 2) / chartAbilities.length
        const centerX = 225
        const centerY = 225
        const maxRadius = 180

        return chartAbilities.map((ability, i) => {
            const angle = angleStep * i - Math.PI / 2
            const radius = (ability.score / 100) * maxRadius
            const x = centerX + radius * Math.cos(angle)
            const y = centerY + radius * Math.sin(angle)
            return `${x},${y}`
        }).join(' ')
    }

    const generateLabelPoints = () => {
        const chartAbilities = abilities.filter(a => a.category !== 'MBTI')
        const angleStep = (Math.PI * 2) / chartAbilities.length
        const centerX = 225
        const centerY = 225
        const labelRadius = 210

        return chartAbilities.map((ability, i) => {
            const angle = angleStep * i - Math.PI / 2
            const x = centerX + labelRadius * Math.cos(angle)
            const y = centerY + labelRadius * Math.sin(angle)
            return { x, y, label: ability.category, score: ability.score }
        })
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 mb-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Map className="w-10 h-10 text-green-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900 font-bold">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarship Agent</Link>
                        <Link href="/internship" className="text-slate-600 hover:text-slate-900">Internship Agent</Link>
                        <Link href="/competition" className="text-slate-600 hover:text-slate-900">Competition Agent</Link>
                        <Link href="/club" className="text-slate-600 hover:text-slate-900">Club Agent</Link>
                        <Link href="/financial-aid" className="text-slate-600 hover:text-slate-900">Financial Aid Agent</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Career Path Agent
                    </h1>
                    <p className="text-slate-600">Personalized recommendations based on your abilities and interests</p>
                </div>

                {/* Analysis Status & Scoring */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                    {abilities.map((item, index) => (
                        <div key={item.category} className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col space-y-2 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-700 truncate" title={item.category}>{item.category}</span>
                                <CheckCircle className="w-3 h-3 text-green-500" />
                            </div>
                            {item.category === 'MBTI' ? (
                                <select
                                    value={item.value}
                                    onChange={(e) => handleMbtiChange(index, e.target.value)}
                                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                                >
                                    {['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'].map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            ) : item.category === 'Academic' ? (
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs text-slate-500">GPA:</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="4.0"
                                            step="0.01"
                                            value={gpa}
                                            onChange={(e) => handleGpaChange(e.target.value)}
                                            className="w-16 px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-right"
                                        />
                                    </div>
                                    <div className="text-xs text-right text-green-600 font-bold">
                                        Score: {item.score}%
                                    </div>
                                </div>
                            ) : item.category === 'Interest' ? (
                                <div className="flex flex-col space-y-1">
                                    <textarea
                                        value={interests}
                                        onChange={(e) => setInterests(e.target.value)}
                                        placeholder="e.g., AI, robotics, music, entrepreneurship..."
                                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                                        rows={2}
                                    />
                                    <div className="text-xs text-right text-amber-600 font-bold">
                                        Score: {item.score}%
                                    </div>
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={item.score}
                                    onChange={(e) => handleScoreChange(index, e.target.value)}
                                    readOnly={['Creative', 'Social', 'Leadership', 'Technical'].includes(item.category)}
                                    className={`w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 ${['Creative', 'Social', 'Leadership', 'Technical'].includes(item.category)
                                        ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                                        : ''
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Radar Chart Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ability Hexagon</CardTitle>
                            <CardDescription>Your strengths across 6 key dimensions</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center pt-12 pb-12">
                            <svg width="450" height="450" viewBox="0 0 450 450">
                                {/* Background circles */}
                                {[20, 40, 60, 80, 100].map((percent) => {
                                    const radius = (percent / 100) * 180
                                    const angleStep = (Math.PI * 2) / 6
                                    const points = Array.from({ length: 6 }, (_, i) => {
                                        const angle = angleStep * i - Math.PI / 2
                                        const x = 225 + radius * Math.cos(angle)
                                        const y = 225 + radius * Math.sin(angle)
                                        return `${x},${y}`
                                    }).join(' ')

                                    return (
                                        <polygon
                                            key={percent}
                                            points={points}
                                            fill="none"
                                            stroke="#e2e8f0"
                                            strokeWidth="1"
                                        />
                                    )
                                })}

                                {/* Axis lines */}
                                {abilities.filter(a => a.category !== 'MBTI').map((_, i) => {
                                    const angleStep = (Math.PI * 2) / 6
                                    const angle = angleStep * i - Math.PI / 2
                                    const x = 225 + 180 * Math.cos(angle)
                                    const y = 225 + 180 * Math.sin(angle)
                                    return (
                                        <line
                                            key={i}
                                            x1="225"
                                            y1="225"
                                            x2={x}
                                            y2={y}
                                            stroke="#cbd5e1"
                                            strokeWidth="1"
                                        />
                                    )
                                })}

                                {/* Data polygon */}
                                <polygon
                                    points={generatePolygonPoints()}
                                    fill="rgba(34, 197, 94, 0.3)"
                                    stroke="#22c55e"
                                    strokeWidth="2"
                                />

                                {/* Data points */}
                                {generateLabelPoints().map((point, i) => {
                                    const angleStep = (Math.PI * 2) / 6
                                    const angle = angleStep * i - Math.PI / 2
                                    const radius = (abilities[i].score / 100) * 180
                                    const x = 225 + radius * Math.cos(angle)
                                    const y = 225 + radius * Math.sin(angle)
                                    return (
                                        <circle
                                            key={i}
                                            cx={x}
                                            cy={y}
                                            r="4"
                                            fill="#22c55e"
                                        />
                                    )
                                })}

                                {/* Labels */}
                                {generateLabelPoints().map((point, i) => (
                                    <g key={i}>
                                        <text
                                            x={point.x}
                                            y={point.y - 8}
                                            textAnchor="middle"
                                            className="text-xs font-semibold fill-slate-700"
                                        >
                                            {point.label}
                                        </text>
                                        <text
                                            x={point.x}
                                            y={point.y + 8}
                                            textAnchor="middle"
                                            className="text-xs font-bold fill-green-600"
                                        >
                                            {point.score}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </CardContent>
                    </Card>

                    {/* Ability Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Score Breakdown</CardTitle>
                            <CardDescription>Detailed analysis of each dimension</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {abilities.map((ability, i) => {
                                if (ability.category === 'MBTI') {
                                    return (
                                        <div key={i} className="space-y-2 pt-4 mt-4 border-t border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-green-600">{ability.value}</span>
                                            </div>
                                            <p className="text-xs text-slate-500">{ability.description}</p>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-slate-700">{ability.category}</span>
                                            <span className="text-sm font-bold text-green-600">{ability.score}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-600 transition-all duration-500"
                                                style={{ width: `${ability.score}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-slate-500">{ability.description}</p>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>
                </div>

                {/* Recommended Pathways */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                        <Lightbulb className="w-6 h-6 mr-2 text-amber-500" />
                        Recommended Pathways
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {pathways.map((pathway, i) => (
                            <Card key={i} className="hover:shadow-lg transition">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl">{pathway.title}</CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-green-100 px-3 py-1 rounded-full">
                                                <span className="text-sm font-bold text-green-700">{pathway.match}% Match</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center">
                                            <Award className="w-4 h-4 mr-1" /> Why This Path?
                                        </h4>
                                        <ul className="space-y-2">
                                            {pathway.reasons.map((reason, j) => (
                                                <li key={j} className="text-sm text-slate-600 flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    {reason}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-700 mb-2">Potential Careers</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {pathway.careers.map((career, j) => (
                                                    <span key={j} className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">
                                                        {career}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold text-slate-700 mb-2">Top Schools</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {pathway.schools.map((school, j) => (
                                                    <span key={j} className="text-xs bg-green-50 px-2 py-1 rounded-full text-green-700">
                                                        {school}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
