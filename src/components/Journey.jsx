// src/components/Journey.jsx
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bug, Music , Code, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: "2019",
    title: "First Steps",
    description: "Started exploring code and programing after my school completes and found my passion for technology.Made websites using HTML ,CSS and using blogger platform.",
    icon: Code,
    color: "#fcd34d",
  },
  {
    year: "2020",
    title: "Creative",
    description: "When i started my college and learned about web development. Began making the short projects like calculator and todo app.",
    icon: Star,
    color: "#fbbf24",
  },
  {
    year: "2024",
    title: "Design & Code",
    description: "Learned more about the basic web development from an college internship and started making more complex projects like music player and weather app. Started learning about UI/UX design and creating more polished interfaces.",
    icon: Code,
    color: "#f59e0b",
  },
  {
    year: "2026",
    title: "The Journey Continues...",
    description: "Working as a Software QA Tester ,Taking hands-on experience in manual mobile testing. Validating APIs, and making sure every tap and click feels smooth and intentional. Using devlopment logics to find the bugs and make sure that the app is working fine.",
    icon: Bug,
    color: "#f59e0b",
    current: true,
  },
]

export default function Journey() {
  useEffect(() => {
    // Timeline line animation
    gsap.fromTo(
      ".timeline-line",
      { height: 0 },
      {
        height: "100%",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".journey-timeline",
          start: "top 70%",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    )

    // Milestone cards stagger reveal
    gsap.fromTo(
      ".milestone-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-timeline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Icon circle pop + line connect
    milestones.forEach((_, i) => {
      gsap.fromTo(
        `.milestone-circle-${i}`,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: `.milestone-card-${i}`,
            start: "top 85%",
          },
        }
      )
    })
  }, [])

  return (
    <section className="section" style={{ background: 'var(--section-bg)' }}>
      <div style={{ position: 'relative', padding: '2rem 0' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
          marginBottom: '4rem',
          background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          My Journey
        </h2>

        <div className="journey-timeline" style={{ position: 'relative', padding: '2rem 0' }}>
          {/* Vertical timeline line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '4px',
            background: 'var(--panel-border)',
            transform: 'translateX(-50%)',
          }}>
            <div className="timeline-line" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 0,
              background: 'linear-gradient(to bottom, #fcd34d, #fbbf24)',
              transformOrigin: 'top',
            }} />
          </div>

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`milestone-card-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '4rem 0',
                position: 'relative',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              }}
            >
              <div style={{
                flex: 1,
                padding: index % 2 === 0 ? '0 4rem 0 0' : '0 0 0 4rem',
                textAlign: index % 2 === 0 ? 'right' : 'left',
              }}>
                <div style={{
                  background: 'var(--panel-bg)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--panel-border)',
                  borderRadius: '1rem',
                  padding: '1.5rem 2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                  }}>
                    {milestone.year}
                  </div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.75rem',
                    color: milestone.current ? 'var(--accent)' : 'var(--fg)',
                  }}>
                    {milestone.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Circle + Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                position: 'relative',
                zIndex: 2,
              }}>
                <div className={`milestone-circle-${index}`} style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'var(--panel-bg)',
                  border: `3px solid ${milestone.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 30px ${milestone.color}40`,
                }}>
                  <milestone.icon size={36} style={{ color: milestone.color }} />
                </div>
              </div>

              {/* Empty space on alternate side */}
              <div style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}