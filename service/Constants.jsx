import { BriefcaseBusinessIcon, Calendar, Code2Icon, Crown, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react"

export const SidebarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Scheduled Interview',
        icon: Calendar,
        path: '/scheduled-interview'
    },
    {
        name: 'All Interview',
        icon: List,
        path: '/all-interview'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    }
]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: Crown
    }
]

// service/Constants.js
export const QUESTIONS_PROMPT = `You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}

Job Description: {{jobDescription}}

Interview Duration: {{duration}}

Interview Type: {{type}}

📝 Your task:
1. Analyze the job description to identify key responsibilities, required skills, and expected experience
2. Generate interview questions based on the interview duration
3. Adjust the number and depth of questions to match the interview duration
4. Ensure questions match the tone and structure of a real-life {{type}} interview

⏱️ QUESTION COUNT RULES (STRICTLY FOLLOW):
- 5 Min interview  → Generate EXACTLY 3-4 questions (quick screening)
- 15 Min interview → Generate EXACTLY 6-8 questions (standard interview)
- 30 Min interview → Generate EXACTLY 10-12 questions (in-depth interview)
- 45 Min interview → Generate EXACTLY 14-16 questions (comprehensive interview)
- 60 Min interview → Generate EXACTLY 18-20 questions (thorough assessment)

💡 DURATION GUIDELINES:
- Assume each question takes ~1.5-3 minutes to answer depending on complexity
- For {{duration}} interview, prioritize quality over quantity
- Mix different question types based on {{type}}
- Balance technical depth with time constraints

🎯 IMPORTANT: Return ONLY valid JSON in this EXACT format:

{
  "interviewQuestions": [
    {
      "question": "Your question here",
      "type": "Technical"
    },
    {
      "question": "Another question",
      "type": "Behavioral"
    }
  ]
}

⚠️ RULES:
- Return ONLY the JSON object, nothing else
- Do NOT add any explanation before or after the JSON
- Do NOT use markdown code blocks
- Use "Technical", "Behavioral", "Experience", "Problem Solving", or "Leadership" for type
- Each question must have "question" and "type" fields
- Start response with { and end with }

Generate the interview questions now:`;