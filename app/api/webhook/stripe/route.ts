import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { optimizeResume } from '@/lib/openai'
import { extractTextFromFile } from '@/lib/file-utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId

    if (!orderId) {
      console.error('No orderId in webhook metadata')
      return NextResponse.json({ error: 'No orderId' }, { status: 400 })
    }

    try {
      // Update order status to processing
      await supabase
        .from('resume_orders')
        .update({
          status: 'processing',
          stripe_payment_id: session.payment_intent as string,
        })
        .eq('id', orderId)

      // Process the resume optimization
      await processResumeOrder(orderId)

    } catch (error) {
      console.error('Error processing webhook:', error)
      
      // Update order status to failed
      await supabase
        .from('resume_orders')
        .update({ status: 'failed' })
        .eq('id', orderId)
    }
  }

  return NextResponse.json({ received: true })
}

async function processResumeOrder(orderId: string) {
  try {
    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('resume_orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error('Order not found')
    }

    // Download and extract text from resume file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('resumes')
      .download(order.original_resume_url)

    if (downloadError) {
      throw new Error('Failed to download resume file')
    }

    // Extract text from file (simplified - in production you'd use proper PDF/DOCX parsing)
    const resumeContent = await extractTextFromFile(fileData as File)

    // Optimize resume using OpenAI
    const optimization = await optimizeResume({
      resumeContent,
      jobDescription: order.job_description,
    })

    // Convert the optimized content to PDF/DOCX files and upload
    // This is simplified - in production you'd use libraries like jsPDF or docx
    const optimizedResumeBlob = new Blob([optimization.optimizedResume], { type: 'text/plain' })
    const coverLetterBlob = new Blob([optimization.coverLetter], { type: 'text/plain' })

    // Upload optimized files
    const optimizedResumeFileName = `${orderId}/optimized-resume.txt`
    const coverLetterFileName = `${orderId}/cover-letter.txt`

    await supabase.storage
      .from('resumes')
      .upload(optimizedResumeFileName, optimizedResumeBlob)

    await supabase.storage
      .from('resumes')
      .upload(coverLetterFileName, coverLetterBlob)

    // Update order with completion status
    await supabase
      .from('resume_orders')
      .update({
        status: 'completed',
        optimized_resume_url: optimizedResumeFileName,
        cover_letter_url: coverLetterFileName,
        completed_at: new Date().toISOString(),
      })
      .eq('id', orderId)

  } catch (error) {
    console.error('Error processing resume order:', error)
    throw error
  }
}