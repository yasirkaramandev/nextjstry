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

export const SpotifyWidget = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  const fetchTrackData = useCallback(async () => {
    try {
      const res = await fetch('/api/spotify');
      const data = await res.json();
      setTrack(data);
    } catch (error) {
      console.error('Spotify data fetch error:', error);
    }
  }, []);

  useEffect(() => {
    fetchTrackData();
    const interval = setInterval(fetchTrackData, 5000);
    return () => clearInterval(interval);
  }, [fetchTrackData]);

  if (!track) return null;

  const progress = (track.progress / track.duration) * 100;

  return (
    <div className="spotify-player">
      <a href={track.songUrl} target="_blank" rel="noopener noreferrer" className="spotify-album">
        <img src={track.albumImageUrl} alt={track.title} width="60" height="60" />
      </a>
      <div className="spotify-info">
        <div className="spotify-title">{track.title}</div>
        <div className="spotify-artist">{track.artist}</div>
        <div className="spotify-progress">
          <div 
            className="spotify-progress-bar" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
};
