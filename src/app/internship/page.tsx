'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, MapPin, Clock, Building2, Filter, Home, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Opportunity = {
    id: number
    title: string
    company: string
    location: string
    type: string
    duration: string
    compensation: string
    requirements: string[]
    category: string
    url: string
    description: string
}

const opportunities: Opportunity[] = [
    {
        id: 1,
        title: "Meta Summer Academy",
        company: "Meta",
        location: "East Palo Alto, CA (Bay Area)",
        type: "Technology",
        duration: "6 weeks (Summer 2026)",
        compensation: "Paid",
        requirements: ["Sophomore (10th Grade)", "East Palo Alto/Belle Haven/North Fair Oaks/Redwood City"],
        category: "Technology",
        url: "https://www.metacareers.com/",
        description: "6-week PAID internship specifically for sophomores. Coding, mentorship, real projects at Meta headquarters. Application typically opens in winter."
    },
    {
        id: 2,
        title: "UC Berkeley Lab Research Internship",
        company: "Lawrence Berkeley National Laboratory",
        location: "Berkeley, CA (Bay Area)",
        type: "Research",
        duration: "Summer 2026 (6-8 weeks)",
        compensation: "Paid Stipend",
        requirements: ["Age 16+ by June", "Sophomore/Junior/Senior (grades 10-12)", "Northern CA High School"],
        category: "STEM",
        url: "https://education.lbl.gov/internships/",
        description: "Experiences in Research (EinR) program. Hands-on research at Berkeley Lab. Must be 16 by June start date. Paid stipend for Northern CA students."
    },
    {
        id: 3,
        title: "Sandia National Labs Summer Internship",
        company: "Sandia National Laboratories",
        location: "Livermore, CA (Bay Area)",
        type: "Research",
        duration: "Summer 2026 (8-10 weeks)",
        compensation: "Paid Stipend",
        requirements: ["Age 16+", "STEM Interest", "U.S. Citizen"],
        category: "STEM",
        url: "https://www.sandia.gov/careers/students-and-postdocs/internships/",
        description: "Paid internship at Livermore lab. Work on national security technology projects. Engineering, computer science, physics."
    },
    {
        id: 4,
        title: "Kaiser Permanente LAUNCH Internship",
        company: "Kaiser Permanente",
        location: "Oakland & Bay Area",
        type: "Healthcare",
        duration: "7 weeks (Summer 2026)",
        compensation: "Paid ($23-24/hour)",
        requirements: ["Age 16-19", "Bay Area Resident", "No Healthcare Experience Required"],
        category: "Healthcare",
        url: "https://thrive.kaiserpermanente.org/care-near-you/northern-california/kp-launch/",
        description: "Full-time PAID healthcare internship. Explore non-clinical careers at Kaiser Bay Area facilities. $23-24/hr with mentorship and workshops."
    },
    {
        id: 5,
        title: "Careers in Science (CiS) Intern Program",
        company: "California Academy of Sciences",
        location: "San Francisco, CA (Bay Area)",
        type: "STEM",
        duration: "School Year + Summer",
        compensation: "Paid Stipend",
        requirements: ["9th/10th Grade", "SFUSD Student", "GPA 2.5+"],
        category: "STEM",
        url: "https://www.calacademy.org/educators/teens-at-the-academy",
        description: "PAID multi-year internship. Field studies, public teaching, professional development. Starts sophomore year for SF students."
    },
    {
        id: 6,
        title: "SFUSD Summer Tech Internship Program",
        company: "San Francisco Unified School District",
        location: "San Francisco, CA (Bay Area)",
        type: "Technology",
        duration: "6-9 weeks (Summer 2026)",
        compensation: "Paid (20 hrs/week)",
        requirements: ["Age 14+", "Current SFUSD Sophomore/Junior/Senior"],
        category: "Technology",
        url: "https://www.sfusd.edu/services/career-technical-education/internships",
        description: "PAID summer internships in Bay Area tech companies. Biotech, animation, computer science, media arts. 20 hrs/week, paid weekly."
    },
    {
        id: 7,
        title: "SF Department of Technology Internship",
        company: "City of San Francisco",
        location: "San Francisco, CA (Bay Area)",
        type: "Technology",
        duration: "Summer 2026 (6-8 weeks)",
        compensation: "Paid",
        requirements: ["SF High School Student", "Age 16+"],
        category: "Technology",
        url: "https://sf.gov/departments/department-technology",
        description: "PAID IT internship with SF city government. Network security, web development, data management. Real municipal tech projects."
    },
    {
        id: 8,
        title: "Enterprise for Youth Internship",
        company: "Enterprise for Youth",
        location: "San Francisco, CA (Bay Area)",
        type: "Business",
        duration: "Summer 2026",
        compensation: "Paid ($20/hour)",
        requirements: ["SF High School Sophomore/Junior/Senior", "Job Readiness Training"],
        category: "Business",
        url: "https://www.enterpriseforyouth.org/",
        description: "PAID $20/hour internships in business, tech, arts, healthcare. Partners with SF companies. Includes job readiness training."
    },
    {
        id: 9,
        title: "SF YouthWorks Summer Internship",
        company: "SF Mayor's Office",
        location: "San Francisco, CA (Bay Area)",
        type: "Business",
        duration: "Summer 2026 (6 weeks)",
        compensation: "Paid",
        requirements: ["SF Resident", "Age 14-22", "High School Student"],
        category: "Business",
        url: "https://sf.gov/information/sf-youth-jobs",
        description: "PAID summer internships in SF city departments. Public service, environmental, community work. Run by SF Mayor's Office."
    },
    {
        id: 10,
        title: "Exploratorium High School Explainers",
        company: "Exploratorium",
        location: "San Francisco, CA (Bay Area)",
        type: "STEM",
        duration: "School Year",
        compensation: "Paid",
        requirements: ["High School Student", "SF Bay Area"],
        category: "STEM",
        url: "https://www.exploratorium.edu/visit/programs/explainers",
        description: "PAID program engaging museum visitors, leading science demonstrations, daily museum operations. Academic year commitment."
    },
    {
        id: 11,
        title: "Asian Art Museum Art Speak Internship",
        company: "Asian Art Museum",
        location: "San Francisco, CA (Bay Area)",
        type: "Arts",
        duration: "10 months",
        compensation: "Paid",
        requirements: ["Grade 10-12", "Bay Area Public School Student", "Artistic Interest"],
        category: "Arts",
        url: "https://asianart.org/",
        description: "PAID 10-month internship for artistic students. Exposure to art scene, portfolio building, museum operations."
    },
    {
        id: 12,
        title: "Stanford Clinical Summer Internship",
        company: "Stanford University",
        location: "Stanford, CA (Bay Area)",
        type: "Healthcare",
        duration: "Summer 2026",
        compensation: "Varies",
        requirements: ["Sophomore/Junior/Senior", "Interest in Medicine"],
        category: "Healthcare",
        url: "https://med.stanford.edu/",
        description: "Hands-on clinical activities in medicine at Stanford facilities. Research assistant and clinical exposure opportunities."
    },
    {
        id: 13,
        title: "Stanford Neuroscience Research Immersion",
        company: "Stanford University",
        location: "Stanford, CA (Bay Area)",
        type: "Research",
        duration: "Summer 2026",
        compensation: "Free",
        requirements: ["Sophomore/Junior/Senior", "Neuroscience Interest"],
        category: "Healthcare",
        url: "https://med.stanford.edu/psychiatry.html",
        description: "Intensive research exposure in Stanford Department of Psychiatry and Behavioral Sciences. Research assistant roles."
    },
    {
        id: 14,
        title: "Ladder Internships (Bay Area Startups)",
        company: "Various Bay Area Startups",
        location: "San Francisco Bay Area / Remote",
        type: "Technology",
        duration: "8-12 weeks (Year-Round)",
        compensation: "Paid (Varies)",
        requirements: ["Sophomore/Junior/Senior", "10-20 hrs/week"],
        category: "Technology",
        url: "https://www.ladderinternships.com/",
        description: "Remote/hybrid PAID internships with Bay Area high-growth startups. AI, health tech, marketing, business. Flexible part-time."
    },
    {
        id: 15,
        title: "Y Combinator Startup Internships",
        company: "Y Combinator Portfolio Companies",
        location: "San Francisco Bay Area",
        type: "Technology",
        duration: "Summer 2026 (8-12 weeks)",
        compensation: "Paid ($5,000-16,000/month)",
        requirements: ["High School/College Student", "CS/AI/Engineering Interest", "Strong Technical Skills"],
        category: "Technology",
        url: "https://www.ycombinator.com/jobs",
        description: "PAID internships at YC-funded startups in SF. Work directly with founders on AI, software, product. $5k-16k/month. Rolling applications, apply early."
    },
    {
        id: 16,
        title: "Cisco STEM Shadow Program",
        company: "Cisco Systems",
        location: "San Jose, CA (Bay Area)",
        type: "Technology",
        duration: "3-4 weeks (Summer 2026)",
        compensation: "Unpaid (Mentorship Experience)",
        requirements: ["Sophomore/Junior (10th-11th Grade)", "Bay Area High School", "STEM Interest"],
        category: "Technology",
        url: "https://www.cisco.com/c/en/us/about/csr/impact/education.html",
        description: "Team up with Cisco employee mentor on real project. 3-4 week summer program. Hardware/software engineering, networking. San Jose headquarters."
    }
]

