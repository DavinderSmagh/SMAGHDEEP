import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useEffect(() => {
    gsap.fromTo(
      ".about-bg",
      { y: -60 },
      {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    )

    gsap.fromTo(
      ".about-text-line",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  return (
    <section id="about" className="section about-section" style={{ background: 'linear-gradient(to bottom, #000, #111)' }}>
      <div className="about-bg" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gap: '4rem', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', order: 2 }}
        >
          <div className="profile-wrapper">
            <img
              src="./assets/pict.jpg"
              alt="Smagh Deep"
              className="profile-photo"
            />
          </div>
        </motion.div>

        <div style={{ order: 1, display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            About Smagh Deep
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.25rem', color: '#e5e7eb' }}>
            <p className="about-text-line">I'm Smagh Deep — a dreamer, creator, and soul on a mission to turn feelings into art.</p>
            <p className="about-text-line">From the streets of Chandigarh to the stages of imagination, I live to tell stories that hit deep — whether through words, sound, visuals, or pure emotion.</p>
            <p className="about-text-line">Right now I'm exploring music, poetry, design, and everything that makes the heart beat faster.</p>
            <p className="about-text-line" style={{ fontWeight: '600', color: '#fcd34d', fontSize: '1.5rem' }}>
              One day this space might become a full music universe. Until then — this is me, raw and real.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', marginTop: '4rem' }}>
            {[
              { label: "Based in", value: "Chandigarh" },
              { label: "Age", value: "Young & Free" },
              { label: "Passions", value: "Music · Poetry · Design" },
              { label: "Currently", value: "Creating & Dreaming" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 1, duration: 0.9 }}
                style={{
                  textAlign: 'center',
                  padding: '1.25rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '1rem',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>{item.label}</div>
                <div style={{ color: '#fcd34d', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}