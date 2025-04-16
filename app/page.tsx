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
        {/* Hero Section */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <span style={styles.heroHighlight}>Merhaba, Ben Yasir</span>
          </h1>
          <p style={styles.heroSubtitle}>AI Developer & GUI Specialist</p>
          <div style={styles.description}>
            <p>6 yıllık yazılım geliştirme deneyimi ile yapay zeka ve kullanıcı arayüzü tasarımı alanlarında uzmanlaşmış bir geliştiriciyim.</p>
          </div>
        </section>

        {/* About Section */}
        <section style={styles.aboutSection}>
          <div style={styles.aboutCard}>
            <h2 style={styles.sectionTitle}>Deneyimlerim</h2>
            <div style={styles.experienceList}>
              <div style={styles.experienceItem}>
                <span style={styles.experienceHighlight}>Hayal Otonomi</span>
                <p>Otonom araç geliştirme projesinde multimedya sistemleri sorumlusu</p>
              </div>
              <div style={styles.experienceItem}>
                <span style={styles.experienceHighlight}>AI Development</span>
                <p>Yapay zeka ve görüntü işleme projelerinde uzmanlaşma</p>
              </div>
              <div style={styles.experienceItem}>
                <span style={styles.experienceHighlight}>GUI Development</span>
                <p>Kullanıcı arayüzü tasarımı ve geliştirme projeleri</p>
              </div>
            </div>
          </div>
        </section>

        {/* Spotify Widget */}
        <section style={styles.spotifySection}>
          <SpotifyStatus />
        </section>

        {/* Contact Section */}
        <section style={styles.contactSection}>
          <div style={styles.contactCard}>
            <h2 style={styles.sectionTitle}>İletişim</h2>
            <p style={styles.contactText}>
              Projeleriniz için benimle iletişime geçebilirsiniz
            </p>
            <div style={styles.socialLinks}>
              <a
                href="mailto:yasir@yasirkaraman.com.tr"
                style={styles.contactButton}
              >
                Mail Gönder
              </a>
              <div style={styles.socialIcons}>
                {[
                  { href: "https://github.com/yasirkaramandev", icon: "🐱", label: "GitHub" },
                  { href: "https://www.linkedin.com/in/yasirkaramandev", icon: "💼", label: "LinkedIn" },
                  { href: "https://teknogetir.com/", icon: "🌐", label: "TeknoGetir" }
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={styles.socialIcon}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#e2e8f0',
    padding: '2rem',
    position: 'relative' as const,
  },

  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4rem',
  },

  hero: {
    textAlign: 'center' as const,
    padding: '4rem 0',
  },

  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
  },

  heroHighlight: {
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: '700',
  },

  heroSubtitle: {
    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
    color: '#94a3b8',
    marginBottom: '2rem',
  },

  description: {
    maxWidth: '800px',
    margin: '0 auto',
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    lineHeight: '1.8',
    color: '#cbd5e1',
  },

  aboutSection: {
    padding: '2rem 0',
  },

  aboutCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '24px',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  sectionTitle: {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    marginBottom: '2rem',
    textAlign: 'center' as const,
    color: '#60a5fa',
  },

  experienceList: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  },

  experienceItem: {
    padding: '1.5rem',
    background: 'rgba(15, 23, 42, 0.5)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },

  experienceHighlight: {
    display: 'block',
    fontSize: '1.25rem',
    color: '#60a5fa',
    marginBottom: '0.5rem',
  },

  spotifySection: {
    maxWidth: '600px',
    margin: '0 auto',
    width: '100%',
  },

  contactSection: {
    padding: '4rem 0',
  },

  contactCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    textAlign: 'center' as const,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  contactText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#94a3b8',
  },

  socialLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2rem',
  },

  contactButton: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    color: '#fff',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)',
    },
  },

  socialIcons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
  },

  socialIcon: {
    fontSize: '1.5rem',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#60a5fa',
      transform: 'translateY(-2px)',
    },
  },

  // SpotifyStatus styles
  musicTerminal: {
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    animation: 'fadeIn 0.5s ease-out',
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99,102,241,0.2)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
    }
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
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    textAlign: 'left' as const
  } as const,
  trackName: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  } as const,
  artistName: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    opacity: 0.8
  } as const,
  albumLink: {
    display: 'block',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  listenButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(45deg, #1DB954, #1ed760)',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '20px',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
    width: 'fit-content',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.4)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 8px rgba(29, 185, 84, 0.4)',
    },
    '@media (max-width: 768px)': {
      width: '100%'
    }
  } as const,
};
