'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, DollarSign, Calendar, Users, Award, Filter, Home, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Scholarship = {
    id: number
    name: string
    amount: string
    deadline: string
    eligibility: string[]
    category: string
    provider: string
    url: string
}

const scholarships: Scholarship[] = [
    {
        id: 1,
        name: "Coca-Cola Scholars Program",
        amount: "$20,000",
        deadline: "October 31, 2025",
        eligibility: ["High School Senior", "GPA 3.0+", "Leadership"],
        category: "Leadership",
        provider: "Coca-Cola Scholars Foundation",
        url: "https://www.coca-colascholarsfoundation.org/"
    },
    {
        id: 2,
        name: "The Gates Scholarship",
        amount: "Full Cost of Attendance",
        deadline: "September 15, 2025",
        eligibility: ["High School Senior", "Pell-Eligible", "Minority Student"],
        category: "Need-Based",
        provider: "Bill & Melinda Gates Foundation",
        url: "https://www.thegatesscholarship.org/"
    },
    {
        id: 3,
        name: "Elks Most Valuable Student Scholarship",
        amount: "Up to $50,000",
        deadline: "November 15, 2025",
        eligibility: ["High School Senior", "U.S. Citizen", "Leadership"],
        category: "Academic Excellence",
        provider: "Elks National Foundation",
        url: "https://www.elks.org/scholars/scholarships/mvs.cfm"
    },
    {
        id: 4,
        name: "Jack Kent Cooke College Scholarship",
        amount: "Up to $55,000/year",
        deadline: "November 14, 2025",
        eligibility: ["High School Senior", "GPA 3.5+", "Financial Need"],
        category: "Academic Excellence",
        provider: "Jack Kent Cooke Foundation",
        url: "https://www.jkcf.org/our-scholarships/college-scholarship-program/"
    },
    {
        id: 5,
        name: "Equitable Excellence Scholarship",
        amount: "Up to $5,000",
        deadline: "December 18, 2025",
        eligibility: ["High School Senior", "Community Impact", "Ambition"],
        category: "Leadership",
        provider: "Equitable Foundation",
        url: "https://equitable.com/foundation/equitable-excellence-scholarship"
    },
    {
        id: 6,
        name: "Ron Brown Scholar Program",
        amount: "$40,000",
        deadline: "January 9, 2026",
        eligibility: ["High School Senior", "Black/African American", "Leadership"],
        category: "Diversity",
        provider: "Ron Brown Scholar Fund",
        url: "https://www.ronbrown.org/"
    },
    {
        id: 7,
        name: "QuestBridge National College Match",
        amount: "Full 4-Year Scholarship",
        deadline: "September 2025",
        eligibility: ["High School Senior", "High-Achieving", "Low-Income"],
        category: "Need-Based",
        provider: "QuestBridge",
        url: "https://www.questbridge.org/"
    },
    {
        id: 8,
        name: "Dell Scholars Program",
        amount: "$20,000 + Laptop",
        deadline: "December 1, 2025",
        eligibility: ["High School Senior", "Pell Grant Eligible", "GPA 2.4+"],
        category: "Need-Based",
        provider: "Michael & Susan Dell Foundation",
        url: "https://www.dellscholars.org/"
    },
    {
        id: 9,
        name: "AXA Achievement Scholarship",
        amount: "$10,000 - $25,000",
        deadline: "December 15, 2025",
        eligibility: ["High School Senior", "Achievement", "Ambition"],
        category: "Leadership",
        provider: "AXA Foundation",
        url: "https://www.axa.com/en/about-axa/axa-achievement-scholarship"
    },
    {
        id: 10,
        name: "Horatio Alger Association Scholarship",
        amount: "$25,000",
        deadline: "October 25, 2025",
        eligibility: ["High School Senior", "Financial Need", "Perseverance"],
        category: "Need-Based",
        provider: "Horatio Alger Association",
        url: "https://scholars.horatioalger.org/"
    },
    {
        id: 11,
        name: "Davidson Fellows Scholarship",
        amount: "$50,000 - $10,000",
        deadline: "February 2026",
        eligibility: ["Under 18", "Significant Project", "Exceptional Work"],
        category: "Academic Excellence",
        provider: "Davidson Institute",
        url: "https://www.davidsongifted.org/gifted-programs/fellows-scholarship/"
    },
    {
        id: 12,
        name: "National Merit Scholarship",
        amount: "$2,500 - Full Tuition",
        deadline: "PSAT/NMSQT Scores",
        eligibility: ["High School Junior/Senior", "PSAT Top Scorers"],
        category: "Academic Excellence",
        provider: "National Merit Scholarship Corporation",
        url: "https://www.nationalmerit.org/"
    },
    {
        id: 13,
        name: "Hispanic Scholarship Fund",
        amount: "$500 - $5,000",
        deadline: "February 15, 2026",
        eligibility: ["Hispanic Heritage", "GPA 3.0+", "College-Bound"],
        category: "Diversity",
        provider: "Hispanic Scholarship Fund",
        url: "https://www.hsf.net/"
    },
    {
        id: 14,
        name: "UNCF General Scholarship",
        amount: "Varies",
        deadline: "Rolling Basis",
        eligibility: ["African American", "College-Bound", "Financial Need"],
        category: "Diversity",
        provider: "United Negro College Fund",
        url: "https://www.uncf.org/scholarships"
    },
    {
        id: 15,
        name: "American Indian College Fund Scholarship",
        amount: "$2,000 - $8,000",
        deadline: "May 31, 2026",
        eligibility: ["Native American", "Tribal Member", "College Student"],
        category: "Diversity",
        provider: "American Indian College Fund",
        url: "https://collegefund.org/students/scholarships/"
    },
    {
        id: 16,
        name: "Generation Google Scholarship",
        amount: "$10,000",
        deadline: "December 2025",
        eligibility: ["Computer Science Major", "Underrepresented Groups", "Leadership"],
        category: "STEM",
        provider: "Google",
        url: "https://buildyourfuture.withgoogle.com/scholarships"
    },
    {
        id: 17,
        name: "Society of Women Engineers Scholarship",
        amount: "$1,000 - $15,000",
        deadline: "February 15, 2026",
        eligibility: ["Female", "Engineering Major", "GPA 3.0+"],
        category: "STEM",
        provider: "Society of Women Engineers",
        url: "https://swe.org/scholarships/"
    },
    {
        id: 18,
        name: "STEM Scholarship by Lockheed Martin",
        amount: "$10,000",
        deadline: "Multiple Deadlines",
        eligibility: ["STEM Major", "High School Senior", "Financial Need"],
        category: "STEM",
        provider: "Lockheed Martin",
        url: "https://www.lockheedmartin.com/en-us/who-we-are/communities/stem-education.html"
    },
    {
        id: 19,
        name: "YoungArts Foundation Award",
        amount: "$10,000",
        deadline: "October 2025",
        eligibility: ["Ages 15-18", "Exceptional Artist", "Portfolio Required"],
        category: "Arts",
        provider: "National YoungArts Foundation",
        url: "https://www.youngarts.org/"
    },
    {
        id: 20,
        name: "Scholastic Art & Writing Scholarship",
        amount: "$500 - $10,000",
        deadline: "December 2025",
        eligibility: ["Grades 7-12", "Creative Work", "Portfolio"],
        category: "Arts",
        provider: "Alliance for Young Artists & Writers",
        url: "https://www.artandwriting.org/"
    },
    {
        id: 21,
        name: "GE-Reagan Foundation Scholarship",
        amount: "$40,000",
        deadline: "January 6, 2026",
        eligibility: ["High School Senior", "Leadership", "Service", "GPA 3.0+"],
        category: "Leadership",
        provider: "GE & Reagan Foundation",
        url: "https://www.reaganfoundation.org/education/scholarship-programs/ge-reagan-foundation-scholarship-program/"
    },
    {
        id: 22,
        name: "Burger King Scholars Program",
        amount: "$1,000 - $50,000",
        deadline: "December 15, 2025",
        eligibility: ["High School Senior", "GPA 2.5+", "Part-Time Work"],
        category: "Leadership",
        provider: "Burger King Foundation",
        url: "https://burgerking.scholarsapply.org/"
    },
    {
        id: 23,
        name: "Foot Locker Scholar Athletes",
        amount: "$20,000",
        deadline: "December 19, 2025",
        eligibility: ["High School Senior", "Athlete", "GPA 3.0+"],
        category: "Leadership",
        provider: "Foot Locker Foundation",
        url: "https://www.footlockerscholarathletes.com/"
    },
    {
        id: 24,
        name: "Cameron Impact Scholarship",
        amount: "Full Tuition",
        deadline: "September 2025",
        eligibility: ["High School Senior", "Exceptional", "Leadership"],
        category: "Academic Excellence",
        provider: "Bryan Cameron Education Foundation",
        url: "https://www.bryancameroneducationfoundation.org/"
    },
    {
        id: 25,
        name: "Prudential Spirit of Community Awards",
        amount: "$1,000 - $5,000",
        deadline: "November 2025",
        eligibility: ["Grades 5-12", "Community Service"],
        category: "Leadership",
        provider: "Prudential Financial",
        url: "https://spirit.prudential.com/"
    },
    {
        id: 26,
        name: "Amazon Women in Innovation Scholarship",
        amount: "$10,000",
        deadline: "January 2026",
        eligibility: ["Female", "Computer Science", "Junior/Senior"],
        category: "STEM",
        provider: "Amazon",
        url: "https://www.amazonfutureengineer.com/scholarships"
    },
    {
        id: 27,
        name: "Microsoft Tuition Scholarship",
        amount: "$5,000",
        deadline: "February 2026",
        eligibility: ["Computer Science", "Minority Students", "College Student"],
        category: "STEM",
        provider: "Microsoft",
        url: "https://careers.microsoft.com/students/us/en/usuniversityscholarship"
    },
    {
        id: 28,
        name: "Adobe Research Women-in-Technology Scholarship",
        amount: "$10,000",
        deadline: "December 2025",
        eligibility: ["Female", "Computer Science", "Undergraduate"],
        category: "STEM",
        provider: "Adobe",
        url: "https://research.adobe.com/scholarship/"
    },
    {
        id: 29,
        name: "Point Foundation Scholarship",
        amount: "Varies",
        deadline: "January 2026",
        eligibility: ["LGBTQ+", "College-Bound", "Merit"],
        category: "Diversity",
        provider: "Point Foundation",
        url: "https://pointfoundation.org/point-apply/scholarship-application/"
    },
    {
        id: 30,
        name: "Jackie Robinson Foundation Scholarship",
        amount: "$30,000",
        deadline: "February 2026",
        eligibility: ["Minority Student", "Leadership", "Financial Need"],
        category: "Diversity",
        provider: "Jackie Robinson Foundation",
        url: "https://www.jackierobinson.org/apply/"
    },
    {
        id: 31,
        name: "Asian & Pacific Islander American Scholarship",
        amount: "$2,500 - $20,000",
        deadline: "January 2026",
        eligibility: ["Asian/Pacific Islander", "GPA 2.7+", "Financial Need"],
        category: "Diversity",
        provider: "APIASF",
        url: "https://apiasf.org/scholarship/"
    },
    {
        id: 32,
        name: "Dream.US National Scholarship",
        amount: "Up to $33,000",
        deadline: "February 2026",
        eligibility: ["DACA", "Undocumented", "College-Bound"],
        category: "Diversity",
        provider: "TheDream.US",
        url: "https://www.thedream.us/scholarships/"
    },
    {
        id: 33,
        name: "MPOWER Financing Scholarship",
        amount: "$2,000 - $5,000",
        deadline: "Quarterly",
        eligibility: ["International Students", "DACA", "College Student"],
        category: "Diversity",
        provider: "MPOWER Financing",
        url: "https://www.mpowerfinancing.com/scholarships/"
    },
    {
        id: 34,
        name: "P.E.O. Scholar Awards",
        amount: "$15,000",
        deadline: "November 2025",
        eligibility: ["Female", "Graduate Student", "US/Canada"],
        category: "Academic Excellence",
        provider: "P.E.O. International",
        url: "https://www.peointernational.org/psa-eligibility-requirements"
    },
    {
        id: 35,
        name: "Collegiate Inventors Competition",
        amount: "$15,000",
        deadline: "June 2026",
        eligibility: ["Undergraduate", "Inventor", "STEM"],
        category: "STEM",
        provider: "National Inventors Hall of Fame",
        url: "https://www.invent.org/programs/collegiate-inventors-competition"
    },
    {
        id: 36,
        name: "AFSA National High School Essay Contest",
        amount: "$2,000",
        deadline: "March 2026",
        eligibility: ["High School Student", "Essay Writing"],
        category: "Academic Excellence",
        provider: "American Foreign Service Association",
        url: "https://www.afsa.org/essay-contest"
    },
    {
        id: 37,
        name: "VFW Voice of Democracy",
        amount: "$1,000 - $30,000",
        deadline: "October 2025",
        eligibility: ["Grades 9-12", "Audio Essay"],
        category: "Leadership",
        provider: "Veterans of Foreign Wars",
        url: "https://www.vfw.org/community/youth-and-education/youth-scholarships"
    },
    {
        id: 38,
        name: "Daughters of the American Revolution Scholarship",
        amount: "$2,000 - $5,000",
        deadline: "February 2026",
        eligibility: ["High School Senior", "US Citizen", "Various Fields"],
        category: "Academic Excellence",
        provider: "DAR",
        url: "https://www.dar.org/national-society/scholarships"
    },
    {
        id: 39,
        name: "Stephen J. Brady STOP Hunger Scholarship",
        amount: "$5,000",
        deadline: "December 2025",
        eligibility: ["Ages 5-25", "Hunger Relief", "Community Service"],
        category: "Leadership",
        provider: "Sodexo Foundation",
        url: "https://us.stop-hunger.org/scholarships"
    },
    {
        id: 40,
        name: "KFC Scholars Program",
        amount: "$2,500 - $5,000",
        deadline: "February 2026",
        eligibility: ["High School Senior", "Financial Need", "Employee Preferred"],
        category: "Need-Based",
        provider: "KFC Foundation",
        url: "https://kfcscholars.org/"
    },
    {
        id: 41,
        name: "Nordstrom Scholarship",
        amount: "$10,000",
        deadline: "May 2026",
        eligibility: ["High School Student", "Various States", "Leadership"],
        category: "Leadership",
        provider: "Nordstrom",
        url: "https://nordstromcares.com/scholarship/"
    },
    {
        id: 42,
        name: "Jeannette Rankin Women's Scholarship",
        amount: "$2,000",
        deadline: "March 2026",
        eligibility: ["Women 35+", "Low-Income", "Career Change"],
        category: "Need-Based",
        provider: "Jeannette Rankin Foundation",
        url: "https://rankinfoundation.org/students/apply/"
    },
    {
        id: 43,
        name: "American Legion Auxiliary Scholarship",
        amount: "$1,000 - $5,000",
        deadline: "March 2026",
        eligibility: ["Descendant of Veteran", "High School Senior"],
        category: "Academic Excellence",
        provider: "American Legion Auxiliary",
        url: "https://www.legion-aux.org/scholarships"
    },
    {
        id: 44,
        name: "AES Engineering Scholarship",
        amount: "$500",
        deadline: "April & October",
        eligibility: ["Engineering Student", "All Levels"],
        category: "STEM",
        provider: "AES Engineers",
        url: "https://www.aesengineers.com/scholarships"
    },
    {
        id: 45,
        name: "APIA Scholarship",
        amount: "$2,500 - $20,000",
        deadline: "January 2026",
        eligibility: ["Asian/Pacific Islander", "Financial Need", "GPA 2.7+"],
        category: "Diversity",
        provider: "APIA Scholars",
        url: "https://apiasf.org/scholarship_apiascholars.html"
    },
    {
        id: 46,
        name: "Sallie Mae $2,000 Scholarship",
        amount: "$2,000",
        deadline: "Monthly",
        eligibility: ["All Students", "Simple Application"],
        category: "Academic Excellence",
        provider: "Sallie Mae",
        url: "https://www.salliemae.com/scholarships/"
    },
    {
        id: 47,
        name: "Niche $50,000 Scholarship",
        amount: "$50,000",
        deadline: "Monthly",
        eligibility: ["All Students", "Simple Entry"],
        category: "Academic Excellence",
        provider: "Niche",
        url: "https://www.niche.com/colleges/scholarships/"
    },
    {
        id: 48,
        name: "Unigo $10K Scholarship",
        amount: "$10,000",
        deadline: "December 2025",
        eligibility: ["High School/College", "Short Essay"],
        category: "Academic Excellence",
        provider: "Unigo",
        url: "https://www.unigo.com/scholarships"
    },
    {
        id: 49,
        name: "Cappex Easy Money Scholarship",
        amount: "$1,000",
        deadline: "Monthly",
        eligibility: ["High School/College", "Profile Completion"],
        category: "Academic Excellence",
        provider: "Cappex",
        url: "https://www.cappex.com/scholarships"
    },
    {
        id: 50,
        name: "Fastweb $1,000 Scholarship",
        amount: "$1,000",
        deadline: "Quarterly",
        eligibility: ["All Students", "Profile Match"],
        category: "Academic Excellence",
        provider: "Fastweb",
        url: "https://www.fastweb.com/college-scholarships"
    },
    {
        id: 51,
        name: "NSHSS Foundation Scholarship",
        amount: "$1,000 - $2,500",
        deadline: "Various",
        eligibility: ["NSHSS Member", "Academic Achievement"],
        category: "Academic Excellence",
        provider: "National Society of High School Scholars",
        url: "https://www.nshss.org/scholarships/"
    },
    {
        id: 52,
        name: "Marine Corps Scholarship Foundation",
        amount: "Up to $10,000",
        deadline: "March 2026",
        eligibility: ["Child of Marine", "Financial Need"],
        category: "Need-Based",
        provider: "Marine Corps Scholarship Foundation",
        url: "https://www.mcsf.org/apply"
    },
    {
        id: 53,
        name: "Navy-Marine Corps Relief Society Scholarship",
        amount: "$3,000",
        deadline: "May 2026",
        eligibility: ["Navy/Marine Family", "College-Bound"],
        category: "Need-Based",
        provider: "NMCRS",
        url: "https://www.nmcrs.org/education-loans-and-scholarships"
    },
    {
        id: 54,
        name: "Air Force Aid Society Scholarship",
        amount: "$2,000 - $5,000",
        deadline: "March 2026",
        eligibility: ["Air Force Family", "Dependent"],
        category: "Need-Based",
        provider: "Air Force Aid Society",
        url: "https://afas.org/how-we-help/education-support/"
    },
    {
        id: 55,
        name: "Army Emergency Relief Scholarship",
        amount: "$1,000 - $4,000",
        deadline: "March 2026",
        eligibility: ["Army Family", "Dependent"],
        category: "Need-Based",
        provider: "Army Emergency Relief",
        url: "https://www.armyemergencyrelief.org/"
    },
    {
        id: 56,
        name: "Pat Tillman Foundation Scholarship",
        amount: "$10,000",
        deadline: "February 2026",
        eligibility: ["Military Veteran", "Service Member", "Spouse"],
        category: "Leadership",
        provider: "Pat Tillman Foundation",
        url: "https://pattillmanfoundation.org/apply/"
    },
    {
        id: 57,
        name: "Fisher House Foundation Scholarship",
        amount: "$2,500",
        deadline: "March 2026",
        eligibility: ["Military Family", "Purple Heart Recipient Family"],
        category: "Need-Based",
        provider: "Fisher House Foundation",
        url: "https://scholarships.militaryscholar.org/"
    },
    {
        id: 58,
        name: "Google Lime Scholarship",
        amount: "$10,000",
        deadline: "December 2025",
        eligibility: ["Computer Science", "Disability", "Undergraduate"],
        category: "Diversity",
        provider: "Google & Lime Connect",
        url: "https://www.limeconnect.com/programs/page/google-lime-scholarship"
    },
    {
        id: 59,
        name: "National Federation of the Blind Scholarship",
        amount: "$3,000 - $12,000",
        deadline: "March 2026",
        eligibility: ["Legally Blind", "College-Bound"],
        category: "Diversity",
        provider: "NFB",
        url: "https://nfb.org/scholarships"
    },
    {
        id: 60,
        name: "Sertoma Scholarships for the Deaf/Hard of Hearing",
        amount: "$1,000",
        deadline: "May 2026",
        eligibility: ["Deaf/Hard of Hearing", "GPA 3.2+"],
        category: "Diversity",
        provider: "Sertoma",
        url: "https://sertoma.org/what-we-do/scholarships/"
    },
    {
        id: 61,
        name: "Smithsonian Institution Fellowship",
        amount: "$7,500",
        deadline: "January 2026",
        eligibility: ["Graduate Student", "Research Interest"],
        category: "Academic Excellence",
        provider: "Smithsonian Institution",
        url: "https://www.smithsonianofi.com/fellowship-opportunities/"
    },
    {
        id: 62,
        name: "Barry Goldwater Scholarship",
        amount: "$7,500",
        deadline: "January 2026",
        eligibility: ["Sophomore/Junior", "STEM Excellence", "Research"],
        category: "STEM",
        provider: "Barry Goldwater Foundation",
        url: "https://goldwaterscholarship.gov/"
    },
    {
        id: 63,
        name: "Churchill Scholarship",
        amount: "$50,000",
        deadline: "November 2025",
        eligibility: ["Senior/Graduate", "Study at Cambridge", "STEM"],
        category: "STEM",
        provider: "Winston Churchill Foundation",
        url: "https://www.churchillscholarship.org/"
    },
    {
        id: 64,
        name: "Rhodes Scholarship",
        amount: "Full Cost + Stipend",
        deadline: "October 2025",
        eligibility: ["Senior/Graduate", "Study at Oxford", "Excellence"],
        category: "Academic Excellence",
        provider: "Rhodes Trust",
        url: "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/"
    },
    {
        id: 65,
        name: "Marshall Scholarship",
        amount: "Full Cost",
        deadline: "October 2025",
        eligibility: ["Senior/Graduate", "Study in UK", "High Achievement"],
        category: "Academic Excellence",
        provider: "Marshall Aid Commemoration Commission",
        url: "https://www.marshallscholarship.org/"
    },
    {
        id: 66,
        name: "Fulbright Scholarship",
        amount: "Full Grant",
        deadline: "October 2025",
        eligibility: ["Graduate", "International Study", "Research"],
        category: "Academic Excellence",
        provider: "US Department of State",
        url: "https://us.fulbrightonline.org/"
    },
    {
        id: 67,
        name: "Beinecke Scholarship",
        amount: "$4,000 + $30,000",
        deadline: "February 2026",
        eligibility: ["Junior", "Graduate School Bound", "Arts/Humanities/Social Sciences"],
        category: "Academic Excellence",
        provider: "Beinecke Foundation",
        url: "https://www.beineckescholarship.org/"
    },
    {
        id: 68,
        name: "Truman Scholarship",
        amount: "$30,000",
        deadline: "February 2026",
        eligibility: ["Junior", "Public Service", "Leadership"],
        category: "Leadership",
        provider: "Harry S. Truman Foundation",
        url: "https://www.truman.gov/"
    },
    {
        id: 69,
        name: "Udall Scholarship",
        amount: "$7,000",
        deadline: "March 2026",
        eligibility: ["Sophomore/Junior", "Environment/Native American Health"],
        category: "STEM",
        provider: "Udall Foundation",
        url: "https://www.udall.gov/OurPrograms/Scholarship/Scholarship.aspx"
    },
    {
        id: 70,
        name: "California Community Foundation Scholarship",
        amount: "$1,000 - $10,000",
        deadline: "March 2026",
        eligibility: ["LA County Resident", "Various Fields"],
        category: "Need-Based",
        provider: "California Community Foundation",
        url: "https://www.calfund.org/scholarships/"
    },
    {
        id: 71,
        name: "San Francisco Foundation Scholarship",
        amount: "$5,000 - $20,000",
        deadline: "January 2026",
        eligibility: ["Bay Area Student", "College-Bound"],
        category: "Need-Based",
        provider: "San Francisco Foundation",
        url: "https://sff.org/students/"
    },
    {
        id: 72,
        name: "Jeannette Rankin Women's Foundation",
        amount: "$2,000",
        deadline: "March 2026",
        eligibility: ["Women 35+", "Low-Income", "Vocational"],
        category: "Need-Based",
        provider: "Jeannette Rankin Foundation",
        url: "https://rankinfoundation.org/"
    },
    {
        id: 73,
        name: "The Garden Club of America Scholarship",
        amount: "$4,000 - $5,000",
        deadline: "February 2026",
        eligibility: ["Horticulture/Environmental", "Graduate"],
        category: "STEM",
        provider: "Garden Club of America",
        url: "https://www.gcamerica.org/scholarships"
    },
    {
        id: 74,
        name: "Paul \u0026 Daisy Soros Fellowship",
        amount: "$90,000",
        deadline: "November 2025",
        eligibility: ["New American", "Graduate School", "Excellence"],
        category: "Diversity",
        provider: "Paul \u0026 Daisy Soros Fellowships",
        url: "https://www.pdsoros.org/"
    },
    {
        id: 75,
        name: "Knights of Columbus Scholarship",
        amount: "$500 - $1,500",
        deadline: "March 2026",
        eligibility: ["Catholic", "KofC Member Family"],
        category: "Academic Excellence",
        provider: "Knights of Columbus",
        url: "https://www.kofc.org/en/what-we-do/college-scholarships/index.html"
    },
    {
        id: 76,
        name: "NAACP Scholarships",
        amount: "$2,000 - $5,000",
        deadline: "March 2026",
        eligibility: ["NAACP Member", "US Citizen", "GPA 2.5+"],
        category: "Diversity",
        provider: "NAACP",
        url: "https://naacp.org/find-resources/scholarships-awards"
    },
    {
        id: 77,
        name: "Sons of Norway Foundation Scholarship",
        amount: "$1,000 - $3,000",
        deadline: "March 2026",
        eligibility: ["Norwegian Heritage", "Member Relative"],
        category: "Academic Excellence",
        provider: "Sons of Norway Foundation",
        url: "https://www.sonsofnorway.com/foundation/scholarships/"
    },
    {
        id: 78,
        name: "Christopher Reeve Scholarship",
        amount: "$2,000",
        deadline: "February 2026",
        eligibility: ["Spinal Cord Injury", "College Student"],
        category: "Diversity",
        provider: "Christopher \u0026 Dana Reeve Foundation",
        url: "https://www.christopherreeve.org/living-with-paralysis/find-support/scholarships"
    },
    {
        id: 79,
        name: "Organization of American Historians Scholarship",
        amount: "$1,000 - $5,000",
        deadline: "December 2025",
        eligibility: ["History Major", "Graduate Student"],
        category: "Academic Excellence",
        provider: "OAH",
        url: "https://www.oah.org/awards/"
    },
    {
        id: 80,
        name: "American Psychological Association Scholarship",
        amount: "$1,000 - $3,000",
        deadline: "January 2026",
        eligibility: ["Psychology Major", "Graduate Student", "Minority"],
        category: "STEM",
        provider: "APA",
        url: "https://www.apa.org/about/awards/scholarships"
    },
    {
        id: 81,
        name: "American Chemical Society Scholars",
        amount: "Up to $5,000",
        deadline: "March 2026",
        eligibility: ["Chemistry Major", "Underrepresented Minority"],
        category: "STEM",
        provider: "American Chemical Society",
        url: "https://www.acs.org/education/students/college/acsscholars.html"
    },
    {
        id: 82,
        name: "American Physical Society Scholarship",
        amount: "$3,000",
        deadline: "February 2026",
        eligibility: ["Physics Major", "Undergraduate", "Minority"],
        category: "STEM",
        provider: "APS",
        url: "https://www.aps.org/programs/minorities/scholarships/"
    },
    {
        id: 83,
        name: "National Association of Black Journalists",
        amount: "$2,500",
        deadline: "February 2026",
        eligibility: ["African American", "Journalism Major"],
        category: "Arts",
        provider: "NABJ",
        url: "https://www.nabj.org/page/SEEDScholarships"
    },
    {
        id: 84,
        name: "Radio Television Digital News Foundation",
        amount: "$1,000 - $10,000",
        deadline: "January 2026",
        eligibility: ["Journalism Student", "Broadcasting"],
        category: "Arts",
        provider: "RTDNF",
        url: "https://www.rtdna.org/content/scholarships"
    },
    {
        id: 85,
        name: "American Institute of Architects Scholarship",
        amount: "$2,500 - $5,000",
        deadline: "January 2026",
        eligibility: ["Architecture Student", "Undergraduate"],
        category: "STEM",
        provider: "AIA",
        url: "https://www.aia.org/resources/6076996-aia-scholarships"
    },
    {
        id: 86,
        name: "American Society of Interior Designers Scholarship",
        amount: "$4,000",
        deadline: "March 2026",
        eligibility: ["Interior Design", "Undergraduate"],
        category: "Arts",
        provider: "ASID",
        url: "https://www.asid.org/asid-foundation/scholarships"
    },
    {
        id: 87,
        name: "Fashion Scholarship Fund",
        amount: "$5,000 - $25,000",
        deadline: "March 2026",
        eligibility: ["Fashion Major", "College Student"],
        category: "Arts",
        provider: "YMA Fashion Scholarship Fund",
        url: "https://ymafsf.org/"
    },
    {
        id: 88,
        name: "National Restaurant Association Scholarship",
        amount: "$2,500 - $10,000",
        deadline: "March 2026",
        eligibility: ["Culinary/Hospitality", "College Student"],
        category: "Academic Excellence",
        provider: "National Restaurant Association",
        url: "https://www.nraef.org/scholarships"
    },
    {
        id: 89,
        name: "American Hotel \u0026 Lodging Educational Foundation",
        amount: "$1,000 - $5,000",
        deadline: "May 2026",
        eligibility: ["Hospitality Major", "College Student"],
        category: "Academic Excellence",
        provider: "AHLEF",
        url: "https://www.ahlef.org/scholarships/"
    },
    {
        id: 90,
        name: "American Institute of CPAs Scholarship",
        amount: "$5,000 - $10,000",
        deadline: "March 2026",
        eligibility: ["Accounting Major", "Undergraduate", "GPA 3.0+"],
        category: "Academic Excellence",
        provider: "AICPA",
        url: "https://thiswaytocpa.com/education/aicpa-legacy-scholars/"
    },
    {
        id: 91,
        name: "National Association of Black Accountants",
        amount: "$1,000 - $10,000",
        deadline: "January 2026",
        eligibility: ["African American", "Accounting Major"],
        category: "Diversity",
        provider: "NABA",
        url: "https://www.nabainc.org/scholarships"
    },
    {
        id: 92,
        name: "American Marketing Association Scholarship",
        amount: "$2,500",
        deadline: "February 2026",
        eligibility: ["Marketing Major", "AMA Member"],
        category: "Academic Excellence",
        provider: "AMA",
        url: "https://www.ama.org/academic-divisions/scholarships/"
    },
    {
        id: 93,
        name: "Public Relations Society of America Scholarship",
        amount: "$1,500 - $5,000",
        deadline: "January 2026",
        eligibility: ["PR/Communications", "Undergraduate"],
        category: "Arts",
        provider: "PRSA",
        url: "https://www.prsa.org/scholarships-awards/"
    },
    {
        id: 94,
        name: "American Advertising Federation Scholarship",
        amount: "$2,500",
        deadline: "February 2026",
        eligibility: ["Advertising Major", "College Student"],
        category: "Arts",
        provider: "AAF",
        url: "https://www.aaf.org/Public/Membership/College_Members/Scholarships.aspx"
    },
    {
        id: 95,
        name: "American Medical Association Foundation Scholarships",
        amount: "$2,000 - $10,000",
        deadline: "March 2026",
        eligibility: ["Medical Student", "Financial Need"],
        category: "STEM",
        provider: "AMA Foundation",
        url: "https://www.amafoundation.org/medical-student-scholarships/"
    },
    {
        id: 96,
        name: "American Dental Association Foundation Scholarships",
        amount: "$2,500 - $5,000",
        deadline: "April 2026",
        eligibility: ["Dental Student", "Undergraduate"],
        category: "STEM",
        provider: "ADA Foundation",
        url: "https://www.ada.org/en/education-careers/scholarships"
    },
    {
        id: 97,
        name: "American Nurses Foundation Scholarships",
        amount: "$2,500 - $10,000",
        deadline: "May 2026",
        eligibility: ["Nursing Student", "BSN/Graduate"],
        category: "STEM",
        provider: "ANF",
        url: "https://www.nursingworld.org/foundation/scholarships/"
    },
    {
        id: 98,
        name: "American Veterinary Medical Foundation",
        amount: "$1,000 - $5,000",
        deadline: "March 2026",
        eligibility: ["Veterinary Student", "Financial Need"],
        category: "STEM",
        provider: "AVMF",
        url: "https://www.avmf.org/scholarships/"
    },
    {
        id: 99,
        name: "American Occupational Therapy Foundation",
        amount: "$500 - $5,000",
        deadline: "December 2025",
        eligibility: ["Occupational Therapy", "Graduate Student"],
        category: "STEM",
        provider: "AOTF",
        url: "https://www.aotf.org/scholarships"
    },
    {
        id: 100,
        name: "American Physical Therapy Association Scholarship",
        amount: "$1,500 - $10,000",
        deadline: "January 2026",
        eligibility: ["Physical Therapy", "DPT Student"],
        category: "STEM",
        provider: "APTA",
        url: "https://www.apta.org/for-student-members/scholarships"
    }
]

