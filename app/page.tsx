import React from 'react';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Yapım Aşamasında</h1>
    </div>
    <div>
  <a href="https://www.linkedin.com/in/sizin-linkedin-hesabınız" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin"></i>
  </a>
  <a href="https://github.com/sizin-github-hesabınız" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-github"></i>
  </a>
</div>

  );
};

export default HomePage;
