"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/50 border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-xl font-bold text-white">PhotoTransform</span>
          </div>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <Link href="/dashboard">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="px-6 py-2 text-purple-300 hover:text-white transition-colors duration-200">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium">
                Powered by Gemini AI
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Product Photos
              </span>
              with AI
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto">
              Change backgrounds in seconds. Create stunning, professional product images with the power of advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <SignUpButton mode="modal">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  Start Free
                </button>
              </SignUpButton>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg rounded-xl font-semibold border border-purple-500/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                See Demo
              </button>
            </div>
            <div className="pt-4 text-sm text-purple-300">
              No credit card required • Free forever plan available
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-purple-200">
              Everything you need to create stunning product photos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-purple-200">
                Advanced Gemini AI ensures perfect background removal and generation every time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-purple-200">
                Process your images in seconds. No waiting, no hassle, just instant results.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Unlimited Projects</h3>
              <p className="text-purple-200">
                Save and organize all your work. Access your projects anytime, anywhere.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Professional Quality</h3>
              <p className="text-purple-200">
                Studio-quality results that make your products shine and boost conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-purple-200">
              Transform your photos in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/50">
                    <span className="text-4xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
                </div>
                <div className="p-8 bg-gradient-to-br from-purple-900/20 to-transparent backdrop-blur-sm border border-purple-500/20 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-3">Upload Your Image</h3>
                  <p className="text-purple-200">
                    Simply drag and drop your product photo or click to upload from your device.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/50">
                    <span className="text-4xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
                </div>
                <div className="p-8 bg-gradient-to-br from-purple-900/20 to-transparent backdrop-blur-sm border border-purple-500/20 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-3">Describe Your Vision</h3>
                  <p className="text-purple-200">
                    Tell our AI what background you want. Be creative - the possibilities are endless!
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/50">
                    <span className="text-4xl font-bold text-white">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
                </div>
                <div className="p-8 bg-gradient-to-br from-purple-900/20 to-transparent backdrop-blur-sm border border-purple-500/20 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-3">Download & Share</h3>
                  <p className="text-purple-200">
                    Get your enhanced photo instantly. Download in high resolution and use anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <div className="text-center p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <div className="text-purple-200">Images Processed</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                2K+
              </div>
              <div className="text-purple-200">Happy Users</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                99%
              </div>
              <div className="text-purple-200">Satisfaction Rate</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-purple-200">AI Availability</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by Creators
            </h2>
            <p className="text-xl text-purple-200">
              See what our users are saying
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-purple-100 mb-6 italic">
                &ldquo;This tool saved me hours of work! The AI backgrounds look incredibly professional. Highly recommended!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <div className="text-white font-semibold">Sarah Johnson</div>
                  <div className="text-purple-300 text-sm">E-commerce Owner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-purple-100 mb-6 italic">
                &ldquo;The quality is amazing! My product photos have never looked better. This is a game-changer for my business.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <div className="text-white font-semibold">Michael Chen</div>
                  <div className="text-purple-300 text-sm">Product Photographer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-purple-100 mb-6 italic">
                &ldquo;Fast, easy, and stunning results. I can create professional product images without expensive photoshoots!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <div className="text-white font-semibold">Emily Rodriguez</div>
                  <div className="text-purple-300 text-sm">Marketing Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden p-12 md:p-16 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div className="relative text-center space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Ready to Transform Your Photos?
              </h2>
              <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto">
                Join thousands of creators who are already creating stunning product images with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <SignUpButton mode="modal">
                  <button className="px-10 py-5 bg-white text-purple-900 text-lg rounded-xl font-bold hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                    Get Started for Free
                  </button>
                </SignUpButton>
              </div>
              <div className="text-sm text-purple-300">
                No credit card required • Cancel anytime • Free forever plan
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-purple-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">PhotoTransform</span>
            </div>
            <div className="text-purple-300 text-sm">
              2024 PhotoTransform. All rights reserved.
            </div>
            <div className="flex gap-6 text-purple-300 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
