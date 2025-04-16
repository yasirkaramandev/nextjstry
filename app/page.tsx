'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SpotifyWidget } from './components/SpotifyWidget';
import { GitHubStats } from './components/GitHubStats';

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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // navbar height + extra padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav style={{ ...styles.navbar, ...(isScrolled ? styles.navbarScrolled : {}) }}>
      <div style={styles.navContent}>
        <a href="#" style={styles.navLogo} onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>YK</a>
        {isMobile ? (
          <button style={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span style={styles.menuIcon}></span>
          </button>
        ) : (
          <div style={styles.navLinksDesktop}>
            {['Home', 'Deneyim', 'Projeler', 'İletişim'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
        {isMobile && isMenuOpen && (
          <div style={styles.navLinksMobile}>
            {['Home', 'Deneyim', 'Projeler', 'İletişim'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
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
      <Navbar />
      <div style={styles.mainContent}>
        <section style={styles.heroSection}>
          <div style={styles.heroWrapper}>
            <h1 style={styles.heroTitle}>
              <span style={styles.heroHighlight}>Yasir Karaman</span>
            </h1>
            <p style={styles.heroSubtitle}>AI Developer & GUI Specialist</p>
            <div style={styles.heroDescription}>
              <p>6 yıllık yazılım geliştirme deneyimim ve yapay zeka alanındaki uzmanlığımla
                yenilikçi çözümler üretiyorum. Özellikle görüntü işleme ve doğal dil işleme 
                konularında uzmanlaşmış durumdayım.</p>
            </div>
            <div style={styles.statsContainer}>
              <SpotifyWidget />
              <GitHubStats />
            </div>
          </div>
        </section>

        <section id="deneyim" style={styles.section}>
          <h2 style={styles.sectionTitle}>Deneyimlerim</h2>
          <div style={styles.experienceGrid}>
            {[
              {
                title: 'Hayal Otonomi',
                role: 'Multimedya Sistemleri Lideri',
                description: 'Otonom araç projesinde multimedya sistemlerinin tasarımı ve implementasyonu'
              },
              {
                title: 'AI Projeleri',
                role: 'Yapay Zeka Geliştirici',
                description: 'Görüntü işleme ve makine öğrenimi modelleri geliştirme'
              },
              {
                title: 'GUI Development',
                role: 'Arayüz Tasarımcısı',
                description: 'Modern ve kullanıcı dostu arayüzler tasarlama ve geliştirme'
              }
            ].map((exp) => (
              <div key={exp.title} style={styles.experienceCard}>
                <h3 style={styles.experienceTitle}>{exp.title}</h3>
                <h4 style={styles.experienceRole}>{exp.role}</h4>
                <p style={styles.experienceDesc}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projeler" style={styles.section}>
          <h2 style={styles.sectionTitle}>Projeler</h2>
          <div style={styles.constructionMessage}>
            <span style={styles.constructionIcon}>🚧</span>
            <p>Yakında burada olacak...</p>
          </div>
        </section>

        <section id="iletisim" style={styles.section}>
          <h2 style={styles.sectionTitle}>İletişim</h2>
          <div style={styles.contactContent}>
            <p style={styles.contactText}>
              Yenilikçi bir proje üzerinde birlikte çalışmak veya fikir alışverişinde 
              bulunmak isterseniz, benimle iletişime geçmekten çekinmeyin.
            </p>
            <div style={styles.contactLinks}>
              {[
                { href: "mailto:yasir@yasirkaraman.com.tr", icon: "✉️", label: "E-posta" },
                { href: "https://github.com/yasirkaramandev", icon: "💻", label: "GitHub" },
                { href: "https://www.linkedin.com/in/yasirkaramandev", icon: "🔗", label: "LinkedIn" },
                { href: "https://teknogetir.com/", icon: "🌐", label: "TeknoGetir" }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span style={styles.contactIcon}>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} Yasir KARAMAN</p>
        </footer>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))',
    color: 'var(--text-primary)',
    position: 'relative' as const,
    overflow: 'hidden',
  },

  mainContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4rem',
    '@media (max-width: 768px)': {
      padding: '0 1rem'
    }
  },

  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem 0',
  },

  heroWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center' as const,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
    '@media (max-width: 768px)': {
      padding: '1rem',
      gap: '1.5rem'
    }
  },

  section: {
    padding: '4rem 0',
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 0.6s ease-out forwards',
  },

  footer: {
    width: '100%',
    textAlign: 'center' as const,
    padding: '2rem 0',
    marginTop: 'auto',
    color: 'var(--text-secondary)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  navbar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    padding: '1rem 2rem',
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(8px)',
    transition: 'background 0.3s ease',
    zIndex: 1000,
  },

  navbarScrolled: {
    background: 'rgba(15, 23, 42, 0.9)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },

  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navLogo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#60a5fa',
    textDecoration: 'none',
  },

  menuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcon: {
    width: '24px',
    height: '2px',
    background: '#e2e8f0',
    position: 'relative' as const,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: '-8px',
      width: '24px',
      height: '2px',
      background: '#e2e8f0',
    },
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      top: '8px',
      width: '24px',
      height: '2px',
      background: '#e2e8f0',
    },
  },

  navLinksDesktop: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },

  navLinksMobile: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(8px)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  navLink: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#60a5fa',
    },
    '@media (max-width: 768px)': {
      width: '100%',
      textAlign: 'center'
    }
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

  heroDescription: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    lineHeight: '1.8',
    color: '#94a3b8',
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 1rem',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      lineHeight: '1.6',
      padding: '0 1.5rem',
      width: '100%',
      maxWidth: '100%'
    }
  },

  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    width: '100%',
    maxWidth: '1000px',
    margin: '2rem auto',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      padding: '0 1rem'
    }
  },

  sectionTitle: {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    marginBottom: '2rem',
    textAlign: 'center' as const,
    color: '#60a5fa',
  },

  experienceGrid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  },

  experienceCard: {
    padding: '1.5rem',
    background: 'rgba(15, 23, 42, 0.5)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },

  experienceTitle: {
    fontSize: '1.25rem',
    color: '#60a5fa',
    marginBottom: '0.5rem',
  },

  experienceRole: {
    fontSize: '1rem',
    color: '#94a3b8',
    marginBottom: '0.5rem',
  },

  experienceDesc: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
  },

  constructionMessage: {
    textAlign: 'center' as const,
    color: '#94a3b8',
    fontSize: '1.2rem',
  },

  constructionIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },

  contactContent: {
    textAlign: 'center' as const,
  },

  contactText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#94a3b8',
  },

  contactLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1rem',
  },

  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#60a5fa',
    },
  },

  contactIcon: {
    fontSize: '1.5rem',
  },

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
    maxWidth: '450px',
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
    alignItems: 'flex-start',
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
    color: '#94a3b8',
    fontSize: '1rem',
    textAlign: 'left' as const,
    fontWeight: '500',
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
    textAlign: 'left' as const,
    marginLeft: '1rem',
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
