// app/page.tsx
import React from 'react';

const UnderConstruction = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Yapım Aşamasında</h1>
        <div style={styles.line}></div>
        <p style={styles.message}>
          Web sitemiz şu anda geliştirme aşamasındadır. Çok yakında yeni ve modern tasarımımızla sizlerle olacağız!
        </p>
        <div style={styles.links}>
          <a href="https://github.com/yasirkaramandev" style={styles.link} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span style={styles.divider}>•</span>
          <a href="https://www.linkedin.com/in/yasirkaramandev" style={styles.link} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span style={styles.divider}>•</span>
          <a href="mailto:yasir@yasirkaraman.com.tr" style={styles.link}>
            E-mail
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#ffffff',
    letterSpacing: '0.05em',
    fontFamily: '"Segoe UI", -apple-system, sans-serif',
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
    lineHeight: '1.6',
    marginBottom: '40px',
    color: '#e2e8f0',
    fontFamily: '"Segoe UI", -apple-system, sans-serif',
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
    fontFamily: '"Segoe UI", -apple-system, sans-serif',
    ':hover': {
      backgroundColor: 'rgba(97, 218, 251, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  divider: {
    color: '#4a5568',
    fontSize: '1rem',
  },
};

export default UnderConstruction;
