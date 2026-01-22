import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import LogoBubbles from '../components/LogoBubbles'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import VideoPlayer from '../components/VideoPlayer'
import Cursor from '../components/Cursor'

const projects = [
  {
    id: 1,
    title: "Listen, You Are Loved",
    oneLiner: "Personalized affirmation generator using a multimodal AI pipeline.",
    fullDescription: "Personalized support for the moments you need it most. I built this full-stack application to move beyond generic wellness content and deliver custom, spoken-word affirmations on demand. The app orchestrates a multimodal AI pipeline, using GPT-4o Mini to craft custom scripts tailored to a specific persona and OpenAI TTS to breathe life into them across multiple languages.\n\nTo keep the experience seamless, I engineered a browser-based audio engine using the Web Audio API that dynamically mixes speech with background music, allowing users to customize, loop, and export their final affirmation as a WAV file directly in their browser.",
    tags: ["#React", "#Node.js", "#OpenAI-API", "#WebAudioAPI", "#MultimodalAI"],
    image: "/images/listen-you-are-loved.png",
    liveLink: "https://candiceshen.com/listen-you-are-loved/",
    repoLink: "https://github.com/candicesxc/listen-you-are-loved"
  },
  {
    id: 2,
    title: "Competitive Battlecard AI",
    oneLiner: "Automated market intelligence tool that transforms URLs into GTM battlecards.",
    fullDescription: "Turn a single URL into a complete market intelligence suite. Designed for product marketers and GTM teams, this tool eliminates the manual grind of competitor research. By simply entering a company website, the system independently identifies top rivals, scores them for relevancy, and generates structured battlecards—distilling complex market data into actionable insights like pricing, \"How to Win\" strategies, and \"Potential Landmines.\"\n\nThe architecture focuses on high-utility output and data persistence, featuring a neural search layer to uncover niche competitors that traditional search engines often miss. To bridge the gap between analysis and execution, I built a custom jsPDF integration that transforms AI-generated insights into board-ready PDF reports. The interface also includes a local storage system for saving and reloading intelligence mid-workflow, ensuring that strategic data is always accessible. This project demonstrates how to turn raw web data into high-stakes strategic assets that empower sales teams to close deals with confidence.",
    tags: ["#MarketIntelligence", "#ProductMarketing", "#NeuralSearch", "#GTM-Strategy", "#TailwindCSS", "#DecisionSupport"],
    image: "/images/Competitive-Battlecard-AI.png",
    liveLink: "https://candiceshen.com/competitive-battlecard-ai/",
    repoLink: "https://github.com/candicesxc/competitive-battlecard-ai"
  },
  {
    id: 3,
    title: "Profile-to-Profile Outreach Engine",
    oneLiner: "Multi-agent AI tool for high-conversion, personalized LinkedIn networking.",
    fullDescription: "Stop sending generic requests and start building real connections. I developed this full-stack networking tool to transform the \"blank page\" problem of cold outreach into a data-driven, high-conversion process. By orchestrating a multi-agent AI system, the engine analyzes the \"hidden\" overlap between two LinkedIn profiles—finding shared companies, schools, and niche skills—to draft personalized messages that actually get replies.\n\nThe system uses a FastAPI backend to coordinate CrewAI agents for profile extraction, research, and drafting. I integrated the Exa Search API to pull real-time company insights, allowing GPT-4o to generate content that respects strict platform character limits. The frontend features a UUID-based persistence system for tracking outreach history and iterative message refinement without requiring a login. This project highlights the intersection of autonomous AI research and streamlined professional communication.",
    tags: ["#Python", "#FastAPI", "#CrewAI", "#OpenAI", "#Exa-Search", "#MultiAgentSystems", "#FullStack"],
    image: "/images/Personalized-Outreach-Generator.png",
    liveLink: "https://candiceshen.com/Profile-to-Profile-Outreach-Engine/",
    repoLink: "https://github.com/candicesxc/Profile-to-Profile-Outreach-Engine"
  }
]

