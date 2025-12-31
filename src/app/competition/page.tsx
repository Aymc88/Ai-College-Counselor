'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Calendar, Users, Target, Filter, Home, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Competition = {
    id: number
    title: string
    organizer: string
    deadline: string
    type: string
    eligibility: string
    prize: string
    category: string
    url: string
    description: string
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const competitions: Competition[] = [
    {
        id: 1,
        title: "Regeneron Science Talent Search",
        organizer: "Society for Science",
        deadline: "November 2025",
        type: "Research",
        eligibility: "High School Seniors",
        prize: "Up to $250,000",
        category: "STEM",
        url: "https://www.societyforscience.org/regeneron-sts/",
        description: "The nation's oldest and most prestigious science and math competition for high school seniors.",
        difficulty: "Advanced"
    },
    {
        id: 2,
        title: "USA Computing Olympiad (USACO)",
        organizer: "USACO",
        deadline: "Dec - Mar (Monthly)",
        type: "Coding",
        eligibility: "All Students",
        prize: "IOI Qualification",
        category: "Technology",
        url: "http://www.usaco.org/",
        description: "Algorithmic programming competition with four divisions of increasing difficulty.",
        difficulty: "Advanced"
    },
    {
        id: 3,
        title: "Scholastic Art & Writing Awards",
        organizer: "Alliance for Young Artists & Writers",
        deadline: "December 2025",
        type: "Creative",
        eligibility: "Grades 7-12",
        prize: "Scholarships & Publication",
        category: "Arts",
        url: "https://www.artandwriting.org/",
        description: "The nation's longest-running, most prestigious recognition program for creative teens.",
        difficulty: "Intermediate"
    },
    {
        id: 4,
        title: "Diamond Challenge",
        organizer: "University of Delaware",
        deadline: "January 2026",
        type: "Entrepreneurship",
        eligibility: "High School Students",
        prize: "$100,000 Prize Pool",
        category: "Business",
        url: "https://diamondchallenge.org/",
        description: "Global entrepreneurship competition for high school students offering a unique opportunity to learn about entrepreneurship.",
        difficulty: "Intermediate"
    },
    {
        id: 5,
        title: "Congressional App Challenge",
        organizer: "US Congress",
        deadline: "October 2025",
        type: "Coding",
        eligibility: "Middle & High School",
        prize: "Capitol Reception",
        category: "Technology",
        url: "https://www.congressionalappchallenge.us/",
        description: "District-specific competition encouraging students to learn to code and create their own apps.",
        difficulty: "Beginner"
    },
    {
        id: 6,
        title: "John Locke Institute Essay Competition",
        organizer: "John Locke Institute",
        deadline: "June 2026",
        type: "Writing",
        eligibility: "Under 18",
        prize: "Oxford/Princeton Gala",
        category: "Humanities",
        url: "https://www.johnlockeinstitute.com/essay-competition",
        description: "Global essay competition encouraging students to explore a wide range of challenging and interesting questions.",
        difficulty: "Advanced"
    },
    {
        id: 7,
        title: "MIT THINK Scholars Program",
        organizer: "MIT",
        deadline: "January 2026",
        type: "Research",
        eligibility: "High School Students",
        prize: "$1,000 Budget + Mentorship",
        category: "STEM",
        url: "https://think.mit.edu/",
        description: "Student-led program that funds and mentors high school students' science and technology projects.",
        difficulty: "Advanced"
    },
    {
        id: 8,
        title: "National Economics Challenge",
        organizer: "CEE",
        deadline: "March 2026",
        type: "Academic",
        eligibility: "High School Students",
        prize: "Cash Prizes",
        category: "Business",
        url: "https://www.councilforeconed.org/national-economics-challenge/",
        description: "The nation's most prestigious high school economics competition.",
        difficulty: "Intermediate"
    },
    {
        id: 9,
        title: "International Science and Engineering Fair (ISEF)",
        organizer: "Society for Science",
        deadline: "Varies by Region",
        type: "Research",
        eligibility: "Grades 9-12",
        prize: "$9 Million in Prizes",
        category: "STEM",
        url: "https://www.societyforscience.org/isef/",
        description: "The world's largest international pre-college science competition.",
        difficulty: "Advanced"
    },
    {
        id: 10,
        title: "DECA International Career Development Conference",
        organizer: "DECA",
        deadline: "April 2026",
        type: "Business",
        eligibility: "High School Students",
        prize: "Scholarships & Recognition",
        category: "Business",
        url: "https://www.deca.org/",
        description: "Premier association for students interested in marketing, finance, hospitality, and management.",
        difficulty: "Intermediate"
    },
    {
        id: 11,
        title: "National Science Bowl",
        organizer: "US Department of Energy",
        deadline: "January 2026",
        type: "Academic",
        eligibility: "High School Teams",
        prize: "National Recognition + Trip",
        category: "STEM",
        url: "https://science.osti.gov/wdts/nsb",
        description: "Fast-paced question-and-answer competition that tests students' knowledge in all areas of science.",
        difficulty: "Advanced"
    },
    {
        id: 12,
        title: "American Mathematics Competitions (AMC)",
        organizer: "MAA",
        deadline: "November 2025",
        type: "Math",
        eligibility: "Middle & High School",
        prize: "USAMO Qualification",
        category: "STEM",
        url: "https://www.maa.org/math-competitions",
        description: "A series of examinations to increase interest in mathematics and develop problem-solving ability.",
        difficulty: "Advanced"
    },
    {
        id: 13,
        title: "National History Day",
        organizer: "National History Day",
        deadline: "March 2026",
        type: "Research",
        eligibility: "Grades 6-12",
        prize: "National Recognition",
        category: "Humanities",
        url: "https://www.nhd.org/",
        description: "Year-long academic program focused on historical research, interpretation, and creative expression.",
        difficulty: "Intermediate"
    },
    {
        id: 14,
        title: "Google Code Jam",
        organizer: "Google",
        deadline: "March - May 2026",
        type: "Coding",
        eligibility: "All Ages (13+)",
        prize: "$15,000 Top Prize",
        category: "Technology",
        url: "https://codingcompetitions.withgoogle.com/codejam",
        description: "Google's longest running global coding competition.",
        difficulty: "Advanced"
    },
    {
        id: 15,
        title: "National Speech & Debate Tournament",
        organizer: "NSDA",
        deadline: "June 2026",
        type: "Speaking",
        eligibility: "High School Students",
        prize: "College Scholarships",
        category: "Humanities",
        url: "https://www.speechanddebate.org/",
        description: "The largest academic competition in the world for high school speech and debate.",
        difficulty: "Intermediate"
    },
    {
        id: 16,
        title: "NASA HUNCH Design Challenge",
        organizer: "NASA",
        deadline: "February 2026",
        type: "Engineering",
        eligibility: "High School Students",
        prize: "Products Used in Space",
        category: "STEM",
        url: "https://nasahunch.com/",
        description: "Design and build real projects for NASA that may be used on the International Space Station.",
        difficulty: "Advanced"
    },
    {
        id: 17,
        title: "Model United Nations Conferences",
        organizer: "Various Organizations",
        deadline: "Year-round",
        type: "Simulation",
        eligibility: "High School Students",
        prize: "Recognition & Awards",
        category: "Humanities",
        url: "https://www.un.org/en/mun",
        description: "Simulation of the United Nations where students learn about diplomacy and international relations.",
        difficulty: "Beginner"
    },
    {
        id: 18,
        title: "HackMIT",
        organizer: "MIT",
        deadline: "September 2025",
        type: "Hackathon",
        eligibility: "College & HS Students",
        prize: "Cash Prizes + Swag",
        category: "Technology",
        url: "https://hackmit.org/",
        description: "Premier university hackathon where students build innovative projects in 24 hours.",
        difficulty: "Intermediate"
    },
    {
        id: 19,
        title: "National YoungArts Foundation",
        organizer: "YoungArts",
        deadline: "October 2025",
        type: "Arts",
        eligibility: "Ages 15-18",
        prize: "$10,000 + Mentorship",
        category: "Arts",
        url: "https://www.youngarts.org/",
        description: "Recognizes talented young artists in visual, literary, performing arts and design.",
        difficulty: "Advanced"
    },
    {
        id: 20,
        title: "Physics Olympiad (USAPhO)",
        organizer: "AAPT",
        deadline: "January 2026",
        type: "Academic",
        eligibility: "High School Students",
        prize: "IPhO Team Selection",
        category: "STEM",
        url: "https://www.aapt.org/programs/physicsteam/",
        description: "Competition for high school students to represent the USA at the International Physics Olympiad.",
        difficulty: "Advanced"
    },
    {
        id: 21,
        title: "Chemistry Olympiad (USNCO)",
        organizer: "ACS",
        deadline: "March 2026",
        type: "Academic",
        eligibility: "High School Students",
        prize: "IChO Team Selection",
        category: "STEM",
        url: "https://www.acs.org/education/students/highschool/olympiad.html",
        description: "National chemistry competition leading to International Chemistry Olympiad.",
        difficulty: "Advanced"
    },
    {
        id: 22,
        title: "Biology Olympiad (USABO)",
        organizer: "CEE",
        deadline: "February 2026",
        type: "Academic",
        eligibility: "High School Students",
        prize: "IBO Team Selection",
        category: "STEM",
        url: "https://www.usabo-trc.org/",
        description: "Challenging biology competition for aspiring life scientists.",
        difficulty: "Advanced"
    },
    {
        id: 23,
        title: "MathWorks Math Modeling Challenge",
        organizer: "MathWorks",
        deadline: "March 2026",
        type: "Math",
        eligibility: "High School Teams",
        prize: "$100,000 Scholarship",
        category: "STEM",
        url: "https://m3challenge.siam.org/",
        description: "14-hour math modeling competition addressing real-world problems.",
        difficulty: "Advanced"
    },
    {
        id: 24,
        title: "Siemens Competition in Math, Science & Technology",
        organizer: "Siemens Foundation",
        deadline: "September 2025",
        type: "Research",
        eligibility: "High School Students",
        prize: "$100,000 Top Prize",
        category: "STEM",
        url: "https://www.siemens-foundation.org/programs/siemens-competition/",
        description: "Premier research-based STEM competition for high school students.",
        difficulty: "Advanced"
    },
    {
        id: 25,
        title: "FBLA National Leadership Conference",
        organizer: "FBLA",
        deadline: "June 2026",
        type: "Business",
        eligibility: "High School Students",
        prize: "Scholarships & Recognition",
        category: "Business",
        url: "https://www.fbla.org/",
        description: "Future Business Leaders of America competitive events and leadership training.",
        difficulty: "Intermediate"
    },
    {
        id: 26,
        title: "National Geographic GeoBee",
        organizer: "National Geographic",
        deadline: "January 2026",
        type: "Academic",
        eligibility: "Grades 4-8",
        prize: "$50,000 Scholarship",
        category: "Humanities",
        url: "https://www.nationalgeographic.org/education/student-experiences/geobee/",
        description: "Geography knowledge competition testing world knowledge.",
        difficulty: "Intermediate"
    },
    {
        id: 27,
        title: "SkillsUSA National Competition",
        organizer: "SkillsUSA",
        deadline: "June 2026",
        type: "Technical",
        eligibility: "High School Students",
        prize: "Tools & Scholarships",
        category: "Technology",
        url: "https://www.skillsusa.org/",
        description: "Career and technical skills competition in trade, technical and skilled service occupations.",
        difficulty: "Intermediate"
    },
    {
        id: 28,
        title: "Davidson Fellows Scholarship",
        organizer: "Davidson Institute",
        deadline: "February 2026",
        type: "Research",
        eligibility: "Under 18",
        prize: "$50,000 Scholarship",
        category: "STEM",
        url: "https://www.davidsongifted.org/gifted-programs/fellows-scholarship/",
        description: "Recognizes extraordinary accomplishments in science, technology, math, music, literature, or philosophy.",
        difficulty: "Advanced"
    },
    {
        id: 29,
        title: "Google Science Fair",
        organizer: "Google",
        deadline: "December 2025",
        type: "Research",
        eligibility: "Ages 13-18",
        prize: "$50,000 + Internship",
        category: "STEM",
        url: "https://www.googlesciencefair.com/",
        description: "Global online science and engineering competition for curious minds.",
        difficulty: "Advanced"
    },
    {
        id: 30,
        title: "FIRST Robotics Competition",
        organizer: "FIRST",
        deadline: "April 2026",
        type: "Engineering",
        eligibility: "High School Teams",
        prize: "Championships & Scholarships",
        category: "STEM",
        url: "https://www.firstinspires.org/robotics/frc",
        description: "Build and program robots to compete in action-packed sports events.",
        difficulty: "Advanced"
    },
    {
        id: 31,
        title: "VEX Robotics Competition",
        organizer: "VEX Robotics",
        deadline: "April 2026",
        type: "Engineering",
        eligibility: "Middle & High School",
        prize: "World Championship",
        category: "STEM",
        url: "https://www.vexrobotics.com/",
        description: "Design, build, and program robots in head-to-head challenges.",
        difficulty: "Intermediate"
    },
    {
        id: 32,
        title: "Amazon Future Engineer Scholarship",
        organizer: "Amazon",
        deadline: "January 2026",
        type: "Coding",
        eligibility: "High School Seniors",
        prize: "$40,000 + Internship",
        category: "Technology",
        url: "https://www.amazonfutureengineer.com/",
        description: "Computer science scholarship for underrepresented students.",
        difficulty: "Intermediate"
    },
    {
        id: 33,
        title: "Breakthrough Junior Challenge",
        organizer: "Breakthrough Prize Foundation",
        deadline: "June 2026",
        type: "Video",
        eligibility: "Ages 13-18",
        prize: "$250,000 Scholarship",
        category: "STEM",
        url: "https://breakthroughjuniorchallenge.org/",
        description: "Create original video explaining complex scientific concepts.",
        difficulty: "Intermediate"
    },
    {
        id: 34,
        title: "Concord Review",
        organizer: "The Concord Review",
        deadline: "Rolling",
        type: "Writing",
        eligibility: "High School Students",
        prize: "Publication + $250",
        category: "Humanities",
        url: "https://tcr.org/",
        description: "Quarterly journal publishing exemplary history essays by high school students.",
        difficulty: "Advanced"
    },
    {
        id: 35,
        title: "Poetry Out Loud",
        organizer: "NEA",
        deadline: "March 2026",
        type: "Performance",
        eligibility: "High School Students",
        prize: "$20,000 Scholarship",
        category: "Arts",
        url: "https://www.poetryoutloud.org/",
        description: "National poetry recitation competition promoting poetry study.",
        difficulty: "Beginner"
    },
    {
        id: 36,
        title: "National Student Poets Program",
        organizer: "Alliance for Young Artists",
        deadline: "February 2026",
        type: "Writing",
        eligibility: "Grades 10-11",
        prize: "National Recognition",
        category: "Arts",
        url: "https://www.youngarts.org/student-poets",
        description: "Nation's highest honor for youth poets presenting excellence in poetry.",
        difficulty: "Advanced"
    },
    {
        id: 37,
        title: "Intel International Science Fair (Intel ISEF)",
        organizer: "Society for Science",
        deadline: "Regional Varies",
        type: "Research",
        eligibility: "Grades 9-12",
        prize: "$9 Million Awards",
        category: "STEM",
        url: "https://www.societyforscience.org/isef/",
        description: "World's largest pre-college science competition.",
        difficulty: "Advanced"
    },
    {
        id: 38,
        title: "Future Problem Solving Program",
        organizer: "FPSPI",
        deadline: "April 2026",
        type: "Problem Solving",
        eligibility: "K-12 Students",
        prize: "International Bowl",
        category: "STEM",
        url: "https://www.fpspi.org/",
        description: "Creative problem solving using six-step process for future scenarios.",
        difficulty: "Intermediate"
    },
    {
        id: 39,
        title: "Stockholm Junior Water Prize",
        organizer: "SJWP",
        deadline: "April 2026",
        type: "Research",
        eligibility: "Ages 15-20",
        prize: "$15,000 + Trip to Sweden",
        category: "STEM",
        url: "https://www.wef.org/sjwp/",
        description: "International water-related research and environmental project competition.",
        difficulty: "Advanced"
    },
    {
        id: 40,
        title: "National Ocean Sciences Bowl",
        organizer: "NOSB",
        deadline: "February 2026",
        type: "Academic",
        eligibility: "High School Teams",
        prize: "Scholarships & Awards",
        category: "STEM",
        url: "https://nosb.org/",
        description: "Academic quiz bowl testing knowledge of ocean sciences.",
        difficulty: "Advanced"
    },
    {
        id: 41,
        title: "American Regions Mathematics League",
        organizer: "ARML",
        deadline: "June 2026",
        type: "Math",
        eligibility: "High School Students",
        prize: "Team Championships",
        category: "STEM",
        url: "https://www.arml.com/",
        description: "National mathematics competition with team and individual events.",
        difficulty: "Advanced"
    },
    {
        id: 42,
        title: "Harvard-MIT Mathematics Tournament",
        organizer: "Harvard & MIT",
        deadline: "November 2025",
        type: "Math",
        eligibility: "High School Students",
        prize: "Trophies & Recognition",
        category: "STEM",
        url: "https://www.hmmt.org/",
        description: "Prestigious annual math competition run by Harvard and MIT students.",
        difficulty: "Advanced"
    },
    {
        id: 43,
        title: "Princeton University Math Competition",
        organizer: "Princeton",
        deadline: "November 2025",
        type: "Math",
        eligibility: "High School Students",
        prize: "Awards & Recognition",
        category: "STEM",
        url: "https://pumac.princeton.edu/",
        description: "Annual mathematics competition organized by Princeton undergraduates.",
        difficulty: "Advanced"
    },
    {
        id: 44,
        title: "Stanford Math Tournament",
        organizer: "Stanford",
        deadline: "February 2026",
        type: "Math",
        eligibility: "High School Students",
        prize: "Team Awards",
        category: "STEM",
        url: "https://sumo.stanford.edu/",
        description: "Annual math competition hosted by Stanford students.",
        difficulty: "Advanced"
    },
    {
        id: 45,
        title: "Berkeley Math Tournament",
        organizer: "UC Berkeley",
        deadline: "November 2025",
        type: "Math",
        eligibility: "High School Students",
        prize: "Team Recognition",
        category: "STEM",
        url: "https://bmt.berkeley.edu/",
        description: "Annual mathematics competition organized by UC Berkeley students.",
        difficulty: "Advanced"
    },
    {
        id: 46,
        title: "CyberPatriot",
        organizer: "Air Force Association",
        deadline: "January 2026",
        type: "Cybersecurity",
        eligibility: "Middle & High School",
        prize: "$2,500 + Scholarships",
        category: "Technology",
        url: "https://www.uscyberpatriot.org/",
        description: "National Youth Cyber Education Program focusing on cybersecurity skills.",
        difficulty: "Advanced"
    },
    {
        id: 47,
        title: "picoCTF",
        organizer: "Carnegie Mellon",
        deadline: "March 2026",
        type: "Cybersecurity",
        eligibility: "Middle & High School",
        prize: "Recognition",
        category: "Technology",
        url: "https://picoctf.org/",
        description: "Free computer security education program with original content built for competition.",
        difficulty: "Intermediate"
    },
    {
        id: 48,
        title: "American Computer Science League",
        organizer: "ACSL",
        deadline: "May 2026",
        type: "Coding",
        eligibility: "Grades 6-12",
        prize: "All-Star Competition",
        category: "Technology",
        url: "https://www.acsl.org/",
        description: "Computer science competition with contests throughout the school year.",
        difficulty: "Intermediate"
    },
    {
        id: 49,
        title: "National Cyber League",
        organizer: "NCL",
        deadline: "Spring & Fall Seasons",
        type: "Cybersecurity",
        eligibility: "High School & College",
        prize: "Recognition & Swag",
        category: "Technology",
        url: "https://nationalcyberleague.org/",
        description: "Biannual cybersecurity competition for high school and college students.",
        difficulty: "Intermediate"
    },
    {
        id: 50,
        title: "TSA National Conference",
        organizer: "Technology Student Association",
        deadline: "June 2026",
        type: "Technology",
        eligibility: "Middle & High School",
        prize: "Scholarships & Recognition",
        category: "Technology",
        url: "https://tsaweb.org/",
        description: "Competitive events in STEM fields including coding, engineering, and design.",
        difficulty: "Intermediate"
    },
    {
        id: 51,
        title: "National French Contest",
        organizer: "AATF",
        deadline: "March 2026",
        type: "Language",
        eligibility: "Grades 1-12",
        prize: "Cash & Medals",
        category: "Humanities",
        url: "https://www.frenchteachers.org/concours/",
        description: "Annual French language competition testing grammar, vocabulary, and reading.",
        difficulty: "Intermediate"
    },
    {
        id: 52,
        title: "National Spanish Exam",
        organizer: "AATSP",
        deadline: "March 2026",
        type: "Language",
        eligibility: "Grades 6-12",
        prize: "Gold Medals & Recognition",
        category: "Humanities",
        url: "https://www.nationalspanishexam.org/",
        description: "Standardized Spanish language assessment and competition.",
        difficulty: "Intermediate"
    },
    {
        id: 53,
        title: "National Latin Exam",
        organizer: "NLE",
        deadline: "March 2026",
        type: "Language",
        eligibility: "Grades 6-12",
        prize: "Medals & Recognition",
        category: "Humanities",
        url: "https://www.nle.org/",
        description: "Latin language and Roman culture examination.",
        difficulty: "Intermediate"
    },
    {
        id: 54,
        title: "National German Exam",
        organizer: "AATG",
        deadline: "February 2026",
        type: "Language",
        eligibility: "Grades 8-12",
        prize: "Trips to Germany",
        category: "Humanities",
        url: "https://www.aatg.org/",
        description: "German language proficiency examination and competition.",
        difficulty: "Intermediate"
    },
    {
        id: 55,
        title: "Imagine Cup",
        organizer: "Microsoft",
        deadline: "March 2026",
        type: "Technology",
        eligibility: "High School & College",
        prize: "$100,000 Prize Pool",
        category: "Technology",
        url: "https://imaginecup.microsoft.com/",
        description: "Global technology competition for student developers and entrepreneurs.",
        difficulty: "Advanced"
    },
    {
        id: 56,
        title: "TechCrunch Disrupt Hackathon",
        organizer: "TechCrunch",
        deadline: "September 2025",
        type: "Hackathon",
        eligibility: "All Ages",
        prize: "Cash Prizes",
        category: "Technology",
        url: "https://techcrunch.com/events/",
        description: "24-hour hackathon at TechCrunch Disrupt conference.",
        difficulty: "Intermediate"
    },
    {
        id: 57,
        title: "Dell Social Innovation Challenge",
        organizer: "Dell",
        deadline: "November 2025",
        type: "Social Innovation",
        eligibility: "College & Graduate",
        prize: "$50,000 Prize",
        category: "Business",
        url: "https://www.dell.com/socialinnovation",
        description: "Competition for technology-based social innovation solutions.",
        difficulty: "Advanced"
    },
    {
        id: 58,
        title: "Conrad Challenge",
        organizer: "Conrad Foundation",
        deadline: "January 2026",
        type: "Innovation",
        eligibility: "Ages 13-18",
        prize: "$50,000 Scholarships",
        category: "STEM",
        url: "https://www.conradchallenge.org/",
        description: "Innovation challenge inspired by astronaut Pete Conrad focusing on entrepreneurship.",
        difficulty: "Intermediate"
    },
    {
        id: 59,
        title: "MATHCOUNTS National Competition",
        organizer: "MATHCOUNTS Foundation",
        deadline: "May 2026",
        type: "Math",
        eligibility: "6th-8th Grade",
        prize: "$20,000 Scholarship",
        category: "STEM",
        url: "https://www.mathcounts.org/",
        description: "Premier middle school math competition in the United States.",
        difficulty: "Advanced"
    },
    {
        id: 60,
        title: "WordMasters Challenge",
        organizer: "WordMasters",
        deadline: "Year-round",
        type: "Language Arts",
        eligibility: "Grades 3-8",
        prize: "Blue Ribbon Schools",
        category: "Humanities",
        url: "https://www.wordmasterschallenge.com/",
        description: "Vocabulary competition promoting higher-order thinking.",
        difficulty: "Intermediate"
    },
    {
        id: 61,
        title: "NASA Student Launch",
        organizer: "NASA",
        deadline: "April 2026",
        type: "Engineering",
        eligibility: "Middle School - College",
        prize: "National Recognition",
        category: "STEM",
        url: "https://www.nasa.gov/stem/studentlaunch/",
        description: "Design, build, and launch high-powered rockets.",
        difficulty: "Advanced"
    },
    {
        id: 62,
        title: "FIRST LEGO League",
        organizer: "FIRST",
        deadline: "February 2026",
        type: "Robotics",
        eligibility: "Ages 9-16",
        prize: "Championships",
        category: "STEM",
        url: "https://www.firstinspires.org/robotics/fll",
        description: "LEGO-based robotics competition with real-world challenges.",
        difficulty: "Beginner"
    },
    {
        id: 63,
        title: "National Beta Convention",
        organizer: "National Beta Club",
        deadline: "June 2026",
        type: "Leadership",
        eligibility: "Grades 4-12",
        prize: "Scholarships",
        category: "Humanities",
        url: "https://www.betaclub.org/",
        description: "Academic competition and leadership convention.",
        difficulty: "Beginner"
    },
    {
        id: 64,
        title: "National Science Olympiad",
        organizer: "Science Olympiad",
        deadline: "May 2026",
        type: "Science",
        eligibility: "Grades 6-12",
        prize: "National Championships",
        category: "STEM",
        url: "https://www.soinc.org/",
        description: "Team competition with 23 different science events.",
        difficulty: "Advanced"
    },
    {
        id: 65,
        title: "Academic Decathlon",
        organizer: "USAD",
        deadline: "April 2026",
        type: "Multidisciplinary",
        eligibility: "High School Teams",
        prize: "$200,000 Scholarships",
        category: "Humanities",
        url: "https://www.usad.org/",
        description: "Ten-event academic competition covering all subject areas.",
        difficulty: "Advanced"
    },
    {
        id: 66,
        title: "Quiz Bowl - National Academic Quiz Tournaments",
        organizer: "NAQT",
        deadline: "May 2026",
        type: "Trivia",
        eligibility: "High School Students",
        prize: "Championships",
        category: "Humanities",
        url: "https://www.naqt.com/",
        description: "Buzzer-based academic quiz competition.",
        difficulty: "Intermediate"
    },
    {
        id: 67,
        title: "National Mock Trial Championship",
        organizer: "AMTA",
        deadline: "May 2026",
        type: "Law",
        eligibility: "High School Students",
        prize: "National Champions",
        category: "Humanities",
        url: "https://www.nationalmocktrial.org/",
        description: "Simulated trial competition for aspiring lawyers.",
        difficulty: "Advanced"
    },
    {
        id: 68,
        title: "We The People Competition",
        organizer: "Center for Civic Education",
        deadline: "April 2026",
        type: "Civics",
        eligibility: "High School Students",
        prize: "National Recognition",
        category: "Humanities",
        url: "https://www.civiced.org/",
        description: "Constitutional knowledge and debate competition.",
        difficulty: "Advanced"
    },
    {
        id: 69,
        title: "National Ethics Bowl",
        organizer: "APPE",
        deadline: "April 2026",
        type: "Philosophy",
        eligibility: "High School Teams",
        prize: "National Championship",
        category: "Humanities",
        url: "https://nhseb.unc.edu/",
        description: "Team-based ethics case competition.",
        difficulty: "Advanced"
    },
    {
        id: 70,
        title: "Envirothon",
        organizer: "NCF-Envirothon",
        deadline: "July 2026",
        type: "Environmental",
        eligibility: "High School Teams",
        prize: "Scholarships",
        category: "STEM",
        url: "https://envirothon.org/",
        description: "Environmental science and natural resource management competition.",
        difficulty: "Intermediate"
    },
    {
        id: 71,
        title: "National Agricultural Communications Contest",
        organizer: "NAMA",
        deadline: "May 2026",
        type: "Agriculture",
        eligibility: "College Students",
        prize: "Recognition",
        category: "Business",
        url: "https://www.nama.org/",
        description: "Agricultural marketing and communications competition.",
        difficulty: "Intermediate"
    },
    {
        id: 72,
        title: "National FFA Convention",
        organizer: "FFA",
        deadline: "October 2025",
        type: "Agriculture",
        eligibility: "High School Students",
        prize: "Scholarships & Awards",
        category: "STEM",
        url: "https://www.ffa.org/",
        description: "Agricultural science, business, and leadership competitions.",
        difficulty: "Intermediate"
    },
    {
        id: 73,
        title: "HOSA Future Health Professionals",
        organizer: "HOSA",
        deadline: "June 2026",
        type: "Healthcare",
        eligibility: "High School Students",
        prize: "Scholarships",
        category: "STEM",
        url: "https://hosa.org/",
        description: "Health science competitive events and leadership.",
        difficulty: "Intermediate"
    },
    {
        id: 74,
        title: "National Art Honor Society Exhibition",
        organizer: "NAHS",
        deadline: "March 2026",
        type: "Visual Arts",
        eligibility: "High School Members",
        prize: "Recognition",
        category: "Arts",
        url: "https://www.arteducators.org/nahs",
        description: "National art exhibition for honor society members.",
        difficulty: "Intermediate"
    },
    {
        id: 75,
        title: "American High School Film Festival",
        organizer: "AHSFF",
        deadline: "February 2026",
        type: "Film",
        eligibility: "High School Students",
        prize: "Cash Prizes",
        category: "Arts",
        url: "https://www.hsfilmfest.com/",
        description: "Film competition celebrating high school filmmakers.",
        difficulty: "Intermediate"
    },
    {
        id: 76,
        title: "National Student Advertising Competition",
        organizer: "AAF",
        deadline: "June 2026",
        type: "Advertising",
        eligibility: "College Students",
        prize: "$10,000 Prize",
        category: "Business",
        url: "https://www.aaf.org/NSAC",
        description: "Real-world advertising campaign competition.",
        difficulty: "Advanced"
    },
    {
        id: 77,
        title: "Junior Science and Humanities Symposium",
        organizer: "JSHS",
        deadline: "February 2026",
        type: "Research",
        eligibility: "High School Students",
        prize: "$16,000 Scholarships",
        category: "STEM",
        url: "https://jshs.org/",
        description: "Original research presentations in STEM fields.",
        difficulty: "Advanced"
    },
    {
        id: 78,
        title: "Intel Science and Engineering Fair Regional",
        organizer: "Society for Science",
        deadline: "March 2026",
        type: "Research",
        eligibility: "Grades 9-12",
        prize: "ISEF Qualification",
        category: "STEM",
        url: "https://www.societyforscience.org/isef/",
        description: "Regional qualifying fair for International Science Fair.",
        difficulty: "Advanced"
    },
    {
        id: 79,
        title: "National Economics Olympiad",
        organizer: "ACE",
        deadline: "April 2026",
        type: "Economics",
        eligibility: "High School Students",
        prize: "IEO Qualification",
        category: "Business",
        url: "https://economicsolympiad.org/",
        description: "Economics competition leading to International Economics Olympiad.",
        difficulty: "Advanced"
    },
    {
        id: 80,
        title: "Fed Challenge",
        organizer: "Federal Reserve",
        deadline: "November 2025",
        type: "Economics",
        eligibility: "High School Students",
        prize: "Federal Reserve Visit",
        category: "Business",
        url: "https://www.federalreserve.gov/econres/fedchallenge.htm",
        description: "Monetary policy analysis and presentation competition.",
        difficulty: "Advanced"
    },
    {
        id: 81,
        title: "National Personal Finance Challenge",
        organizer: "InvestWrite",
        deadline: "March 2026",
        type: "Finance",
        eligibility: "Grades 4-12",
        prize: "$5,000 Savings Bond",
        category: "Business",
        url: "https://www.investwrite.org/",
        description: "Financial literacy essay competition.",
        difficulty: "Beginner"
    },
    {
        id: 82,
        title: "Stock Market Game",
        organizer: "SIFMA Foundation",
        deadline: "Spring 2026",
        type: "Finance",
        eligibility: "Grades 4-12",
        prize: "Recognition",
        category: "Business",
        url: "https://www.stockmarketgame.org/",
        description: "Virtual investing and financial literacy competition.",
        difficulty: "Beginner"
    },
    {
        id: 83,
        title: "National Young Entrepreneur Challenge",
        organizer: "NFIB",
        deadline: "May 2026",
        type: "Entrepreneurship",
        eligibility: "High School Students",
        prize: "$25,000 Prize",
        category: "Business",
        url: "https://www.nfib.com/foundations/young-entrepreneur-awards/",
        description: "Business plan competition for student entrepreneurs.",
        difficulty: "Intermediate"
    },
    {
        id: 84,
        title: "NFTE World Series of Innovation",
        organizer: "NFTE",
        deadline: "October 2025",
        type: "Entrepreneurship",
        eligibility: "Ages 13-19",
        prize: "$50,000 Investment",
        category: "Business",
        url: "https://www.nfte.com/world-series/",
        description: "Pitch competition for young entrepreneurs.",
        difficulty: "Intermediate"
    },
    {
        id: 85,
        title: "National Ocean Sciences Academic Tournament",
        organizer: "NOSAT",
        deadline: "February 2026",
        type: "Science",
        eligibility: "High School Teams",
        prize: "Marine Research Trip",
        category: "STEM",
        url: "https://nosat.org/",
        description: "Marine science knowledge competition.",
        difficulty: "Advanced"
    },
    {
        id: 86,
        title: "BioGENEius Challenge",
        organizer: "Biotechnology Institute",
        deadline: "May 2026",
        type: "Research",
        eligibility: "High School Students",
        prize: "$10,000 Scholarship",
        category: "STEM",
        url: "https://www.biotechinstitute.org/biogeneius",
        description: "Biotechnology research competition.",
        difficulty: "Advanced"
    },
    {
        id: 87,
        title: "National Neuroscience Competition",
        organizer: "Brain Bee",
        deadline: "March 2026",
        type: "Science",
        eligibility: "High School Students",
        prize: "International Brain Bee",
        category: "STEM",
        url: "https://thebrainbee.org/",
        description: "Neuroscience knowledge competition.",
        difficulty: "Advanced"
    },
    {
        id: 88,
        title: "Yale Model UN Conference",
        organizer: "Yale University",
        deadline: "January 2026",
        type: "Simulation",
        eligibility: "High School Students",
        prize: "Best Delegate Awards",
        category: "Humanities",
        url: "https://www.ymun.org/",
        description: "Premier Model United Nations conference.",
        difficulty: "Intermediate"
    },
    {
        id: 89,
        title: "Harvard Model Congress",
        organizer: "Harvard University",
        deadline: "February 2026",
        type: "Simulation",
        eligibility: "High School Students",
        prize: "Gavels & Recognition",
        category: "Humanities",
        url: "https://www.hmcongress.org/",
        description: "Congress simulation and legislative debate.",
        difficulty: "Intermediate"
    },
    {
        id: 90,
        title: "Columbia Model UN Conference",
        organizer: "Columbia University",
        deadline: "January 2026",
        type: "Simulation",
        eligibility: "High School Students",
        prize: "Awards",
        category: "Humanities",
        url: "https://www.cimun.org/",
        description: "International relations simulation conference.",
        difficulty: "Intermediate"
    },
    {
        id: 91,
        title: "National Creative Writing Competition",
        organizer: "Alliance for Young Artists",
        deadline: "December 2025",
        type: "Writing",
        eligibility: "Grades 7-12",
        prize: "Publication",
        category: "Arts",
        url: "https://www.artandwriting.org/",
        description: "Creative writing awards in multiple categories.",
        difficulty: "Intermediate"
    },
    {
        id: 92,
        title: "Princeton Model UN Conference",
        organizer: "Princeton University",
        deadline: "November 2025",
        type: "Simulation",
        eligibility: "High School Students",
        prize: "Gavels",
        category: "Humanities",
        url: "https://www.princetonfigmun.org/",
        description: "Model United Nations conference hosted by Princeton.",
        difficulty: "Intermediate"
    },
    {
        id: 93,
        title: "Berkeley Model UN",
        organizer: "UC Berkeley",
        deadline: "March 2026",
        type: "Simulation",
        eligibility: "High School Students",
        prize: "Awards",
        category: "Humanities",
        url: "https://bmun.org/",
        description: "West Coast's premier Model UN conference.",
        difficulty: "Intermediate"
    },
    {
        id: 94,
        title: "International Olympiad in Informatics",
        organizer: "IOI",
        deadline: "July 2026",
        type: "Coding",
        eligibility: "High School Students",
        prize: "Gold Medals",
        category: "Technology",
        url: "https://ioinformatics.org/",
        description: "Premier computer science Olympiad for secondary students.",
        difficulty: "Advanced"
    },
    {
        id: 95,
        title: "Microsoft Imagine Cup Junior",
        organizer: "Microsoft",
        deadline: "January 2026",
        type: "Technology",
        eligibility: "Ages 13-18",
        prize: "Mentorship + Tools",
        category: "Technology",
        url: "https://imaginecup.microsoft.com/junior",
        description: "AI for Good competition for young innovators.",
        difficulty: "Beginner"
    },
    {
        id: 96,
        title: "National Spelling Bee",
        organizer: "Scripps",
        deadline: "May 2026",
        type: "Spelling",
        eligibility: "Under 15",
        prize: "$50,000 Cash Prize",
        category: "Humanities",
        url: "https://spellingbee.com/",
        description: "America's most prestigious spelling competition.",
        difficulty: "Advanced"
    },
    {
        id: 97,
        title: "National Geography Bee",
        organizer: "National Geographic",
        deadline: "May 2026",
        type: "Geography",
        eligibility: "Grades 4-8",
        prize: "$50,000 Scholarship",
        category: "Humanities",
        url: "https://www.nationalgeographic.org/bee",
        description: "Geography competition testing world knowledge.",
        difficulty: "Intermediate"
    },
    {
        id: 98,
        title: "USA Biology Olympiad Semifinals",
        organizer: "CEE",
        deadline: "April 2026",
        type: "Science",
        eligibility: "High School Students",
        prize: "National Camp",
        category: "STEM",
        url: "https://www.usabo-trc.org/",
        description: "Advanced biology competition leading to IBO.",
        difficulty: "Advanced"
    },
    {
        id: 99,
        title: "American Invitational Mathematics Exam",
        organizer: "MAA",
        deadline: "March 2026",
        type: "Math",
        eligibility: "AMC Qualifiers",
        prize: "USAMO Invitation",
        category: "STEM",
        url: "https://www.maa.org/math-competitions/aime",
        description: "Intermediate step to USA Mathematical Olympiad.",
        difficulty: "Advanced"
    },
    {
        id: 100,
        title: "ThinkQuest Digital Media Competition",
        organizer: "Oracle Education Foundation",
        deadline: "April 2026",
        type: "Digital Media",
        eligibility: "Ages 9-19",
        prize: "$25,000 Prize",
        category: "Technology",
        url: "https://www.thinkquest.org/",
        description: "Web-based learning and digital creativity competition.",
        difficulty: "Intermediate"
    }
]

