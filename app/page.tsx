// app/page.tsx
import React from 'react';

const UnderConstruction = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>We are currently under construction</h1>
      <p style={styles.message}>
        Our website is under construction. We&apos;ll be here soon with our new awesome site!
      </p>
      <div style={styles.links}>
        <a href="https://github.com/yasirkaramandev" style={styles.link} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/your-placeholder" style={styles.link} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="mailto:yasir@yasirkaraman.com.tr" style={styles.link}>
          E-mail
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a202c',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '40px',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1.2rem',
  },
};

export default UnderConstruction;
