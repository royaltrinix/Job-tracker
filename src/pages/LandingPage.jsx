import { Link } from "react-router-dom"
import { Briefcase, TrendingUp, CheckCircle, Calendar, Target, Sparkles, BarChart3, Clock } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Never Lose Track of a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
              Job Application Again
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Organize your job search in one place. Track applications, monitor deadlines, 
            and land your dream job faster.
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Start Tracking Free
            </Link>
            <Link
              to="/signin"
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-200 hover:border-blue-600"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Main Features - Problem/Solution Format */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">All Jobs in One Place</h3>
            <p className="text-gray-600">
              Stop using spreadsheets and sticky notes. Keep every application 
              organized with company, position, status, and notes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Track Your Progress</h3>
            <p className="text-gray-600">
              Monitor where each application stands: Applied, Screening, Interview, 
              Offer, or Rejected. Never wonder "did I apply there?"
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Never Miss Deadlines</h3>
            <p className="text-gray-600">
              Track application dates and follow-ups. Stay on top of your job search 
              and respond quickly when opportunities arise.
            </p>
          </div>
        </div>

        {/* AI Bonus Feature - Secondary Section */}
        <div className="mt-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">AI Auto-Fill</h2>
          </div>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Save time with our AI-powered auto-fill feature. Just paste a job URL, 
            and we'll automatically extract company, position, location, and salary details.
          </p>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">📋</div>
              <p className="text-sm font-medium">Paste URL</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-sm font-medium">AI Extracts</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-sm font-medium">Auto-Fills</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">✅</div>
              <p className="text-sm font-medium">You Review</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center mb-12">Simple & Straightforward</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2 text-lg">Create Account</h3>
              <p className="text-gray-600 text-sm">Sign up in 30 seconds.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2 text-lg">Add Applications</h3>
              <p className="text-gray-600 text-sm">Manually or use AI auto-fill from job URLs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2 text-lg">Stay Organized</h3>
              <p className="text-gray-600 text-sm">Track status, update notes, land your dream job.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Organized?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join job seekers who've simplified their job search
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Start Free Today →
          </Link>
          <p className="text-sm mt-4 opacity-75">
             Set up in minutes
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