const experience = [
  {
    role: "MBA",
    company: "Yale School of Management",
    link: "https://som.yale.edu/",
    description: ""
  },
  {
    role: "Product Marketing Manager Intern",
    company: "Microsoft",
    link: "https://www.microsoft.com/",
    description: ""
  },
  {
    role: "Account Based Marketing Manager",
    company: "Materialize",
    link: "https://materialize.com/",
    description: ""
  },
  {
    role: "Account Based Marketing Manager",
    company: "Starburst",
    link: "https://www.starburst.io/",
    description: ""
  },
  {
    role: "Sr. Growth Marketing Strategist",
    company: "Attentive",
    link: "https://www.attentive.com/",
    description: ""
  },
  {
    role: "B.S. in Media, Culture, and Communication",
    company: "New York University",
    link: "https://www.nyu.edu/",
    description: ""
  }
]

function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="min-h-screen">
      <Cursor />
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(193,18,31,0.1),transparent_40%)]"></div>
        <div className="container-main py-20 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
                Hey there, <br/>
                I’m <motion.span 
                  className="text-primary relative inline-block"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2, 
                    type: "spring", 
                    stiffness: 100 
                  }}
                >
                  Candice
                  <svg className="absolute w-full h-4 -bottom-2 left-0 text-secondary opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </motion.span> 👋
              </h1>
              <h2 className="text-3xl md:text-4xl text-secondary font-heading mb-8 leading-snug font-normal">
                I’m a <a href="https://som.yale.edu/" target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:text-primary transition-colors">Yale MBA</a> candidate and tech marketer using vibe coding to bring ideas to life.
              </h2>

              <div className="mt-8 md:mt-12">
                 {/* Empty div to push bubbles or just separation */}
              </div>

            </motion.div>
          </div>
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="w-full h-[400px] md:h-[500px] relative">
               <LogoBubbles />
            </div>
             {/* Organizations */}
             <div className="mt-4 w-full">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary mb-2 text-center">Organizations I've been part of</h3>
              </div>
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section id="projects" className="py-24 bg-white relative">
         <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-white"></div>
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-bold mb-12 text-left text-primary">Selected Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, idx) => (
                <div key={project.id} style={{ transitionDelay: `${idx * 100}ms` }}>
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience & Fun Side */}
      <section id="experience" className="py-24 bg-secondary/5 relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Column: Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-12 text-left text-text">Experience</h2>
              <div className="space-y-12 relative border-l-4 border-secondary/30 pl-10 ml-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[54px] top-1 w-7 h-7 rounded-full bg-secondary border-4 border-background transition-transform group-hover:scale-125 duration-300"></div>
                    <h3 className="text-2xl font-bold text-primary mb-1">
                        {exp.link ? (
                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-2">
                                {exp.company}
                            </a>
                        ) : (
                            exp.company
                        )}
                    </h3>
                    <p className="text-xl text-secondary font-medium mb-2">{exp.role}</p>
                    {exp.description && <p className="text-text/80 text-lg leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Videos */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center sticky top-24"
            >
              <div className="w-full max-w-xs aspect-[9/16] relative rotate-2 hover:rotate-0 transition-transform duration-500">
                 <VideoPlayer />
              </div>
              <p className="text-center mt-8 font-heading text-3xl text-accent rotate-[-2deg]">the fun side of me 💃</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="py-24 bg-primary text-white relative">
        <div className="container-main text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-bold mb-12 text-left text-white">Let's Connect</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl font-light">
              I’m currently seeking post-MBA roles in tech GTM that blend strategy with creative execution. I’m always happy to chat about Yale, "vibe coding," or potential collaborations—feel free to reach out!
            </p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/candiceshen/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-xl hover:scale-110 transition-transform text-[#0077b5] group">
                <svg className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com/candicesxc" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-xl hover:scale-110 transition-transform text-black group">
                <svg className="w-8 h-8 group-hover:-rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
            <p className="mt-8 text-white/60 text-xs">
              © {new Date().getFullYear()} Candice Shen. All rights reserved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}

export default HomePage
