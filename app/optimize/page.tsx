'use client'

import React from 'react'
import { Progress } from '@/components/ui/progress'


import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { FileUpload } from '@/components/upload/file-upload'
import { useAuth } from '@/hooks/use-auth'
import { getStripe, PRICING } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { extractTextFromFile } from '@/lib/file-utils'
import { ArrowLeft, CreditCard, FileText, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const steps = [
  { id: 1, title: 'Upload Resume', icon: FileText },
  { id: 2, title: 'Job Description', icon: Target },
  { id: 3, title: 'Payment', icon: CreditCard },
  { id: 4, title: 'Processing', icon: Zap }
]

export default function OptimizePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [processing, setProcessing] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/auth')
    return null
  }

  const handleResumeUpload = (file: File) => {
    setResumeFile(file)
    setCurrentStep(2)
  }

  const handleJobDescriptionNext = () => {
    if (jobDescription.trim().length < 50) {
      toast.error('Please provide a more detailed job description (at least 50 characters)')
      return
    }
    setCurrentStep(3)
  }

  const handlePayment = async () => {
    console.log('🚀 handlePayment triggered')

    if (!resumeFile || !jobDescription.trim()) {
      toast.error('Please complete all previous steps')
      return
    }

    setProcessing(true)

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('resume_orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          job_description: jobDescription,
          amount: PRICING.RESUME_OPTIMIZATION.amount
        })
        .select()
        .single()

      if (orderError) throw orderError

      setOrderId(order.id)

      // Upload resume file
      const fileName = `${order.id}/${resumeFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile)

      if (uploadError) throw uploadError

      // Update order with file URL
      const { error: updateError } = await supabase
        .from('resume_orders')
        .update({
          original_resume_url: fileName
        })
        .eq('id', order.id)

      if (updateError) throw updateError

      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          successUrl: `${window.location.origin}/optimize/success?order_id=${order.id}`,
          cancelUrl: `${window.location.origin}/optimize/cancelled?order_id=${order.id}`,
        }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      await stripe?.redirectToCheckout({ sessionId })

    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Failed to create order. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const stepProgress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Optimize Your Resume</h1>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
          
          <Progress value={stepProgress} className="mb-4" />
          
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 ${
                  step.id <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}	
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.id <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  {React.createElement(step.icon, { className: "h-4 w-4" })}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload onFileSelect={handleResumeUpload} />
                <p className="text-sm text-gray-600 mt-4">
                  Supported formats: PDF, DOCX (up to 10MB)
                </p>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="job-description">
                    Paste the job description you're applying for
                  </Label>
                  <Textarea
                    id="job-description"
                    placeholder="Copy and paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[200px] mt-2"
                    maxLength={5000}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Minimum 50 characters for best results</span>
                    <span>{jobDescription.length}/5000</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                  <Button onClick={handleJobDescriptionNext}>
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Resume file:</span>
                      <span className="font-medium">{resumeFile?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Job description:</span>
                      <span className="font-medium">{jobDescription.length} characters</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">
                        ${(PRICING.RESUME_OPTIMIZATION.amount / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">What you'll receive:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      AI-optimized resume tailored to the job description
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Personalized cover letter
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      ATS-friendly formatting
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Processing completed in 2-5 minutes
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Previous
                  </Button>
                  <Button onClick={handlePayment} disabled={processing}>
                    {processing ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}