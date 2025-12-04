import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function ProjectModal({ project, isOpen, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-white rounded-large max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-secondary-gray text-neutral-dark transition-colors"
                  aria-label="Close modal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Image */}
                <div className="relative w-full h-64 md:h-96 bg-secondary-clay overflow-hidden">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-secondary-gray animate-pulse" />
                  )}
                  <img
                    src={project.image || `${import.meta.env.BASE_URL}project-placeholder.svg`}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                  <h2 className="text-h2 mb-6">{project.title}</h2>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-body leading-body text-neutral-dark">
                      {project.description}
                    </p>
                    <p className="text-body leading-body text-neutral-dark">
                      {project.description2 || project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-h3 mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-secondary-gray rounded-full text-sm text-neutral-dark font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Back button */}
                  <button onClick={onClose} className="btn-secondary">
                    Back to Projects
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
