import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yasir Karaman Portfolio</title>
        <meta name="description" content="Yasir Karaman's personal portfolio site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src="/assets/photo/photo.png" alt="logo" />
          </div>
          <ul>
            <li><a href="#home">Ev</a></li>
            <li><a href="#projects">Projeler</a></li>
            <li><a href="#experience">Deneyim</a></li>
            <li><a href="#contact">İletişim</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section id="home" className={styles.section}>
          <img src="/assets/photo/photo.png" alt="profile-pic" className={styles.profilePic} />
          <h1 className={styles.primaryTitle}>Merhaba ben Yasir, <span className={styles.primaryGradient}>Hakkımda!</span></h1>
          <p className={styles.description}>
            Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. 
            Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. 
            Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
          </p>
          <div className={styles.buttons}>
            <button className={styles.contactButton}>İletişime Geç</button>
            <button className={styles.downloadButton}>Download CV</button>
          </div>
        </section>

        <section className={styles.techSection}>
          <h2 className={styles.techTitle}>KULLANDIĞIM TEKNOLOJİLER</h2>
          <div className={styles.techIcons}>
            <img src="/assets/tech/1.png" alt="tech-icon" className={styles.techIcon} />
            <img src="/assets/tech/2.png" alt="tech-icon" className={styles.techIcon} />
            <img src="/assets/tech/3.png" alt="tech-icon" className={styles.techIcon} />
            <img src="/assets/tech/4.png" alt="tech-icon" className={styles.techIcon} />
            <img src="/assets/tech/5.png" alt="tech-icon" className={styles.techIcon} />
            <img src="/assets/tech/6.png" alt="tech-icon" className={styles.techIcon} />
            <img src="/assets/tech/7.png" alt="tech-icon" className={styles.techIcon} />
            <img src="/assets/tech/8.png" alt="tech-icon" className={styles.techIcon} />
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.projectTitle}>PROJELER</h2>
          <div className={styles.projects}>
            <div className={styles.project}>
              <img src="/assets/project/1.png" alt="project" />
              <h3>Proje Adı</h3>
            </div>
          </div>
        </section>

        <section id="experience" className={styles.section}>
          <h2 className={styles.experienceTitle}>DENEYİMLERİM</h2>
          <div className={styles.experience}>
            <div className={styles.experienceItem}>
              <img src="/assets/photo/hayal.png" alt="experience-pic" className={styles.experiencePic} />
              <div>
                <h3 className={styles.experienceTitle}>Hayal Otonomi Mid GUI Developer</h3>
                <span className={styles.experienceDate}>Haz 2020 - Haz 2024</span>
              </div>
              <p className={styles.experienceDescription}>
                Projeler üzerinde çalışarak edindiğim tecrübe ve bilgi birikimi, özellikle Grafik Kullanıcı Arayüzü (GUI) tasarımı 
                ve geliştirilmesi konusunda bana derin bir anlayış kazandırdı. Genel olarak, takım arkadaşlarımla olan iletişimim 
                kuvvetli ve etkili oldu. Bu sayede, projelerin başarılı bir şekilde tamamlanmasında önemli bir rol oynadım.
              </p>
            </div>
            <div className={styles.experienceItem}>
              <img src="/assets/photo/bionluk.png" alt="experience-pic" className={styles.experiencePic} />
              <div>
                <h3 className={styles.experienceTitle}>Bionluk Freelance hizmet.</h3>
                <span className={styles.experienceDate}>Ağus 2021 - Kas 2021</span>
              </div>
              <p className={styles.experienceDescription}>
                Freelancer olarak hizmet verdiğim platformda, çok sayıda müşteri ile başarılı görüşmeler gerçekleştirdim ve bu süreçte 
                en yüksek değerlendirme olan 5 yıldızı elde ettim. Bu deneyimler, pazarlama becerilerimi ve insan ilişkilerimi olumlu 
                yönde geliştirdiğime inanıyorum ve bu yeteneklerimi, müşteri memnuniyetini artırarak iş süreçlerine katkıda bulunmak 
                için kullanmayı sürdüreceğim
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <h2 className={styles.footerTitle}>İletişim</h2>
        <p className={styles.footerDescription}>
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. 
          Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. 
          Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
        </p>
        <div className={styles.footerContact}>
          <img src="/assets/photo/mail.png" alt="mail" className={styles.footerIcon} />
          <a href="mailto:yasir@yasirkaraman.com.tr">yasir@yasirkaraman.com.tr</a>
        </div>
        <div className={styles.footerSocial}>
          <img src="/assets/photo/instagram.png" alt="instagram" className={styles.footerIcon} />
          <img src="/assets/photo/x.png" alt="x" className={styles.footerIcon} />
          <img src="/assets/photo/youtube.png" alt="youtube" className={styles.footerIcon} />
        </div>
      </footer>
    </div>
  );
}
