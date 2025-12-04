import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'

const getDefaultImage = () => `${import.meta.env.BASE_URL}project-placeholder.svg`

// Placeholder projects data
const projects = [
  {
    id: 1,
    title: 'Web Application Platform',
    category: 'Code',
    description: 'A full-stack web application built with modern technologies. This project demonstrates clean architecture, efficient state management, and responsive design principles.',
    description2: 'The platform supports real-time updates, user authentication, and seamless data synchronization across devices. Built with performance and scalability in mind.',
    image: getDefaultImage(),
    techStack: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    id: 2,
    title: 'API Integration System',
    category: 'Code',
    description: 'A robust API integration system that connects multiple third-party services. Handles authentication, rate limiting, and error recovery gracefully.',
    description2: 'The system includes comprehensive logging, monitoring, and automatic retry mechanisms. Designed to be maintainable and easy to extend with new integrations.',
    image: getDefaultImage(),
    techStack: ['Python', 'FastAPI', 'Redis', 'Docker'],
  },
  {
    id: 3,
    title: 'Product Strategy Framework',
    category: 'Strategy',
    description: 'A comprehensive framework for product strategy development. Helps teams align on vision, identify opportunities, and prioritize features effectively.',
    description2: 'The framework includes templates, workshops, and decision-making tools. Used by multiple teams to streamline product planning and execution.',
    image: getDefaultImage(),
    techStack: ['Figma', 'Notion', 'Analytics'],
  },
  {
    id: 4,
    title: 'Market Analysis Dashboard',
    category: 'Strategy',
    description: 'An interactive dashboard for market analysis and competitive intelligence. Visualizes trends, market share, and growth opportunities.',
    description2: 'The dashboard aggregates data from multiple sources and presents insights in an intuitive format. Enables data-driven decision making for product teams.',
    image: getDefaultImage(),
    techStack: ['Tableau', 'Python', 'SQL'],
  },
  {
    id: 5,
    title: 'Design System Library',
    category: 'Creativity',
    description: 'A comprehensive design system with reusable components, patterns, and guidelines. Ensures consistency across products and speeds up development.',
    description2: 'The system includes color palettes, typography scales, component libraries, and usage documentation. Adopted by multiple teams and projects.',
    image: getDefaultImage(),
    techStack: ['Figma', 'Storybook', 'React'],
  },
  {
    id: 6,
    title: 'Brand Identity Package',
    category: 'Creativity',
    description: 'A complete brand identity package including logo design, color schemes, typography, and brand guidelines. Created for a startup in the tech space.',
    description2: 'The identity reflects the company\'s values and resonates with their target audience. Includes digital and print applications with comprehensive style guides.',
    image: getDefaultImage(),
    techStack: ['Illustrator', 'Photoshop', 'InDesign'],
  },
  {
    id: 7,
    title: 'Growth Campaign Platform',
    category: 'Growth',
    description: 'A platform for managing and optimizing growth campaigns. Tracks metrics, A/B tests variations, and provides actionable insights.',
    description2: 'The platform has increased campaign effectiveness by 40% through better targeting and optimization. Includes automated reporting and recommendations.',
    image: getDefaultImage(),
    techStack: ['JavaScript', 'Analytics API', 'MySQL'],
  },
  {
    id: 8,
    title: 'Analytics Dashboard',
    category: 'Growth',
    description: 'A real-time analytics dashboard for tracking key business metrics. Provides visualizations and alerts for important changes.',
    description2: 'The dashboard helps teams monitor performance, identify trends, and make data-driven decisions. Customizable views for different stakeholders.',
    image: getDefaultImage(),
    techStack: ['React', 'D3.js', 'Python'],
  },
  {
    id: 9,
    title: 'Problem Analysis Framework',
    category: 'Problem Solving',
    description: 'A structured approach to problem analysis and solution design. Helps teams break down complex challenges systematically.',
    description2: 'The framework includes templates, methodologies, and best practices. Used in workshops and consulting engagements to drive clarity and action.',
    image: getDefaultImage(),
    techStack: ['Miro', 'Documentation'],
  },
  {
    id: 10,
    title: 'Solution Design System',
    category: 'Problem Solving',
    description: 'A system for designing and documenting solutions to business problems. Includes templates, checklists, and validation criteria.',
    description2: 'The system ensures solutions are well-thought-out, feasible, and aligned with business goals. Reduces rework and improves implementation success rates.',
    image: getDefaultImage(),
    techStack: ['Confluence', 'Figma'],
  },
  {
    id: 11,
    title: 'Product Feature Suite',
    category: 'Product',
    description: 'A comprehensive feature suite for a SaaS product. Includes user research, design, development, and launch phases.',
    description2: 'The features have improved user engagement by 60% and received positive feedback. Includes onboarding flows, dashboards, and integrations.',
    image: getDefaultImage(),
    techStack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 12,
    title: 'User Research Study',
    category: 'Product',
    description: 'A comprehensive user research study that informed product strategy. Included interviews, surveys, and usability testing.',
    description2: 'The research uncovered key insights that shaped product direction. Findings were presented to stakeholders and influenced roadmap decisions.',
    image: getDefaultImage(),
    techStack: ['UserTesting', 'Figma', 'Analytics'],
  },
]

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-main">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-h1 mb-4">Tool Wall</h1>
          <p className="text-body text-neutral-dark max-w-2xl leading-body">
            A collection of projects showcasing different skills and tools. Each project represents 
            a unique challenge and solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
            </motion.div>
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  )
}

export default ProjectsPage
