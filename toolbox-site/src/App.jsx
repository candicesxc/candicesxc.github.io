import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ManualPage from './pages/ManualPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
