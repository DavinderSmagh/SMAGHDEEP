import { motion } from 'framer-motion'
import { Mail, Instagram, Send } from 'lucide-react'
import { useState } from 'react'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/smaghdeep03?igsh=amQxanBmZHYzZGZv&utm_source=qr' },
  // { icon: Youtube, label: 'YouTube', href: '#' },
  // { icon: Music, label: 'Spotify (Coming Soon)', href: '#' },
  { icon: Mail, label: 'Email Me', href: 'mailto:idavinderdeep@gmail.com?subject=wellcome🤝' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <section className="section" style={{ background: 'var(--section-bg)' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at top left, rgba(245,158,11,0.05), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            marginBottom: '2rem',
            background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ fontSize: '1.25rem', color: '#d1d5db', maxWidth: '768px', margin: '0 auto 4rem' }}
        >
        
          Whether it's code , freelance work, suggestions or just a good conversation — I'm always open. Drop a message or find me on the platforms below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem 3rem', marginBottom: '5rem' }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.15, y: -8 }}
              transition={{ delay: i * 0.1 + 0.6, type: 'spring', stiffness: 300 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '9999px',
                background: 'var(--panel-bg)',
                border: '1px solid var(--panel-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s'
              }}>
                <link.icon size={36} style={{ color: '#fcd34d' }} />
              </div>
              <span style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                {link.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1 }}
          style={{ maxWidth: '512px', margin: '0 auto' }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ padding: '1.25rem 1.5rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '0.75rem', color: 'var(--fg)', fontSize: '1.1rem' }} />
            <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ padding: '1.25rem 1.5rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '0.75rem', color: 'var(--fg)', fontSize: '1.1rem' }} />
            <textarea rows="5" placeholder="Your Message..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ padding: '1.25rem 1.5rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '0.75rem', color: 'var(--fg)', fontSize: '1.1rem', resize: 'vertical' }} />
            <button type="submit" style={{
              padding: '1.25rem 3rem',
              background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
              color: 'black',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0 auto'
            }}>
              Send Message <Send size={20} />
            </button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ marginTop: '5rem', color: '#6b7280', fontSize: '0.875rem' }}
        >
          © {new Date().getFullYear()} Smagh Deep • Made with passion & ❤
        </motion.p>
      </div>
    </section>
  )
}