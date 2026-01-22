import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bubblesData = [
  { 
    id: 1,
    src: "/logos/yalesom.svg", 
    alt: "Yale SOM", 
    position: { top: "5%", right: "10%" }, 
    duration: 5 
  },
  { 
    id: 2,
    src: "/logos/microsoft.png", 
    alt: "Microsoft", 
    position: { top: "35%", left: "5%" }, 
    duration: 5.4 
  },
  { 
    id: 3,
    src: "/logos/attentive.png", 
    alt: "Attentive", 
    position: { bottom: "10%", right: "5%" }, 
    duration: 5.2 
  },
  { 
    id: 4,
    src: "/logos/starburst.png", 
    alt: "Starburst", 
    position: { bottom: "25%", left: "25%" }, 
    duration: 5.6 
  },
  { 
    id: 5,
    src: "/logos/materialize.jpeg", 
    alt: "Materialize", 
    position: { top: "20%", right: "35%" }, 
    duration: 5.8 
  },
  { 
    id: 6,
    src: "/logos/nyu.png", 
    alt: "NYU", 
    position: { top: "60%", left: "55%" }, 
    duration: 6.2 
  },
];

function Bubble({ data }) {
  const [isBurst, setIsBurst] = useState(false)

  useEffect(() => {
    let timer
    if (isBurst) {
      timer = setTimeout(() => setIsBurst(false), 3000)
    }
    return () => clearTimeout(timer)
  }, [isBurst])

  return (
    <motion.div
      className="bubble cursor-pointer"
      style={{ 
        ...data.position, 
        // Ensure CSS transitions don't interfere with Framer Motion
        transition: 'none' 
      }}
      initial={{ y: 120, scale: 0.7, opacity: 0 }}
      animate={
        isBurst
          ? { scale: 1.5, opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }
          : {
              y: [-10, -25, -10],
              scale: 1,
              opacity: 1,
              transition: {
                y: {
                  repeat: Infinity,
                  duration: data.duration,
                  ease: "easeInOut",
                  // Add a random delay so they don't all start in sync if re-rendered
                  delay: Math.random() * 2 
                },
                scale: { duration: 0.4, type: "spring" },
                opacity: { duration: 0.4 }
              }
            }
      }
      whileHover={!isBurst ? { scale: 1.1, borderColor: "#c1121f", zIndex: 20 } : {}}
      onClick={() => setIsBurst(true)}
    >
      <img src={data.src} alt={data.alt} />
    </motion.div>
  )
}

export default function LogoBubbles() {
  return (
    <div className="logo-bubbles-wrapper">
      {bubblesData.map((bubble) => (
        <Bubble key={bubble.id} data={bubble} />
      ))}
    </div>
  );
}
