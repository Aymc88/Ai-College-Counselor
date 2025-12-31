'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Target, Filter, Home, ExternalLink, Sparkles, Search, X, ScrollText, Quote, TrendingUp, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'

type Club = {
    id: number
    title: string
    category: string
    role: string
    commitment: string
    description: string
    impact: 'High' | 'Medium' | 'Low'
}

const clubs: Club[] = [
    {
        id: 1,
        title: "Chinese Culture Club",
        category: "Cultural",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Immerse in Chinese culture through festivals, arts, and language activities.",
        impact: "Medium"
    },
    {
        id: 2,
        title: "LEO Club",
        category: "Service",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "International volunteering club promoting leadership through community service.",
        impact: "High"
    },
    {
        id: 3,
        title: "Mock Trial",
        category: "Academic",
        role: "Founder/President",
        commitment: "10-15 hrs/week",
        description: "Simulate court trials, learning legal procedures and public speaking.",
        impact: "High"
    },
    {
        id: 4,
        title: "3D Printing Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Learn CAD and 3D printing technologies in a makerspace environment.",
        impact: "High"
    },
    {
        id: 5,
        title: "Acoustics Club",
        category: "STEM/Arts",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Explore the science of sound and music theory through experiments and competitions.",
        impact: "Medium"
    },
    {
        id: 6,
        title: "Amnesty International",
        category: "Service",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Defend and promote human rights through education and advocacy.",
        impact: "High"
    },
    {
        id: 7,
        title: "Anime Club",
        category: "Cultural",
        role: "Founder/President",
        commitment: "1-2 hrs/week",
        description: "Celebrate anime culture with showings, trivia, and community events.",
        impact: "Low"
    },
    {
        id: 8,
        title: "Athena Project",
        category: "Service/Arts",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Use art to support community health and well-being in senior homes and hospitals.",
        impact: "High"
    },
    {
        id: 9,
        title: "ACES (Endangered Species)",
        category: "Service/Environmental",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Raise awareness and funds for endangered species conservation.",
        impact: "Medium"
    },
    {
        id: 10,
        title: "Baking Club",
        category: "Hobby/Service",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Learn baking skills and host fundraisers for charity.",
        impact: "Medium"
    },
    {
        id: 11,
        title: "Biology/USABO Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "5-8 hrs/week",
        description: "Prepare for biology olympiads and explore advanced biological topics.",
        impact: "High"
    },
    {
        id: 12,
        title: "Board Game Club",
        category: "Hobby",
        role: "Founder/President",
        commitment: "1-3 hrs/week",
        description: "Socialize and learn strategy through board games.",
        impact: "Low"
    },
    {
        id: 13,
        title: "Book Club",
        category: "Arts/Humanities",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Discuss literature across various genres in a supportive community.",
        impact: "Medium"
    },
    {
        id: 14,
        title: "California Scholarship Federation",
        category: "Service/Academic",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Honor society emphasizing scholarship and community service.",
        impact: "High"
    },
    {
        id: 15,
        title: "Care for Children",
        category: "Service",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Raise funds and awareness for underprivileged children's education.",
        impact: "High"
    },
    {
        id: 16,
        title: "Chemistry Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Explore chemistry careers and research through lectures and demos.",
        impact: "High"
    },
    {
        id: 17,
        title: "Civics Club",
        category: "Political",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Discuss and debate political events and civic education.",
        impact: "Medium"
    },
    {
        id: 18,
        title: "Climbing Club",
        category: "Sports",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Promote physical activity and socialization through rock climbing.",
        impact: "Medium"
    },
    {
        id: 19,
        title: "Cloud and Networking",
        category: "STEM",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Learn about cloud computing and internet technologies.",
        impact: "High"
    },
    {
        id: 20,
        title: "Computational Economics",
        category: "STEM/Business",
        role: "Founder/President",
        commitment: "4-6 hrs/week",
        description: "Apply computational tech to economics, trading, and data analysis.",
        impact: "High"
    },
    {
        id: 21,
        title: "Cooking Club",
        category: "Hobby/Service",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Learn cooking skills and serve the community through food.",
        impact: "Medium"
    },
    {
        id: 22,
        title: "CS Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Learn computer science theory and applications, and compete.",
        impact: "High"
    },
    {
        id: 23,
        title: "Cubing Challenge Club",
        category: "Hobby",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Solve Rubik's cubes and discuss techniques.",
        impact: "Low"
    },
    {
        id: 24,
        title: "Cybersecurity / Ethical Hacking",
        category: "STEM",
        role: "Founder/President",
        commitment: "5-8 hrs/week",
        description: "Learn cybersecurity skills and participate in CTF competitions.",
        impact: "High"
    },
    {
        id: 25,
        title: "Mission D.C. (Diabolo)",
        category: "Cultural/Performance",
        role: "Founder/President",
        commitment: "4-8 hrs/week",
        description: "Practice and perform Chinese yoyo to spread cultural awareness.",
        impact: "Medium"
    },
    {
        id: 26,
        title: "Data Science",
        category: "STEM",
        role: "Founder/President",
        commitment: "4-6 hrs/week",
        description: "Explore data science applications, AI, and statistics.",
        impact: "High"
    },
    {
        id: 27,
        title: "DECA",
        category: "Business",
        role: "Founder/President",
        commitment: "10-15 hrs/week",
        description: "Gain experience in business, marketing, and entrepreneurship.",
        impact: "High"
    },
    {
        id: 28,
        title: "En Passant (Chess)",
        category: "Hobby/Strategy",
        role: "Founder/President",
        commitment: "2-5 hrs/week",
        description: "Promote chess knowledge and enjoyment through play and tournaments.",
        impact: "Medium"
    },
    {
        id: 29,
        title: "FCSN Club",
        category: "Service",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Support children with special needs through volunteering and education.",
        impact: "High"
    },
    {
        id: 30,
        title: "Film Club",
        category: "Arts",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Study filmmaking aspects like scripting, filming, and editing.",
        impact: "High"
    },
    {
        id: 31,
        title: "Gender-Sexuality Alliance",
        category: "Social/Advocacy",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Create a safe space and advocate for LGBTQ+ students.",
        impact: "Medium"
    },
    {
        id: 32,
        title: "Generation She",
        category: "Business/Leadership",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Empower underrepresented groups in entrepreneurship and leadership.",
        impact: "High"
    },
    {
        id: 33,
        title: "Green Club",
        category: "Environmental",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Promote environmental sustainability on campus and in the community.",
        impact: "High"
    },
    {
        id: 34,
        title: "High Performance Computing",
        category: "STEM",
        role: "Founder/President",
        commitment: "4-6 hrs/week",
        description: "Learn about advanced CS concepts like quantum computing.",
        impact: "High"
    },
    {
        id: 35,
        title: "History Club",
        category: "Academic",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Participate in National History Day and explore historical topics.",
        impact: "Medium"
    },
    {
        id: 36,
        title: "ISA (Indian Student Assoc)",
        category: "Cultural",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Celebrate Indian culture and traditions through events and festivals.",
        impact: "Medium"
    },
    {
        id: 37,
        title: "Japan Club",
        category: "Cultural",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Learn Japanese language and culture through festivals and activities.",
        impact: "Medium"
    },
    {
        id: 38,
        title: "Kids Against Hunger",
        category: "Service",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Pack meals for vulnerable children worldwide.",
        impact: "High"
    },
    {
        id: 39,
        title: "Korean Club",
        category: "Cultural",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Explore Korean culture, food, and entertainment.",
        impact: "Medium"
    },
    {
        id: 40,
        title: "Lifting Club",
        category: "Sports",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Community for weightlifters and fitness enthusiasts.",
        impact: "Low"
    },
    {
        id: 41,
        title: "Math Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Explore math topics and participate in math competitions.",
        impact: "High"
    },
    {
        id: 42,
        title: "Medcorps",
        category: "Medical/Service",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Gain exposure to medical careers through volunteering and research.",
        impact: "High"
    },
    {
        id: 43,
        title: "Model UN",
        category: "Academic/Political",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Simulate UN proceedings and debate global issues.",
        impact: "High"
    },
    {
        id: 44,
        title: "Municipal Journal",
        category: "Journalism",
        role: "Founder/President",
        commitment: "4-8 hrs/week",
        description: "Report on local policy and municipal government.",
        impact: "High"
    },
    {
        id: 45,
        title: "Music Impromptu",
        category: "Arts/Service",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Perform music for nursing homes and public events.",
        impact: "Medium"
    },
    {
        id: 46,
        title: "National Arts Honors Society",
        category: "Arts/Service",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Promote art and earn service hours through art projects.",
        impact: "High"
    },
    {
        id: 47,
        title: "Neurodiversity Alliance",
        category: "Social/Advocacy",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Foster acceptance and celebration of neurodiversity.",
        impact: "Medium"
    },
    {
        id: 48,
        title: "Neuroscience Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Explore neuroscience topics and research.",
        impact: "High"
    },
    {
        id: 49,
        title: "PAWS (Animal Welfare)",
        category: "Service",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Raise awareness and volunteer for animal welfare.",
        impact: "Medium"
    },
    {
        id: 50,
        title: "Philosophy Club",
        category: "Humanities",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Debate and discuss philosophical perspectives.",
        impact: "Medium"
    },
    {
        id: 51,
        title: "Physics Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "4-6 hrs/week",
        description: "Explore physics through lectures, labs, and competitions.",
        impact: "High"
    },
    {
        id: 52,
        title: "Psychology Club",
        category: "Social Science",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Learn about psychology careers and concepts.",
        impact: "Medium"
    },
    {
        id: 53,
        title: "RED (Menstrual Equity)",
        category: "Service/Advocacy",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Advocate for menstrual equity and women's rights.",
        impact: "Medium"
    },
    {
        id: 54,
        title: "Rocketry Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Build and launch rockets, competing in national challenges.",
        impact: "High"
    },
    {
        id: 55,
        title: "Show Choir",
        category: "Arts/Performance",
        role: "Founder/President",
        commitment: "6-10 hrs/week",
        description: "Sing and dance in a show choir group.",
        impact: "High"
    },
    {
        id: 56,
        title: "Society of Women Engineers",
        category: "STEM",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Empower women to pursue engineering careers.",
        impact: "High"
    },
    {
        id: 57,
        title: "Speech and Debate",
        category: "Academic",
        role: "Founder/President",
        commitment: "10-15 hrs/week",
        description: "Develop public speaking and critical thinking skills.",
        impact: "High"
    },
    {
        id: 58,
        title: "Sports Analytics",
        category: "STEM/Sports",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Apply data science to sports analysis.",
        impact: "Medium"
    },
    {
        id: 59,
        title: "Surfrider",
        category: "Environmental",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Protect oceans and beaches through cleanups and awareness.",
        impact: "Medium"
    },
    {
        id: 60,
        title: "Tech and Robotics",
        category: "STEM",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Learn robotics hardware, software, and electrical engineering.",
        impact: "High"
    },
    {
        id: 61,
        title: "Women in STEM",
        category: "STEM",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Support and inspire girls in STEM careers.",
        impact: "High"
    },
    {
        id: 62,
        title: "Young Mentors",
        category: "Service",
        role: "Founder/President",
        commitment: "2-5 hrs/week",
        description: "Provide free academic tutoring to younger students.",
        impact: "High"
    },
    {
        id: 63,
        title: "Youth4Climate",
        category: "Environmental/STEM",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Use STEM and humanities to address climate change.",
        impact: "High"
    },
    {
        id: 64,
        title: "MedTech Club",
        category: "Medical/STEM",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Explore technological advancements in medicine.",
        impact: "High"
    },
    {
        id: 65,
        title: "Muslim Student Association",
        category: "Cultural/Religious",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Community for Muslim students and open dialogue.",
        impact: "Medium"
    },
    {
        id: 66,
        title: "Phoenix Art & Lit Mag",
        category: "Arts/Journalism",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Create and publish an art and literary magazine.",
        impact: "Medium"
    },
    {
        id: 67,
        title: "Spanish Honors Society",
        category: "Cultural/Academic",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Promote Spanish language and culture through service.",
        impact: "High"
    },
    {
        id: 68,
        title: "TEDx[Your School]",
        category: "Leadership",
        role: "Founder/President",
        commitment: "4-8 hrs/week",
        description: "Organize TEDx events and discuss ideas.",
        impact: "High"
    },
    {
        id: 69,
        title: "Trading Card Game Club",
        category: "Hobby",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Play trading card games and participate in tournaments.",
        impact: "Low"
    },
    {
        id: 70,
        title: "Universal Performers",
        category: "Arts/Performance",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Promote drama and theatre arts through productions.",
        impact: "High"
    },
    {
        id: 71,
        title: "Vietnamese Student Assoc",
        category: "Cultural",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Share Vietnamese culture, food, and traditions.",
        impact: "Medium"
    },
    {
        id: 72,
        title: "Writer's Block",
        category: "Academic/Service",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Provide peer-editing services for student writing.",
        impact: "High"
    },
    {
        id: 73,
        title: "Youth Alive Christian Club",
        category: "Religious",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Christian fellowship and community service.",
        impact: "Medium"
    },
    {
        id: 74,
        title: "Girls Who Code",
        category: "STEM",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Build coding skills and community for girls.",
        impact: "High"
    },
    {
        id: 75,
        title: "Interact",
        category: "Service",
        role: "Founder/President",
        commitment: "5-10 hrs/week",
        description: "Large community service club affiliated with Rotary.",
        impact: "High"
    },
    {
        id: 76,
        title: "Esports",
        category: "Hobby/Sports",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Competitive gaming and community.",
        impact: "Medium"
    },
    {
        id: 77,
        title: "Exit Zine",
        category: "Journalism/Advocacy",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Feminist magazine for student expression.",
        impact: "Medium"
    },
    {
        id: 78,
        title: "Best Buddies",
        category: "Service",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Foster friendships with students with IDD.",
        impact: "High"
    },
    {
        id: 79,
        title: "First Responders",
        category: "Medical/Service",
        role: "Founder/President",
        commitment: "3-5 hrs/week",
        description: "Learn emergency response and medical skills.",
        impact: "High"
    },
    {
        id: 80,
        title: "VAMS",
        category: "Arts/Service",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Serve community through visual arts and music.",
        impact: "Medium"
    },
    {
        id: 81,
        title: "Aviation Club",
        category: "STEM",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Explore aviation and flight.",
        impact: "Medium"
    },
    {
        id: 82,
        title: "SeroMed",
        category: "Medical",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Mentorship for future medical careers.",
        impact: "High"
    },
    {
        id: 83,
        title: "iKnit",
        category: "Hobby/Service",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Knitting and crocheting for charity.",
        impact: "Medium"
    },
    {
        id: 84,
        title: "COR Dance Club",
        category: "Arts/Performance",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Express through various dance styles.",
        impact: "Medium"
    },
    {
        id: 85,
        title: "Poverty Patchup",
        category: "Service",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Address homelessness through resources and support.",
        impact: "High"
    },
    {
        id: 86,
        title: "Academic Challenge",
        category: "Academic",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Compete in academic challenges like Quiz Bowl.",
        impact: "High"
    },
    {
        id: 87,
        title: "Investment Club",
        category: "Business",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Learn financial literacy and investing.",
        impact: "High"
    },
    {
        id: 88,
        title: "MSJ Makes",
        category: "STEM/Arts",
        role: "Founder/President",
        commitment: "3-6 hrs/week",
        description: "Create products using makerspace tools.",
        impact: "High"
    },
    {
        id: 89,
        title: "Beautification",
        category: "Service/Arts",
        role: "Founder/President",
        commitment: "2-4 hrs/week",
        description: "Enhance school environment through art and design.",
        impact: "Medium"
    }
]

