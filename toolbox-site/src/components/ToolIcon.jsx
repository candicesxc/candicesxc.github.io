import { motion } from 'framer-motion'

const toolIcons = {
  code: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
      <path d="M35 45 L45 50 L35 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M65 45 L55 50 L65 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="50" cy="50" r="3" fill="currentColor"/>
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="60" height="60" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
      <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="2"/>
      <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2"/>
      <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2"/>
      <circle cx="35" cy="40" r="2" fill="currentColor"/>
      <circle cx="50" cy="60" r="2" fill="currentColor"/>
      <circle cx="65" cy="40" r="2" fill="currentColor"/>
    </svg>
  ),
  creativity: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 L60 45 L85 45 L68 60 L75 85 L50 70 L25 85 L32 60 L15 45 L40 45 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" fill="none"/>
      <path d="M30 50 L45 40 L55 55 L70 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="30" cy="50" r="3" fill="currentColor"/>
      <circle cx="45" cy="40" r="3" fill="currentColor"/>
      <circle cx="55" cy="55" r="3" fill="currentColor"/>
      <circle cx="70" cy="35" r="3" fill="currentColor"/>
    </svg>
  ),
  problemSolving: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
      <path d="M50 35 L50 50 L40 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="50" r="3" fill="currentColor"/>
      <path d="M35 25 L40 20 M65 25 L60 20 M50 15 L50 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  product: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" fill="none"/>
      <path d="M50 15 L55 45 L50 50 L45 45 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
      <line x1="50" y1="15" x2="50" y2="50" stroke="currentColor" strokeWidth="2"/>
      <line x1="50" y1="50" x2="30" y2="70" stroke="currentColor" strokeWidth="2"/>
      <line x1="50" y1="50" x2="70" y2="70" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  multiTool: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="30" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
      <circle cx="40" cy="50" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="60" cy="50" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="25" y1="40" x2="35" y2="40" stroke="currentColor" strokeWidth="2"/>
      <line x1="25" y1="60" x2="35" y2="60" stroke="currentColor" strokeWidth="2"/>
      <line x1="65" y1="40" x2="75" y2="40" stroke="currentColor" strokeWidth="2"/>
      <line x1="65" y1="60" x2="75" y2="60" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
}

function ToolIcon({ type, name, onClick }) {
  const icon = toolIcons[type] || toolIcons.code

  return (
    <motion.button
      onClick={onClick}
      className="w-20 h-20 p-4 rounded-lg bg-white border-2 border-secondary-gray hover:border-accent transition-colors cursor-pointer flex items-center justify-center text-primary hover:text-accent group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-label={`Open ${name} tool`}
    >
      <div className="w-full h-full group-hover:drop-shadow-lg transition-all">
        {icon}
      </div>
    </motion.button>
  )
}

export default ToolIcon
