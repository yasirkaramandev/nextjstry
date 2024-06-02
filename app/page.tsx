import React from 'react';
import styles from './styles/Home.module.css';
import './styles/Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <img src="photo_1.png" alt="Profile" className={styles.profilePic} />
        <div className={styles.hamburger}>
          ☰
        </div>
        <ul className={styles.menu}>
          <li><a href="#ev">Ev</a></li>
          <li><a href="#projeler">Projeler</a></li>
          <li><a href="#deneyimlerim">Deneyimlerim</a></li>
          <li><a href="#iletisim">İletişim</a></li>
        </ul>
      </nav>

      <section id="ev" className={styles.hero}>
        <img src="photo_2.png" alt="Profile" className={styles.heroImage} />
        <h1 className={styles.heroTitle}>Merhaba ben Yasir,</h1>
        <h1 className={styles.heroSubtitle}>Hakkımda!</h1>
        <p className={styles.heroDescription}>
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
        </p>
        <div className={styles.heroButtons}>
          <button>İletişime Geç</button>
          <button>Download CV</button>
        </div>
      </section>

      <section className={styles.technologies}>
        <h2>Kullandığım Teknolojiler</h2>
        <div className={styles.technologyIcons}>
          <img src="/js.png" alt="JavaScript" />
          <img src="/nextjs.png" alt="Next.js" />
          <img src="/html.png" alt="HTML" />
          <img src="/css.png" alt="CSS" />
          <img src="/python.png" alt="Python" />
          <img src="/vscode.png" alt="VSCode" />
          <img src="/figma.png" alt="Figma" />
          <img src="/github.png" alt="GitHub" />
        </div>
      </section>

      <section id="projeler" className={styles.projects}>
        <h2 className={styles.projectsTitle}>Projeler</h2>
        <div className={styles.project}>
          <img src="/path/to/project1.png" alt="Project 1" />
          <a href="#">Lorem ipsum dolor sit amet</a>
        </div>
        <div className={styles.project}>
          <img src="/path/to/project2.png" alt="Project 2" />
          <a href="#">Lorem ipsum dolor sit amet</a>
        </div>
      </section>

      <section id="deneyimlerim" className={styles.experiences}>
        <h2 className={styles.experiencesTitle}>Deneyimlerim</h2>
        <div className={styles.experience}>
          <div className={styles.experienceHeader}>
            <img src="/hayal.png" alt="Hayal Otonomi" className={styles.experienceIcon} />
            <h3>Hayal Otonomi Mid GUI Developer</h3>
            <span className={styles.date}>Haz 2020 - Haz 2024</span>
          </div>
          <p>
            Projeler üzerinde çalışarak edindiğim tecrübe ve bilgi birikimi, özellikle Grafik Kullanıcı Arayüzü (GUI) tasarımı ve geliştirilmesi konusunda bana derin bir anlayış kazandırdı. Genel olarak, takım arkadaşlarımla olan iletişimin kuvvetli ve etkili oldu. Bu sayede, projelerin başarılı bir şekilde tamamlanmasında önemli bir rol oynadım.
          </p>
        </div>
        <div className={styles.experience}>
          <div className={styles.experienceHeader}>
            <img src="/bionluk.png" alt="Bionluk" className={styles.experienceIcon} />
            <h3>Bionluk Freelance hizmet.</h3>
            <span className={styles.date}>Ağus 2021 - Kas 2021</span>
          </div>
         
          <p>
            Freelancer olarak hizmet verdiğim platformda, çok sayıda müşteri ile başarılı görüşmeler gerçekleştirdim ve bu süreçte en yüksek değerlendirme olan 5 yıldız elde ettim. Bu deneyimler, pazarlama becerilerimi ve insan ilişkilerini olumlu yönde geliştirmeme inanıyorum ve bu yeteneklerimi, müşteri memnuniyetini artıracak iş süreçlerine katkıda bulunmak için kullanmayı sürdüreceğim.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <section id="iletisim" className={styles.contact}>
          <h2>İletişim</h2>
          <p>
            Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
          </p>
          <a href="mailto:yasir@yasirkaraman.com.tr">yasir@yasirkaraman.com.tr</a>
          <div className={styles.socialLinks}>
            <a href="https://github.com/yasirkaraman">GitHub</a>
            <a href="https://linkedin.com/in/yasirkaraman">LinkedIn</a>
          </div>
        </section>
        <p className={styles.developedBy}>Developed By Yasir Karaman</p>
      </footer>
    </div>
  );
};

export default Home;