// Helper functions to generate content
const generateSlogan = (club: Club) => {
    const slogans: Record<string, string> = {
        "Chinese Culture Club": "Celebrating Heritage, Building Friendship.",
        "LEO Club": "Leadership, Experience, Opportunity.",
        "Mock Trial": "Justice in Action.",
        "3D Printing Club": "Design. Print. Create.",
        "Acoustics Club": "Resonating with Science and Sound.",
        "Amnesty International": "Fighting for Human Rights, Everywhere.",
        "Anime Club": "Your Portal to Japanese Pop Culture.",
        "Athena Project": "Art for Healing, Art for Hope.",
        "ACES": "Protecting Species, Preserving Futures.",
        "Baking Club": "Baking the World a Better Place.",
        "Biology/USABO Club": "Exploring the Science of Life.",
        "Board Game Club": "Strategy, Fun, and Friendship.",
        "Book Club": "Opening Books, Opening Minds.",
        "California Scholarship Federation": "Scholarship for Service.",
        "Care for Children": "Education for Every Child.",
        "Chemistry Club": "Reacting to the Future.",
        "Civics Club": "Empowering Tomorrow's Citizens.",
        "Climbing Club": "Reach New Heights.",
        "Cloud and Networking": "Connecting the Future.",
        "Computational Economics": "Where Tech Meets Markets.",
        "Cooking Club": "Cooking Up Community.",
        "CS Club": "Coding the Future.",
        "Cubing Challenge Club": "Solving Puzzles, Building Minds.",
        "Cybersecurity / Ethical Hacking": "Securing the Digital World.",
        "Mission D.C.": "Spinning Tradition into Performance.",
        "Data Science": "Unlocking Insights from Data.",
        "DECA": "Preparing Emerging Leaders and Entrepreneurs.",
        "En Passant": "Mastering the Game of Kings.",
        "FCSN Club": "Supporting Special Needs, Building Community.",
        "Film Club": "Lights, Camera, Action!",
        "Gender-Sexuality Alliance": "Pride, Unity, and Respect.",
        "Generation She": "Empowering Future Female Leaders.",
        "Green Club": "Reuse, Recycle, Save the Future.",
        "High Performance Computing": "Computing at the Speed of Light.",
        "History Club": "Learning from the Past, Shaping the Future.",
        "ISA": "Celebrating Indian Culture.",
        "Japan Club": "Experience Japan.",
        "Kids Against Hunger": "Feeding Hope, Ending Hunger.",
        "Korean Club": "Sharing Korean Culture and Cuisine.",
        "Lifting Club": "Stronger Together.",
        "Math Club": "Calculating Success.",
        "Medcorps": "Service in Medicine.",
        "Model UN": "Diplomacy for a Better World.",
        "Municipal Journal": "Reporting Local, Impacting Global.",
        "Music Impromptu": "Sharing Music, Spreading Joy.",
        "National Arts Honors Society": "Creativity with a Purpose.",
        "Neurodiversity Alliance": "Celebrating Different Minds.",
        "Neuroscience Club": "Unlocking the Brain's Mysteries.",
        "PAWS": "Helping Paws, Happy Hearts.",
        "Philosophy Club": "Question Everything.",
        "Physics Club": "Understanding the Universe.",
        "Psychology Club": "Understanding the Mind.",
        "RED": "Equity, Dignity, Period.",
        "Rocketry Club": "The Sky is Not the Limit.",
        "Show Choir": "Singing and Dancing with Passion.",
        "Society of Women Engineers": "Aspire, Advance, Achieve.",
        "Speech and Debate": "Speak Up, Stand Out.",
        "Sports Analytics": "The Science of Sport.",
        "Surfrider": "Protecting Our Oceans.",
        "Tech and Robotics": "Building the Future, One Robot at a Time.",
        "Women in STEM": "Empowering Women in Science.",
        "Young Mentors": "Mentoring the Next Generation.",
        "Youth4Climate": "Innovating for a Greener Planet.",
        "MedTech Club": "Technology Saving Lives.",
        "Muslim Student Association": "Faith, Friendship, and Understanding.",
        "Phoenix Art & Lit Mag": "Showcasing Student Creativity.",
        "Spanish Honors Society": "Celebrating Hispanic Culture.",
        "TEDx[Your School]": "Ideas Worth Spreading.",
        "Trading Card Game Club": "It's Time to Duel!",
        "Universal Performers": "All the World's a Stage.",
        "Vietnamese Student Assoc": "Sharing Vietnamese Heritage.",
        "Writer's Block": "Polishing Your Words.",
        "Youth Alive Christian Club": "Faith, Fun, and Fellowship.",
        "Girls Who Code": "Closing the Gender Gap in Tech.",
        "Interact": "Service Above Self.",
        "Esports": "Game On.",
        "Exit Zine": "Voices for Feminism.",
        "Best Buddies": "Friendship Without Barriers.",
        "First Responders": "Ready to Respond, Ready to Save.",
        "VAMS": "Visual Arts and Music for Society.",
        "Aviation Club": "Soaring to New Horizons.",
        "SeroMed": "Guiding Future Healers.",
        "iKnit": "Knitting for a Cause.",
        "COR Dance Club": "Express Yourself Through Dance.",
        "Poverty Patchup": "Patching Up Poverty.",
        "Academic Challenge": "Challenge Your Mind.",
        "Investment Club": "Investing in Your Future.",
        "MSJ Makes": "Make It Happen.",
        "Beautification": "Making Our School Beautiful."
    }
    return slogans[club.title] || "Community, Leadership, Excellence."
}

