import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>clqu's Portfolio</title>
        <meta name="description" content="clqu's portfolio website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Hey, this is <span className={styles.highlight}>clqu.</span>
          </h1>
          <h2 className={styles.subtitle}>
            I'm a <span className={styles.highlight}>full-stack</span> web developer.
          </h2>
          <p className={styles.description}>
            A talented and ambitious self-taught web developer with expertise in TypeScript. I have a strong passion for building dynamic and engaging web applications that deliver exceptional user experiences.
          </p>
          <Link href="#about">
            <a className={styles.workLink}>Go see my work →</a>
          </Link>
        </section>

        <section id="about" className={styles.about}>
          <h2 className={styles.sectionTitle}>About.</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              Hey there! I'm your friendly neighborhood self-taught web wizard, who <span className={styles.highlight}>started dancing with JavaScript</span> back in the day. TypeScript came along and swept me off my feet, like a digital tango that I couldn't resist. I've been perfecting my moves with every code snippet and design tweak, jazzing up projects to be more functional than a <span className={styles.highlight}>Swiss Army knife.</span>
            </p>
            <Image src="/path-to-your-image.jpg" alt="clqu" className={styles.aboutImage} width={300} height={400} />
          </div>
          <Link href="/more-about">
            <a className={styles.moreAboutLink}>More about me →</a>
          </Link>
        </section>
      </main>
    </div>
  )
}
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>clqu's Portfolio</title>
        <meta name="description" content="clqu's portfolio website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Hey, this is <span className={styles.highlight}>clqu.</span>
          </h1>
          <h2 className={styles.subtitle}>
            I'm a <span className={styles.highlight}>full-stack</span> web developer.
          </h2>
          <p className={styles.description}>
            A talented and ambitious self-taught web developer with expertise in TypeScript. I have a strong passion for building dynamic and engaging web applications that deliver exceptional user experiences.
          </p>
          <Link href="#about">
            <a className={styles.workLink}>Go see my work →</a>
          </Link>
        </section>

        <section id="about" className={styles.about}>
          <h2 className={styles.sectionTitle}>About.</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              Hey there! I'm your friendly neighborhood self-taught web wizard, who <span className={styles.highlight}>started dancing with JavaScript</span> back in the day. TypeScript came along and swept me off my feet, like a digital tango that I couldn't resist. I've been perfecting my moves with every code snippet and design tweak, jazzing up projects to be more functional than a <span className={styles.highlight}>Swiss Army knife.</span>
            </p>
            <Image src="/path-to-your-image.jpg" alt="clqu" className={styles.aboutImage} width={300} height={400} />
          </div>
          <Link href="/more-about">
            <a className={styles.moreAboutLink}>More about me →</a>
          </Link>
        </section>
      </main>
    </div>
  )
}
