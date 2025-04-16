'use client';

import { useState, useEffect } from 'react';

interface GitHubStats {
  avatar_url: string;
  public_repos: number;
  total_stars: number;
  name: string;
}

export const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/yasirkaramandev');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/yasirkaramandev/repos');
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => 
          acc + repo.stargazers_count, 0);

        setStats({
          avatar_url: userData.avatar_url,
          public_repos: userData.public_repos,
          total_stars: totalStars,
          name: userData.name
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
        <img src={stats?.avatar_url} alt="Profile" style={styles.avatar} />
        <div style={styles.statsContainer}>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{stats?.public_repos || '...'}</span>
            <span style={styles.statLabel}>Repo</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{stats?.total_stars || '...'}</span>
            <span style={styles.statLabel}>Star</span>
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
    padding: '1.5rem',
    border: '1px solid rgba(99,102,241,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '300px',
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
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