const generateConstitution = (club: Club) => {
    const year = "2025-2026"
    return `
${club.title.toUpperCase()} ${year} CONSTITUTION

ARTICLE 1: ORGANIZATION 
SECTION 1. NAME OF ORGANIZATION
--- The name of this club shall be ${club.title}.

SECTION 2. PURPOSE AND MEANS OF ACCOMPLISHMENT 
--- The purpose of the ${club.title} is to ${club.description.charAt(0).toLowerCase() + club.description.slice(1)} We aim to foster a community of like-minded individuals who are passionate about ${club.category} and want to make a positive impact.

ARTICLE 2: MEETINGS AND EVENTS 
SECTION 1. MEETING PROFILE
--- Regular meetings will be held on Fridays at lunch.
--- Regular meetings will be held in a designated classroom on campus.
--- Regular meetings will be held bi-weekly.

SECTION 2. ANNOUNCEMENTS OF MEETINGS
--- Members will be notified of upcoming meetings via social media and school announcements by the Activities Coordinator.

SECTION 3. DEFINITION OF QUORUM
--- A quorum for meetings shall consist of at least three officers.

ARTICLE 3: MEMBERSHIPS 
SECTION 1. ELIGIBILITY FOR MEMBERSHIP
 --- Membership is open to all students at [Your School High School] with no fees.

SECTION 2. MEMBERSHIP DUES
--- There are no fees to join as members.

SECTION 3. TERMS OF MEMBERSHIP
--- Membership lasts for one school year.

SECTION 4. MEMBERSHIP EXCLUSION
--- Members may be excluded from meetings/events if they engage in disruptive behavior, violate club rules, or consistently fail to attend without valid reasons.

ARTICLE 4: OFFICERS AND ELECTIONS
SECTION 1. TITLES AND DUTIES OF OFFICERS 
--- The club shall have the following officer positions: President, Vice President, Secretary, Treasurer, and Activity Coordinator.
President: Oversees club meetings and activities, represents the club in official matters.
Vice President: Assists the President and assumes their duties in their absence.
Secretary: Keeps records of meetings, membership, and club activities.
Treasurer: Manages club finances and answers any questions related to club expenditures or transactions.
Activity Coordinator: Plans and organizes club events and activities.

SECTION 2. ELECTION OF OFFICERS 
--- Officer positions will be determined through elections among selected committee members. Elections will be held quarterly.

SECTION 3. REQUIREMENTS FOR ELIGIBILITY 
--- All committee members will be eligible to be elected.

SECTION 4. TERM OF OFFICE 
--- Officers shall serve for one semester.

SECTION 5. OFFICER REMOVAL 
--- An officer may be removed by a majority vote of the other officers for failure to perform their duties.

SECTION 6. VACANCY OF OFFICE
--- If an officer leaves their position, a special election will be held to fill the vacancy.

ARTICLE 5: ADULT ADVISORS
SECTION 1. DUTIES OF ADULT ADVISOR
--- The advisor is responsible for supervising all club meetings and activities, ensuring adherence to school rules, and providing guidance.

ARTICLE 6: FINANCIAL ACTIVITIES
SECTION 1. REVENUES AND FUNDRAISERS 
--- The club will operate as a non-profit student organization.

ARTICLE 7: AMENDMENTS 
SECTION 1. PROPOSITIONS 
--- Amendments to this constitution may be proposed by any member.

SECTION 2. RATIFICATION 
--- An amendment must be approved by a two-thirds vote of the committee members.
`
}

