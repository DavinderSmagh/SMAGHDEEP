import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="section" style={{ background: 'var(--section-bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--panel-overlay)'
      }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{ marginBottom: '1.5rem' }}>
            SMAGH <span style={{
              background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>DEEP</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)', color: 'var(--text-secondary)', maxWidth: '768px', margin: '0 auto' }}
          >
            Creative Soul • Storyteller • Dream Chaser<br />
            Turning moments into memories, silence into sound, vision into reality.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{ marginTop: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{
            width: '24px',
            height: '40px',
            border: '2px solid var(--panel-border)',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ width: '6px', height: '12px', background: 'var(--fg)', borderRadius: '9999px' }}
            />
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Scroll to explore
          </p>
        </motion.div>
      </div>
    </section>
  )
}