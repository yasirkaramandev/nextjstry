'use client';

import React from 'react';

export default function Home() {
  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <div style={styles.terminal}>
          <div style={styles.terminalHeader}>
            <span style={styles.terminalDot}></span>
            <span style={styles.terminalDot}></span>
            <span style={styles.terminalDot}></span>
          </div>
          <div style={styles.terminalBody}>
            <p style={styles.command}>$ status</p>
            <h1 style={styles.title}>&gt; Yapım Aşamasında</h1>
            <div style={styles.line} />
            <p style={styles.message}>
              <span style={styles.console}>&gt; console.log(</span>
              "Web sitemiz yakında yayında olacak. Şimdilik beni sosyal medyadan takip edebilirsiniz."
              <span style={styles.console}>);</span>
            </p>
          </div>
        </div>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    textAlign: 'center' as const,
    animation: 'fadeIn 1s ease-in',
  },
  terminal: {
    background: '#1e1e1e',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    marginBottom: '30px',
  },
  terminalHeader: {
    background: '#2d2d2d',
    padding: '10px',
    display: 'flex',
    gap: '6px',
  },
  terminalDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#ff5f56',
    ':nth-child(2)': {
      background: '#ffbd2e',
    },
    ':nth-child(3)': {
      background: '#27c93f',
    },
  },
  terminalBody: {
    padding: '20px',
  },
  command: {
    color: '#61dafb',
    marginBottom: '10px',
    fontFamily: 'monospace',
    fontSize: '1rem',
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
  console: {
    color: '#61dafb',
    fontFamily: 'monospace',
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
  footer: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    textAlign: 'center',
    padding: '20px',
    color: '#a0aec0',
    fontSize: '0.9rem',
    background: 'rgba(26, 32, 44, 0.8)',
    backdropFilter: 'blur(5px)',
  },
};
