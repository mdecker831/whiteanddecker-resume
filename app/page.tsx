import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, Zap, Target, Award, ArrowRight, FileText, Briefcase, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Optimization',
    description: 'Our advanced AI analyzes job descriptions and optimizes your resume for maximum impact and ATS compatibility.'
  },
  {
    icon: Target,
    title: 'Tailored for Each Job',
    description: 'Every resume is customized to match specific job requirements, highlighting your most relevant skills and experience.'
  },
  {
    icon: FileText,
    title: 'Professional Cover Letters',
    description: 'Get a compelling cover letter that perfectly complements your optimized resume and tells your story.'
  },
  {
    icon: Award,
    title: 'Industry Expertise',
    description: 'Developed by career experts with 15+ years of experience in recruitment and resume writing.'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    company: 'Tech Corp',
    content: 'I got 3x more interview calls after using White & Decker. The AI optimization really works!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    company: 'StartupXYZ',
    content: 'The tailored approach helped me land my dream job. Highly recommend their service.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Project Manager',
    company: 'Fortune 500',
    content: 'Professional quality and fast turnaround. Worth every penny for career advancement.',
    rating: 5
  }
]

const stats = [
  { label: 'Resumes Optimized', value: '10,000+' },
  { label: 'Interview Rate Increase', value: '3x' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Average Processing Time', value: '5 min' }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">White & Decker</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-900">Reviews</Link>
            <Link href="/auth" className="text-gray-600 hover:text-gray-900">Sign In</Link>
          </nav>
          <Link href="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6" variant="secondary">
            <Star className="mr-1 h-3 w-3" />
            Trusted by 10,000+ professionals
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Land Your Dream Job with
            <span className="text-blue-600 block">AI-Optimized Resumes</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your resume in minutes with our AI-powered optimization service. 
            Get tailored resumes and cover letters that pass ATS filters and impress hiring managers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth">
              <Button size="lg" className="px-8">
                Optimize My Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Sample Results
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Service?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with industry expertise 
              to give you a competitive edge in your job search.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your optimized resume in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-600">
                Upload your current resume and paste the job description you're targeting.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Optimization</h3>
              <p className="text-gray-600">
                Our AI analyzes and optimizes your resume for the specific job requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download Results</h3>
              <p className="text-gray-600">
                Get your optimized resume and personalized cover letter in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              One price, unlimited value for your career
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Resume Optimization</h3>
                  <p className="text-gray-600">Everything you need to land your next job</p>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$49</span>
                  <span className="text-gray-600 ml-2">per resume</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">AI-powered resume optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Personalized cover letter</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">ATS-friendly formatting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">5-minute processing time</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Instant download</span>
                  </div>
                </div>

                <Link href="/auth">
                  <Button size="lg" className="w-full">
                    Get Started Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of professionals who've accelerated their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've successfully landed their dream jobs 
            with our AI-optimized resumes.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="px-8">
              Start Your Success Story
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold text-white">White & Decker</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering professionals with AI-powered resume optimization.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/auth" className="hover:text-white">Get Started</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 White & Decker Resume Service. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}