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
  return (
    <main style={styles.container}>
      <CustomCursor />
      <div style={styles.content}>
        <SpotifyStatus />
        <div style={styles.terminal}>
          <div style={styles.terminalHeader}>
            <div style={styles.terminalDots}>
              <span style={{ ...styles.terminalDot, background: '#ff5f56' }}></span>
              <span style={{ ...styles.terminalDot, background: '#ffbd2e' }}></span>
              <span style={{ ...styles.terminalDot, background: '#27c93f' }}></span>
            </div>
            <span style={styles.terminalTitle}>Terminal</span>
          </div>
          <div style={styles.terminalBody}>
            <p style={styles.command}>$ status</p>
            <h1 style={styles.title}>&gt; Yapım Aşamasında</h1>
            <div style={styles.line} />
            <p style={styles.message}>
              <span style={styles.console}>&gt; console.log(</span>
              "Portfolyo sayfam hala yapım aşamasında. Lütfen daha sonra tekrar kontrol edin!"
              <span style={styles.console}>);</span>
            </p>
          </div>
        </div>
        <div style={styles.links}>
          <a
            href="https://github.com/yasirkaramandev"
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span style={styles.divider}>•</span>
          <a
            href="https://www.linkedin.com/in/yasirkaramandev"
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span style={styles.divider}>•</span>
          <a href="mailto:yasir@yasirkaraman.com.tr" style={styles.link}>
            Mail
          </a>
          <span style={styles.divider}>•</span>
          <a href="https://teknogetir.com/" style={styles.link}>
            TeknoGetir
          </a>
        </div>
      </div>
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Yasir Karaman. Tüm hakları saklıdır.</p>
      </footer>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    position: 'relative' as const,
    background: 'linear-gradient(135deg, #13151a, #1e2127)',
  } as const,
  content: {
    width: '95%',
    maxWidth: '800px',
    textAlign: 'center' as const,
    animation: 'fadeIn 1s ease-in',
    marginBottom: '80px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2rem'
  },
  terminal: {
    width: '100%',
    background: '#1e1e1e',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    marginBottom: '30px'
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
    fontSize: 'clamp(0.9rem, 4vw, 1.1rem)',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap' as const
  } as const,
  divider: {
    color: '#4a5568',
    fontSize: '1rem'
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
  musicTerminal: {
    width: '100%',
    maxWidth: '500px',
    background: 'rgba(30, 30, 30, 0.95)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
    marginBottom: '20px',
    backdropFilter: 'blur(10px)',
    transform: 'scale(0.98)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'scale(1)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    }
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
  listenButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'linear-gradient(45deg, #1DB954, #1ed760)',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    marginTop: '12px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
    ':hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.4)',
    }
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
  }
};

// Add keyframe animations to your global CSS
const globalStyles = `
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

// Add a style tag to your document head with these animations
const styleTag = document.createElement('style');
styleTag.textContent = globalStyles;
document.head.appendChild(styleTag);
