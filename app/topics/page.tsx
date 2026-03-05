import Link from 'next/link';
import Navbar from '@/components/Navbar';
import topicsData from '@/data/topics.json';
import styles from './page.module.css';

export default function TopicsPage() {
  const topics = topicsData.topics;

  return (
    <>
      <Navbar />
      <main className={styles.topicsPage}>
        <h1>Study Topics</h1>
        <p className={styles.pageDesc}>
          Explore all topics with detailed notes, formulas, solved examples, and visual diagrams.
        </p>
        <div className={styles.topicGrid}>
          {topics.map((topic: { id: string; title: string; shortDesc: string; marks: string; priority: string; icon: string }) => (
            <Link key={topic.id} href={`/topics/${topic.id}`} className={styles.topicCard}>
              <span className={styles.topicIcon}>{topic.icon}</span>
              <h3>{topic.title}</h3>
              <p>{topic.shortDesc}</p>
              <div className={styles.topicMeta}>
                <span className={styles.badge}>{topic.marks} marks</span>
                <span className={topic.priority === 'highest' ? styles.priorityHighest : topic.priority === 'high' ? styles.priorityHigh : topic.priority === 'always' ? styles.priorityAlways : styles.priorityMedium}>{topic.priority}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
