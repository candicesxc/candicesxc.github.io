import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ToolIcon from './ToolIcon'

const tools = [
  { type: 'code', name: 'Code Wrench' },
  { type: 'strategy', name: 'Strategy Ruler' },
  { type: 'creativity', name: 'Creativity Brush' },
  { type: 'growth', name: 'Growth Gauge' },
  { type: 'problemSolving', name: 'Problem Solving Flashlight' },
  { type: 'product', name: 'Product Compass' },
  { type: 'multiTool', name: 'Multi Tool' },
]

function Toolbox({ onToolClick }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Toolbox SVG */}
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full h-auto"
        >
          {/* Toolbox base */}
          <rect x="50" y="120" width="300" height="150" rx="8" fill="#8BA6A9" stroke="#333333" strokeWidth="3"/>
          <rect x="60" y="130" width="280" height="130" rx="4" fill="#D0CBC5"/>
          
          {/* Toolbox lid */}
          <motion.rect
            x="50"
            y="120"
            width="300"
            height="80"
            rx="8"
            fill="#8BA6A9"
            stroke="#333333"
            strokeWidth="3"
            animate={{
              rotate: isOpen ? -15 : 0,
              transformOrigin: '50px 200px',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <motion.rect
            x="60"
            y="130"
            width="280"
            height="70"
            rx="4"
            fill="#E8DED2"
            animate={{
              rotate: isOpen ? -15 : 0,
              transformOrigin: '50px 200px',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          
          {/* Handle */}
          <motion.rect
            x="190"
            y="140"
            width="20"
            height="8"
            rx="4"
            fill="#F4A261"
            animate={{
              rotate: isOpen ? -15 : 0,
              transformOrigin: '50px 200px',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          
          {/* Hinge */}
          <circle cx="50" cy="200" r="6" fill="#333333"/>
        </svg>

        {/* Tools inside (visible when open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-16">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  >
                    <ToolIcon
                      type={tool.type}
                      name={tool.name}
                      onClick={() => onToolClick(tool)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open Toolbox
        </motion.button>
      )}
    </div>
  )
}

export default Toolbox
