import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-lg md:text-xl font-heading font-bold text-neutral-dark hover:text-primary transition-colors">
            Candice Shen
          </Link>
          <ul className="flex items-center gap-3 md:gap-6">
            <li>
              <Link
                to="/"
                className={`text-sm md:text-body font-medium transition-colors ${
                  isActive('/') ? 'text-accent' : 'text-neutral-dark hover:text-primary'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`text-sm md:text-body font-medium transition-colors ${
                  isActive('/projects') ? 'text-accent' : 'text-neutral-dark hover:text-primary'
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/manual"
                className={`text-sm md:text-body font-medium transition-colors ${
                  isActive('/manual') ? 'text-accent' : 'text-neutral-dark hover:text-primary'
                }`}
              >
                Manual
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`text-sm md:text-body font-medium transition-colors ${
                  isActive('/contact') ? 'text-accent' : 'text-neutral-dark hover:text-primary'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
