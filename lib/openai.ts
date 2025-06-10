import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ResumeOptimizationRequest {
  resumeContent: string
  jobDescription: string
}

export interface ResumeOptimizationResponse {
  optimizedResume: string
  coverLetter: string
  keyChanges: string[]
  matchScore: number
}

export async function optimizeResume(
  request: ResumeOptimizationRequest
): Promise<ResumeOptimizationResponse> {
  const prompt = `
You are a professional resume writer and career coach with 15+ years of experience. Your task is to optimize a resume for a specific job posting and create a tailored cover letter.

RESUME CONTENT:
${request.resumeContent}

JOB DESCRIPTION:
${request.jobDescription}

INSTRUCTIONS:
1. Analyze the job description to identify key requirements, skills, and qualifications
2. Optimize the resume to better match the job requirements while maintaining truthfulness
3. Enhance bullet points with action verbs and quantifiable achievements
4. Adjust the skills section to prioritize relevant skills
5. Ensure ATS-friendly formatting and keywords
6. Create a compelling cover letter that connects the candidate's experience to the role
7. Provide a match score (1-100) and list key changes made

RESPONSE FORMAT (JSON):
{
  "optimizedResume": "Complete optimized resume content in markdown format",
  "coverLetter": "Professional cover letter in markdown format",
  "keyChanges": ["List of key changes made to improve the resume"],
  "matchScore": 85
}

Ensure the response is valid JSON and maintains professional quality throughout.
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume optimization expert. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    try {
      return JSON.parse(content) as ResumeOptimizationResponse
    } catch (parseError) {
      throw new Error('Invalid JSON response from OpenAI')
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to optimize resume. Please try again.')
  }
}