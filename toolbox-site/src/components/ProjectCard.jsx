import { motion } from 'framer-motion'
import { useState } from 'react'

function ProjectCard({ project, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      className="card cursor-pointer overflow-hidden"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full h-48 bg-secondary-clay rounded-t-card overflow-hidden mb-4">
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
      <div className="px-2">
        <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
        <h3 className="text-h3 mb-3">{project.title}</h3>
        <p className="text-body text-neutral-dark leading-body line-clamp-3">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}

export default ProjectCard
