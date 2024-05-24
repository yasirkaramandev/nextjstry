import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/Home.module.css';
import './styles/Home.css';
import './styles/global.css';

const Home = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Image src="/path/to/logo.png" alt="Logo" width={50} height={50} />
                </div>
                <nav className={styles.navbar}>
                    <ul>
                        <li><Link href="#home">Ev</Link></li>
                        <li><Link href="#projects">Projeler</Link></li>
                        <li><Link href="#experience">Deneyim</Link></li>
                        <li><Link href="#contact">İletişim</Link></li>
                    </ul>
                </nav>
                <div className={styles.hamburger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>

            <section id="home" className={styles.aboutSection}>
                <h1>Merhaba ben Yasir,</h1>
                <h2>Hakkımda!</h2>
                <p>
                    Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
                </p>
                <div className={styles.buttons}>
                    <Link href="#contact" className={styles.contactButton}>İletişime Geç</Link>
                    <Link href="/path/to/cv.pdf" className={styles.cvButton} download>Download CV</Link>
                </div>
            </section>

            <section id="projects" className={styles.projectsSection}>
                <h2>Projeler</h2>
                <div className={styles.projects}>
                    <div className={styles.project}>
                        <Image src="/path/to/html-tutorial.png" alt="HTML Tutorial" width={300} height={200} />
                        <h3>HTML Tutorial</h3>
                        <Link href="/html-tutorial">Click here to visit</Link>
                    </div>
                    <div className={styles.project}>
                        <Image src="/path/to/css-tutorial.png" alt="CSS Tutorial" width={300} height={200} />
                        <h3>CSS Tutorial</h3>
                        <Link href="/css-tutorial">Click here to visit</Link>
                    </div>
                </div>
            </section>

            <section id="experience" className={styles.experienceSection}>
                <h2 className={styles.experienceTitle}>DENEYİMLERİM</h2>
                <div className={styles.experienceEntry}>
                    <div className={styles.experienceTitleWrapper}>
                        <Image src="/path/to/icon1.png" alt="Icon" width={24} height={24} />
                        <h3>Hayal Otonomi Mid GUI Developer</h3>
                    </div>
                    <div className={styles.date}>
                        <p>Haz 2020 - Haz 2024</p>
                    </div>
                </div>
                <p className={styles.experienceDescription}>
                    Projeler üzerinde çalışarak edindiğim tecrübe ve bilgi birikimi, özellikle Grafik Kullanıcı Arayüzü (GUI) tasarımı ve geliştirilmesi konusunda bana derin bir anlayış kazandırdı. Genel olarak, takım arkadaşlarımla olan iletişimim kuvvetli ve etkili oldu. Bu sayede, projelerin başarılı bir şekilde tamamlanmasında önemli bir rol oynadım.
                </p>
                <div className={styles.experienceEntry}>
                    <div className={styles.experienceTitleWrapper}>
                        <Image src="/path/to/icon2.png" alt="Icon" width={24} height={24} />
                        <h3>Bionluk Freelance hizmet.</h3>
                    </div>
                    <div className={styles.date}>
                        <p>Ağu 2021 - Kas 2021</p>
                    </div>
                </div>
                <p className={styles.experienceDescription}>
                    Freelancer olarak hizmet verdiğim platformda, çok sayıda müşteri ile başarılı görüşmeler gerçekleştirdim ve bu süreçte en yüksek değerlendirme olan 5 yıldız elde ettim. Bu deneyimler, pazarlama becerilerimi ve insan ilişkilerimi olumlu yönde geliştirdiğime inanıyorum ve bu yeteneklerimi, müşteri memnuniyetini artırarak iş süreçlerine katkıda bulunmak için kullanıyor sürdüreceğim.
                </p>
            </section>

            <section id="contact" className={styles.contactSection}>
                <p>
                    Yaklaşık beş yıldır yazılım geliştirme alanında çalışıyorum ve bu süreçte birçok projede önemli roller üstlendim. Kariyerim boyunca, yazılımın farklı yönlerinde tecrübe kazandım ve sürekli öğrenmeye büyük önem verdim. Ekip çalışmasına ve problem çözme yeteneklerime güvenerek, yazılım geliştirme alanında ilerlemeyi hedefliyorum.
                </p>
                <div className={styles.footer}>
                    <p>Developed By Yasir Karaman</p>
                    <a href="https://github.com/yourprofile" className={styles.socialButton}>GitHub</a>
                    <a href="https://linkedin.com/yourprofile" className={styles.socialButton}>LinkedIn</a>
                </div>
            </section>
        </div>
    );
};

export default Home;
