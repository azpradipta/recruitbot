import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, FileText, Shield, Users, Zap, CheckCircle2, Star, Brain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      
      {/* Navigation */}
      <nav className='border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link href="/" className='flex items-center'>
              <Image 
                src='/logo.png' 
                alt='Recruitbot' 
                width={150} 
                height={40}
                className='h-10 w-auto'
              />
            </Link>
            
            {/* Navigation Links */}
            <div className='flex items-center gap-6'>
              <Link href="#features" className='text-gray-600 hover:text-primary transition-colors'>
                Features
              </Link>
              <Link href="#how-it-works" className='text-gray-600 hover:text-primary transition-colors'>
                How It Works
              </Link>
              <Link href="/auth">
                <Button className='gap-2'>
                  Login
                  <ArrowRight className='w-4 h-4' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='py-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            
            {/* Left Content */}
            <div className='space-y-8'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-primary'>
                <Zap className='w-4 h-4' />
                AI-Powered Interview Platform
              </div>
              
              <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                Hire Smarter with
                <span className='text-primary'> AI Interviews</span>
              </h1>
              
              <p className='text-xl text-gray-600 leading-relaxed'>
                Streamline your hiring process with AI-powered interviews. Save time, reduce bias, and find the perfect candidates faster than ever.
              </p>
              
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href="/auth">
                  <Button size="lg" className='gap-2 h-12 px-8 text-base'>
                    Get Started Free
                    <ArrowRight className='w-5 h-5' />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className='h-12 px-8 text-base'>
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className='relative'>
              <div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12'>
                <div className='bg-white rounded-xl shadow-2xl p-6 space-y-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                      <Brain className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900'>AI Interview</p>
                      <p className='text-sm text-gray-500'>In Progress</p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                      <div className='h-full bg-primary w-3/4 rounded-full animate-pulse' />
                    </div>
                    <p className='text-xs text-gray-500'>Analyzing responses...</p>
                  </div>
                  <div className='grid grid-cols-2 gap-3 pt-2'>
                    <div className='bg-green-50 rounded-lg p-3'>
                      <p className='text-xs text-green-600 font-medium'>Communication</p>
                      <p className='text-2xl font-bold text-green-600'>8.5</p>
                    </div>
                    <div className='bg-blue-50 rounded-lg p-3'>
                      <p className='text-xs text-blue-600 font-medium'>Technical</p>
                      <p className='text-2xl font-bold text-blue-600'>9.0</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce'>
                <CheckCircle2 className='w-6 h-6 text-green-500' />
              </div>
              <div className='absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3'>
                <Star className='w-6 h-6 text-yellow-500' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className='py-20 px-6 bg-white mt-5'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Why Choose Recruitbot?
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Everything you need to conduct professional AI-powered interviews
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                <Brain className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                AI-Powered Analysis
              </h3>
              <p className='text-gray-600'>
                Advanced AI evaluates candidate responses in real-time, providing detailed insights and feedback.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                <Clock className='w-6 h-6 text-green-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Save Time
              </h3>
              <p className='text-gray-600'>
                Automate initial screening and focus on the best candidates. Save up to 95% of interview time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
                <Shield className='w-6 h-6 text-purple-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Reduce Bias
              </h3>
              <p className='text-gray-600'>
                Objective AI evaluation ensures fair assessment for all candidates, eliminating unconscious bias.
              </p>
            </div>

            {/* Feature 4 */}
            <div className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4'>
                <FileText className='w-6 h-6 text-orange-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Detailed Reports
              </h3>
              <p className='text-gray-600'>
                Get comprehensive performance reports with ratings, summaries, and hiring recommendations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4'>
                <Users className='w-6 h-6 text-red-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Scale Hiring
              </h3>
              <p className='text-gray-600'>
                Interview hundreds of candidates simultaneously without compromising quality or consistency.
              </p>
            </div>

            {/* Feature 6 */}
            <div className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4'>
                <Zap className='w-6 h-6 text-yellow-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Quick Setup
              </h3>
              <p className='text-gray-600'>
                Create custom interviews in minutes. No technical knowledge required. Start hiring immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className='py-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              How It Works
            </h2>
            <p className='text-xl text-gray-600'>
              Get started in three simple steps
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Step 1 */}
            <div className='bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-primary transition-colors'>
              <div className='w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-6'>
                1
              </div>
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                Create Interview
              </h3>
              <p className='text-gray-600 mb-4'>
                Set up your interview in minutes. Define job role, questions, and evaluation criteria.
              </p>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  Choose interview type
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  AI generates questions
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  Customize as needed
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className='bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-primary transition-colors'>
              <div className='w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-6'>
                2
              </div>
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                Share with Candidates
              </h3>
              <p className='text-gray-600 mb-4'>
                Send interview links to candidates. They can complete interviews at their convenience.
              </p>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  Unique interview links
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  Schedule flexibility
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  Email notifications
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className='bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-primary transition-colors'>
              <div className='w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-6'>
                3
              </div>
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                Review Results
              </h3>
              <p className='text-gray-600 mb-4'>
                Get AI-powered insights and detailed reports. Make informed hiring decisions faster.
              </p>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  Performance ratings
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  AI recommendations
                </li>
                <li className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  Detailed transcripts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-6 bg-primary'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            Ready to Transform Your Hiring Process?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Join thousands of companies using AI to hire better, faster.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className='gap-2 h-14 px-10 text-lg'>
              Start Free Trial
              <ArrowRight className='w-5 h-5' />
            </Button>
          </Link>
          <p className='text-sm text-blue-100 mt-4'>
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-200 py-12 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <Image 
                src='/logo.png' 
                alt='Recruitbot' 
                width={120} 
                height={32}
                className='h-8 w-auto mb-4'
              />
              <p className='text-sm text-gray-600'>
                AI-powered interview platform for smarter hiring decisions.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900 mb-4'>Product</h4>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li><a href="#features" className='hover:text-primary'>Features</a></li>
                <li><a href="#how-it-works" className='hover:text-primary'>How It Works</a></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600'>
            <p>© 2024 Recruitbot. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}