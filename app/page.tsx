import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.home}>
        <section className={styles.hero}>
          <h1>Advanced AIML Study Companion</h1>
          <p className={styles.heroDesc}>
            Your complete study companion for Advanced AI & Machine Learning.
            Master DCGANs, VAEs, diffusion models, Word2Vec, and more with
            comprehensive notes, visual diagrams, and an interactive coding
            sandbox.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statVal}>8</span>
              <span className={styles.statLabel}>Core Topics</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>10+</span>
              <span className={styles.statLabel}>Formulas & Resources</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>1</span>
              <span className={styles.statLabel}>Python Sandbox</span>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <h2>What&apos;s Inside</h2>
          <div className={styles.featureGrid}>
            <Link href="/topics" className={styles.featureCard}>
              <span className={styles.cardIcon}>📚</span>
              <h3>Topic Notes</h3>
              <p>
                In-depth coverage of DCGAN, KLD/JSD/Wasserstein, FID, Flow
                Models, VAE, Word2Vec, Backprop, and Diffusion.
              </p>
            </Link>
            <Link href="/library" className={styles.featureCard}>
              <span className={styles.cardIcon}>📖</span>
              <h3>Resource Library</h3>
              <p>
                Quick-reference formulas, solved examples, and exam-style
                practice with step-by-step solutions.
              </p>
            </Link>
            <Link href="/sandbox" className={styles.featureCard}>
              <span className={styles.cardIcon}>💻</span>
              <h3>Coding Sandbox</h3>
              <p>
                Run Python in your browser. Experiment with DCGAN parameter
                counting, VAE loss, and more—no setup required.
              </p>
            </Link>
          </div>
        </section>

        <section className={styles.topicsPreview}>
          <h2>Topics at a Glance</h2>
          <div className={styles.topicPills}>
            {[
              { id: 'dcgan', title: 'DCGAN Params', priority: 'pillHighest' },
              { id: 'kld-jsd-w', title: 'KLD/JSD/W', priority: 'pillHighest' },
              { id: 'fid', title: 'FID', priority: 'pillHigh' },
              { id: 'flow-lipschitz', title: 'Flow + Lipschitz', priority: 'pillHigh' },
              { id: 'vae-loss', title: 'VAE Loss', priority: 'pillAlways' },
              { id: 'word2vec', title: 'Word2Vec', priority: 'pillMedium' },
              { id: 'backprop', title: 'Backprop', priority: 'pillMedium' },
              { id: 'diffusion', title: 'Diffusion', priority: 'pillMedium' },
            ].map((t) => (
              <Link
                key={t.id}
                href={`/topics/${t.id}`}
                className={`${styles.pill} ${styles[t.priority]}`}
              >
                {t.title}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <Link href="/topics" className={styles.ctaBtn}>
            Start Learning →
          </Link>
        </section>
      </main>
    </>
  );
}
