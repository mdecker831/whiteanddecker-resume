# White & Decker Resume Service

A comprehensive full-stack web application for AI-powered resume optimization, built with Next.js 13+, Supabase, Stripe, and OpenAI.

## Features

### Core Functionality
- **AI-Powered Resume Optimization**: Uses GPT-4 to analyze and optimize resumes for specific job descriptions
- **Cover Letter Generation**: Creates personalized cover letters tailored to each job application
- **File Processing**: Supports PDF and DOCX file uploads with validation and text extraction
- **Payment Processing**: Secure payment handling with Stripe Checkout
- **User Dashboard**: Comprehensive dashboard for managing orders and downloading results

### Authentication & Security
- **Supabase Authentication**: Email/password and Google OAuth integration
- **Row Level Security**: Database-level security policies
- **File Upload Security**: File type and size validation
- **Rate Limiting**: API rate limiting and error handling

### User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live order status updates
- **Progress Tracking**: Step-by-step process visualization
- **Professional UI**: Clean, modern interface with smooth animations

## Tech Stack

### Frontend
- **Next.js 13+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Hook Form** for form handling

### Backend
- **Supabase** for database, authentication, and file storage
- **Stripe** for payment processing
- **OpenAI GPT-4** for resume optimization
- **Edge Functions** for serverless processing

### Infrastructure
- **Vercel/Netlify** deployment ready
- **PostgreSQL** database with row-level security
- **File storage** with Supabase Storage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd white-decker-resume-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - Supabase URL and keys
   - Stripe publishable and secret keys
   - OpenAI API key
   - Webhook secrets

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see Database Setup below)
   - Configure authentication providers
   - Set up storage buckets

5. **Configure Stripe**
   - Set up webhook endpoints
   - Configure payment methods
   - Test payment flow

6. **Run the development server**
   ```bash
   npm run dev
   ```

## Database Setup

### Required Tables

```sql
-- Users table (handled by Supabase Auth)

-- Resume orders table
CREATE TABLE resume_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  original_resume_url TEXT,
  job_description TEXT,
  job_description_url TEXT,
  optimized_resume_url TEXT,
  cover_letter_url TEXT,
  stripe_payment_id TEXT,
  amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE resume_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own orders" ON resume_orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON resume_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON resume_orders
  FOR UPDATE USING (auth.uid() = user_id);
```

### Storage Buckets

Create storage buckets in Supabase:
- `resumes` - for storing uploaded and processed resume files

## API Endpoints

### `/api/create-checkout-session`
Creates a Stripe Checkout session for payment processing.

### `/api/webhook/stripe`
Handles Stripe webhooks for payment confirmation and order processing.

## Deployment

### Environment Variables
Ensure all environment variables are set in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`

### Build Command
```bash
npm run build
```

### Webhook Configuration
Set up Stripe webhook endpoint pointing to `/api/webhook/stripe` with the following events:
- `checkout.session.completed`

## Features in Detail

### Resume Optimization Process
1. User uploads resume (PDF/DOCX)
2. User provides job description
3. Payment processing via Stripe
4. AI analysis and optimization using GPT-4
5. Generation of optimized resume and cover letter
6. File delivery via secure download links

### Security Features
- File type and size validation
- Row-level security on all database operations
- Secure file storage with access controls
- Payment processing via Stripe (PCI compliant)
- API rate limiting and error handling

### User Dashboard
- Order history and status tracking
- File download management
- Account settings and profile management
- Usage analytics and statistics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For technical support or questions about the service, please contact:
- Email: support@whitedecker.com
- Documentation: [Link to docs]
- Status Page: [Link to status page]