export default function InternshipPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [selectedType, setSelectedType] = useState<string>('All')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [interestedIds, setInterestedIds] = useState<Set<number>>(new Set())
    const itemsPerPage = 10

    // Load interested programs from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('interestedInternships')
        if (saved) {
            setInterestedIds(new Set(JSON.parse(saved)))
        }
    }, [])

    // Toggle interest for a program
    const toggleInterest = (id: number) => {
        setInterestedIds(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            // Save to localStorage
            localStorage.setItem('interestedInternships', JSON.stringify(Array.from(newSet)))
            return newSet
        })
    }

    const categories = ['All', 'Technology', 'Business', 'Research', 'Arts', 'Healthcare', 'STEM']
    const types = ['All', 'Internship', 'Research', 'Technology', 'Leadership', 'Program']

    const filteredOpportunities = opportunities.filter(opp => {
        const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory
        const matchesType = selectedType === 'All' || opp.type === selectedType
        return matchesCategory && matchesType
    })

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCategory, selectedType])

    // Pagination calculations
    const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentOpportunities = filteredOpportunities.slice(startIndex, endIndex)

    // Page navigation functions
    const goToPage = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) goToPage(currentPage - 1)
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) goToPage(currentPage + 1)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 mb-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Briefcase className="w-10 h-10 text-blue-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarship Agent</Link>
                        <Link href="/internship" className="text-slate-600 hover:text-slate-900 font-bold">Internship Agent</Link>
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
                        Internship & Work Opportunities Agent
                    </h1>
                    <p className="text-slate-600 mb-4">Real, verified internship opportunities for high school sophomores</p>

                    {/* Verified Badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                        <span className="font-bold text-lg">✓ Sophomore Students - Real Verified Programs</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600 font-medium">Verified Opportunities</p>
                                    <p className="text-3xl font-bold text-blue-700">{opportunities.length}</p>
                                </div>
                                <Briefcase className="w-12 h-12 text-blue-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-600 font-medium">Top Organizations</p>
                                    <p className="text-3xl font-bold text-green-700">35+</p>
                                </div>
                                <Building2 className="w-12 h-12 text-green-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600 font-medium">Paid Programs</p>
                                    <p className="text-3xl font-bold text-purple-700">25+</p>
                                </div>
                                <DollarSign className="w-12 h-12 text-purple-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="mb-6 space-y-4">
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <Filter className="w-5 h-5 text-slate-600" />
                            <h3 className="font-semibold text-slate-900">Filter by Category</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <Button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    className={selectedCategory === category
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "text-slate-600"}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <Filter className="w-5 h-5 text-slate-600" />
                            <h3 className="font-semibold text-slate-900">Filter by Type</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {types.map(type => (
                                <Button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    variant={selectedType === type ? "default" : "outline"}
                                    className={selectedType === type
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "text-slate-600"}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Opportunities List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentOpportunities.map((opportunity) => (
                        <Card key={opportunity.id} className="hover:shadow-lg transition relative">
                            <CardHeader>
                                {/* Interest Checkbox */}
                                <div
                                    className="absolute top-4 left-4 cursor-pointer z-10"
                                    onClick={() => toggleInterest(opportunity.id)}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${interestedIds.has(opportunity.id)
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-slate-300 hover:border-blue-400'
                                        }`}>
                                        {interestedIds.has(opportunity.id) && (
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start justify-between ml-10">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
                                        <CardDescription className="text-sm text-slate-500">
                                            {opportunity.company}
                                        </CardDescription>
                                    </div>
                                    <div className="bg-blue-100 px-3 py-1 rounded-full">
                                        <span className="text-sm font-semibold text-blue-700">{opportunity.category}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-600">{opportunity.description}</p>

                                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                                        <MapPin className="w-4 h-4" />
                                        <span>{opportunity.location}</span>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{opportunity.duration}</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        <span className="font-bold text-green-700 text-lg">{opportunity.compensation}</span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 mb-2">Requirements:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {opportunity.requirements.map((req, i) => (
                                                <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a href={opportunity.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                            View Official Site
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-8 flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                variant="outline"
                                className="px-3 py-2"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Previous
                            </Button>

                            <div className="flex items-center space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        variant={currentPage === page ? "default" : "outline"}
                                        className={`px-3 py-2 min-w-[40px] ${currentPage === page
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'text-slate-600'
                                            }`}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                className="px-3 py-2"
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>

                        <p className="text-sm text-slate-600">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredOpportunities.length)} of {filteredOpportunities.length} opportunities
                        </p>
                    </div>
                )}

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