export default function CompetitionPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10

    const categories = ['All', 'STEM', 'Technology', 'Business', 'Arts', 'Humanities']
    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

    const filteredCompetitions = competitions.filter(comp => {
        const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory
        const matchesDifficulty = selectedDifficulty === 'All' || comp.difficulty === selectedDifficulty
        return matchesCategory && matchesDifficulty
    })

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCategory, selectedDifficulty])

    // Pagination calculations
    const totalPages = Math.ceil(filteredCompetitions.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentCompetitions = filteredCompetitions.slice(startIndex, endIndex)

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
                        <Trophy className="w-10 h-10 text-yellow-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarship Agent</Link>
                        <Link href="/internship" className="text-slate-600 hover:text-slate-900">Internship Agent</Link>
                        <Link href="/competition" className="text-slate-600 hover:text-slate-900 font-bold">Competition Agent</Link>
                        <Link href="/club" className="text-slate-600 hover:text-slate-900">Club Agent</Link>
                        <Link href="/financial-aid" className="text-slate-600 hover:text-slate-900">Financial Aid Agent</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Competition & Awards Agent
                    </h1>
                    <p className="text-slate-600">Discover prestigious competitions to showcase your talents and boost your college application</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-yellow-600 font-medium">Active Competitions</p>
                                    <p className="text-3xl font-bold text-yellow-700">{competitions.length}</p>
                                </div>
                                <Trophy className="w-12 h-12 text-yellow-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-red-50 border-red-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-red-600 font-medium">Upcoming Deadlines</p>
                                    <p className="text-3xl font-bold text-red-700">3</p>
                                </div>
                                <Calendar className="w-12 h-12 text-red-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-indigo-50 border-indigo-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-indigo-600 font-medium">Recommended for You</p>
                                    <p className="text-3xl font-bold text-indigo-700">4</p>
                                </div>
                                <Target className="w-12 h-12 text-indigo-400 opacity-50" />
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
                                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
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
                            <h3 className="font-semibold text-slate-900">Filter by Difficulty</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {difficulties.map(difficulty => (
                                <Button
                                    key={difficulty}
                                    onClick={() => setSelectedDifficulty(difficulty)}
                                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                                    className={selectedDifficulty === difficulty
                                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                                        : "text-slate-600"}
                                >
                                    {difficulty}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Competitions List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentCompetitions.map((comp) => (
                        <Card key={comp.id} className="hover:shadow-lg transition border-l-4 border-l-yellow-500">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-2">{comp.title}</CardTitle>
                                        <CardDescription className="text-sm text-slate-500">
                                            {comp.organizer}
                                        </CardDescription>
                                    </div>
                                    <div className="bg-yellow-100 px-3 py-1 rounded-full">
                                        <span className="text-sm font-semibold text-yellow-700">{comp.category}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-600">{comp.description}</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4 text-red-500" />
                                            <span className="font-medium text-red-600">Due: {comp.deadline}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <Users className="w-4 h-4" />
                                            <span>{comp.eligibility}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                        <div className="flex items-center space-x-2">
                                            <Trophy className="w-4 h-4 text-yellow-500" />
                                            <span className="font-semibold text-slate-700">{comp.prize}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${comp.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                                            comp.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {comp.difficulty}
                                        </span>
                                    </div>

                                    <a href={comp.url} target="_blank" rel="noopener noreferrer" className="block w-full pt-2">
                                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                            View Competition <ExternalLink className="w-4 h-4 ml-2" />
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
                                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
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
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredCompetitions.length)} of {filteredCompetitions.length} competitions
                        </p>
                    </div>
                )}

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
