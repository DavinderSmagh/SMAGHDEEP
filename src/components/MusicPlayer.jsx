import { useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Play, Pause, SkipForward, SkipBack, Volume2, List, Music as MusicIcon } from 'lucide-react';

const playlist = [
  {
    title: "Aint That Bad",
    artist: "Gagan Kooner",
    url: "../../assets/audio/Aint That Bad - Gagan Kooner.mp3",
    color: "#fcd34d"
  },
  {
    title: "Aroma",
    artist: "Sidhu Moose Wala",
    url: "../../assets/audio/Aroma - Sidhu Moose Wala.mp3",
    color: "#fbbf24"
  },
  {
    title: "Top Fella",
    artist: "Karan Aujla",
    url: "../../assets/audio/Top Fella - Karan Aujla.mp3",
    color: "#f59e0b"
  }
];

export default function MusicPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const soundRef = useRef(null);
  const canvasRef = useRef(null);
  const analyzerRef = useRef(null);
  const rafRef = useRef(null);

  const currentTrack = playlist[currentIdx];

  useEffect(() => {
    // Initialize Howl
    soundRef.current = new Howl({
      src: [currentTrack.url],
      html5: true,
      volume: volume,
      onplay: () => {
        setIsPlaying(true);
        startVisualizer();
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => handleNext(),
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, [currentIdx]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  // Visualizer Logic
  const startVisualizer = () => {
    if (!analyzerRef.current) {
      const audioCtx = Howler.ctx;
      const analyzer = audioCtx.createAnalyser();
      Howler.masterGain.connect(analyzer);
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;
    }

    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyzerRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        
        ctx.fillStyle = `rgba(252, 211, 77, ${barHeight / 100})`; // Gold with alpha
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      // Update progress bar
      if (soundRef.current && isPlaying) {
        const seek = soundRef.current.seek() || 0;
        const duration = soundRef.current.duration() || 1;
        setProgress((seek / duration) * 100);
      }
    };

    draw();
  };

  const togglePlay = () => {
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <section id="music" className="section" style={{ background: 'var(--section-bg)', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Music Prototype
          </h2>
          <p style={{ color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Experimental Singer Mode • Rhythm & Soul
          </p>
        </div>

        <div className="music-panel" style={{
          background: 'var(--panel-bg)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '3rem',
          border: '1px solid var(--panel-border)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Visualizer Canvas */}
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={150} 
            style={{ 
              width: '100%', 
              height: '120px', 
              marginBottom: '2rem',
              opacity: isPlaying ? 0.8 : 0.3,
              transition: 'opacity 0.5s ease'
            }} 
          />

          <div className="music-grid" style={{ display: 'flex', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            {/* Album Art Placeholder */}
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${currentTrack.color}, var(--section-bg))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 40px ${currentTrack.color}30`,
                flexShrink: 0
              }}
            >
              <MusicIcon size={64} color="#000" style={{ opacity: 0.6 }} />
            </motion.div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--fg)' }}>{currentTrack.title}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '2rem' }}>{currentTrack.artist}</p>

              {/* Progress Bar */}
              <div style={{ 
                height: '6px', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '3px', 
                cursor: 'pointer',
                marginBottom: '2rem'
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${progress}%`, 
                  background: '#fcd34d', 
                  borderRadius: '3px',
                  boxShadow: '0 0 10px #fcd34d'
                }} />
              </div>

              {/* Controls */}
              <div className="music-controls" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: 'var(--fg)', cursor: 'pointer', opacity: 0.7 }}><SkipBack size={32} /></button>
                <button 
                  onClick={togglePlay} 
                  style={{ 
                    width: '72px', 
                    height: '72px', 
                    borderRadius: '50%', 
                    background: 'var(--accent)', 
                    border: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(252, 211, 77, 0.2)'
                  }}
                >
                  {isPlaying ? <Pause size={32} color="#000" fill="#000" /> : <Play size={32} color="#000" fill="#000" style={{ marginLeft: '4px' }} />}
                </button>
                <button onClick={handleNext} style={{ background: 'none', border: 'none', color: 'var(--fg)', cursor: 'pointer', opacity: 0.7 }}><SkipForward size={32} /></button>
                
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <button onClick={() => setShowPlaylist(!showPlaylist)} style={{ background: 'none', border: 'none', color: showPlaylist ? 'var(--accent)' : 'var(--fg)', cursor: 'pointer' }}><List size={24} /></button>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Volume2 size={20} color="var(--muted)" />
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={volume} 
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      style={{ width: '80px', accentColor: '#fcd34d' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Overlay */}
          <AnimatePresence>
            {showPlaylist && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginTop: '2rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden'
                }}
              >
                {playlist.map((track, i) => (
                  <div 
                    key={i} 
                    onClick={() => setCurrentIdx(i)}
                    style={{
                      padding: '1rem 1.5rem',
                      borderRadius: '1rem',
                      background: i === currentIdx ? 'rgba(252, 211, 77, 0.1)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div>
                      <div style={{ color: i === currentIdx ? 'var(--accent)' : 'var(--fg)', fontWeight: 600 }}>{track.title}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{track.artist}</div>
                    </div>
                    {i === currentIdx && isPlaying && <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
