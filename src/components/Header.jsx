import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { userAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Briefcase, Menu, X, LogOut } from "lucide-react"

const Header = () => {
  const { session, signOut } = userAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      await signOut()
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-gradient-to-r from-gray-600 via-blue-gray to-indigo-700 shadow-lg sticky top-0 z-50 backdrop-blur-sm p-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to={session ? "/dashboard" : "/"} className="flex items-center gap-3 animate-fadeIn">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Job Tracker</h1>
          </Link>

          {/* Desktop Navigation */}
          {session ? (
            // Logged In Navigation
            <>
              <div className="hidden md:flex items-center gap-1">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white shadow-lg" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/applications"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white shadow-lg" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Applications
                </NavLink>

                <NavLink
                  to="/rejected"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white shadow-lg" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Rejected
                </NavLink>

                <NavLink
                  to="/offers"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white shadow-lg" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Offers
                </NavLink>
              </div>

              {/* Sign Out Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSignOut}
                  className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </>
          ) : (
            // Logged Out Navigation
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="hidden md:block px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hidden md:block px-5 py-2 bg-white text-indigo-700 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>

              {/* Mobile Menu Button for non-logged in users */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-down">
            {session ? (
              // Logged In Mobile Menu
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/applications"
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Applications
                </NavLink>

                <NavLink
                  to="/rejected"
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rejected
                </NavLink>

                <NavLink
                  to="/offers"
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Offers
                </NavLink>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </>
            ) : (
              // Logged Out Mobile Menu
              <>
                <Link
                  to="/signin"
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-3 bg-white text-indigo-700 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header