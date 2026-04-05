'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Calendar, Home, Trophy, Dumbbell, Lightbulb, User } from 'lucide-react'
import Link from 'next/link'

type StudentProfile = 'all-as' | 'all-sports' | 'all-extracurriculars' | 'user'

type MilestoneData = {
    year: number
    title: string
    category: string
}

// Sample Student Data
const allAsData: MilestoneData[] = [
    { year: 2011, title: 'Regional "Tiny Artist" Crayola Contest Winner', category: 'Arts' },
    { year: 2012, title: 'Public Library "Super Reader" Summer Champion', category: 'Reading' },
    { year: 2013, title: 'Mensa Honor Society Admission', category: 'Intelligence' },
    { year: 2014, title: 'National Handwriting Contest State Champion', category: 'Academic' },
    { year: 2015, title: 'Royal Conservatory of Music Level 5 Gold Medal', category: 'Music' },
    { year: 2016, title: 'Math Kangaroo International Competition Gold Medal', category: 'Math' },
    { year: 2017, title: 'Davidson Young Scholar Qualification', category: 'Academic' },
    { year: 2018, title: 'Johns Hopkins CTY Grand Honors Award', category: 'Gifted' },
    { year: 2019, title: 'Broadcom MASTERS Top Award (STEM)', category: 'STEM' },
    { year: 2020, title: 'Scripps National Spelling Bee Co-Champion', category: 'Academic' },
    { year: 2020, title: 'MATHCOUNTS National Champion', category: 'Math' },
    { year: 2021, title: 'American Mathematics Competitions 10 Perfect Score', category: 'Math' },
    { year: 2021, title: 'VEX Robotics World Championship Excellence Award', category: 'Robotics' },
    { year: 2022, title: 'Regeneron ISEF First Award', category: 'Science' },
    { year: 2022, title: 'Carnegie Hall Piano Competition Winner', category: 'Music' },
    { year: 2023, title: 'Research Science Institute Scholar at MIT', category: 'Research' },
    { year: 2023, title: 'USACO Platinum Division', category: 'CS' },
    { year: 2023, title: 'Scholastic Art & Writing Awards National Gold', category: 'Arts' },
    { year: 2024, title: 'U.S. Presidential Scholar', category: 'National' },
    { year: 2024, title: 'International Mathematical Olympiad Gold Medal', category: 'Math' },
    { year: 2024, title: 'Regeneron STS Top 10 Finalist', category: 'Science' },
    { year: 2024, title: 'Valedictorian, Class of 2024', category: 'Academic' },
    { year: 2025, title: 'ACM ICPC World Finals Gold Medal', category: 'CS' },
    { year: 2025, title: 'Harvard Crimson Editor-in-Chief', category: 'Leadership' },
    { year: 2026, title: 'William Lowell Putnam Fellow (Top 5)', category: 'Math' },
    { year: 2026, title: 'Barry Goldwater Scholarship Recipient', category: 'Research' }
]

const allSportsData: MilestoneData[] = [
    { year: 2012, title: 'Strider Cup World Championship Winner', category: 'Cycling' },
    { year: 2013, title: 'Spartan Kids Race Winner', category: 'Fitness' },
    { year: 2014, title: 'Kindergarten Field Day All-Around Champion', category: 'Athletics' },
    { year: 2015, title: 'Junior Black Belt in Taekwondo', category: 'Martial Arts' },
    { year: 2016, title: 'Local YMCA Iron Kid Triathlon First Place', category: 'Triathlon' },
    { year: 2017, title: 'MLB Pitch, Hit & Run Sectional Champion', category: 'Baseball' },
    { year: 2018, title: 'Regional Youth Soccer League Golden Boot', category: 'Soccer' },
    { year: 2018, title: 'Hershey Track and Field North American Finalist', category: 'Track' },
    { year: 2019, title: 'Cal Ripken World Series Home Run Derby Winner', category: 'Baseball' },
    { year: 2020, title: 'Pop Warner Super Bowl National Champion', category: 'Football' },
    { year: 2020, title: 'National Physical Fitness Presidential Champion', category: 'Fitness' },
    { year: 2021, title: 'AAU National Basketball Championship MVP', category: 'Basketball' },
    { year: 2021, title: 'Junior Olympics Gold Medalist (Long Jump)', category: 'Track' },
    { year: 2022, title: 'Varsity Starter & Rookie of the Year', category: 'Football' },
    { year: 2022, title: 'State Weightlifting Champion', category: 'Weightlifting' },
    { year: 2023, title: 'Mr. Football State Winner', category: 'Football' },
    { year: 2023, title: 'State Track Champion (100m, 200m, 4x100m)', category: 'Track' },
    { year: 2024, title: 'Gatorade National Male Athlete of the Year', category: 'Athletics' },
    { year: 2024, title: '5-Star Recruit Ranked #1 Nationally', category: 'Football' },
    { year: 2024, title: 'State Championship Undefeated Season', category: 'Football' },
    { year: 2024, title: 'NCAA Track & Field 100m Dash Champion', category: 'Track' },
    { year: 2025, title: 'Heisman Trophy Winner', category: 'Football' },
    { year: 2025, title: 'CFP National Championship Game MVP', category: 'Football' },
    { year: 2026, title: 'NFL Draft Top 3 Overall Pick Projection', category: 'Professional' }
]

