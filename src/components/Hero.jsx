import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="section hero-section" style={{ background: 'var(--section-bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="hero-bg" />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="gradient-text" style={{ marginBottom: '1.5rem' }}>
            SMAGH <span>DEEP</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1.2 }}
            style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)', color: 'var(--text-secondary)', maxWidth: '768px', margin: '0 auto' }}
          >
            I'm Davinder Singh — a Software QA Tester with a passion for building things that just work.<br />
            From Mohali, Punjab, I spend my days breaking apps so users don't have to — hunting bugs, validating APIs, and making sure every tap and click feels smooth and intentional.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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