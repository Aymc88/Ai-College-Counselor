import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json()

        // Simple response logic - you can enhance this with actual AI integration
        const response = generateResponse(message, history)

        return NextResponse.json({ response })
    } catch (error) {
        console.error('Chat API error:', error)
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        )
    }
}

function generateResponse(message: string, history: any[]): string {
    const lowerMessage = message.toLowerCase()

    // College admissions context
    if (lowerMessage.includes('gpa') || lowerMessage.includes('grade')) {
        return "GPA is important, but it's just one part of your application! Colleges look at your course rigor, extracurriculars, essays, and recommendations too. Aim for challenging courses that interest you while maintaining strong grades."
    }

    if (lowerMessage.includes('sat') || lowerMessage.includes('act') || lowerMessage.includes('test')) {
        return "Many colleges are test-optional now, but strong scores can still help! Focus on preparing well if you choose to submit. Check each school's testing policy on their admissions website."
    }

    if (lowerMessage.includes('extracurricular') || lowerMessage.includes('activities') || lowerMessage.includes('club')) {
        return "Quality over quantity! Focus on activities you're passionate about and try to take on leadership roles. Depth and impact matter more than joining many clubs superficially."
    }

    if (lowerMessage.includes('essay') || lowerMessage.includes('write') || lowerMessage.includes('personal statement')) {
        return "Your essay is your chance to show who you are beyond grades! Be authentic, tell your story, and focus on what makes you unique. Start early and get feedback from teachers or counselors."
    }

    if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid') || lowerMessage.includes('money')) {
        return "Don't let cost stop you from applying! Many schools offer need-based and merit-based aid. Check out our Scholarship Agent and Financial Aid Agent for specific opportunities and guidance on FAFSA/CSS Profile."
    }

    if (lowerMessage.includes('major') || lowerMessage.includes('career') || lowerMessage.includes('what should i study')) {
        return "It's okay not to know your exact major yet! Most students change majors. Explore your interests through courses and activities. Our Career Agent can help you discover paths that match your strengths and interests."
    }

    if (lowerMessage.includes('recommendation') || lowerMessage.includes('letter')) {
        return "Choose recommenders who know you well and can speak to your strengths! Ask early (at least a month before deadlines), provide them with your resume and goals, and send a thank you note."
    }

    if (lowerMessage.includes('deadline') || lowerMessage.includes('when')) {
        return "Application deadlines vary by school and type (Early Decision, Early Action, Regular Decision). ED/EA deadlines are typically November 1-15, while Regular Decision is often January 1-15. Check each school's specific dates!"
    }

    if (lowerMessage.includes('safety') || lowerMessage.includes('reach') || lowerMessage.includes('match') || lowerMessage.includes('school list')) {
        return "Build a balanced college list! Include reach schools (15-20% admission chance), match schools (40-60% chance), and safety schools (80%+ chance). Our Match Agent can help you find schools that fit your profile."
    }

    if (lowerMessage.includes('interview') || lowerMessage.includes('alumni')) {
        return "Interviews are usually evaluative or informational. Be yourself, prepare questions about the school, and have stories ready about your experiences. Practice with friends or counselors beforehand!"
    }

    if (lowerMessage.includes('internship') || lowerMessage.includes('summer')) {
        return "Summer experiences can strengthen your application! Look for internships, research opportunities, or volunteer work related to your interests. Check out our Internship Agent for high school opportunities."
    }

    if (lowerMessage.includes('competition') || lowerMessage.includes('contest')) {
        return "Competitions can showcase your talents and passion! Focus on ones aligned with your interests. Awards can strengthen your application, but genuine interest matters most. See our Competition Agent for opportunities."
    }

    if (lowerMessage.includes('ivy') || lowerMessage.includes('elite') || lowerMessage.includes('top')) {
        return "Highly selective schools look for academic excellence, unique achievements, and personal qualities. But remember - success isn't defined by one school! Focus on finding colleges where you'll thrive and grow."
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
        return "I'm here to help with all aspects of college admissions! I can answer questions about academics, testing, essays, activities, college selection, and more. Try exploring our specialized agents for in-depth guidance in specific areas!"
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "You're very welcome! I'm here to help you succeed. Feel free to ask anything else about college admissions!"
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm your AI College Counselor. I'm here to help you navigate the college admissions process. What questions do you have today?"
    }

    // Default response
    return "That's a great question! While I can provide general guidance, you might want to explore our specialized agents for more detailed help. Try the Match Agent for college selection, Career Agent for major exploration, Essay Agent for writing help, or our other agents for specific topics!"
}
