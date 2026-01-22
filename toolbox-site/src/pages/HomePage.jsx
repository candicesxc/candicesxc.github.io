import { useState } from 'react'
import { motion } from 'framer-motion'
import LogoBubbles from '../components/LogoBubbles'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'

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
    role: "Product Marketing Manager (MBA Intern)",
    company: "Microsoft",
    description: "Led AI agent security research and GTM positioning for Microsoft Security."
  },
  {
    role: "Account Based Marketing Manager",
    company: "Materialize",
    description: ""
  },
  {
    role: "Account Based Marketing Manager",
    company: "Starburst",
    description: ""
  },
  {
    role: "Sr. Growth Marketing Strategist",
    company: "Attentive",
    description: "Scaled through multiple roles from Intern to Senior Strategist over 3+ years."
  }
]

const education = [
  {
    degree: "MBA (2024 – 2026)",
    school: "Yale School of Management"
  },
  {
    degree: "B.S. in Media, Culture, and Communication; Web Programming (2016 – 2020)",
    school: "New York University"
  }
]

const orgLogos = [
  { src: "/logos/microsoft.png", alt: "Microsoft" },
  { src: "/logos/materialize.jpeg", alt: "Materialize" },
  { src: "/logos/starburst.png", alt: "Starburst" },
  { src: "/logos/attentive.png", alt: "Attentive" },
  { src: "/logos/yalesom.svg", alt: "Yale SOM" },
  { src: "/logos/nyu.png", alt: "NYU" },
]

function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="container-main py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Hey there, I’m Candice 👋 <br/>
              <span className="text-primary">Welcome to my corner of the internet.</span>
            </h1>
            <p className="text-lg md:text-xl text-text/80 mb-6 leading-relaxed">
              I’m a tech marketer turned Yale SOM MBA Candidate with a passion for building.
            </p>
            <p className="text-body text-text/80 mb-8 leading-relaxed max-w-2xl">
              I’ve been coding since college, but lately, I’ve been focused on vibe coding—using modern tools to bring ideas to life at the speed of thought. This site is my playground and portfolio for everything I’m building during my time at Yale.
            </p>
            
            {/* Organizations */}
            <div className="mt-12">
              <h3 className="text-sm uppercase tracking-wider font-bold text-text/50 mb-4">Organizations I've been part of</h3>
              <div className="flex flex-wrap gap-6 items-center">
                {orgLogos.map((logo, idx) => (
                  <img 
                    key={idx} 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="flex-1 w-full h-[400px] md:h-[500px]">
          <LogoBubbles />
        </div>
      </section>

      {/* Selected Projects */}
      <section className="container-main py-16">
        <h2 className="text-3xl font-bold mb-10">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Experience & Fun Side */}
      <section className="container-main py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Experience */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
            <div className="space-y-8 relative border-l-2 border-surface/20 pl-8 ml-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background"></div>
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <p className="text-primary font-medium mb-1">{exp.role}</p>
                  {exp.description && <p className="text-text/70 text-sm">{exp.description}</p>}
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-8 mt-16">Education</h2>
            <div className="space-y-8 relative border-l-2 border-surface/20 pl-8 ml-4">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-surface border-4 border-background"></div>
                  <h3 className="text-xl font-bold">{edu.school}</h3>
                  <p className="text-text/70">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Videos */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <video className="w-full h-64 object-cover rounded-card bg-black" autoPlay muted loop playsInline>
                <source src="/videos/me1.MOV" type="video/mp4" />
              </video>
              <video className="w-full h-64 object-cover rounded-card bg-black" autoPlay muted loop playsInline>
                <source src="/videos/me2.mov" type="video/mp4" />
              </video>
              <video className="w-full h-64 object-cover rounded-card bg-black" autoPlay muted loop playsInline>
                <source src="/videos/me3.MP4" type="video/mp4" />
              </video>
              <video className="w-full h-64 object-cover rounded-card bg-black" autoPlay muted loop playsInline>
                <source src="/videos/me4.MOV" type="video/mp4" />
              </video>
            </div>
            <p className="text-center mt-4 font-handwriting text-xl text-primary rotate-[-2deg]">the fun side of me 💃</p>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section className="container-main py-16 border-t border-surface/10 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg text-text/80 mb-8 leading-relaxed">
            As I look toward my next chapter in tech GTM, I’m keeping my door open for roles where strategy meets creative execution. Whether you’re curious about MBA life at Yale, the technical side of "vibe coding," or a potential collaboration that needs shape, I’d love to connect.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://www.linkedin.com/in/candiceshen/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-md hover:scale-110 transition-transform text-[#0077b5]">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/candicesxc" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-md hover:scale-110 transition-transform text-black">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
          </div>
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
