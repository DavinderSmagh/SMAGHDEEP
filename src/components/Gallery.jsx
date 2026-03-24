import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    id: 1,
    title: "First Recording Session",
    description: "Late night vibes — capturing raw emotion",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27c1d4?w=800&auto=format&fit=crop&q=80",
    aspect: "4/3",
  },
  {
    id: 2,
    title: "Street Poetry Moment",
    description: "Words on walls, feelings in motion",
    image: "https://images.unsplash.com/photo-1518644961665-ed1726917e86?w=800&auto=format&fit=crop&q=80",
    aspect: "3/4",
  },
  {
    id: 3,
    title: "Code & Coffee",
    description: "Building dreams one line at a time",
    image: "https://images.unsplash.com/photo-1516321310763-4b2f5d8d9c8c?w=800&auto=format&fit=crop&q=80",
    aspect: "16/9",
  },
  {
    id: 4,
    title: "Live Performance (Coming Soon)",
    description: "Stage lights, heartbeat loud — future memories",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&auto=format&fit=crop&q=80",
    aspect: "4/3",
    comingSoon: true,
  },
  {
    id: 5,
    title: "Creative Flow",
    description: "When ideas turn into reality",
    image: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&auto=format&fit=crop&q=80",
    aspect: "1/1",
  },
  {
    id: 6,
    title: "Chandigarh Nights",
    description: "Inspiration from the city lights",
    image: "https://images.unsplash.com/photo-1519125323398-675f398f6978?w=800&auto=format&fit=crop&q=80",
    aspect: "16/9",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    // Staggered card reveal
    gsap.fromTo(
      ".gallery-card",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  const openLightbox = (item) => {
    if (!item.comingSoon) {
      setSelectedImage(item)
    }
  }

  const closeLightbox = () => setSelectedImage(null)

  return (
    <section id="gallery" className="section" style={{ background: 'linear-gradient(to bottom, #000, #0a0a0a)' }}>
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
          marginBottom: '5rem',
          background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Gallery
        </h2>
        </div>


        <div className="gallery-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`gallery-card gallery-card-${index}`}
              style={{
                position: 'relative',
                borderRadius: '1rem',
                overflow: 'hidden',
                cursor: item.comingSoon ? 'default' : 'pointer',
                opacity: item.comingSoon ? 0.7 : 1,
              }}
              onClick={() => openLightbox(item)}
            >
              <div style={{ 
                position: 'relative',
                paddingBottom: item.aspect === '4/3' ? '75%' : 
                              item.aspect === '3/4' ? '133.33%' : 
                              item.aspect === '16/9' ? '56.25%' : '100%',
                height: 0,
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  className="gallery-image"
                />
              </div>

              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem',
              }}
              className="gallery-overlay"
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db' }}>
                {item.description}
              </p>
              {item.comingSoon && (
                <span style={{
                  marginTop: '1rem',
                  background: 'rgba(245,158,11,0.2)',
                  color: '#fcd34d',
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  display: 'inline-block',
                }}>
                  Coming Soon
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {/* Simple lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90%',
                borderRadius: '1rem',
                overflow: 'hidden',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '1rem',
                }}
              />
              <button
                onClick={closeLightbox}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: 'white',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}