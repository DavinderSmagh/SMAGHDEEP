import { useEffect, useMemo, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, List, Repeat, Shuffle, Music as MusicIcon } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL || '/';

const playlist = [
  {
    title: 'Aint That Bad',
    artist: 'Gagan Kooner',
    url: `${BASE_URL}audio/Aint-That-Bad-Gagan_Kooner.mp3`,
    color: '#fcd34d'
  },
  {
    title: 'Aroma',
    artist: 'Sidhu Moose Wala',
    url: `${BASE_URL}audio/Aroma-Sidhu_Moose_Wala.mp3`,
    color: '#fbbf24'
  },
  {
    title: 'Top Fella',
    artist: 'Karan Aujla',
    url: `${BASE_URL}audio/Top-Fella-Karan_Aujla.mp3`,
    color: '#f59e0b'
  }
];

function formatTime(seconds = 0) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const soundRef = useRef(null);
  const canvasRef = useRef(null);
  const analyzerRef = useRef(null);
  const rafRef = useRef(null);

  const currentTrack = playlist[currentIdx];
  const repeatRef = useRef(repeatOne);
  const shuffleRef = useRef(shuffle);

  useEffect(() => {
    repeatRef.current = repeatOne;
  }, [repeatOne]);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

  const getRandomIndex = (exclude) => {
    if (playlist.length < 2) return exclude;
    let next = exclude;
    while (next === exclude) {
      next = Math.floor(Math.random() * playlist.length);
    }
    return next;
  };

  useEffect(() => {
    const cleanupSound = () => {
      if (soundRef.current) {
        soundRef.current.unload();
        soundRef.current = null;
      }
      cancelAnimationFrame(rafRef.current);
    };

    cleanupSound();

    soundRef.current = new Howl({
      src: [currentTrack.url],
      html5: true,
      volume: isMuted ? 0 : volume,
      onload: () => {
        const loadedDuration = soundRef.current.duration() || 0;
        setDuration(loadedDuration);
      },
      onplay: () => {
        setIsPlaying(true);
        startVisualizer();
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => {
        if (repeatRef.current) {
          soundRef.current.seek(0);
          soundRef.current.play();
          return;
        }
        setCurrentIdx((prev) => (shuffleRef.current ? getRandomIndex(prev) : (prev + 1) % playlist.length));
      },
      onloaderror: (id, err) => {
        console.error('Audio load error:', currentTrack.url, err);
      },
      onplayerror: (id, err) => {
        console.error('Audio play error:', currentTrack.url, err);
        soundRef.current.once('unlock', () => {
          soundRef.current.play();
        });
      }
    });

    if (isPlaying) {
      soundRef.current.play();
    }

    return cleanupSound;
  }, [currentIdx]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const startVisualizer = () => {
    if (!canvasRef.current || !Howler.ctx) return;

    if (!analyzerRef.current) {
      const analyzer = Howler.ctx.createAnalyser();
      Howler.masterGain.connect(analyzer);
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (!analyzerRef.current) return;

      analyzerRef.current.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      const barWidth = (canvas.clientWidth / bufferLength) * 1.4;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.clientHeight;
        ctx.fillStyle = `rgba(252, 211, 77, ${(barHeight / canvas.clientHeight) * 0.85})`;
        ctx.fillRect(x, canvas.clientHeight - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      if (soundRef.current) {
        const seek = soundRef.current.seek() || 0;
        const durationSeconds = soundRef.current.duration() || 1;
        setCurrentTime(seek);
        setProgress((seek / durationSeconds) * 100);
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  };

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (shuffleRef.current ? getRandomIndex(prev) : (prev + 1) % playlist.length));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (shuffleRef.current ? getRandomIndex(prev) : (prev - 1 + playlist.length) % playlist.length));
  };

  const handleSeek = (event) => {
    if (!soundRef.current || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const seekTime = (clickX / rect.width) * duration;
    soundRef.current.seek(seekTime);
    setCurrentTime(seekTime);
    setProgress((seekTime / duration) * 100);
  };

  const handleVolume = (value) => {
    setIsMuted(false);
    setVolume(value);
  };

  const handleTrackSelect = (trackIndex) => {
    setCurrentIdx(trackIndex);
    setShowPlaylist(false);
  };

  return (
    <section className="section" style={{ background: 'var(--section-bg)', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            background: 'linear-gradient(to right, #fcd34d, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Music Player
          </h2>
          <p style={{ color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Full-featured audio player with playlist, seek, shuffle, repeat, and waveform visuals.
          </p>
        </div>

        <div className="music-panel">
          <canvas ref={canvasRef} className="music-visualizer" />

          <div className="music-grid">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="music-art"
              style={{ background: `linear-gradient(135deg, ${currentTrack.color}, var(--section-bg))` }}
            >
              <MusicIcon size={48} color="#111" />
            </motion.div>

            <div className="music-meta">
              <div className="music-header">
                <div>
                  <p className="music-tag">Now playing</p>
                  <h3>{currentTrack.title}</h3>
                  <p className="music-subtitle">{currentTrack.artist}</p>
                </div>
                <div className="music-badge">{currentIdx + 1}/{playlist.length}</div>
              </div>

              <div className="music-progress" onClick={handleSeek}>
                <div className="music-progress-track">
                  <div className="music-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <div className="music-progress-time">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="music-control-row">
                <button type="button" className="music-button" onClick={handlePrev} aria-label="Previous track"><SkipBack size={24} /></button>
                <button type="button" className="music-play-button" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button type="button" className="music-button" onClick={handleNext} aria-label="Next track"><SkipForward size={24} /></button>

                <div className="music-actions">
                  <button type="button" className={`music-button ${shuffle ? 'active' : ''}`} onClick={() => setShuffle((prev) => !prev)} title="Shuffle">
                    <Shuffle size={20} />
                  </button>
                  <button type="button" className={`music-button ${repeatOne ? 'active' : ''}`} onClick={() => setRepeatOne((prev) => !prev)} title="Repeat current track">
                    <Repeat size={20} />
                  </button>
                  <button type="button" className="music-button" onClick={() => setIsMuted((prev) => !prev)} title={isMuted ? 'Unmute' : 'Mute'}>
                    <Volume2 size={20} />
                  </button>
                </div>

                <div className="music-volume">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(event) => handleVolume(parseFloat(event.target.value))}
                  />
                </div>

                <button type="button" className="music-button playlist-toggle" onClick={() => setShowPlaylist((prev) => !prev)} title="Open playlist">
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {showPlaylist && (
            <div className="playlist-panel" role="dialog" aria-label="Playlist">
              <div className="playlist-card">
                <div className="playlist-header">
                  <h4>Playlist</h4>
                  <button type="button" className="music-button" onClick={() => setShowPlaylist(false)}>Close</button>
                </div>

                <div className="playlist-list">
                  {playlist.map((track, index) => (
                    <button
                      key={track.title}
                      type="button"
                      className={`playlist-item ${index === currentIdx ? 'active' : ''}`}
                      onClick={() => handleTrackSelect(index)}
                    >
                      <div>
                        <p>{track.title}</p>
                        <small>{track.artist}</small>
                      </div>
                      <span>{index === currentIdx ? 'Playing' : `Track ${index + 1}`}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