export default function ScholarshipPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10

    const categories = ['All', 'Academic Excellence', 'Need-Based', 'Leadership', 'Diversity', 'STEM', 'Arts']

    const filteredScholarships = selectedCategory === 'All'
        ? scholarships
        : scholarships.filter(s => s.category === selectedCategory)

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCategory])

    // Pagination calculations
    const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentScholarships = filteredScholarships.slice(startIndex, endIndex)

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
                        <Award className="w-10 h-10 text-yellow-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900 font-bold">Scholarship Agent</Link>
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
                        Scholarship Agent
                    </h1>
                    <p className="text-slate-600">Find scholarships that match your profile and reduce your college costs</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-yellow-600 font-medium">Available Scholarships</p>
                                    <p className="text-3xl font-bold text-yellow-700">{scholarships.length}</p>
                                </div>
                                <Award className="w-12 h-12 text-yellow-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-600 font-medium">Total Award Value</p>
                                    <p className="text-3xl font-bold text-green-700">$163K+</p>
                                </div>
                                <DollarSign className="w-12 h-12 text-green-400 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600 font-medium">Matched for You</p>
                                    <p className="text-3xl font-bold text-purple-700">4</p>
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

                {/* Scholarship List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentScholarships.map((scholarship) => (
                        <Card key={scholarship.id} className="hover:shadow-lg transition">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-2">{scholarship.name}</CardTitle>
                                        <CardDescription className="text-sm text-slate-500">
                                            {scholarship.provider}
                                        </CardDescription>
                                    </div>
                                    <div className="bg-yellow-100 px-3 py-1 rounded-full">
                                        <span className="text-sm font-semibold text-yellow-700">{scholarship.category}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        <span className="font-bold text-green-700 text-xl">{scholarship.amount}</span>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Deadline: {scholarship.deadline}</span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 mb-2">Eligibility:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {scholarship.eligibility.map((req, i) => (
                                                <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a href={scholarship.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                                            View Details
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
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredScholarships.length)} of {filteredScholarships.length} scholarships
                        </p>
                    </div>
                )}

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                            <Home className="w-4 h-4 mr-2" /> MCP Server
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
