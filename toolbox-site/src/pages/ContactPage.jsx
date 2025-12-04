import { motion } from 'framer-motion'

function ContactPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container-main">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-h1 mb-6">Get in Touch</h1>
          <p className="text-body text-neutral-dark mb-8 leading-body">
            I'm open to collaborations, consulting opportunities, and creative projects. 
            If you have an idea that needs shape or a problem that needs solving, I'd love to hear about it.
          </p>

          <div className="card max-w-md mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-h3 mb-2">Email</h3>
                <a
                  href="mailto:candice.vibecoding@example.com"
                  className="text-body text-accent hover:underline font-medium"
                >
                  candice.vibecoding@example.com
                </a>
              </div>

              <div>
                <h3 className="text-h3 mb-4">Connect</h3>
                <div className="flex justify-center gap-6">
                  <a
                    href="#"
                    className="text-body text-neutral-dark hover:text-accent transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-body text-neutral-dark hover:text-accent transition-colors"
                    aria-label="GitHub profile"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-body text-neutral-dark hover:text-accent transition-colors"
                    aria-label="Notion hub"
                  >
                    Notion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactPage
