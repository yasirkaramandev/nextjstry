'use client';

import { useState, useEffect } from 'react';

interface GitHubStats {
  avatar_url: string;
  public_repos: number;
  total_stars: number;
  name: string;
  total_commits: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/yasirkaramandev'),
          fetch('https://api.github.com/users/yasirkaramandev/repos'),
          fetch('https://api.github.com/users/yasirkaramandev/events/public')
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const eventsData = await eventsRes.json();

        const totalCommits = eventsData
          .filter((event: any) => event.type === 'PushEvent')
          .reduce((acc: number, event: any) => acc + event.payload.commits?.length || 0, 0);

        const totalStars = reposData.reduce((acc: number, repo: any) => 
          acc + repo.stargazers_count, 0);

        setStats({
          avatar_url: userData.avatar_url,
          public_repos: userData.public_repos,
          total_stars: totalStars,
          name: userData.name,
          total_commits: totalCommits
        });
      } catch (err) {
        setError('GitHub verisi alınamadı');
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div style={styles.githubCard}>
      <div style={styles.cardHeader}>
        <span style={styles.cardTitle}>GitHub Stats</span>
        <div style={styles.terminalDots}>
          <span style={{ ...styles.terminalDot, background: '#ff5f56' }}></span>
          <span style={{ ...styles.terminalDot, background: '#ffbd2e' }}></span>
          <span style={{ ...styles.terminalDot, background: '#27c93f' }}></span>
        </div>
      </div>
      <div style={styles.cardContent}>
        <img src={stats?.avatar_url} alt="Profile" style={styles.avatar} />
        <div style={styles.statsContainer}>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{stats?.public_repos || '...'}</span>
            <span style={styles.statLabel}>Repo</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{stats?.total_stars ? formatNumber(stats.total_stars) : '...'}</span>
            <span style={styles.statLabel}>Star</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{stats?.total_commits ? formatNumber(stats.total_commits) : '...'}</span>
            <span style={styles.statLabel}>Commit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  githubCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(99,102,241,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '450px',
  },

  cardHeader: {
    background: '#2d2d2d',
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    justifyContent: 'center'
  },

  cardTitle: {
    color: '#e2e8f0',
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    textAlign: 'center' as const,
    margin: '0 auto'
  },

  terminalDots: {
    display: 'flex',
    gap: '8px',
    position: 'absolute' as const,
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)'
  },

  terminalDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },

  cardContent: {
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },

  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '2px solid rgba(99,102,241,0.3)',
  },

  statsContainer: {
    display: 'flex',
    gap: '1rem',
  },

  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#60a5fa',
  },

  statLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8',
  },
};
