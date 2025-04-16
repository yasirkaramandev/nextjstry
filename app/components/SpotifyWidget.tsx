'use client';

import { useState, useEffect, useCallback } from 'react';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
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

export const SpotifyWidget = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);

  const fetchSpotifyData = useCallback(async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/spotify?_=${Date.now()}`, {
        next: { revalidate: 0 }
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setTrack(data);
      setLocalProgress(data.progress);
      setError('');
    } catch (err) {
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
        if (prev >= track.duration) return track.progress;
        return prev + 1000;
      });
    }, 1000);
    return () => clearInterval(progressInterval);
  }, [track]);

  return (
    <div className="spotify-player">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
        </div>
        <span className="terminal-title">Spotify'da Dinleniyor</span>
      </div>
      <div className="terminal-body">
        {error ? (
          <div className="error-message">Bağlantı hatası oluştu</div>
        ) : !track ? (
          <div className="loading">Yükleniyor...</div>
        ) : (
          <div className="music-info">
            {track.isPlaying ? (
              <>
                <img src={track.albumImageUrl} alt={track.title} className="album-art" />
                <div className="track-details">
                  <div className="track-name">{track.title}</div>
                  <div className="artist-name">{track.artist}</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(localProgress / track.duration) * 100}%` }} 
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" 
                  alt="Spotify Logo" 
                  className="album-art" 
                />
                <div className="track-details">
                  <div className="not-playing">Şuan bir şey dinlemiyor.</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
