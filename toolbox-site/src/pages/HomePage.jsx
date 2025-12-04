import { useState } from 'react'
import { motion } from 'framer-motion'
import Toolbox from '../components/Toolbox'
import ToolDrawer from '../components/ToolDrawer'

function HomePage() {
  const [selectedTool, setSelectedTool] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleToolClick = (tool) => {
    setSelectedTool(tool)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setTimeout(() => setSelectedTool(null), 300)
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-main">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-h1 mb-6">The Cute Toolbox</h1>
          <p className="text-body text-neutral-dark max-w-2xl mx-auto leading-body">
            Welcome to my digital toolbox. Each tool represents a skill I bring to projects, 
            from code to strategy to creativity. Click to explore what I can build with each one.
          </p>
        </motion.div>

        <Toolbox onToolClick={handleToolClick} />

        <ToolDrawer
          tool={selectedTool}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
        />
      </div>
    </div>
  )
}

export default HomePage
