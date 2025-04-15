'use client';

import React, { useEffect, useState } from 'react';

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

const SpotifyStatus = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string>('');
  const [localProgress, setLocalProgress] = useState(0);

  const getSpotifyStatus = async () => {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(`/api/spotify?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      const data = await res.json();

      if (data.error) {
        console.log('Spotify Hatası:', data.error);
        setError('Spotify bağlantısı geçici olarak kullanılamıyor');
        return;
      }

      setTrack(data);
      setLocalProgress(data.progress);
      
      console.log('Spotify Güncel Veri:', {
        şarkı: data.title,
        sanatçı: data.artist,
        durum: data.isPlaying ? 'Çalıyor' : 'Duraklatıldı',
        süre: `${Math.floor(data.progress / 1000)}/${Math.floor(data.duration / 1000)} sn`,
        güncelleme_zamanı: new Date().toLocaleTimeString(),
        request_id: timestamp
      });
      
      setError('');
    } catch (err) {
      console.error('Spotify Bağlantı Hatası:', err);
      setError('Spotify bağlantısı kurulamadı');
    }
  };

  useEffect(() => {
    getSpotifyStatus();
    const apiInterval = setInterval(getSpotifyStatus, 5000);
    
    const progressInterval = setInterval(() => {
      if (track?.isPlaying) {
        setLocalProgress(prev => {
          const newProgress = prev + 1000;
          return newProgress >= (track?.duration || 0) ? track?.progress || 0 : newProgress;
        });
      }
    }, 1000);

    return () => {
      clearInterval(apiInterval);
      clearInterval(progressInterval);
    };
  }, [track?.duration, track?.isPlaying]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor(ms / 1000 / 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.musicTerminal}>
      <div style={styles.terminalHeader}>
        <div style={styles.terminalDots}>
          <span style={{ ...styles.terminalDot, background: '#ff5f56' }}></span>
          <span style={{ ...styles.terminalDot, background: '#ffbd2e' }}></span>
          <span style={{ ...styles.terminalDot, background: '#27c93f' }}></span>
        </div>
        <span style={styles.terminalTitle}>Spotify'da Çalan</span>
      </div>
      <div style={styles.terminalBody}>
        {error ? (
          <p style={styles.errorText}>{error}</p>
        ) : track ? (
          <>
            <div style={styles.musicInfo}>
              <a href={track.songUrl} target="_blank" rel="noopener noreferrer" style={styles.albumLink}>
                <img src={track.albumImageUrl} alt={track.title} style={styles.artwork} />
              </a>
              <div style={styles.trackInfo}>
                <p style={styles.trackName}>{track.title}</p>
                <p style={styles.artistName}>{track.artist}</p>
                <a 
                  href={track.songUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.listenButton}
                >
                  Spotify'da Dinle
                </a>
              </div>
            </div>
            <div style={styles.progressContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${(localProgress / (track?.duration || 1)) * 100}%`
                  }}
                />
              </div>
              <div style={styles.timeInfo}>
                <span>{formatTime(localProgress)}</span>
                <span>{formatTime(track.duration)}</span>
              </div>
            </div>
          </>
        ) : (
          <p style={styles.loadingText}>Yükleniyor...</p>
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
    position: 'relative' as const
  } as const,
  content: {
    width: '90%',
    maxWidth: '600px',
    textAlign: 'center' as const,
    animation: 'fadeIn 1s ease-in',
    marginBottom: '60px'
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
    background: '#1e1e1e',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    marginBottom: '20px'
  } as const,
  musicInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    background: 'linear-gradient(to right, rgba(29, 185, 84, 0.1), transparent)',
    margin: '0 15px',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  } as const,
  artwork: {
    width: '90px',
    height: '90px',
    borderRadius: '8px',
    objectFit: 'cover' as const,
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  } as const,
  albumLink: {
    display: 'block',
    ':hover img': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.4)'
    }
  } as const,
  trackInfo: {
    flex: 1,
    textAlign: 'left' as const
  } as const,
  trackName: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '6px',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#1DB954'
    }
  } as const,
  artistName: {
    color: '#a0aec0',
    fontSize: '0.9rem',
    marginBottom: '8px'
  } as const,
  playingStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#e2e8f0',
    fontSize: '0.8rem'
  } as const,
  listenButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#1DB954',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    marginTop: '12px',
    ':hover': {
      background: '#1ed760',
      transform: 'translateY(-2px)'
    }
  } as const,
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease'
  } as const,
  errorText: {
    color: '#F85149',
    padding: '15px',
    textAlign: 'center' as const
  } as const,
  loadingText: {
    color: '#e2e8f0',
    padding: '15px',
    textAlign: 'center' as const
  } as const,
  progressContainer: {
    padding: '0 20px 20px',
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
  } as const
};
