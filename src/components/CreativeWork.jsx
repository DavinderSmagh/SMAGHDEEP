// src/components/CreativeWork.jsx
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Database, Server, Music, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Personal Portfolio (this site)",
    description: "Built with React, Vite, GSAP, Lenis — smooth animations, responsive design, future-proof for music integration.",
    tech: ["React", "Vite", "GSAP", "Lenis"],
    icon: Globe,
    link: "#",
    color: "#fcd34d",
  },
  {
    title: "Task Manager App",
    description: "Full-featured todo app with localStorage persistence, dark mode, drag & drop, filters — clean React architecture.",
    tech: ["React", "LocalStorage"],
    icon: Code,
    link: "#",
    color: "#fbbf24",
  },
  {
    title: "E-commerce Admin Dashboard",
    description: "Mock admin panel with user & order management, charts, real-time updates — focused on state management & UX.",
    tech: ["React", "Recharts", "Zustand", "Firebase"],
    icon: Database,
    link: "#",
    color: "#f59e0b",
  },
  {
    title: "First Music Player Prototype (scroll down to see...)",
    description: "Full-featured audio player with playlist, real-time canvas waveform visualizer — singer mode active.",
    tech: ["React", "Howler.js", "Canvas", "GSAP"],
    icon: Music,
    link: "../../src/components/MusicPlayer.jsx",
    color: "#d97706",
  },

]

export default function CreativeWork() {
  useEffect(() => {
    // Card stagger animation
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Hover scale + glow (GSAP for better control)
    projects.forEach((_, i) => {
      const card = document.querySelector(`.project-card-${i}`)
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: `0 25px 50px -12px rgba(245, 158, 11, 0.4)`,
            duration: 0.4,
            ease: "power2.out",
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5)`,
            duration: 0.4,
            ease: "power2.out",
          })
        })
      }
    })
  }, [])

  return (
    <section id="work" className="section" style={{ background: 'var(--section-bg)' }}>
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
          marginBottom: '5rem',
          background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Creative Work
        </h2>

        <div className="work-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`project-card project-card-${index}`}
              style={{
                background: 'var(--panel-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--panel-border)',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div style={{
                height: '220px',
                background: `linear-gradient(135deg, ${project.color}20, transparent)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <project.icon size={80} style={{ color: project.color, opacity: 0.7 }} />
              </div>

              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.6rem',
                  marginBottom: '1rem',
                  color: project.current ? 'var(--accent)' : 'var(--fg)',
                }}>
                  {project.title}
                  {project.comingSoon && (
                    <span style={{
                      fontSize: '0.9rem',
                      background: 'rgba(245,158,11,0.2)',
                      color: '#fcd34d',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      marginLeft: '1rem',
                    }}>
                      Coming Soon
                    </span>
                  )}
                </h3>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tech.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--surface)',
                        color: 'var(--text-secondary)',
                        padding: '0.35rem 0.9rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        border: '1px solid var(--panel-border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            More projects coming soon...
          </p>
        </div>
      </div>
    </section>
  )
}