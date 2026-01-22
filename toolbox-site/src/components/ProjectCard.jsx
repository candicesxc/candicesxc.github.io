import { motion } from 'framer-motion'
import { useState } from 'react'

function ProjectCard({ project, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      className="card cursor-pointer overflow-hidden flex flex-col h-full"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full aspect-[2/1] bg-secondary/10 rounded-lg overflow-hidden mb-6 border-2 border-secondary/20 group-hover:border-accent transition-colors">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary/10 animate-pulse" />
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
        {/* Changed text-primary to text-text which is dark teal/blue from palette */}
        <h3 className="text-2xl font-bold mb-2 text-text">{project.title}</h3>
        <p className="text-base text-text/80 leading-relaxed mb-4 flex-1">
          {project.oneLiner}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
           {project.tags && project.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                {tag}
            </span>
           ))}
           {project.tags && project.tags.length > 3 && (
               <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">+{project.tags.length - 3}</span>
           )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
