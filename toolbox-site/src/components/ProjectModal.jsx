import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function ProjectModal({ project, isOpen, onClose, onNext, onPrev }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  useEffect(() => {
    setActiveScreenshot(0)
  }, [project])

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
    const handleKeyDown = (e) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-surface/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Wrapper for positioning buttons relative to modal */}
            <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                
                {/* Desktop Navigation Buttons (Outside Modal) */}
                <button 
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="hidden md:flex absolute -left-16 lg:-left-24 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/80 hover:bg-white text-primary rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Previous project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="hidden md:flex absolute -right-16 lg:-right-24 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/80 hover:bg-white text-primary rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Next project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                {/* Modal Content */}
                <motion.div
                className="bg-white rounded-large w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-surface/20 relative flex flex-col"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                <div className="relative flex-shrink-0">
                    {/* Close button */}
                    <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-md hover:bg-white text-text transition-colors"
                    aria-label="Close modal"
                    >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    </button>

                    {/* Image (Clickable) */}
                    <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer group"
                    title="Visit live site"
                    >
                        {project.screenshots && project.screenshots.length > 0 ? (
                          <div className="relative w-full bg-gray-900 overflow-hidden shadow-[0_0_20px_rgba(0,48,73,0.3)] rounded-t-large" style={{minHeight: '340px'}}>
                            {/* Label */}
                            <div className="absolute top-3 left-4 z-10 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/70 text-xs font-medium px-3 py-1 rounded-full pointer-events-none">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2"/><line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" strokeLinecap="round"/></svg>
                              Tap a screenshot to preview
                            </div>
                            <div className="flex items-center justify-center gap-4 px-6 pt-10 pb-5 overflow-x-auto">
                              {project.screenshots.map((src, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); setActiveScreenshot(idx); }}
                                  className={`flex-shrink-0 rounded-[2rem] overflow-hidden transition-all duration-300 focus:outline-none ring-offset-2 ${activeScreenshot === idx ? 'ring-2 ring-accent scale-105 shadow-2xl opacity-100' : 'ring-1 ring-white/20 scale-90 opacity-50 hover:opacity-80 hover:scale-95'}`}
                                  style={{height: '280px', width: 'auto'}}
                                  aria-label={`Screenshot ${idx + 1}`}
                                >
                                  <img src={src} alt={`${project.title} screenshot ${idx + 1}`} className="h-full w-auto object-cover" loading="lazy" />
                                </button>
                              ))}
                            </div>
                            {/* Dot indicators */}
                            <div className="flex justify-center gap-1.5 pb-3">
                              {project.screenshots.map((_, idx) => (
                                <span key={idx} className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeScreenshot === idx ? 'bg-accent w-4' : 'bg-white/30'}`} />
                              ))}
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-12 pointer-events-none">
                              <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-text px-4 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all pointer-events-none">
                                Visit Live Site
                              </span>
                            </div>
                          </div>
                        ) : (
                        <div className="relative w-full aspect-video md:h-80 bg-gray-100 overflow-hidden shadow-[0_0_20px_rgba(0,48,73,0.3)] rounded-t-large">
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                        )}
                        <img
                            src={project.image || `/project-placeholder.svg`}
                            alt={project.title}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                            } group-hover:scale-105 transition-transform duration-500`}
                            onLoad={() => setImageLoaded(true)}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-text px-4 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                                Visit Live Site
                            </span>
                        </div>
                        </div>
                        )}
                    </a>
                </div>

                {/* Content Scrollable Area */}
                <div className="p-6 md:p-10 flex-1">
                    <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block hover:text-primary transition-colors group"
                    >
                        <h2 className="text-2xl md:text-h2 font-bold mb-4 text-text group-hover:text-primary transition-colors flex items-center gap-2">
                            {project.title}
                            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </h2>
                    </a>
                    <p className="text-base md:text-lg text-text/70 mb-6 md:mb-8 font-medium">{project.oneLiner}</p>
                    
                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className="text-sm md:text-body leading-relaxed text-text/90 whitespace-pre-line">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Team & Award */}
                    {(project.team || project.award) && (
                      <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
                        {project.award && (
                          <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-300 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            {project.award}
                          </span>
                        )}
                        {project.team && (
                          <span className="text-xs text-text/60 font-medium">
                            Team: {project.team}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                        <div className="mb-6 md:mb-8">
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="tag text-xs md:text-small"
                            >
                                {tag}
                            </span>
                            ))}
                        </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 md:gap-4 pt-4 border-t border-surface/10">
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
                                Try the app live
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                        )}
                        {project.repoLink && (
                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn-tertiary inline-flex items-center gap-2 text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
                                View GitHub Repo
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                        )}
                    </div>

                    {/* Mobile Navigation (Bottom) - Removed as requested */}
                    {/* <div className="md:hidden flex justify-between items-center pt-6 mt-4 border-t border-surface/10"> ... </div> */}
                </div>
                </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
