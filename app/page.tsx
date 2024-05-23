import React from 'react';
import Image from 'next/image';
import './styles/Home.css';  // CSS dosyanın yolunu belirleyin
import Link from 'next/link';
import styles from './styles/Home.module.css';

const HomePage = () => {
  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Image src="/foto_1.jpg" alt="Logo" width={80} height={80} className={styles.navbarLogo} />
          <ul className={styles.navList}>
            <li><a href="#home">Ev</a></li>
            <li><a href="#projects">Projeler</a></li>
            <li><a href="#experience">Deneyim</a></li>
            <li><a href="#contact">İletişim</a></li>
          </ul>
        </nav>
      </header>

      <main id="home" className={styles.mainContent}>
        <Image src="/foto_2.png" alt="Yasir" width={251} height={223} className={styles.profilePic} />
        <h1 className={styles.mainTitle}>Merhaba ben Yasir,</h1>
        <h2 className={styles.mainSubtitle}>Hakkımda!</h2>
        <p className={styles.mainDescription}>
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
        </p>
        <div className={styles.buttons}>
          <button className={styles.contactBtn}>İletişime Geç</button>
          <button className={styles.cvBtn}>Download CV</button>
        </div>

        <section className={styles.techSection}>
          <h3>Kullandığım Teknolojiler</h3>
          <div className={styles.techIcons}>
            <Image src="/js.png" alt="JavaScript" width={50} height={50} />
            <Image src="/nextjs.png" alt="Next.js" width={50} height={50} />
            <Image src="/html.png" alt="HTML" width={50} height={50} />
            <Image src="/css.png" alt="CSS" width={50} height={50} />
            <Image src="/python.png" alt="Python" width={50} height={50} />
            <Image src="/vscode.png" alt="VSCode" width={50} height={50} />
            <Image src="/figma.png" alt="Figma" width={50} height={50} />
            <Image src="/github.png" alt="GitHub" width={50} height={50} />
          </div>
        </section>

        <section id="projects" className={styles.projectsSection}>
          <h3>Projeler</h3>
          <div className={styles.projects}>
            <div className={styles.projectCard}>
              <Image src="/project1.png" alt="HTML Tutorial" width={300} height={200} />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className={styles.projectCard}>
              <Image src="/project2.png" alt="CSS Tutorial" width={300} height={200} />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </section>

        <section id="experience" className={styles.experienceSection}>
          <h3>Deneyimlerim</h3>
          <div className={styles.experience}>
            <Image src="/hayal.png" alt="Hayal" width={40} height={40} className={styles.experienceLogo} />
            <div>
              <h4 className={styles.experienceTitle}>Hayal Otonomi Mid GUI Developer</h4>
              <span className={styles.experienceDate}>Haz 2020 - Haz 2024</span>
              <p className={styles.experienceDescription}>Projeler üzerinde çalışarak edindiğim tecrübe ve bilgi birikimi, özellikle Grafik Kullanıcı Arayüzü (GUI) tasarımı ve geliştirilmesi konusunda bana derin bir anlayış kazandırdı. Genel olarak, takım arkadaşlarımla olan iletişimin kuvvetli ve etkili oldu. Bu sayede, projelerin başarılı bir şekilde tamamlanmasında önemli bir rol oynadım.</p>
            </div>
          </div>
          <div className={styles.experience}>
            <Image src="/bionluk.png" alt="Bionluk" width={40} height={40} className={styles.experienceLogo} />
            <div>
              <h4 className={styles.experienceTitle}>Bionluk Freelance Hizmet</h4>
              <span className={styles.experienceDate}>Ağu 2021 - Kas 2021</span>
              <p className={styles.experienceDescription}>Freelancer olarak hizmet verdiğim platformda, çok sayıda müşteri ile başarılı görüşmeler gerçekleştirdim ve bu süreçte en yüksek değerlendirmelere alan 5 yıldız elde ettim. Bu deneyimler, pazarlama becerilerimi ve insan ilişkilerimi olumlu yönde geliştirdiğime inanıyorum ve bu yeteneklerimi, müşteri memnuniyetini artıracak iş süreçlerine katkıda bulunmak için kullanmayı sürdüreceğim.</p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className={styles.footer}>
        <h3>İletişim</h3>
        <p>Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.</p>
        <p>Email: yasir@yasirkaraman.com.tr</p>
        <div className={styles.socialLinks}>
          <a href="https://www.linkedin.com/in/sizin-linkedin-hesabınız" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
          <a href="https://github.com/sizin-github-hesabınız" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
        </div>
        <p className={styles.footerNote}>Developed by Yasir Karaman</p>
      </footer>
    </div>
  );
};

export default HomePage;