const allExtracurricularsData: MilestoneData[] = [
    { year: 2011, title: 'Most Persuasive Speaker at Daycare Show-and-Tell', category: 'Speaking' },
    { year: 2012, title: 'Donated Entire Piggy Bank to Charity Lemonade Stand', category: 'Service' },
    { year: 2012, title: 'Organized Neighborhood Recycling Drive', category: 'Environment' },
    { year: 2013, title: 'Playground Peacekeeper Foundation', category: 'Leadership' },
    { year: 2014, title: 'Youngest Ever Rotary Club Paul Harris Fellow', category: 'Service' },
    { year: 2015, title: 'City Mayor\'s Special Advisor on Youth Happiness', category: 'Policy' },
    { year: 2016, title: 'Letter to G7 Leaders (Policy Change on Plastic)', category: 'Advocacy' },
    { year: 2017, title: 'Founder, Community Garden Network (500 Cities)', category: 'Environment' },
    { year: 2018, title: 'National Petition Organizer (10M Signatures)', category: 'Activism' },
    { year: 2019, title: 'Licensed Ocean Cleaner Patent to 50 Governments', category: 'Innovation' },
    { year: 2019, title: 'Recognized by the Pope for Humanitarian Efforts', category: 'Service' },
    { year: 2020, title: 'Invited to White House Youth Policy Advising', category: 'Policy' },
    { year: 2021, title: 'Founder, Kids Against Hunger International', category: 'Service' },
    { year: 2021, title: 'CNN Hero of the Year', category: 'Recognition' },
    { year: 2022, title: 'Launched WaterIsLife App (Saved 10M Lives)', category: 'Technology' },
    { year: 2022, title: 'UNICEF Goodwill Ambassador (Youngest Ever)', category: 'Service' },
    { year: 2023, title: 'Founder, Code for All (100M kids taught)', category: 'Education' },
    { year: 2023, title: 'Civilian Medal of Freedom Recipient', category: 'National' },
    { year: 2023, title: 'TED Talk: The Age of Action (Most Viewed)', category: 'Speaking' },
    { year: 2024, title: 'World Economic Forum Main Stage Speaker', category: 'Leadership' },
    { year: 2024, title: 'Published Best-Selling Manifesto (100 languages)', category: 'Writing' },
    { year: 2024, title: 'Instagram/TikTok Most Followed (500M)', category: 'Influence' },
    { year: 2025, title: 'Nobel Peace Prize Laureate (Youngest)', category: 'Global' },
    { year: 2025, title: 'UN General Assembly Keynote (193 Heads)', category: 'Diplomacy' },
    { year: 2026, title: 'TIME Magazine Person of the Century', category: 'Recognition' }
]

