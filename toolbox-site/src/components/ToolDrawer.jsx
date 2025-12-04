import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ToolDrawer({ tool, isOpen, onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!tool) return null

  const toolDescriptions = {
    code: {
      description: "Building clean, maintainable code that solves real problems. I work with modern web technologies to create efficient and scalable solutions.",
      projects: [
        { id: 1, title: 'Web Application', category: 'Code' },
        { id: 2, title: 'API Integration', category: 'Code' },
      ],
    },
    strategy: {
      description: "Developing strategic approaches to product development and business challenges. I analyze problems from multiple angles to find the best path forward.",
      projects: [
        { id: 3, title: 'Product Strategy', category: 'Strategy' },
        { id: 4, title: 'Market Analysis', category: 'Strategy' },
      ],
    },
    creativity: {
      description: "Bringing creative solutions to design and user experience challenges. I blend aesthetics with functionality to create delightful interactions.",
      projects: [
        { id: 5, title: 'Design System', category: 'Creativity' },
        { id: 6, title: 'Brand Identity', category: 'Creativity' },
      ],
    },
    growth: {
      description: "Focusing on growth metrics, user acquisition, and scaling products. I use data-driven insights to drive meaningful improvements.",
      projects: [
        { id: 7, title: 'Growth Campaign', category: 'Growth' },
        { id: 8, title: 'Analytics Dashboard', category: 'Growth' },
      ],
    },
    problemSolving: {
      description: "Tackling complex problems with systematic thinking and innovative solutions. I break down challenges into manageable pieces and find elegant answers.",
      projects: [
        { id: 9, title: 'Problem Analysis', category: 'Problem Solving' },
        { id: 10, title: 'Solution Design', category: 'Problem Solving' },
      ],
    },
    product: {
      description: "Building products that users love. I focus on understanding user needs and translating them into features that provide real value.",
      projects: [
        { id: 11, title: 'Product Feature', category: 'Product' },
        { id: 12, title: 'User Research', category: 'Product' },
      ],
    },
    multiTool: {
      description: "A versatile set of skills that adapt to different challenges. I bring together various disciplines to create comprehensive solutions.",
      projects: [
        { id: 13, title: 'Full Stack Project', category: 'Multi Tool' },
        { id: 14, title: 'Integrated Solution', category: 'Multi Tool' },
      ],
    },
  }

  const content = toolDescriptions[tool.type] || toolDescriptions.code

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 md:left-auto md:right-0 md:w-[70%] lg:w-[60%] bg-white rounded-t-large md:rounded-l-large shadow-2xl z-50 max-h-[85vh] overflow-y-auto"
            initial={{ y: '100%', x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-secondary-gray hover:bg-primary text-neutral-dark hover:text-white transition-colors"
                aria-label="Close drawer"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Content */}
              <h2 className="text-h2 mb-4">{tool.name}</h2>
              <p className="text-body mb-8 text-neutral-dark leading-body">
                {content.description}
              </p>

              {/* Related Projects */}
              <div className="mb-8">
                <h3 className="text-h3 mb-4">Related Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.projects.map((project) => (
                    <div
                      key={project.id}
                      className="card cursor-pointer hover:border-accent border-2 border-transparent transition-colors"
                      onClick={() => {
                        onClose()
                        navigate('/projects')
                      }}
                    >
                      <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                      <div className="font-semibold text-neutral-dark">{project.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View All Projects Button */}
              <button
                onClick={() => {
                  onClose()
                  navigate('/projects')
                }}
                className="btn-primary w-full md:w-auto"
              >
                View All Projects
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ToolDrawer
