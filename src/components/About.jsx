import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const profileImage = new URL('../../assets/pict.jpg', import.meta.url).href

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
    <section id="about" className="section about-section" style={{ background: 'var(--section-bg)' }}>
      <div className="about-bg" />

      <div className="about-grid" style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', order: 2 }}
        >
          <div className="profile-wrapper">
            <img
              src={profileImage}
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
            About
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.25rem', color: 'var(--text-secondary' }}>
            <p className="about-text-line">I'm Davinder Singh — a Software QA Tester with a passion for building things that just work.</p>
            <p className="about-text-line">From Mohali, Punjab, I spend my days breaking apps so users don't have to — hunting bugs, validating APIs, and making sure every tap and click feels smooth and intentional.</p>
            <p className="about-text-line">With hands-on experience in manual mobile testing, Postman API testing, MongoDB, and Flutter-based apps, I bridge the gap between developers and a flawless user experience.</p>
            <p className="about-text-line" style={{ fontWeight: '600', color: 'var(--accent)', fontSize: '1.5rem' }}>
              One bug at a time — I'm on a mission to make software cleaner, faster, and better for everyone who uses it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', marginTop: '4rem' }}>
            {[
              { label: "Based in", value: "Mohali, Punjab" },
              { label: "Experience", value: "1+ Year" },
              { label: "Passions", value: "Testing · Tech · Building" },
              { label: "Currently", value: "Breaking Bugs & Building Skills" },
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
                  border: '1px solid var(--panel-border)',
                  borderRadius: '1rem',
                  background: 'var(--panel-bg)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.label}</div>
                <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
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
