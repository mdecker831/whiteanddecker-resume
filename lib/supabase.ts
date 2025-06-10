import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resume_orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'failed'
          original_resume_url: string | null
          job_description: string | null
          job_description_url: string | null
          optimized_resume_url: string | null
          cover_letter_url: string | null
          stripe_payment_id: string | null
          amount: number
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          original_resume_url?: string | null
          job_description?: string | null
          job_description_url?: string | null
          optimized_resume_url?: string | null
          cover_letter_url?: string | null
          stripe_payment_id?: string | null
          amount: number
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          original_resume_url?: string | null
          job_description?: string | null
          job_description_url?: string | null
          optimized_resume_url?: string | null
          cover_letter_url?: string | null
          stripe_payment_id?: string | null
          amount?: number
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}