import React from 'react';
import Image from 'next/image';
import './styles/Home.css';  // CSS dosyanın yolunu belirleyin

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <header className="header">
        <nav>
          <ul className="nav-list">
            <li>Ev</li>
            <li>Projeler</li>
            <li>Deneyim</li>
            <li>İletişim</li>
          </ul>
        </nav>
      </header>

      <main className="main-content flex flex-col items-center">
        <Image src="/foto_1.png" alt="Yasir" width={200} height={200} className="profile-pic" />
        <h1 className="main-title">Merhaba ben Yasir,</h1>
        <h2 className="main-subtitle">Hakkımda!</h2>
        <p className="main-description">
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim...
        </p>
        <div className="buttons flex">
          <button className="contact-btn">İletişime Geç</button>
          <button className="cv-btn">Download CV</button>
        </div>
        
        <section className="tech-section">
          <h3>Kullandığım Teknolojiler</h3>
          <div className="tech-icons">
            <i className="fab fa-js"></i>
            <i className="fab fa-node"></i>
            <i className="fab fa-html5"></i>
            <i className="fab fa-css3"></i>
            <i className="fab fa-react"></i>
            <i className="fab fa-git"></i>
          </div>
        </section>

        <section className="projects-section">
          <h3>Projeler</h3>
          <div className="projects">
            <div className="project-card">
              <Image src="/foto_2.png" alt="HTML Tutorial" width={300} height={200} />
              <h4>HTML Tutorial</h4>
            </div>
            <div className="project-card">
              <Image src="/foto_3.png" alt="CSS Tutorial" width={300} height={200} />
              <h4>CSS Tutorial</h4>
            </div>
          </div>
        </section>

        <section className="experience-section">
          <h3>Deneyimlerim</h3>
          <div className="experience">
            <h4>Hayal Otonomi Mid GUI Developer</h4>
            <p>Projeler üzerinde çalışarak edindiğim tecrübe...</p>
            <span>Haz 2020 - Haz 2024</span>
          </div>
          <div className="experience">
            <h4>Bionluk Freelance Hizmet</h4>
            <p>Freelancer olarak hizmet verdiğim platformda...</p>
            <span>Ağu 2021 - Kas 2021</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum...
        </p>
        <p>Email: yasir@yasirkaraman.com.tr</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/sizin-linkedin-hesabınız" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          <a href="https://github.com/sizin-github-hesabınız" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
