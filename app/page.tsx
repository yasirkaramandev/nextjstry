'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className={`cursor-wrapper ${clicked ? 'cursor-clicked' : ''}`}>
      <div
        className="cursor-outer"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div
        className="cursor-inner"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </div>
  );
};

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  duration: number;
  progress: number;
}

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const SpotifyStatus = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);

  const fetchSpotifyData = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const timestamp = Date.now();
      const res = await fetch(`/api/spotify?_=${timestamp}`, {
        next: { revalidate: 0 }
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setTrack(data);
      setLocalProgress(data.progress);
      setError('');
    } catch (err) {
      console.error('Spotify Hatası:', err);
      setError('Bağlantı hatası oluştu');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 5000);
    return () => clearInterval(interval);
  }, [fetchSpotifyData]);

  useEffect(() => {
    if (!track?.isPlaying) return;

    const progressInterval = setInterval(() => {
      setLocalProgress(prev => {
        if (prev >= track.duration) {
          return track.progress;
        }
        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [track]);

  return (
    <div style={styles.musicTerminal}>
      <div style={styles.terminalHeader}>
        <div style={styles.terminalDots}>
          <span style={{ ...styles.terminalDot, background: '#ff5f56' }}></span>
          <span style={{ ...styles.terminalDot, background: '#ffbd2e' }}></span>
          <span style={{ ...styles.terminalDot, background: '#27c93f' }}></span>
        </div>
        <span style={styles.terminalTitle}>
          {error ? 'Bağlantı Hatası' : 'Spotify\'da Çalan'}
        </span>
      </div>
      <div style={styles.terminalBody}>
        {error ? (
          <p style={styles.errorText}>Spotify bağlantısı kurulamadı</p>
        ) : !track ? (
          <p style={styles.loadingText}>Yükleniyor...</p>
        ) : (
          <>
            <div style={styles.musicInfo}>
              {track.isPlaying ? (
                <a href={track.songUrl} target="_blank" rel="noopener noreferrer" style={styles.albumLink}>
                  <img src={track.albumImageUrl} alt={track.title} style={styles.artwork} />
                </a>
              ) : (
                <div style={styles.albumLink}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" 
                       alt="Spotify Logo" 
                       style={styles.artwork} />
                </div>
              )}
              <div style={styles.trackInfo}>
                {track.isPlaying ? (
                  <>
                    <p style={styles.trackName}>{track.title}</p>
                    <p style={styles.artistName}>{track.artist}</p>
                    <a href={track.songUrl} target="_blank" rel="noopener noreferrer" style={styles.listenButton}>
                      Spotify'da Dinle
                    </a>
                  </>
                ) : (
                  <p style={styles.notPlayingText}>Şuan bir şey dinlemiyor</p>
                )}
              </div>
            </div>
            {track.isPlaying && (
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div style={{
                    ...styles.progressFill,
                    width: `${(localProgress / (track?.duration || 1)) * 100}%`
                  }} />
                </div>
                <div style={styles.timeInfo}>
                  <span>{formatTime(localProgress)}</span>
                  <span>{formatTime(track?.duration || 0)}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      styleTag.remove();
    };
  }, []);

  return (
    <main style={styles.container}>
      <CustomCursor />
      <div style={styles.content}>
        <div style={styles.hero}>
          <div style={styles.glowCircle} />
          <h1 style={styles.heroTitle}>
            <span style={styles.heroHighlight}>Yasir</span> Karaman
          </h1>
          <p style={styles.heroSubtitle}>Full Stack Developer</p>
        </div>
        <SpotifyStatus />
        <div style={styles.constructionCard}>
          <div style={styles.cardGlow} />
          <div style={styles.cardContent}>
            <div style={styles.iconContainer}>
              <span style={styles.constructionIcon}>🚧</span>
            </div>
            <h2 style={styles.constructionTitle}>Yapım Aşamasında</h2>
            <p style={styles.constructionText}>
              Portfolyom şu anda yenileniyor. Çok yakında burada olacağım!
            </p>
          </div>
        </div>
        <div style={styles.socialLinks}>
          {[
            { href: "https://github.com/yasirkaramandev", text: "GitHub" },
            { href: "https://www.linkedin.com/in/yasirkaramandev", text: "LinkedIn" },
            { href: "mailto:yasir@yasirkaraman.com.tr", text: "Mail" },
            { href: "https://teknogetir.com/", text: "TeknoGetir" }
          ].map((link, i) => (
            <React.Fragment key={link.href}>
              <a
                href={link.href}
                style={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
              {i < 3 && <span style={styles.divider}>•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Yasir Karaman</p>
      </footer>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    background: 'linear-gradient(to bottom, #0f1117, #1a1f2c)',
    position: 'relative' as const,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    padding: '2rem',
    zIndex: 1,
  },

  hero: {
    position: 'relative' as const,
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },

  glowCircle: {
    position: 'absolute' as const,
    top: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%)',
    borderRadius: '50%',
    zIndex: -1,
  },

  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#fff',
    textShadow: '0 0 20px rgba(99,102,241,0.3)',
  },

  heroHighlight: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  heroSubtitle: {
    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
    color: '#94a3b8',
    fontWeight: '500',
  },

  constructionCard: {
    position: 'relative' as const,
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '2rem',
    maxWidth: '600px',
    width: '90%',
    border: '1px solid rgba(99,102,241,0.2)',
    overflow: 'hidden',
    animation: 'fadeIn 0.5s ease-out',
  },

  cardGlow: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.1), transparent 70%)',
    zIndex: 0,
  },

  cardContent: {
    position: 'relative' as const,
    zIndex: 1,
    textAlign: 'center' as const,
  },

  iconContainer: {
    width: '80px',
    height: '80px',
    margin: '0 auto 1.5rem',
    background: 'rgba(99,102,241,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  constructionIcon: {
    fontSize: '2.5rem',
  },

  constructionTitle: {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '1rem',
  },

  constructionText: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    color: '#94a3b8',
    lineHeight: '1.6',
  },

  socialLinks: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },

  socialLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(99,102,241,0.2)',
      transform: 'translateY(-2px)',
    }
  },

  divider: {
    color: '#4b5563',
    opacity: 0.6,
  },

  footer: {
    width: '100%',
    textAlign: 'center' as const,
    padding: '1.5rem',
    color: '#94a3b8',
    background: 'rgba(15, 17, 23, 0.8)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(99,102,241,0.1)',
  },

  musicTerminal: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '16px',
    overflow: 'hidden',
    animation: 'fadeIn 0.5s ease-out',
    background: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
  } as const,

  terminal: {
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    animation: 'fadeIn 0.5s ease-out',
    background: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
  } as const,

  terminalHeader: {
    background: '#2d2d2d',
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    justifyContent: 'center'
  } as const,
  terminalDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#ff5f56'
  } as const,
  terminalDots: {
    display: 'flex',
    gap: '8px',
    position: 'absolute' as const,
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)'
  } as const,
  terminalBody: {
    padding: '20px'
  } as const,
  terminalTitle: {
    color: '#e2e8f0',
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    textAlign: 'center' as const,
    margin: '0 auto'
  } as const,
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    color: '#ffffff',
    marginBottom: '20px',
    fontWeight: '700'
  } as const,
  line: {
    width: '80px',
    height: '4px',
    background: '#61dafb',
    margin: '0 auto 30px',
    borderRadius: '2px'
  } as const,
  message: {
    fontSize: 'clamp(0.9rem, 4vw, 1.2rem)',
    color: '#e2e8f0',
    marginBottom: '40px',
    lineHeight: '1.6',
    padding: '0 10px'
  } as const,
  command: {
    color: '#61dafb',
    marginBottom: '10px',
    fontFamily: 'monospace',
    fontSize: '1rem'
  } as const,
  console: {
    color: '#61dafb',
    fontFamily: 'monospace'
  } as const,
  links: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '0 10px'
  } as const,
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    background: 'transparent',
    border: '1px solid transparent',
    '&:hover': {
      background: 'rgba(97, 218, 251, 0.1)',
      transform: 'translateY(-2px)'
    }
  } as const,

  listenButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '30px',
    fontSize: '0.95rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(45deg, #1DB954, #1ed760)',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.4)'
    }
  } as const,

  footer: {
    position: 'fixed' as const,
    bottom: '0',
    left: '0',
    right: '0',
    textAlign: 'center' as const,
    padding: '15px',
    color: '#a0aec0',
    fontSize: 'clamp(0.7rem, 3vw, 0.9rem)',
    background: 'rgba(26, 32, 44, 0.9)',
    backdropFilter: 'blur(5px)',
    zIndex: 10
  } as const,
  musicInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    background: 'linear-gradient(to right, rgba(29, 185, 84, 0.05), transparent)',
    margin: '0 15px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  } as const,
  artwork: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    objectFit: 'cover' as const,
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease',
    animation: 'pulse 2s infinite ease-in-out'
  } as const,
  notPlayingText: {
    color: '#a0aec0',
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'center' as const,
    margin: '0 auto'
  } as const,
  progressContainer: {
    padding: '0 20px 20px',
    width: '100%',
  } as const,
  progressBar: {
    width: '100%',
    height: '5px',
    background: '#4a5568',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '10px',
    cursor: 'pointer',
    ':hover': {
      height: '6px'
    }
  } as const,
  progressFill: {
    height: '100%',
    background: 'linear-gradient(to right, #1DB954, #1ed760)',
    transition: 'width 0.3s ease'
  } as const,
  timeInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#a0aec0',
    fontSize: '0.8rem',
    fontFamily: 'monospace'
  } as const,
  errorText: {
    color: '#ff5f56',
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'center' as const,
    padding: '20px'
  },
  loadingText: {
    color: '#e2e8f0',
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'center' as const,
    padding: '20px'
  },
  trackInfo: {
    flex: 1,
    textAlign: 'left' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  trackName: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '4px'
  },
  artistName: {
    color: '#a0aec0',
    fontSize: '0.9rem'
  },
  albumLink: {
    display: 'block',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  divider: {
    color: '#4a5568',
    fontSize: '1rem',
    margin: '0 4px',
    opacity: 0.6
  } as const,
};
