'use client';

import React from 'react';

export default function Home() {
  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Yapım Aşamasında</h1>
        <div style={styles.line} />
        <p style={styles.message}>
          Web sitemiz yakında yayında olacak. Şimdilik beni sosyal medyadan takip edebilirsiniz.
        </p>
        <div style={styles.links}>
          <a 
            href="https://github.com/yasirkaramandev" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.link}
          >
            GitHub
          </a>
          <span style={styles.divider}>•</span>
          <a 
            href="https://www.linkedin.com/in/yasirkaramandev" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.link}
          >
            LinkedIn
          </a>
          <span style={styles.divider}>•</span>
          <a 
            href="mailto:yasir@yasirkaraman.com.tr"
            style={styles.link}
          >
            E-mail
          </a>
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    textAlign: 'center' as const,
    animation: 'fadeIn 1s ease-in',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    color: '#ffffff',
    marginBottom: '20px',
    fontWeight: '700',
  },
  line: {
    width: '80px',
    height: '4px',
    background: '#61dafb',
    margin: '0 auto 30px',
    borderRadius: '2px',
  },
  message: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#e2e8f0',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  },
  divider: {
    color: '#4a5568',
    fontSize: '1rem',
  },
};
