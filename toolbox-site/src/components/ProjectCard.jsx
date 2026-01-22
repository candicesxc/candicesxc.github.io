import { motion } from 'framer-motion'
import { useState } from 'react'

function ProjectCard({ project, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      className="card cursor-pointer overflow-hidden h-full flex flex-col"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden mb-4 rounded-lg border border-surface/10">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={project.image || `/project-placeholder.svg`}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-h3 font-bold mb-2 text-text">{project.title}</h3>
        <p className="text-body text-text/80 leading-body line-clamp-3">
          {project.oneLiner}
        </p>
      </div>
    </motion.div>
  )
}

export default ProjectCard
