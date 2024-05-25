import React from 'react';
import styles from './styles/Home.module.css';
import './styles/Home.css';

const Home = () => {
  return (
    <div>
      <section className={styles.hero}>
        <h1>Merhaba ben Yasir,<br />Hakkımda!</h1>
        <p>
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
        </p>
        <div className={styles.heroButtons}>
          <button>İletişime Geç</button>
          <button>Download CV</button>
        </div>
      </section>

      <section className={styles.experiences}>
        <h2 className={styles.experiencesTitle}>DENEYİMLERİM</h2>
        <div className={styles.experience}>
          <div className={styles.experienceHeader}>
            <img src="/icons/hayal.png" alt="Hayal Otonomi" />
            <h3>Hayal Otonomi Mid GUI Developer</h3>
            <span className={styles.date}>Haz 2020 - Haz 2024</span>
          </div>
          <p>
            Projeler üzerinde çalışarak edindiğim tecrübe ve bilgi birikimi, özellikle Grafik Kullanıcı Arayüzü (GUI) tasarımı ve geliştirilmesi konusunda bana derin bir anlayış kazandırdı. Genel olarak, takım arkadaşlarımla olan iletişimin kuvvetli ve etkili oldu. Bu sayede, projelerin başarılı bir şekilde tamamlanmasında önemli bir rol oynadım.
          </p>
        </div>
        <div className={styles.experience}>
          <div className={styles.experienceHeader}>
            <img src="/icons/bionluk.png" alt="Bionluk" />
            <h3>Bionluk Freelance hizmet.</h3>
            <span className={styles.date}>Ağus 2021 - Kas 2021</span>
          </div>
          <p>
            Freelancer olarak hizmet verdiğim platformda, çok sayıda müşteri ile başarılı görüşmeler gerçekleştirdim ve bu süreçte en yüksek değerlendirme olan 5 yıldız elde ettim. Bu deneyimler, pazarlama becerilerimi ve insan ilişkilerini olumlu yönde geliştirmeme inanıyorum ve bu yeteneklerimi, müşteri memnuniyetini artıracak iş süreçlerine katkıda bulunmak için kullanmayı sürdüreceğim.
          </p>
        </div>
      </section>

      <section className={styles.contact}>
        <h2>İletişim</h2>
        <p>
          Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
        </p>
        <div className={styles.contactInfo}>
          <a href="mailto:yasir@yasirkaraman.com.tr">yasir@yasirkaraman.com.tr</a>
          <div className={styles.socialLinks}>
            <a href="https://github.com/yasirkaraman" className={styles.github}>GitHub</a>
            <a href="https://linkedin.com/in/yasirkaraman" className={styles.linkedin}>LinkedIn</a>
          </div>
        </div>
        <p className={styles.developedBy}>Developed By Yasir Karaman</p>
      </section>
    </div>
  );
};

export default Home;
