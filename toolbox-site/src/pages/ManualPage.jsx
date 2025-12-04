import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function ManualPage() {
  const sections = [
    {
      title: 'Overview',
      icon: '📋',
      content: (
        <div>
          <p className="mb-4">
            Welcome to the Toolbox Manual. This document provides a comprehensive overview of my skills, 
            experience, and capabilities. Think of it as an instruction manual for understanding how I work 
            and what I can build.
          </p>
          <p>
            I bring together technical skills, strategic thinking, and creative problem-solving to deliver 
            solutions that are both functional and delightful. My approach is collaborative, user-centered, 
            and focused on creating value.
          </p>
        </div>
      ),
    },
    {
      title: 'Tool Descriptions',
      icon: '🔧',
      content: (
        <div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Code Wrench</h4>
              <p className="text-small">Building clean, maintainable code with modern web technologies. Proficient in React, Node.js, Python, and various frameworks.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Strategy Ruler</h4>
              <p className="text-small">Developing strategic approaches to product development, market analysis, and business challenges.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Creativity Brush</h4>
              <p className="text-small">Designing user experiences, visual identities, and creative solutions that blend aesthetics with functionality.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Growth Gauge</h4>
              <p className="text-small">Analyzing metrics, optimizing campaigns, and driving growth through data-driven insights and experimentation.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Problem Solving Flashlight</h4>
              <p className="text-small">Tackling complex problems with systematic thinking, breaking down challenges, and finding elegant solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Product Compass</h4>
              <p className="text-small">Building products that users love, focusing on understanding needs and translating them into valuable features.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Multi Tool</h4>
              <p className="text-small">A versatile set of skills that adapt to different challenges, bringing together various disciplines.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Projects Mentioned',
      icon: '📁',
      content: (
        <div>
          <p className="mb-4">
            For detailed information about specific projects, please visit the{' '}
            <Link to="/projects" className="text-accent hover:underline font-medium">
              Projects page
            </Link>
            . Each project demonstrates different aspects of my toolkit and problem-solving approach.
          </p>
          <p>
            Projects span web development, product strategy, design systems, growth initiatives, and more. 
            Each one represents a unique challenge and solution.
          </p>
        </div>
      ),
    },
    {
      title: 'Experience',
      icon: '💼',
      content: (
        <div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-1">Product Manager</h4>
              <p className="text-small text-neutral-dark mb-2">Company Name | 2022 - Present</p>
              <p className="text-small">Led product strategy and development for key features. Collaborated with engineering, design, and stakeholders to deliver impactful products.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Marketing Strategist</h4>
              <p className="text-small text-neutral-dark mb-2">Company Name | 2020 - 2022</p>
              <p className="text-small">Developed and executed marketing campaigns, analyzed performance metrics, and optimized growth strategies.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Web Developer</h4>
              <p className="text-small text-neutral-dark mb-2">Company Name | 2018 - 2020</p>
              <p className="text-small">Built and maintained web applications, collaborated with design teams, and implemented responsive user interfaces.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Education',
      icon: '🎓',
      content: (
        <div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">MBA</h4>
              <p className="text-small text-neutral-dark mb-2">Yale School of Management | 2023 - 2025</p>
              <p className="text-small">Focus on product management, strategy, and technology. Relevant coursework in entrepreneurship and innovation.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Bachelor of Science</h4>
              <p className="text-small text-neutral-dark mb-2">University Name | 2014 - 2018</p>
              <p className="text-small">Major in Computer Science with a focus on web development and human-computer interaction.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Specs Sheet',
      icon: '📊',
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Technical Skills</h4>
              <ul className="space-y-2 text-small">
                <li>• React, JavaScript, TypeScript</li>
                <li>• Node.js, Python</li>
                <li>• HTML, CSS, Tailwind CSS</li>
                <li>• Git, Version Control</li>
                <li>• REST APIs, GraphQL</li>
                <li>• Database Design (SQL, NoSQL)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Design & Tools</h4>
              <ul className="space-y-2 text-small">
                <li>• Figma, Adobe Creative Suite</li>
                <li>• User Research Methods</li>
                <li>• Prototyping & Wireframing</li>
                <li>• Design Systems</li>
                <li>• Analytics & A/B Testing</li>
                <li>• Project Management Tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Business Skills</h4>
              <ul className="space-y-2 text-small">
                <li>• Product Strategy</li>
                <li>• Market Analysis</li>
                <li>• Growth Marketing</li>
                <li>• Stakeholder Management</li>
                <li>• Data Analysis</li>
                <li>• Agile Methodologies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Languages</h4>
              <ul className="space-y-2 text-small">
                <li>• English (Native)</li>
                <li>• Additional languages as applicable</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-main">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-h1 mb-4">The Toolbox Manual</h1>
          <p className="text-body text-neutral-dark max-w-2xl leading-body">
            A comprehensive guide to my skills, experience, and capabilities. Think of this as an 
            instruction manual for understanding how I work and what I can build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl" role="img" aria-label={section.title}>
                  {section.icon}
                </span>
                <h2 className="text-h2">{section.title}</h2>
              </div>
              <div className="text-body text-neutral-dark leading-body">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManualPage
