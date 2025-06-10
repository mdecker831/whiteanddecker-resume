import { loadStripe } from '@stripe/stripe-js'

export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

export const PRICING = {
  RESUME_OPTIMIZATION: {
    amount: 4900, // $49.00 in cents
    name: 'Resume Optimization Service',
    description: 'Professional resume optimization with AI-powered tailoring and cover letter generation'
  }
}