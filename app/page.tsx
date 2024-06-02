import React, { useEffect } from 'react';
import styles from './styles/Home.module.css';
import './styles/Home.css';

const Home: React.FC = () => {
  const toggleMenu = () => {
  const menu = document.querySelector(`.${styles.menu}`);
  if (menu) {
    menu.classList.toggle(styles.showMenu);
  }
};

useEffect(() => {
  const hamburger = document.querySelector(`.${styles.hamburger}`);
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  return () => {
    if (hamburger) {
      hamburger.removeEventListener('click', toggleMenu);
    }
  };
}, []); // Boş bağımlılık dizisi, bu etkileşimin yalnızca bir kez oluşturulmasını sağlar


  return (
    <div>
      <nav className={styles.navbar}>
        <img src="photo_1.png" alt="Profil" className={styles.profilePic} />
        <div className={styles.hamburger} onClick={toggleMenu}>
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
        <img src="photo_2.png" alt="Profil" className={styles.heroImage} />
        <h1 className={styles.heroTitle}>Merhaba, ben Yasir</h1>
        <h1 className={styles.heroSubtitle}>Hakkımda!</h1>
        <p className={styles.heroDescription}>
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
        </p>
        <div className={styles.heroButtons}>
          <button>İletişime Geç</button>
          <button>CV'yi İndir</button>
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
          <img src="/path/to/project1.png" alt="Proje 1" />
          <a href="#">Lorem ipsum dolor sit amet</a>
        </div>
        <div className={styles.project}>
          <img src="/path/to/project2.png" alt="Proje 2" />
          <a href="#">Lorem ipsum dolor sit amet</a>
        </div>
      </section>

      <section id="deneyimlerim" className={styles.experiences}>
        <h2 className={styles.experiencesTitle}>Deneyimlerim</h2>
        <div className={styles.experience}>
          <div className={styles.experienceHeader}>
            <img src="/hayal.png" alt="Hayal Otonomi" className={styles.experienceIcon} />
            <h3>Hayal Otonomi Mid GUI Geliştirici</h3>
            <span className={styles.date}>Haz 2020 - Haz 2024</span>
          </div>
          <p>
            Projeler üzerinde çalışarak edindiğim tecrübe ve bilgi birikimi, özellikle Grafik Kullanıcı Arayüzü (GUI) tasarımı ve geliştirilmesi konusunda bana derin bir anlayış kazandırdı. Genel olarak, takım arkadaşlarımla olan iletişimin kuvvetli ve etkili oldu. Bu sayede, projelerin başarılı bir şekilde tamamlanmasında önemli bir rol oynadım.
          </p>
        </div>
        <div className={styles.experience}>
          <div className={styles.experienceHeader}>
            <img src="/bionluk.png" alt="Bionluk" className={styles.experienceIcon} />
            <h3>Bionluk Freelance Hizmetleri</h3>
            <span className={styles.date}>Ağu 2021 - Kas 2021</span>
          </div>
          <p>
            Freelancer olarak hizmet verdiğim platformda, çok sayıda müşteri ile başarılı görüşmeler gerçekleştirdim ve bu süreçte en yüksek değerlendirme olan 5 yıldız elde ettim. Bu deneyim Bütün projelerinizi tamamladıktan sonra, bunları ilerletmek için yeni müşterilerle birlikte çalışmaktan ve müşteri memnuniyetini artırmaya yönelik iş süreçlerine katkıda bulunmaktan büyük keyif aldım.
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
    <p className={styles.developedBy}>Yasir Karaman tarafından geliştirildi</p>
  </footer>
</div>
);
};

export default Home;
