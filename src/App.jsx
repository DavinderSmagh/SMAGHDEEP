import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import CreativeWork from './components/CreativeWork'
// import Gallery from './components/Gallery'   // ← new
import MusicPlayer from './components/MusicPlayer'
import Contact from './components/Contact'

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }
  return (
    <div className="relative min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <div id="hero">
          <Hero />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="journey">
          <Journey />
        </div>

        <div id="work">
          <CreativeWork />
        </div>

        {/* <div id="gallery">
          <Gallery />
        </div> */}

        <div id="music">
          <MusicPlayer />
        </div>

        <div id="connect">
          <Contact />
        </div>
      </main>
    </div>
  )
}

export default App