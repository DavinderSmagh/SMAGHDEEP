import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import CreativeWork from './components/CreativeWork'
import Gallery from './components/Gallery'   // ← new
import MusicPlayer from './components/MusicPlayer'
import Contact from './components/Contact'

function App() {
  return (
    <div className="relative bg-black min-h-screen">
      <Navbar />

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

        <div id="gallery">
          <Gallery />
        </div>

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