export default function ClubPage() {
    const [userInterests, setUserInterests] = useState('')
    const [recommendations, setRecommendations] = useState<Club[]>([])
    const [showRecommendations, setShowRecommendations] = useState(false)
    const [selectedClub, setSelectedClub] = useState<Club | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    const categories = ['All', 'Academic', 'STEM', 'Service', 'Cultural', 'Arts', 'Business', 'Medical', 'Political', 'Environmental', 'Hobby']

    // Simulating "Most Popular" clubs (just taking a diverse set of 10 for now)
    const popularClubs = [
        clubs[21], // CS Club
        clubs[1],  // LEO Club
        clubs[56], // Speech and Debate
        clubs[42], // Model UN
        clubs[26], // DECA
        clubs[53], // Rocketry Club
        clubs[73], // Girls Who Code
        clubs[40], // Math Club
        clubs[3],  // 3D Printing Club
        clubs[59]  // Tech and Robotics
    ]

    const handleAnalyze = () => {
        if (!userInterests.trim()) return

        const keywords = userInterests.toLowerCase().split(/\W+/)

        const scoredClubs = clubs.map(club => {
            let score = 0
            const text = `${club.title} ${club.category} ${club.description}`.toLowerCase()

            keywords.forEach(keyword => {
                if (keyword.length > 3 && text.includes(keyword)) {
                    score += 1
                }
            })

            return { club, score }
        })

        const topClubs = scoredClubs
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map(item => item.club)

        setRecommendations(topClubs)
        setShowRecommendations(true)
    }

    return (
        <div className="min-h-screen bg-slate-50 relative">
            {/* Modal Overlay */}
            {selectedClub && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="bg-indigo-600 p-6 text-white relative shrink-0">
                            <button
                                onClick={() => setSelectedClub(null)}
                                className="absolute top-4 right-4 text-white/80 hover:text-white transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-3xl font-bold mb-2">{selectedClub.title}</h2>
                            <div className="flex items-center gap-2 text-indigo-100 italic">
                                <Quote className="w-4 h-4" />
                                <span>{generateSlogan(selectedClub)}</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                                    {selectedClub.category}
                                </span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                                    {selectedClub.commitment}
                                </span>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="space-y-8">
                                {/* Club Profile */}
                                <section>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-indigo-600" />
                                        Club Proposal
                                    </h3>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
                                        {selectedClub.description}
                                        <br /><br />
                                        <strong>Why Start This Club?</strong><br />
                                        Founding the {selectedClub.title} allows you to demonstrate leadership by organizing events, managing a team, and creating a community for {selectedClub.category} enthusiasts. It's a powerful way to leave a legacy at your school.
                                    </div>
                                </section>

                                {/* Constitution */}
                                <section>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <ScrollText className="w-5 h-5 text-indigo-600" />
                                        Draft Constitution
                                    </h3>
                                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 font-mono text-sm text-slate-600 whitespace-pre-wrap h-96 overflow-y-auto shadow-inner">
                                        {generateConstitution(selectedClub)}
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
                            <Button onClick={() => setSelectedClub(null)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 mb-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Users className="w-10 h-10 text-indigo-600" />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">Match Agent</Link>
                        <Link href="/pathway" className="text-slate-600 hover:text-slate-900">Career Path Agent</Link>
                        <Link href="/progress" className="text-slate-600 hover:text-slate-900">Progress Agent</Link>
                        <Link href="/essay" className="text-slate-600 hover:text-slate-900">Essay Agent</Link>
                        <Link href="/scholarship" className="text-slate-600 hover:text-slate-900">Scholarship Agent</Link>
                        <Link href="/internship" className="text-slate-600 hover:text-slate-900">Internship Agent</Link>
                        <Link href="/competition" className="text-slate-600 hover:text-slate-900">Competition Agent</Link>
                        <Link href="/club" className="text-slate-600 hover:text-slate-900 font-bold">Club Agent</Link>
                        <Link href="/financial-aid" className="text-slate-600 hover:text-slate-900">Financial Aid Agent</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Club & Extracurricular Agent
                    </h1>
                    <p className="text-slate-600">Discover club ideas you can found to demonstrate leadership and create impact at your school.</p>
                </div>

                {/* AI Recommendation Section */}
                <Card className="mb-10 border-indigo-200 bg-indigo-50/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-indigo-800">
                            <Sparkles className="w-5 h-5" />
                            AI Club Founder Recommender
                        </CardTitle>
                        <CardDescription>
                            Describe your interests and goals, and I'll recommend unique clubs you can start.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Textarea
                                placeholder="e.g., I want to start a club that combines technology with social good..."
                                className="bg-white"
                                rows={3}
                                value={userInterests}
                                onChange={(e) => setUserInterests(e.target.value)}
                            />
                            <Button
                                onClick={handleAnalyze}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                <Search className="w-4 h-4 mr-2" /> Find Club Ideas
                            </Button>
                        </div>

                        {showRecommendations && (
                            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                <h3 className="text-lg font-semibold text-indigo-900 mb-4">Top Ideas for You to Start:</h3>
                                {recommendations.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {recommendations.map(club => (
                                            <Card
                                                key={club.id}
                                                className="hover:shadow-lg transition border-l-4 border-l-indigo-500 cursor-pointer group bg-white"
                                                onClick={() => setSelectedClub(club)}
                                            >
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <CardTitle className="text-lg mb-2 group-hover:text-indigo-600 transition">{club.title}</CardTitle>
                                                            <CardDescription className="text-sm text-slate-500">
                                                                {club.role}
                                                            </CardDescription>
                                                        </div>
                                                        <div className="bg-indigo-100 px-3 py-1 rounded-full">
                                                            <span className="text-sm font-semibold text-indigo-700">{club.category}</span>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        <p className="text-sm text-slate-600 line-clamp-2">{club.description}</p>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                                                <Calendar className="w-4 h-4 text-slate-500" />
                                                                <span className="font-medium text-slate-600">{club.commitment}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                                                <Target className="w-4 h-4 text-slate-500" />
                                                                <span>Impact: <span className={`font-semibold ${club.impact === 'High' ? 'text-green-600' :
                                                                    club.impact === 'Medium' ? 'text-yellow-600' : 'text-slate-600'
                                                                    }`}>{club.impact}</span></span>
                                                            </div>
                                                        </div>

                                                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white mt-2">
                                                            View Blueprint <ExternalLink className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-600 italic">No specific matches found. Try adding more details about your interests!</p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Categories */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <Filter className="w-5 h-5 text-slate-600" />
                        <h3 className="font-semibold text-slate-900">Explore Ideas by Category</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant={selectedCategory === category ? "default" : "outline"}
                                className={selectedCategory === category
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    : "text-slate-600"}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Most Popular / Trending Clubs */}
                {!showRecommendations && (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex items-center space-x-2 mb-6">
                            <TrendingUp className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-2xl font-bold text-slate-900">
                                {selectedCategory === 'All' ? 'Popular Club Ideas' : `Top ${selectedCategory} Ideas`}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(selectedCategory === 'All' ? popularClubs : clubs.filter(c => c.category.includes(selectedCategory)).slice(0, 10)).map((club) => (
                                <Card
                                    key={club.id}
                                    className="hover:shadow-lg transition border-l-4 border-l-indigo-500 cursor-pointer group bg-white"
                                    onClick={() => setSelectedClub(club)}
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg mb-2 group-hover:text-indigo-600 transition">{club.title}</CardTitle>
                                                <CardDescription className="text-sm text-slate-500">
                                                    {club.role}
                                                </CardDescription>
                                            </div>
                                            <div className="bg-indigo-100 px-3 py-1 rounded-full">
                                                <span className="text-sm font-semibold text-indigo-700">{club.category}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-sm text-slate-600 line-clamp-2">{club.description}</p>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                                    <Calendar className="w-4 h-4 text-slate-500" />
                                                    <span className="font-medium text-slate-600">{club.commitment}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                                    <Target className="w-4 h-4 text-slate-500" />
                                                    <span>Impact: <span className={`font-semibold ${club.impact === 'High' ? 'text-green-600' :
                                                        club.impact === 'Medium' ? 'text-yellow-600' : 'text-slate-600'
                                                        }`}>{club.impact}</span></span>
                                                </div>
                                            </div>

                                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white mt-2">
                                                View Blueprint <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
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
