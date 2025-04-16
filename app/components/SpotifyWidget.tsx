'use client';

import { useState, useEffect, useCallback } from 'react';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  progress: number;
  duration: number;
}

const styles = {
  musicTerminal: {
    fontFamily: 'monospace',
    background: '#1e1e1e',
    color: '#fff',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  terminalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  terminalDots: {
    display: 'flex',
    gap: '4px',
  },
  terminalDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  terminalTitle: {
    fontWeight: 'bold',
  },
  terminalBody: {
    marginTop: '8px',
  },
  errorText: {
    color: 'red',
  },
  loadingText: {
    color: 'gray',
  },
  musicInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  albumLink: {
    marginRight: '8px',
  },
  artwork: {
    width: '60px',
    height: '60px',
    borderRadius: '4px',
  },
  trackInfo: {
    flex: 1,
  },
  notPlayingText: {
    color: 'gray',
  },
  trackName: {
    fontWeight: 'bold',
  },
  artistName: {
    color: 'gray',
  },
  listenButton: {
    color: '#1db954',
    textDecoration: 'none',
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  progressBar: {
    height: '4px',
    background: '#ccc',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#1db954',
  },
  timeInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'gray',
  },
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const SpotifyStatus = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);

  const fetchTrackData = useCallback(async () => {
    try {
      const res = await fetch('/api/spotify');
      const data = await res.json();
      setTrack(data);
      setError(false);
    } catch (err) {
      console.error('Spotify data fetch error:', err);
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchTrackData();
    const interval = setInterval(() => {
      fetchTrackData();
      if (track && track.isPlaying) {
        setLocalProgress((prev) => Math.min(prev + 1, track.duration));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchTrackData, track]);

  const renderContent = () => {
    if (error) {
      return <p style={styles.errorText}>Spotify bağlantısı kurulamadı</p>;
    }

    if (!track) {
      return <p style={styles.loadingText}>Yükleniyor...</p>;
    }

    if (!track.isPlaying) {
      return (
        <div style={styles.musicInfo}>
          <div style={styles.albumLink}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" 
              alt="Spotify Logo" 
              style={styles.artwork} 
            />
          </div>
          <div style={styles.trackInfo}>
            <p style={styles.notPlayingText}>Şuan bir şey dinlemiyor.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div style={styles.musicInfo}>
          <a href={track.songUrl} target="_blank" rel="noopener noreferrer" style={styles.albumLink}>
            <img src={track.albumImageUrl} alt={track.title} style={styles.artwork} />
          </a>
          <div style={styles.trackInfo}>
            <p style={styles.trackName}>{track.title}</p>
            <p style={styles.artistName}>{track.artist}</p>
            <a href={track.songUrl} target="_blank" rel="noopener noreferrer" style={styles.listenButton}>
              Spotify'da Dinle
            </a>
          </div>
        </div>
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: `${(localProgress / track.duration) * 100}%`
            }} />
          </div>
          <div style={styles.timeInfo}>
            <span>{formatTime(localProgress)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>
      </>
    );
  };

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
        {renderContent()}
      </div>
    </div>
  );
};