export default function ProgressPage() {
    const [selectedProfile, setSelectedProfile] = useState<StudentProfile>('all-as')
    const [userMilestones, setUserMilestones] = useState<MilestoneData[]>([])
    const [resumeText, setResumeText] = useState('')
    const [showComparison, setShowComparison] = useState(false)

    const handleAnalyzeResume = () => {
        const lines = resumeText.split('\n')
        const newMilestones: MilestoneData[] = []

        lines.forEach(line => {
            const yearMatch = line.match(/\b(19|20)\d{2}\b/)
            if (yearMatch) {
                const year = parseInt(yearMatch[0])
                const title = line.replace(yearMatch[0], '').replace(/[-–:]/, '').trim()
                if (title.length > 5) {
                    newMilestones.push({
                        year: year,
                        title: title,
                        category: 'Resume'
                    })
                }
            }
        })

        setUserMilestones(newMilestones.sort((a, b) => a.year - b.year))
        setShowComparison(true)
        setResumeText('')
    }

    const getProfileData = (profile: StudentProfile): MilestoneData[] => {
        switch (profile) {
            case 'all-as': return allAsData
            case 'all-sports': return allSportsData
            case 'all-extracurriculars': return allExtracurricularsData
            case 'user': return userMilestones
            default: return []
        }
    }

    const prepareChartData = (data: MilestoneData[]) => {
        const yearCounts: Record<number, number> = {}
        data.forEach(m => {
            yearCounts[m.year] = (yearCounts[m.year] || 0) + 1
        })

        const years = Object.keys(yearCounts).map(Number).sort((a, b) => a - b)
        let cumulative = 0
        return years.map(year => {
            cumulative += yearCounts[year]
            return { year, count: cumulative }
        })
    }

    const renderCombinedChart = (sampleData: MilestoneData[], userDataParam: MilestoneData[], sampleColor: string) => {
        const sampleChartData = prepareChartData(sampleData)
        const userChartData = userDataParam.length > 0 ? prepareChartData(userDataParam) : []

        if (sampleChartData.length === 0) return null

        // Find max count across both datasets
        const maxSampleCount = sampleChartData.length > 0 ? sampleChartData[sampleChartData.length - 1].count : 0
        const maxUserCount = userChartData.length > 0 ? userChartData[userChartData.length - 1].count : 0
        const maxCount = Math.max(maxSampleCount, maxUserCount)

        // Get all years from both datasets
        const allYears = new Set<number>()
        sampleChartData.forEach(d => allYears.add(d.year))
        userChartData.forEach(d => allYears.add(d.year))
        const sortedYears = Array.from(allYears).sort((a, b) => a - b)

        const chartHeight = 250
        const chartWidth = 900
        const yearToX = (year: number) => {
            const yearIndex = sortedYears.indexOf(year)
            const xStep = sortedYears.length > 1 ? chartWidth / (sortedYears.length - 1) : chartWidth / 2
            return 45 + yearIndex * xStep
        }

        const sampleStrokeColor = showComparison && userChartData.length > 0 ? '#93c5fd' : sampleColor
        const userStrokeColor = '#9333ea'

        return (
            <svg width={chartWidth + 60} height={chartHeight + 80} className="overflow-visible">
                {/* Y-axis labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                    const value = Math.round(maxCount * ratio)
                    const y = chartHeight - (value / maxCount) * chartHeight
                    return (
                        <g key={ratio}>
                            <text x="35" y={y + 5} className="text-xs fill-slate-500" textAnchor="end">
                                {value}
                            </text>
                            <line
                                x1="45"
                                y1={y}
                                x2={chartWidth + 45}
                                y2={y}
                                stroke="#e2e8f0"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                        </g>
                    )
                })}

                {/* X-axis labels */}
                {sortedYears.map((year, i) => {
                    const x = yearToX(year)
                    const showLabel = i % Math.max(1, Math.floor(sortedYears.length / 12)) === 0
                    return showLabel ? (
                        <text key={i} x={x} y={chartHeight + 25} className="text-xs fill-slate-600" textAnchor="middle">
                            {year}
                        </text>
                    ) : null
                })}

                {/* Sample Student Trend line */}
                <polyline
                    points={sampleChartData.map((data) => {
                        const x = yearToX(data.year)
                        const y = chartHeight - (data.count / maxCount) * chartHeight
                        return `${x},${y}`
                    }).join(' ')}
                    fill="none"
                    stroke={sampleStrokeColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Sample Student Data points */}
                {sampleChartData.map((data, i) => {
                    const x = yearToX(data.year)
                    const y = chartHeight - (data.count / maxCount) * chartHeight
                    return (
                        <g key={`sample-${i}`} className="group">
                            <circle
                                cx={x}
                                cy={y}
                                r="5"
                                fill={sampleStrokeColor}
                                stroke="white"
                                strokeWidth="2"
                            />
                            <text
                                x={x}
                                y={y - 15}
                                className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ fill: sampleStrokeColor }}
                                textAnchor="middle"
                            >
                                {data.count}
                            </text>
                        </g>
                    )
                })}

                {/* User Trend line (if comparing) */}
                {userChartData.length > 0 && (
                    <>
                        <polyline
                            points={userChartData.map((data) => {
                                const x = yearToX(data.year)
                                const y = chartHeight - (data.count / maxCount) * chartHeight
                                return `${x},${y}`
                            }).join(' ')}
                            fill="none"
                            stroke={userStrokeColor}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* User Data points */}
                        {userChartData.map((data, i) => {
                            const x = yearToX(data.year)
                            const y = chartHeight - (data.count / maxCount) * chartHeight
                            return (
                                <g key={`user-${i}`} className="group">
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="5"
                                        fill={userStrokeColor}
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <text
                                        x={x}
                                        y={y - 15}
                                        className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ fill: userStrokeColor }}
                                        textAnchor="middle"
                                    >
                                        {data.count}
                                    </text>
                                </g>
                            )
                        })}
                    </>
                )}
            </svg>
        )
    }

    const currentProfileData = getProfileData(selectedProfile)

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 mb-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <TrendingUp className="w-10 h-10 text-purple-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900 font-bold">Progress Agent</Link>
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Progress Agent</h1>
                    <p className="text-slate-600">Compare your achievements with top student profiles</p>
                </div>

                {/* Sample Student Buttons */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <Button
                        onClick={() => setSelectedProfile('all-as')}
                        className={`${selectedProfile === 'all-as' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 hover:bg-slate-400'} text-white px-6 py-6 text-lg font-bold`}
                    >
                        <Trophy className="w-5 h-5 mr-2" />
                        Academic Excellence
                    </Button>
                    <Button
                        onClick={() => setSelectedProfile('all-sports')}
                        className={`${selectedProfile === 'all-sports' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-slate-300 hover:bg-slate-400'} text-white px-6 py-6 text-lg font-bold`}
                    >
                        <Dumbbell className="w-5 h-5 mr-2" />
                        Athletic Star
                    </Button>
                    <Button
                        onClick={() => setSelectedProfile('all-extracurriculars')}
                        className={`${selectedProfile === 'all-extracurriculars' ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-300 hover:bg-slate-400'} text-white px-6 py-6 text-lg font-bold`}
                    >
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Global Leader
                    </Button>
                </div>

                {/* Progress Chart for Selected Profile */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                            {selectedProfile === 'all-as' && 'Academic Excellence - Achievement Timeline'}
                            {selectedProfile === 'all-sports' && 'Athletic Star - Achievement Timeline'}
                            {selectedProfile === 'all-extracurriculars' && 'Global Leader - Achievement Timeline'}
                        </CardTitle>
                        <CardDescription>Cumulative achievements from childhood to college</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            {renderCombinedChart(
                                currentProfileData,
                                userMilestones,
                                selectedProfile === 'all-as' ? '#2563eb' :
                                    selectedProfile === 'all-sports' ? '#ea580c' : '#16a34a'
                            )}
                        </div>
                        {showComparison && userMilestones.length > 0 && (
                            <p className="text-center text-sm text-slate-600 mt-4">
                                <span className="inline-block w-4 h-4 bg-blue-400 rounded-full mr-2"></span>
                                Sample Student (light blue) vs
                                <span className="inline-block w-4 h-4 bg-purple-600 rounded-full mx-2"></span>
                                Your Progress (purple)
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Milestone Details */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Detailed Milestone List</CardTitle>
                        <CardDescription>
                            {selectedProfile === 'all-as' && 'From childhood prodigy to university scholar'}
                            {selectedProfile === 'all-sports' && 'From youth athletics to professional prospect'}
                            {selectedProfile === 'all-extracurriculars' && 'From local impact to global influence'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                            {currentProfileData.map((milestone, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-start justify-between mb-1">
                                        <span className="text-xs font-bold text-purple-600">{milestone.year}</span>
                                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                            {milestone.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-800 font-medium">{milestone.title}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* User Resume Input */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="w-5 h-5 mr-2 text-purple-600" />
                            Add Your Resume
                        </CardTitle>
                        <CardDescription>
                            Compare your achievements with the sample students above
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <textarea
                                className="w-full h-40 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                                placeholder="Paste your resume here (must be separated by line/enters, e.g., '2020: Science Fair Winner')..."
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                            />
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleAnalyzeResume}
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                    disabled={!resumeText.trim()}
                                >
                                    Analyze &amp; Compare
                                </Button>
                                {showComparison && (
                                    <Button
                                        onClick={() => {
                                            setShowComparison(false)
                                            setUserMilestones([])
                                        }}
                                        className="bg-slate-600 hover:bg-slate-700 text-white"
                                    >
                                        Clear Comparison
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
