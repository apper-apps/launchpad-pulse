import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import { routes } from '@/config/routes'
import { format } from 'date-fns'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const mainNavItems = [routes.today, routes.top, routes.categories]
  const currentDate = format(new Date(), 'EEEE, MMMM d')

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-surface/80 backdrop-blur-glass border-b border-gray-200 z-40 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <NavLink to="/today" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Rocket" className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-text-primary hidden sm:block">
                  LaunchPad
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              
              <NavLink to="/submit">
                <Button variant="primary" size="sm" className="font-medium">
                  <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </NavLink>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon 
                  name={mobileMenuOpen ? "X" : "Menu"} 
                  className="w-5 h-5 text-text-primary" 
                />
              </button>
            </div>
          </div>

          {/* Date indicator */}
          {location.pathname === '/today' && (
            <div className="pb-4 border-b border-gray-100">
              <p className="text-sm font-medium text-text-secondary">
                {currentDate}
              </p>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-surface"
            >
              <div className="px-4 py-4 space-y-4">
                <div className="md:hidden">
                  <SearchBar />
                </div>
                
                <nav className="space-y-2">
                  {mainNavItems.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                        }`
                      }
                    >
                      <ApperIcon name={item.icon} className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}