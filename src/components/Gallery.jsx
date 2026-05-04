import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = ["All", "Music", "Urban", "Tech"]

const galleryItems = [
  {
    id: 1,
    category: "Music",
    title: "Recording Session",
    description: "Capturing raw emotion in the studio.",
    image: new URL('../../assets/gallery/recording.jpg', import.meta.url).href,
    fallback: "https://images.unsplash.com/photo-1598488035139-bdb92bc3307b?auto=format&fit=crop&w=800&q=80",
    aspect: "4/3",
  },
  {
    id: 2,
    category: "Urban",
    title: "Street Poetry",
    description: "Words on walls, feelings in motion.",
    image: new URL('../../assets/gallery/poetry.jpg', import.meta.url).href,
    fallback: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=800&q=80",
    aspect: "3/4",
  },
  {
    id: 3,
    category: "Tech",
    title: "Code & Coffee",
    description: "Building dreams one line at a time.",
    image: new URL('../../assets/gallery/code.jpg', import.meta.url).href,
    fallback: "https://images.unsplash.com/photo-1499750310117-099d14110cf1?auto=format&fit=crop&w=800&q=80",
    aspect: "16/9",
  },
  {
    id: 4,
    category: "Music",
    title: "Live Energy",
    description: "Stage lights, heartbeat loud.",
    image: new URL('../../assets/gallery/live.jpg', import.meta.url).href,
    fallback: "https://images.unsplash.com/photo-1501386762222-ddfcfad03aa0?auto=format&fit=crop&w=800&q=80",
    aspect: "4/3",
  },
  {
    id: 5,
    category: "Urban",
    title: "Creative Flow",
    description: "When ideas turn into reality.",
    image: new URL('../../assets/gallery/creative.jpg', import.meta.url).href,
    fallback: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
    aspect: "1/1",
  },
  {
    id: 6,
    category: "Urban",
    title: "City Lights",
    description: "Inspiration from the night horizon.",
    image: new URL('../../assets/gallery/night.jpg', import.meta.url).href,
    fallback: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?auto=format&fit=crop&w=800&q=80",
    aspect: "16/9",
  },
]

export default function Gallery() {
  const [filter, setFilter] = useState("All")
  const [selectedIdx, setSelectedIdx] = useState(null)
  const gridRef = useRef(null)

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter)

  useEffect(() => {
    // Initial reveal
    gsap.fromTo(
      ".gallery-card",
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      }
    )
  }, [])

  useEffect(() => {
    // Re-animate on filter change
    gsap.fromTo(
      ".gallery-card",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    )
  }, [filter])

  const nextImage = (e) => {
    e.stopPropagation()
    setSelectedIdx((prev) => (prev + 1) % filteredItems.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setSelectedIdx((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <section id="gallery" className="section" style={{ background: 'var(--section-bg)', padding: '120px 0' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 800,
              letterSpacing: '-2px',
              background: 'linear-gradient(to right, #fcd34d, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2rem'
            }}
          >
            Visual Journey
          </motion.h2>

          {/* Filter Controls */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '3rem',
                  border: filter === cat ? '1px solid var(--accent)' : '1px solid var(--panel-border)',
                  background: filter === cat ? 'rgba(252, 211, 77, 0.1)' : 'transparent',
                  color: filter === cat ? 'var(--accent)' : 'var(--muted)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div ref={gridRef} className="gallery-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="gallery-card"
                onClick={() => setSelectedIdx(idx)}
                style={{
                  position: 'relative',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'var(--panel-bg)'
                }}
              >
                <div style={{ 
                  paddingBottom: item.aspect === '4/3' ? '75%' : 
                                item.aspect === '3/4' ? '133%' : 
                                item.aspect === '16/9' ? '56.25%' : '100%',
                  position: 'relative'
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    crossOrigin="anonymous"
                    onError={(e) => { e.target.onerror = null; e.target.src = item.fallback; }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  
                  {/* Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--panel-overlay)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                    opacity: 0,
                    transition: 'opacity 0.4s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <span style={{ color: '#fcd34d', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.category}</span>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--fg)' }}>{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'var(--overlay-solid)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
              onClick={() => setSelectedIdx(null)}
            >
              <button 
                onClick={prevImage}
                style={{ position: 'absolute', left: '2rem', background: 'none', border: 'none', color: 'var(--fg)', cursor: 'pointer' }}
              >
                <ChevronLeft size={48} />
              </button>

              <motion.div 
                layoutId={`img-${filteredItems[selectedIdx].id}`}
                style={{ maxWidth: '90%', maxHeight: '80vh', position: 'relative' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[selectedIdx].image}
                  alt={filteredItems[selectedIdx].title}
                  crossOrigin="anonymous"
                  onError={(e) => { e.target.onerror = null; e.target.src = filteredItems[selectedIdx].fallback; }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '80vh',
                    borderRadius: '1rem',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
                  }}
                />
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                   <h3 style={{ fontSize: '2rem', color: '#fff' }}>{filteredItems[selectedIdx].title}</h3>
                   <p style={{ color: '#888', fontSize: '1.2rem' }}>{filteredItems[selectedIdx].description}</p>
                </div>
              </motion.div>

              <button 
                onClick={nextImage}
                style={{ position: 'absolute', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <ChevronRight size={48} />
              </button>

              <button
                onClick={() => setSelectedIdx(null)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={32} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}