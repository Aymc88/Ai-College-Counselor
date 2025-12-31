'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket, MapPin, DollarSign, Calendar, Users, Filter, Home, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type StartupOpportunity = {
    id: number
    name: string
    type: 'Incubator' | 'Accelerator' | 'Competition' | 'Grant' | 'Fellowship'
    location: string
    duration: string
    funding: string
    eligibility: string[]
    category: string
    provider: string
    url: string
    description: string
}

const opportunities: StartupOpportunity[] = [
    {
        id: 1,
        name: "Y Combinator",
        type: "Accelerator",
        location: "Mountain View, CA",
        duration: "3 months",
        funding: "$500,000",
        eligibility: ["Any Stage", "Tech Startups", "Team Required"],
        category: "Accelerator",
        provider: "Y Combinator",
        url: "https://www.ycombinator.com/",
        description: "World's most prestigious startup accelerator. Twice per year program with funding, mentorship, and Demo Day."
    },
    {
        id: 2,
        name: "TechStars",
        type: "Accelerator",
        location: "Multiple Locations",
        duration: "3 months",
        funding: "$120,000",
        eligibility: ["Early Stage", "Tech Focus", "Mentor-Driven"],
        category: "Accelerator",
        provider: "TechStars",
        url: "https://www.techstars.com/",
        description: "Global accelerator network with programs in various industries and locations."
    },
    {
        id: 3,
        name: "500 Global",
        type: "Accelerator",
        location: "San Francisco, CA",
        duration: "4 months",
        funding: "$150,000",
        eligibility: ["Seed Stage", "Global Startups", "Growth Focus"],
        category: "Accelerator",
        provider: "500 Global",
        url: "https://500.co/",
        description: "Seed-stage venture fund and startup accelerator with global reach."
    },
    {
        id: 4,
        name: "LAUNCH Accelerator",
        type: "Incubator",
        location: "San Francisco, CA",
        duration: "12 weeks",
        funding: "$100,000",
        eligibility: ["Pre-Seed", "Tech Startups", "Founder-Focused"],
        category: "Incubator",
        provider: "LAUNCH",
        url: "https://www.launch.co/",
        description: "Founder-first accelerator focusing on early-stage technology companies."
    },
    {
        id: 5,
        name: "MIT Sandbox Innovation Fund",
        type: "Grant",
        location: "Cambridge, MA",
        duration: "Year-Round",
        funding: "Up to $25,000",
        eligibility: ["MIT Students/Alumni", "Any Stage", "Innovation Focus"],
        category: "Grant",
        provider: "MIT",
        url: "https://innovation.mit.edu/resource/MIT-sandbox-innovation-fund-program/",
        description: "Grants for MIT students and recent alumni to explore and test their big ideas."
    },
    {
        id: 6,
        name: "Stanford StartX",
        type: "Accelerator",
        location: "Stanford, CA",
        duration: "3 months",
        funding: "Non-Equity",
        eligibility: ["Stanford Affiliated", "Tech/Science", "High Growth"],
        category: "Accelerator",
        provider: "Stanford University",
        url: "https://startx.com/",
        description: "Stanford's premier startup accelerator for Stanford-affiliated entrepreneurs."
    },
    {
        id: 7,
        name: "Harvard Innovation Labs",
        type: "Incubator",
        location: "Boston, MA",
        duration: "Ongoing",
        funding: "Resources + Space",
        eligibility: ["Harvard Affiliated", "All Stages", "Any Industry"],
        category: "Incubator",
        provider: "Harvard University",
        url: "https://innovationlabs.harvard.edu/",
        description: "Innovation hub for Harvard students, faculty, and alumni to launch ventures."
    },
    {
        id: 8,
        name: "Berkeley SkyDeck",
        type: "Accelerator",
        location: "Berkeley, CA",
        duration: "6 months",
        funding: "$100,000 - $200,000",
        eligibility: ["Berkeley Affiliated", "Tech Focus", "Growth Ready"],
        category: "Accelerator",
        provider: "UC Berkeley",
        url: "https://skydeck.berkeley.edu/",
        description: "UC Berkeley's startup accelerator with hotdesking space and mentorship."
    },
    {
        id: 9,
        name: "Imagine Cup",
        type: "Competition",
        location: "Global/Virtual",
        duration: "Several Months",
        funding: "$100,000 Prize",
        eligibility: ["Students", "Tech Projects", "Global"],
        category: "Competition",
        provider: "Microsoft",
        url: "https://imaginecup.microsoft.com/",
        description: "Microsoft's global student technology competition for innovative solutions."
    },
    {
        id: 10,
        name: "MIT $100K Entrepreneurship Competition",
        type: "Competition",
        location: "Cambridge, MA",
        duration: "Academic Year",
        funding: "$100,000 Prize Pool",
        eligibility: ["MIT Students", "Innovative Ideas", "All Industries"],
        category: "Competition",
        provider: "MIT",
        url: "https://www.mit100k.org/",
        description: "MIT's premier entrepreneurship competition with multiple tracks and stages."
    },
    {
        id: 11,
        name: "Plug and Play Tech Center",
        type: "Accelerator",
        location: "Sunnyvale, CA",
        duration: "3 months",
        funding: "$60,000",
        eligibility: ["Early Stage", "Tech Focus", "Global"],
        category: "Accelerator",
        provider: "Plug and Play",
        url: "https://www.plugandplaytechcenter.com/",
        description: "Global innovation platform with industry-specific accelerator programs."
    },
    {
        id: 12,
        name: "Alchemist Accelerator",
        type: "Accelerator",
        location: "San Francisco, CA",
        duration: "6 months",
        funding: "$36,000",
        eligibility: ["B2B", "Revenue-Stage", "Enterprise Focus"],
        category: "Accelerator",
        provider: "Alchemist",
        url: "https://alchemistaccelerator.com/",
        description: "Enterprise-focused accelerator for B2B startups."
    },
    {
        id: 13,
        name: "AngelPad",
        type: "Accelerator",
        location: "San Francisco/NYC",
        duration: "3 months",
        funding: "$120,000",
        eligibility: ["Early Stage", "Tech Startups", "Founder-Driven"],
        category: "Accelerator",
        provider: "AngelPad",
        url: "https://angelpad.org/",
        description: "Selective accelerator with focus on founder mentorship and Demo Day."
    },
    {
        id: 14,
        name: "Entrepreneur First",
        type: "Fellowship",
        location: "London/Global",
        duration: "6 months",
        funding: "£80,000 + Equity",
        eligibility: ["Solo Founders", "Deep Tech", "No Idea Required"],
        category: "Fellowship",
        provider: "Entrepreneur First",
        url: "https://www.joinef.com/",
        description: "Pre-team, pre-idea program matching talented individuals to build startups."
    },
    {
        id: 15,
        name: "SOSV HAX",
        type: "Accelerator",
        location: "Shenzhen/San Francisco",
        duration: "111 days",
        funding: "$250,000",
        eligibility: ["Hardware", "IoT", "Deep Tech"],
        category: "Accelerator",
        provider: "SOSV",
        url: "https://hax.co/",
        description: "World's first and largest hardware accelerator program."
    },
    {
        id: 16,
        name: "IndieBio",
        type: "Accelerator",
        location: "San Francisco/NYC",
        duration: "4 months",
        funding: "$250,000",
        eligibility: ["Biotech", "Life Sciences", "Early Stage"],
        category: "Accelerator",
        provider: "SOSV",
        url: "https://indiebio.co/",
        description: "World's largest biotech accelerator for early-stage life science companies."
    },
    {
        id: 17,
        name: "MassChallenge",
        type: "Accelerator",
        location: "Boston/Global",
        duration: "4 months",
        funding: "$1M+ Prizes (No Equity)",
        eligibility: ["All Stages", "Any Industry", "High Impact"],
        category: "Accelerator",
        provider: "MassChallenge",
        url: "https://masschallenge.org/",
        description: "Zero-equity accelerator with global programs and cash prizes."
    },
    {
        id: 18,
        name: "Capital Factory",
        type: "Incubator",
        location: "Austin, TX",
        duration: "Ongoing",
        funding: "Space + Resources",
        eligibility: ["Texas Startups", "Tech Focus", "Growth Stage"],
        category: "Incubator",
        provider: "Capital Factory",
        url: "https://www.capitalfactory.com/",
        description: "Texas's largest coworking space and accelerator for tech startups."
    },
    {
        id: 19,
        name: "Dreamit Ventures",
        type: "Accelerator",
        location: "Philadelphia/NYC",
        duration: "14 weeks",
        funding: "$50,000",
        eligibility: ["B2B", "HealthTech", "SecureTech"],
        category: "Accelerator",
        provider: "Dreamit",
        url: "https://www.dreamit.com/",
        description: "Vertical-specific accelerator programs focused on enterprise solutions."
    },
    {
        id: 20,
        name: "gener8tor",
        type: "Accelerator",
        location: "Madison/Multiple",
        duration: "12 weeks",
        funding: "$100,000",
        eligibility: ["Early Stage", "Midwest Focus", "Tech"],
        category: "Accelerator",
        provider: "gener8tor",
        url: "https://www.gener8tor.com/",
        description: "Midwest-based accelerator programs focusing on regional tech ecosystems."
    },
    {
        id: 21,
        name: "Village Capital",
        type: "Accelerator",
        location: "Global",
        duration: "3 months",
        funding: "$50,000 - $100,000",
        eligibility: ["Impact Startups", "Peer-Selected", "Emerging Markets"],
        category: "Accelerator",
        provider: "Village Capital",
        url: "https://www.vilcap.com/",
        description: "Peer-selected investment accelerator for impact-driven startups."
    },
    {
        id: 22,
        name: "TinySeed",
        type: "Accelerator",
        location: "Remote",
        duration: "12 months",
        funding: "$120,000",
        eligibility: ["SaaS", "Bootstrapped", "B2B"],
        category: "Accelerator",
        provider: "TinySeed",
        url: "https://tinyseed.com/",
        description: "First accelerator designed specifically for bootstrapped SaaS companies."
    },
    {
        id: 23,
        name: "Pioneer",
        type: "Fellowship",
        location: "Remote/Global",
        duration: "Ongoing",
        funding: "$20,000 - $100,000",
        eligibility: ["Solo Founders", "Any Stage", "Global"],
        category: "Fellowship",
        provider: "Pioneer",
        url: "https://pioneer.app/",
        description: "Remote-first program discovering and funding ambitious founders globally."
    },
    {
        id: 24,
        name: "Neo Accelerator",
        type: "Fellowship",
        location: "San Francisco",
        duration: "Summer",
        funding: "$100,000",
        eligibility: ["Students", "Recent Grads", "Under 24"],
        category: "Fellowship",
        provider: "Neo",
        url: "https://neo.com/",
        description: "Fellowship program for young founders ages 13-24."
    },
    {
        id: 25,
        name: "Thiel Fellowship",
        type: "Fellowship",
        location: "San Francisco",
        duration: "2 years",
        funding: "$100,000",
        eligibility: ["Under 23", "Drop Out Option", "Big Ideas"],
        category: "Fellowship",
        provider: "Thiel Foundation",
        url: "https://thielfellowship.org/",
        description: "Two-year, $100,000 fellowship for young people to pursue ideas instead of college."
    },
    {
        id: 26,
        name: "RICE Business Plan Competition",
        type: "Competition",
        location: "Houston, TX",
        duration: "April Event",
        funding: "$1.5M Prize Pool",
        eligibility: ["University Students", "Startups", "All Industries"],
        category: "Competition",
        provider: "Rice University",
        url: "https://rbpc.rice.edu/",
        description: "World's richest student startup competition with impressive prize pool."
    },
    {
        id: 27,
        name: "Startup Chile",
        type: "Accelerator",
        location: "Santiago, Chile",
        duration: "6 months",
        funding: "$40,000",
        eligibility: ["Global Startups", "All Stages", "Tech Focus"],
        category: "Accelerator",
        provider: "Chilean Government",
        url: "https://www.startupchile.org/",
        description: "Government-backed program welcoming global startups to Chile."
    },
    {
        id: 28,
        name: "Amplify LA",
        type: "Accelerator",
        location: "Los Angeles, CA",
        duration: "4 months",
        funding: "$100,000",
        eligibility: ["Early Stage", "LA-Based", "Consumer/Mobile"],
        category: "Accelerator",
        provider: "Amplify.LA",
        url: "https://www.amplify.la/",
        description: "LA's premier early-stage tech accelerator focused on consumer products."
    },
    {
        id: 29,
        name: "SURGE by Sequoia",
        type: "Accelerator",
        location: "Bangalore, India",
        duration: "16 weeks",
        funding: "$1-2M",
        eligibility: ["Seed Stage", "India/SEA", "High Growth"],
        category: "Accelerator",
        provider: "Sequoia Capital",
        url: "https://www.surgeahead.com/",
        description: "Sequoia's rapid scale-up program for startups in India and Southeast Asia."
    },
    {
        id: 30,
        name: "ERA Accelerator",
        type: "Accelerator",
        location: "New York, NY",
        duration: "4 months",
        funding: "$100,000",
        eligibility: ["B2B", "Pre-Seed/Seed", "NYC"],
        category: "Accelerator",
        provider: "Entrepreneurs Roundtable",
        url: "https://www.eranyc.com/",
        description: "New York's largest tech accelerator for early-stage startups."
    },
    {
        id: 31,
        name: "Creative Destruction Lab",
        type: "Incubator",
        location: "Toronto/Global",
        duration: "9 months",
        funding: "Non-Equity",
        eligibility: ["Science-Based", "Scalable", "University Affiliation"],
        category: "Incubator",
        provider: "CDL",
        url: "https://creativedestructionlab.com/",
        description: "Objectives-based program for massively scalable science-based ventures."
    },
    {
        id: 32,
        name: "True Ventures Incubator",
        type: "Incubator",
        location: "San Francisco, CA",
        duration: "Ongoing",
        funding: "Resources + Funding",
        eligibility: ["Consumer", "Enterprise", "Early Stage"],
        category: "Incubator",
        provider: "True Ventures",
        url: "https://trueventures.com/",
        description: "VC-backed incubator providing hands-on support for portfolio companies."
    },
    {
        id: 33,
        name: "Columbia Startup Lab",
        type: "Incubator",
        location: "New York, NY",
        duration: "12 weeks",
        funding: "$10,000 + Space",
        eligibility: ["Columbia Affiliated", "All Stages", "Any Industry"],
        category: "Incubator",
        provider: "Columbia University",
        url: "https://entrepreneurship.columbia.edu/startup-lab/",
        description: "Columbia's flagship entrepreneurship program for students and affiliates."
    },
    {
        id: 34,
        name: "Penn Wharton Startup Challenge",
        type: "Competition",
        location: "Philadelphia, PA",
        duration: "Academic Year",
        funding: "$100,000 Prize",
        eligibility: ["Penn Students", "All Schools", "Team-Based"],
        category: "Competition",
        provider: "University of Pennsylvania",
        url: "https://entrepreneurship.wharton.upenn.edu/startup-challenge/",
        description: "University-wide startup competition with mentorship and funding."
    },
    {
        id: 35,
        name: "Cornell eLab",
        type: "Incubator",
        location: "Ithaca, NY",
        duration: "Semester",
        funding: "$10,000",
        eligibility: ["Cornell Students", "Any Stage", "Mentorship Focus"],
        category: "Incubator",
        provider: "Cornell University",
        url: "https://eship.cornell.edu/elab/",
        description: "Student business incubator providing funding, space, and mentorship."
    },
    {
        id: 36,
        name: "Boost VC",
        type: "Accelerator",
        location: "San Francisco, CA",
        duration: "3 months",
        funding: "$500,000",
        eligibility: ["VR/AR", "Crypto", "Sci-Fi Tech"],
        category: "Accelerator",
        provider: "Boost VC",
        url: "https://www.boost.vc/",
        description: "Accelerator focused on sci-fi technologies and moonshot ideas."
    },
    {
        id: 37,
        name: "Barclays Accelerator",
        type: "Accelerator",
        location: "Multiple Locations",
        duration: "13 weeks",
        funding: "$120,000",
        eligibility: ["FinTech", "Early Stage", "Global"],
        category: "Accelerator",
        provider: "Techstars + Barclays",
        url: "https://www.techstars.com/accelerators/barclays",
        description: "FinTech-focused accelerator powered by Barclays and Techstars."
    },
    {
        id: 38,
        name: "Disney Accelerator",
        type: "Accelerator",
        location: "Los Angeles, CA",
        duration: "3 months",
        funding: "$120,000",
        eligibility: ["Media", "Entertainment", "Consumer"],
        category: "Accelerator",
        provider: "Disney + Techstars",
        url: "https://www.techstars.com/accelerators/disney",
        description: "Media and entertainment accelerator backed by Disney."
    },
    {
        id: 39,
        name: "Newchip Accelerator",
        type: "Accelerator",
        location: "Remote",
        duration: "6 months",
        funding: "Non-Equity",
        eligibility: ["All Stages", "Global", "Online"],
        category: "Accelerator",
        provider: "Newchip",
        url: "https://www.newchip.com/",
        description: "Online accelerator providing global access to startup resources."
    },
    {
        id: 40,
        name: "1776 Challenge Cup",
        type: "Competition",
        location: "Washington DC",
        duration: "Annual",
        funding: "$1M Prize",
        eligibility: ["Impact Startups", "Global", "Challenge-Based"],
        category: "Competition",
        provider: "1776",
        url: "https://www.1776.vc/challenge-cup/",
        description: "Global startup competition focusing on impact-driven solutions."
    },
    {
        id: 41,
        name: "MuckerLab",
        type: "Accelerator",
        location: "Santa Monica, CA",
        duration: "3 months",
        funding: "$250,000",
        eligibility: ["Pre-Seed", "SaaS/Marketplaces", "LA Area"],
        category: "Accelerator",
        provider: "MuckerLab",
        url: "https://www.muckerlab.com/",
        description: "LA-based micro-VC and accelerator for early-stage internet companies."
    },
    {
        id: 42,
        name: "Boomtown Accelerators",
        type: "Accelerator",
        location: "Boulder, CO",
        duration: "20 weeks",
        funding: "$20,000 - $110,000",
        eligibility: ["Early Stage", "Tech", "Mentor-Driven"],
        category: "Accelerator",
        provider: "Boomtown",
        url: "https://boomtownaccelerators.com/",
        description: "Mentor-driven accelerator with programs across multiple industries."
    },
    {
        id: 43,
        name: "FbStart by Meta",
        type: "Grant",
        location: "Remote/Global",
        duration: "Ongoing",
        funding: "$40,000+ Credits",
        eligibility: ["Mobile Apps", "Early Stage", "Growth Focus"],
        category: "Grant",
        provider: "Meta (Facebook)",
        url: "https://developers.facebook.com/fbstart/",
        description: "Meta's program providing tools and resources for mobile app startups."
    },
    {
        id: 44,
        name: "AWS Activate",
        type: "Grant",
        location: "Remote/Global",
        duration: "Ongoing",
        funding: "$100,000 Credits",
        eligibility: ["Cloud-Based", "Startups", "Global"],
        category: "Grant",
        provider: "Amazon Web Services",
        url: "https://aws.amazon.com/activate/",
        description: "AWS credits and support for cloud-based startups."
    },
    {
        id: 45,
        name: "Google for Startups",
        type: "Grant",
        location: "Global",
        duration: "Ongoing",
        funding: "$100,000 Credits",
        eligibility: ["Tech Startups", "Cloud Users", "Global"],
        category: "Grant",
        provider: "Google",
        url: "https://startup.google.com/",
        description: "Google Cloud credits and mentorship for tech startups."
    },
    {
        id: 46,
        name: "NSF I-Corps",
        type: "Grant",
        location: "National/Virtual",
        duration: "7 weeks",
        funding: "$50,000",
        eligibility: ["NSF Funded", "Academic Research", "Commercialization"],
        category: "Grant",
        provider: "National Science Foundation",
        url: "https://www.nsf.gov/news/special_reports/i-corps/",
        description: "Lean startup training for commercializing NSF-funded research."
    },
    {
        id: 47,
        name: "SBIR/STTR Program",
        type: "Grant",
        location: "National",
        duration: "Multi-Phase",
        funding: "$150,000 - $1M+",
        eligibility: ["Small Business", "R&D Focus", "US-Based"],
        category: "Grant",
        provider: "US Government",
        url: "https://www.sbir.gov/",
        description: "Federal funding program for small business innovation and research."
    },
    {
        id: 48,
        name: "Singularity University",
        type: "Fellowship",
        location: "Silicon Valley",
        duration: "7-10 weeks",
        funding: "$25,000 + Resources",
        eligibility: ["Exponential Tech", "Global Impact", "Innovative"],
        category: "Fellowship",
        provider: "Singularity University",
        url: "https://su.org/programs/",
        description: "Programs focused on exponential technologies and global challenges."
    },
    {
        id: 49,
        name: "IDEO CoLab Ventures",
        type: "Incubator",
        location: "San Francisco/Cambridge",
        duration: "6 months",
        funding: "$175,000",
        eligibility: ["Design Focus", "Emerging Tech", "Early Stage"],
        category: "Incubator",
        provider: "IDEO",
        url: "https://www.ideocolab.com/ventures/",
        description: "Design-driven venture studio exploring emerging technologies."
    },
    {
        id: 50,
        name: "Kleiner Perkins Fellows",
        type: "Fellowship",
        location: "Silicon Valley",
        duration: "Summer",
        funding: "Internship + Network",
        eligibility: ["Students", "Engineering/Product/Design"],
        category: "Fellowship",
        provider: "Kleiner Perkins",
        url: "https://fellows.kleinerperkins.com/",
        description: "Elite summer fellowship program for students in tech."
    },
    {
        id: 51,
        name: "Rough Draft Ventures",
        type: "Grant",
        location: "Boston/Multiple",
        duration: "Ongoing",
        funding: "$20,000",
        eligibility: ["Student Founders", "University-Based", "Pre-Seed"],
        category: "Grant",
        provider: "General Catalyst",
        url: "https://roughdraft.vc/",
        description: "Student-run VC fund investing in student-founded startups."
    },
    {
        id: 52,
        name: "Dorm Room Fund",
        type: "Grant",
        location: "Multiple Cities",
        duration: "Ongoing",
        funding: "$20,000",
        eligibility: ["Student Founders", "Campus-Based", "Early Stage"],
        category: "Grant",
        provider: "First Round Capital",
        url: "https://dormroomfund.com/",
        description: "Student-run VC funding student startups across campuses."
    },
    {
        id: 53,
        name: "Cornell Tech Startup Studio",
        type: "Incubator",
        location: "New York, NY",
        duration: "Academic Year",
        funding: "Resources + Space",
        eligibility: ["Cornell Tech", "Student Teams", "Product Focus"],
        category: "Incubator",
        provider: "Cornell Tech",
        url: "https://tech.cornell.edu/studio/",
        description: "Product-focused studio course building real startups."
    },
    {
        id: 54,
        name: "USC Viterbi Startup Garage",
        type: "Incubator",
        location: "Los Angeles, CA",
        duration: "Semester",
        funding: "$1,000 - $10,000",
        eligibility: ["USC Students", "Tech Ventures", "Team-Based"],
        category: "Incubator",
        provider: "USC Viterbi",
        url: "https://viterbischool.usc.edu/esc/startup-garage/",
        description: "Student venture incubator with funding and mentorship."
    },
    {
        id: 55,
        name: "Duke Innovation & Entrepreneurship",
        type: "Incubator",
        location: "Durham, NC",
        duration: "Semester",
        funding: "$5,000",
        eligibility: ["Duke Affiliated", "All Stages", "Any Industry"],
        category: "Incubator",
        provider: "Duke University",
        url: "https://innovation.duke.edu/",
        description: "Duke's hub for entrepreneurship providing funding and resources."
    },
    {
        id: 56,
        name: "Northwestern Garage",
        type: "Incubator",
        location: "Evanston, IL",
        duration: "Ongoing",
        funding: "Space + Resources",
        eligibility: ["Northwestern", "Students/Alumni", "Startups"],
        category: "Incubator",
        provider: "Northwestern University",
        url: "https://thegarage.northwestern.edu/",
        description: "Student startup incubator providing workspace and community."
    },
    {
        id: 57,
        name: "Princeton Entrepreneurship Council",
        type: "Incubator",
        location: "Princeton, NJ",
        duration: "Academic Year",
        funding: "$5,000 - $25,000",
        eligibility: ["Princeton", "Students/Alumni", "Innovation"],
        category: "Incubator",
        provider: "Princeton University",
        url: "https://entrepreneurship.princeton.edu/",
        description: "Princeton's entrepreneurship hub with competitions and funding."
    },
    {
        id: 58,
        name: "UCSB Technology Management Program",
        type: "Incubator",
        location: "Santa Barbara, CA",
        duration: "Academic Year",
        funding: "$15,000",
        eligibility: ["UCSB Students", "Tech Ventures", "Teams"],
        category: "Incubator",
        provider: "UC Santa Barbara",
        url: "https://tmp.ucsb.edu/",
        description: "Graduate program combining MBA with hands-on startup experience."
    },
    {
        id: 59,
        name: "UCLA Anderson Venture Accelerator",
        type: "Incubator",
        location: "Los Angeles, CA",
        duration: "10 weeks",
        funding: "$20,000",
        eligibility: ["UCLA", "Student Teams", "All Industries"],
        category: "Incubator",
        provider: "UCLA Anderson",
        url: "https://www.anderson.ucla.edu/centers/price-center/anderson-venture-accelerator",
        description: "UCLA's premier venture accelerator for student entrepreneurs."
    },
    {
        id: 60,
        name: "Georgia Tech CREATE-X",
        type: "Incubator",
        location: "Atlanta, GA",
        duration: "Semester/Year",
        funding: "$20,000",
        eligibility: ["Georgia Tech", "All Majors", "Idea Stage"],
        category: "Incubator",
        provider: "Georgia Tech",
        url: "https://create-x.gatech.edu/",
        description: "Programs helping students launch startups before graduation."
    },
    {
        id: 61,
        name: "UT Austin Longhorn Startup",
        type: "Incubator",
        location: "Austin, TX",
        duration: "Semester",
        funding: "$10,000",
        eligibility: ["UT Austin", "Students/Alumni", "Early Stage"],
        category: "Incubator",
        provider: "UT Austin",
        url: "https://longhornstartup.com/",
        description: "Experiential course where students launch real companies."
    },
    {
        id: 62,
        name: "University of Michigan Desai Accelerator",
        type: "Incubator",
        location: "Ann Arbor, MI",
        duration: "12 weeks",
        funding: "$7,500",
        eligibility: ["U-M Students", "Ventures", "Summer Program"],
        category: "Incubator",
        provider: "University of Michigan",
        url: "https://zli.bus.umich.edu/desai-accelerator/",
        description: "Intensive summer accelerator for student entrepreneurs."
    },
    {
        id: 63,
        name: "UNC Innovation Competition",
        type: "Competition",
        location: "Chapel Hill, NC",
        duration: "Academic Year",
        funding: "$50,000 Prize Pool",
        eligibility: ["UNC Students", "All Schools", "Innovative Ideas"],
        category: "Competition",
        provider: "UNC Chapel Hill",
        url: "https://innovate.unc.edu/1819-campus-y-innovation-competition/",
        description: "Student innovation competition with mentorship and funding."
    },
    {
        id: 64,
        name: "USC Stevens Student Innovator Showcase",
        type: "Competition",
        location: "Los Angeles, CA",
        duration: "Annual",
        funding: "$15,000 Prize",
        eligibility: ["USC Students", "All Majors", "Innovations"],
        category: "Competition",
        provider: "USC Stevens Institute",
        url: "https://stevens.usc.edu/",
        description: "Annual competition showcasing student innovation across disciplines."
    },
    {
        id: 65,
        name: "VentureWell E-Team Grant",
        type: "Grant",
        location: "National",
        duration: "Annual",
        funding: "$10,000 - $25,000",
        eligibility: ["Students", "STEM Innovation", "Teams"],
        category: "Grant",
        provider: "VentureWell",
        url: "https://venturewell.org/e-team/",
        description: "Grants supporting student STEM innovation teams nationwide."
    },
    {
        id: 66,
        name: "Lemelson-MIT Student Prize",
        type: "Competition",
        location: "Cambridge, MA",
        duration: "Annual",
        funding: "$15,000",
        eligibility: ["MIT Students", "Invention", "Innovation"],
        category: "Competition",
        provider: "MIT",
        url: "https://lemelson.mit.edu/studentprize",
        description: "Celebrating MIT students who create inventive solutions."
    },
    {
        id: 67,
        name: "Harvard President's Innovation Challenge",
        type: "Competition",
        location: "Cambridge, MA",
        duration: "Academic Year",
        funding: "$70,000 Prize Pool",
        eligibility: ["Harvard Students", "All Schools", "Social Impact"],
        category: "Competition",
        provider: "Harvard University",
        url: "https://innovationlabs.harvard.edu/presidents-innovation-challenge/",
        description: "Harvard's flagship innovation competition across all schools."
    },
    {
        id: 68,
        name: "Stanford BASES Challenge",
        type: "Competition",
        location: "Stanford, CA",
        duration: "Academic Year",
        funding: "$25,000 Prize",
        eligibility: ["Stanford Students", "Tech Ventures", "Teams"],
        category: "Competition",
        provider: "Stanford BASES",
        url: "https://bases.stanford.edu/challenge",
        description: "Stanford's premier business plan competition for students."
    },
    {
        id: 69,
        name: "Yale Entrepreneurial Institute",
        type: "Fellowship",
        location: "New Haven, CT",
        duration: "Summer",
        funding: "$20,000",
        eligibility: ["Yale Students", "Ventures", "Summer Focus"],
        category: "Fellowship",
        provider: "Yale University",
        url: "https://yei.yale.edu/",
        description: "Summer fellowship providing funding and mentorship for Yale student founders."
    },
    {
        id: 70,
        name: "Brown Innovation LAB",
        type: "Incubator",
        location: "Providence, RI",
        duration: "Ongoing",
        funding: "Space + Resources",
        eligibility: ["Brown Students", "All Stages", "Community"],
        category: "Incubator",
        provider: "Brown University",
        url: "https://www.brown.edu/academics/entrepreneurship/",
        description: "Brown's entrepreneurship hub fostering student ventures."
    },
    {
        id: 71,
        name: "Dartmouth Entrepreneurial Network",
        type: "Incubator",
        location: "Hanover, NH",
        duration: "Ongoing",
        funding: "$5,000 - $10,000",
        eligibility: ["Dartmouth", "Students/Alumni", "Ventures"],
        category: "Incubator",
        provider: "Dartmouth College",
        url: "https://entrepreneurship.dartmouth.edu/",
        description: "Supporting Dartmouth entrepreneurs with funding and resources."
    },
    {
        id: 72,
        name: "Carnegie Mellon Swartz Center for Entrepreneurship",
        type: "Incubator",
        location: "Pittsburgh, PA",
        duration: "Semester",
        funding: "$10,000",
        eligibility: ["CMU Students", "Tech/Arts", "Ventures"],
        category: "Incubator",
        provider: "Carnegie Mellon",
        url: "https://www.cmu.edu/swartz-center-for-entrepreneurship/",
        description: "CMU's hub for entrepreneurship across technology and arts."
    },
    {
        id: 73,
        name: "Caltech Entrepreneurship",
        type: "Incubator",
        location: "Pasadena, CA",
        duration: "Ongoing",
        funding: "Resources + Network",
        eligibility: ["Caltech", "Deep Tech", "Students/Alumni"],
        category: "Incubator",
        provider: "Caltech",
        url: "https://innovation.caltech.edu/",
        description: "Supporting Caltech's deep tech ventures and innovations."
    },
    {
        id: 74,
        name: "UIUC Cozad New Venture Challenge",
        type: "Competition",
        location: "Urbana-Champaign, IL",
        duration: "Academic Year",
        funding: "$100,000 Prize Pool",
        eligibility: ["UIUC Students", "All Ventures", "Teams"],
        category: "Competition",
        provider: "University of Illinois",
        url: "https://cozad.illinois.edu/",
        description: "Illinois's premier student business plan competition."
    },
    {
        id: 75,
        name: "University of Washington Buerk Center",
        type: "Incubator",
        location: "Seattle, WA",
        duration: "Ongoing",
        funding: "$5,000 - $25,000",
        eligibility: ["UW Students", "All Stages", "Innovation"],
        category: "Incubator",
        provider: "University of Washington",
        url: "https://foster.uw.edu/centers/buerk-center-entrepreneurship/",
        description: "UW's entrepreneurship center with funding and programs."
    },
    {
        id: 76,
        name: "Vanderbilt Center for Technology Transfer",
        type: "Incubator",
        location: "Nashville, TN",
        duration: "Ongoing",
        funding: "Resources + IP Support",
        eligibility: ["Vanderbilt", "Tech Transfer", "Research-Based"],
        category: "Incubator",
        provider: "Vanderbilt University",
        url: "https://www.vanderbilt.edu/cttc/",
        description: "Supporting commercialization of Vanderbilt research."
    },
    {
        id: 77,
        name: "Notre Dame IDEA Center",
        type: "Incubator",
        location: "Notre Dame, IN",
        duration: "Semester/Year",
        funding: "$10,000",
        eligibility: ["Notre Dame", "Students/Alumni", "Ventures"],
        category: "Incubator",
        provider: "University of Notre Dame",
        url: "https://ideacenter.nd.edu/",
        description: "Notre Dame's hub for innovation and entrepreneurship."
    },
    {
        id: 78,
        name: "Rice Venture Competition",
        type: "Competition",
        location: "Houston, TX",
        duration: "Spring Semester",
        funding: "$350,000 Prize Pool",
        eligibility: ["Rice Students", "All Ventures", "Global Teams"],
        category: "Competition",
        provider: "Rice University",
        url: "https://business.rice.edu/the-rice-venture-competition",
        description: "One of the largest student startup competitions globally."
    },
    {
        id: 79,
        name: "Emory Social Enterprise Lab",
        type: "Incubator",
        location: "Atlanta, GA",
        duration: "Semester",
        funding: "$5,000 - $15,000",
        eligibility: ["Emory Students", "Social Impact", "Ventures"],
        category: "Incubator",
        provider: "Emory University",
        url: "https://scholarblogs.emory.edu/goizeuta/social-enterprise/",
        description: "Supporting student-led social ventures with funding and mentorship."
    },
    {
        id: 80,
        name: "Babson Entrepreneurship Program",
        type: "Incubator",
        location: "Wellesley, MA",
        duration: "Ongoing",
        funding: "Resources + Network",
        eligibility: ["Babson Students", "All Stages", "Ventures"],
        category: "Incubator",
        provider: "Babson College",
        url: "https://www.babson.edu/academics/centers-and-institutes/blank-center/",
        description: "Premier entrepreneurship education with hands-on venture support."
    },
    {
        id: 81,
        name: "USC Viterbi Startup Accelerator",
        type: "Accelerator",
        location: "Los Angeles, CA",
        duration: "Summer",
        funding: "$25,000",
        eligibility: ["USC Students", "Tech Ventures", "Teams"],
        category: "Accelerator",
        provider: "USC Viterbi",
        url: "https://viterbischool.usc.edu/",
        description: "Intensive summer accelerator for USC tech startups."
    },
    {
        id: 82,
        name: "UCSD Rady Venture Fund",
        type: "Grant",
        location: "San Diego, CA",
        duration: "Ongoing",
        funding: "$15,000",
        eligibility: ["UCSD Students", "Early Stage", "Ventures"],
        category: "Grant",
        provider: "UC San Diego",
        url: "https://rady.ucsd.edu/",
        description: "Student-run VC fund investing in UCSD student startups."
    },
    {
        id: 83,
        name: "Arizona State Venture Devils",
        type: "Incubator",
        location: "Tempe, AZ",
        duration: "Ongoing",
        funding: "$15,000",
        eligibility: ["ASU Students", "All Stages", "Ventures"],
        category: "Incubator",
        provider: "Arizona State University",
        url: "https://venturedevils.com/",
        description: "ASU's student-run VC and accelerator program."
    },
    {
        id: 84,
        name: "Ohio State Innovation Fund",
        type: "Grant",
        location: "Columbus, OH",
        duration: "Annual",
        funding: "$5,000 - $20,000",
        eligibility: ["OSU Students", "Innovative Ideas", "Teams"],
        category: "Grant",
        provider: "Ohio State University",
        url: "https://eid.osu.edu/",
        description: "Funding student innovation and entrepreneurship at OSU."
    },
    {
        id: 85,
        name: "University of Florida Gator Hatchery",
        type: "Incubator",
        location: "Gainesville, FL",
        duration: "Ongoing",
        funding: "Space + Resources",
        eligibility: ["UF Students", "All Ventures", "Community"],
        category: "Incubator",
        provider: "University of Florida",
        url: "https://warrington.ufl.edu/entrepreneurship/",
        description: "UF's innovation hub for student entrepreneurs."
    },
    {
        id: 86,
        name: "University of Maryland Dingman Center",
        type: "Incubator",
        location: "College Park, MD",
        duration: "Semester",
        funding: "$10,000",
        eligibility: ["UMD Students", "Tech/Innovation", "Ventures"],
        category: "Incubator",
        provider: "University of Maryland",
        url: "https://www.rhsmith.umd.edu/centers-excellence/dingman-center-entrepreneurship",
        description: "Maryland's premier entrepreneurship center with funding programs."
    },
    {
        id: 87,
        name: "UC Davis Big Bang! Competition",
        type: "Competition",
        location: "Davis, CA",
        duration: "Spring",
        funding: "$30,000 Prize Pool",
        eligibility: ["UC Davis", "Students/Alumni", "Ventures"],
        category: "Competition",
        provider: "UC Davis",
        url: "https://gsm.ucdavis.edu/big-bang-business-competition",
        description: "UC Davis's annual business competition with multiple tracks."
    },
    {
        id: 88,
        name: "NYU Stern $300K Entrepreneurs Challenge",
        type: "Competition",
        location: "New York, NY",
        duration: "Academic Year",
        funding: "$300,000 Prize Pool",
        eligibility: ["NYU Students", "All Schools", "Startups"],
        category: "Competition",
        provider: "NYU Stern",
        url: "https://www.stern.nyu.edu/experience-stern/about/departments-centers-initiatives/centers-of-research/berkley-center/entrepreneurship/nyu-300k-entrepreneurs-challenge",
        description: "NYU's flagship startup competition with significant prizes."
    },
    {
        id: 89,
        name: "University of Chicago New Venture Challenge",
        type: "Competition",
        location: "Chicago, IL",
        duration: "Academic Year",
        funding: "$250,000 Prize Pool",
        eligibility: ["UChicago", "Students/Alumni", "Ventures"],
        category: "Competition",
        provider: "University of Chicago",
        url: "https://research.chicagobooth.edu/polsky/programs-events/new-venture-challenge",
        description: "Chicago Booth's premier venture competition producing successful startups."
    },
    {
        id: 90,
        name: "Boston College Venture Competition",
        type: "Competition",
        location: "Chestnut Hill, MA",
        duration: "Spring",
        funding: "$50,000 Prize Pool",
        eligibility: ["BC Students", "All Schools", "Social Impact"],
        category: "Competition",
        provider: "Boston College",
        url: "https://www.bc.edu/bc-web/schools/carroll/experience/venture-competition.html",
        description: "BC's annual venture competition emphasizing social impact."
    },
    {
        id: 91,
        name: "Purdue Burton D. Morgan Competition",
        type: "Competition",
        location: "West Lafayette, IN",
        duration: "Academic Year",
        funding: "$50,000 Prize",
        eligibility: ["Purdue Students", "All Majors", "Ventures"],
        category: "Competition",
        provider: "Purdue University",
        url: "https://www.purdue.edu/discoverypark/bdmc/",
        description: "Purdue's flagship business plan competition for students."
    },
    {
        id: 92,
        name: "University of Virginia i.Lab",
        type: "Incubator",
        location: "Charlottesville, VA",
        duration: "Ongoing",
        funding: "$5,000 Grants",
        eligibility: ["UVA Students", "All Stages", "Innovation"],
        category: "Incubator",
        provider: "University of Virginia",
        url: "https://www.commerce.virginia.edu/ilab",
        description: "UVA's innovation lab with workspace and funding for student ventures."
    },
    {
        id: 93,
        name: "Wake Forest Startup Challenge",
        type: "Competition",
        location: "Winston-Salem, NC",
        duration: "Spring",
        funding: "$15,000 Prize",
        eligibility: ["Wake Forest", "Students/Alumni", "Startups"],
        category: "Competition",
        provider: "Wake Forest University",
        url: "https://business.wfu.edu/centers/angell-center-for-entrepreneurship/",
        description: "Annual pitch competition for Wake Forest entrepreneurs."
    },
    {
        id: 94,
        name: "Texas A&M Aggies Invent",
        type: "Competition",
        location: "College Station, TX",
        duration: "Annual",
        funding: "$20,000 Prize",
        eligibility: ["Texas A&M", "All Students", "Innovation"],
        category: "Competition",
        provider: "Texas A&M University",
        url: "https://aggiesinvent.tamu.edu/",
        description: "48-hour invention competition with prizes and mentorship."
    },
    {
        id: 95,
        name: "University of Minnesota Holmes Center",
        type: "Incubator",
        location: "Minneapolis, MN",
        duration: "Ongoing",
        funding: "$10,000 Grants",
        eligibility: ["UMN Students", "All Schools", "Ventures"],
        category: "Incubator",
        provider: "University of Minnesota",
        url: "https://carlsonschool.umn.edu/holmes-center-entrepreneurship",
        description: "Minnesota's entrepreneurship hub supporting student ventures."
    },
    {
        id: 96,
        name: "Indiana University Innovate Indiana Fund",
        type: "Grant",
        location: "Bloomington, IN",
        duration: "Annual",
        funding: "$7,500",
        eligibility: ["IU Students", "Innovation", "Ventures"],
        category: "Grant",
        provider: "Indiana University",
        url: "https://kelley.iu.edu/programs/undergrad/johnson-center/index.html",
        description: "Funding innovative student ventures at Indiana University."
    },
    {
        id: 97,
        name: "University of Wisconsin Business Plan Contest",
        type: "Competition",
        location: "Madison, WI",
        duration: "Spring",
        funding: "$25,000 Prize Pool",
        eligibility: ["UW Students", "All Schools", "Startups"],
        category: "Competition",
        provider: "University of Wisconsin",
        url: "https://business.wisc.edu/",
        description: "Wisconsin's premier student startup competition."
    },
    {
        id: 98,
        name: "SMU Innovation Expo",
        type: "Competition",
        location: "Dallas, TX",
        duration: "Spring",
        funding: "$30,000 Prize Pool",
        eligibility: ["SMU Students", "Innovation", "All Fields"],
        category: "Competition",
        provider: "SMU",
        url: "https://www.smu.edu/cox/centers-and-institutes/caruth-institute-for-entrepreneurship",
        description: "Annual showcase and competition for SMU student innovations."
    },
    {
        id: 99,
        name: "University of Oregon Lundquist Center",
        type: "Incubator",
        location: "Eugene, OR",
        duration: "Ongoing",
        funding: "$5,000 Grants",
        eligibility: ["UO Students", "All Ventures", "Innovation"],
        category: "Incubator",
        provider: "University of Oregon",
        url: "https://business.uoregon.edu/centers/lundquist-center-entrepreneurship",
        description: "Oregon's entrepreneurship center with student funding programs."
    },
    {
        id: 100,
        name: "Rutgers Venture Development Fund",
        type: "Grant",
        location: "New Brunswick, NJ",
        duration: "Ongoing",
        funding: "$10,000",
        eligibility: ["Rutgers Students", "Tech Ventures", "Early Stage"],
        category: "Grant",
        provider: "Rutgers University",
        url: "https://centers.business.rutgers.edu/eship/",
        description: "Funding early-stage ventures from Rutgers student entrepreneurs."
    },
    {
        id: 101,
        name: "Google for Startups Accelerator",
        type: "Accelerator",
        location: "Global/Virtual",
        duration: "3 months",
        funding: "$100,000 Credits + Mentorship",
        eligibility: ["Tech Startups", "Seed to Series A", "AI/ML Focus"],
        category: "Accelerator",
        provider: "Google (Alphabet)",
        url: "https://startup.google.com/accelerator/",
        description: "Google's flagship accelerator providing cloud credits, technical mentorship from Google engineers, and access to Google's network."
    },
    {
        id: 102,
        name: "Apple Entrepreneur Camp",
        type: "Fellowship",
        location: "Cupertino, CA",
        duration: "2 weeks",
        funding: "Mentorship + $100,000 Credits",
        eligibility: ["App Developers", "Underrepresented Founders", "iOS/Apple Platform"],
        category: "Fellowship",
        provider: "Apple",
        url: "https://developer.apple.com/entrepreneur-camp/",
        description: "Intensive technology lab for app-driven organizations founded and led by underrepresented entrepreneurs."
    },
    {
        id: 103,
        name: "Amazon AWS Impact Accelerator",
        type: "Accelerator",
        location: "Seattle/Virtual",
        duration: "3 months",
        funding: "$225,000 Cash + Credits",
        eligibility: ["Black Founders", "Latino/Hispanic Founders", "Women Founders"],
        category: "Accelerator",
        provider: "Amazon (AWS)",
        url: "https://aws.amazon.com/startups/accelerators/",
        description: "AWS accelerator supporting underrepresented founders with cash investment, AWS credits, and business support."
    },
    {
        id: 104,
        name: "Meta Accelerator Programs",
        type: "Accelerator",
        location: "Menlo Park/Global",
        duration: "12 weeks",
        funding: "$50,000 + Credits",
        eligibility: ["Social Apps", "VR/AR", "Early Stage"],
        category: "Accelerator",
        provider: "Meta (Facebook)",
        url: "https://www.startups.fb.com/",
        description: "Meta's accelerator for startups building on Facebook, Instagram, WhatsApp, and Meta platforms."
    },
    {
        id: 105,
        name: "Microsoft for Startups Founders Hub",
        type: "Grant",
        location: "Global/Virtual",
        duration: "Ongoing",
        funding: "$150,000 Azure Credits",
        eligibility: ["B2B SaaS", "All Stages", "Global"],
        category: "Grant",
        provider: "Microsoft",
        url: "https://www.microsoft.com/en-us/startups",
        description: "Microsoft's global program offering Azure credits, M365 licenses, GitHub, OpenAI credits, and technical support."
    },
    {
        id: 106,
        name: "Tesla Start Program",
        type: "Fellowship",
        location: "Palo Alto/Austin",
        duration: "6-12 months",
        funding: "Resources + Partnership",
        eligibility: ["CleanTech", "Energy", "Transportation"],
        category: "Fellowship",
        provider: "Tesla",
        url: "https://www.tesla.com/careers",
        description: "Tesla partnerships supporting sustainable energy and transportation startups with technical expertise and resources."
    },
    {
        id: 107,
        name: "NVIDIA Inception Program",
        type: "Accelerator",
        location: "Global/Virtual",
        duration: "Ongoing",
        funding: "$200,000+ Credits + Hardware",
        eligibility: ["AI/ML Startups", "Deep Learning", "GPU Computing"],
        category: "Accelerator",
        provider: "NVIDIA",
        url: "https://www.nvidia.com/en-us/deep-learning-ai/startups/",
        description: "NVIDIA's virtual accelerator providing GPU credits, technical training, marketing support, and access to NVIDIA's network for AI-focused startups."
    },
    {
        id: 108,
        name: "Netflix Fund for Creative Equity",
        type: "Grant",
        location: "Los Angeles/Global",
        duration: "Annual",
        funding: "$100,000 - $250,000",
        eligibility: ["Content Creators", "Underrepresented Communities", "Media/Entertainment"],
        category: "Grant",
        provider: "Netflix",
        url: "https://about.netflix.com/en/news/netflix-fund-for-creative-equity",
        description: "Netflix's $100M fund supporting underrepresented communities in TV and film industries through grants and training programs."
    },
    {
        id: 109,
        name: "Snowflake Startup Program",
        type: "Grant",
        location: "Global/Virtual",
        duration: "12 months",
        funding: "$100,000 Credits",
        eligibility: ["Data Startups", "Cloud-Native", "Early Stage"],
        category: "Grant",
        provider: "Snowflake",
        url: "https://www.snowflake.com/startups/",
        description: "Snowflake's program providing cloud data platform credits, technical support, and go-to-market assistance for data-driven startups."
    }
]

