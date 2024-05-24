import React from 'react';
import styles from './styles/Home.module.css';
import './styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.navbar}>
                    <img src="/path/to/foto_1.png" alt="Profile" className={styles.profilePic} />
                    <ul>
                        <li><a href="#home">Ev</a></li>
                        <li><a href="#projects">Projeler</a></li>
                        <li><a href="#experience">Deneyim</a></li>
                        <li><a href="#contact">İletişim</a></li>
                    </ul>
                </div>
                <div className={styles.hamburger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>
            
            <section id="home" className={styles.aboutSection}>
                <img src="/path/to/foto_2.png" alt="Profile" className={styles.profilePic} />
                <h1>Merhaba ben Yasir!</h1>
                <h2>Hakkımda!</h2>
                <p>Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.</p>
                <div className={styles.buttons}>
                    <button>İletişime Geç</button>
                    <button>Download CV</button>
                </div>
            </section>
            
            <section id="projects" className={styles.projectsSection}>
                <h2>Projeler</h2>
                <div className={styles.projects}>
                    <div className={styles.project}>
                        <img src="/path/to/project1.png" alt="Project 1" />
                        <h3>HTML Tutorial</h3>
                    </div>
                    <div className={styles.project}>
                        <img src="/path/to/project2.png" alt="Project 2" />
                        <h3>CSS Tutorial</h3>
                    </div>
                </div>
            </section>
            
            <section id="experience" className={styles.experienceSection}>
                <h2>DENEYİMLERİM</h2>
                <div className={styles.experienceEntry}>
                    <img src="/path/to/hayal.png" alt="Hayal Logo" />
                    <div>
                        <h3>Hayal Otonomi Mid GUI Developer</h3>
                        <p className={styles.date}>Haz 2020 - Haz 2024</p>
                    </div>
                </div>
                <p className={styles.experienceDescription}>Projeler üzerinde çalışarak edindiğim tecrübe ve bilgi birikimi, özellikle Grafik Kullanıcı Arayüzü (GUI) tasarımı ve geliştirilmesi konusunda bana derin bir anlayış kazandırdı. Genel olarak, takım arkadaşlarımla olan iletişimim kuvvetli ve etkili oldu. Bu sayede, projelerin başarılı bir şekilde tamamlanmasında önemli bir rol oynadım.</p>
                
                <div className={styles.experienceEntry}>
                    <img src="/path/to/bionluk.png" alt="Bionluk Logo" />
                    <div>
                        <h3>Bionluk Freelance Hizmet</h3>
                        <p className={styles.date}>Ağu 2021 - Kas 2021</p>
                    </div>
                </div>
                <p className={styles.experienceDescription}>Freelancer olarak hizmet verdiğim platformda, çok sayıda müşteri ile başarılı projeler gerçekleştirdim ve bu süreçte en yüksek değerlendirmelere alan 5 yıldız elde ettim. Bu deneyimler, pazarlama becerilerimi ve insan ilişkilerini olumlu yönde geliştirdiğime inanıyorum ve bu yeteneklerimi, müşteri memnuniyetini arttırarak iş süreçlerine katkıda bulunmak için kullanmayı sürdüreceğim.</p>
            </section>
            
            <section id="contact" className={styles.contactSection}>
                <h2>İletişim</h2>
                <p>Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.</p>
                <p>yasir@yasirkaraman.com.tr</p>
                <div className={styles.footer}>
                    <a href="https://linkedin.com/in/yasirkaraman">LinkedIn</a>
                    <a href="https://github.com/yasirkaraman">GitHub</a>
                </div>
                <p className={styles.developedBy}>developed by Yasir Karaman</p>
            </section>
        </div>
    );
};

export default Home;