export default function StartupsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10

    const categories = ['All', 'Accelerator', 'Incubator', 'Competition', 'Grant', 'Fellowship']

    const filteredOpportunities = selectedCategory === 'All'
        ? opportunities
        : opportunities.filter(o => o.category === selectedCategory)

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCategory])

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
                        <Rocket className="w-10 h-10 text-teal-600" />
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
                        <Link href="/startups" className="text-slate-600 hover:text-slate-900 font-bold">Startups Agent</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Startups, Competitions & Incubators Agent
                    </h1>
                    <p className="text-slate-600">Discover startup programs, competitions, incubators, and funding opportunities</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-teal-50 border-teal-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-teal-600 font-medium">Available Programs</p>
                                    <p className="text-3xl font-bold text-teal-700">{opportunities.length}</p>
                                </div>
                                <Rocket className="w-12 h-12 text-teal-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-600 font-medium">Total Funding Available</p>
                                    <p className="text-3xl font-bold text-green-700">$2M+</p>
                                </div>
                                <DollarSign className="w-12 h-12 text-green-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600 font-medium">Active Competitions</p>
                                    <p className="text-3xl font-bold text-purple-700">2</p>
                                </div>
                                <Users className="w-12 h-12 text-purple-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                        <Filter className="w-5 h-5 text-slate-600" />
                        <h3 className="font-semibold text-slate-900">Filter by Type</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant={selectedCategory === category ? "default" : "outline"}
                                className={selectedCategory === category
                                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                                    : "text-slate-600"}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Opportunities List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentOpportunities.map((opportunity) => (
                        <Card key={opportunity.id} className="hover:shadow-lg transition border-l-4 border-l-teal-500">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-2">{opportunity.name}</CardTitle>
                                        <CardDescription className="text-sm text-slate-500">
                                            {opportunity.provider}
                                        </CardDescription>
                                    </div>
                                    <div className="bg-teal-100 px-3 py-1 rounded-full">
                                        <span className="text-sm font-semibold text-teal-700">{opportunity.type}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-600">{opportunity.description}</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>{opportunity.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{opportunity.duration}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        <span className="font-bold text-green-700 text-lg">{opportunity.funding}</span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 mb-2">Eligibility:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {opportunity.eligibility.map((req, i) => (
                                                <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a href={opportunity.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                                            Learn More <ExternalLink className="w-4 h-4 ml-2" />
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
                                            ? 'bg-teal-600 hover:bg-teal-700 text-white'
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
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
