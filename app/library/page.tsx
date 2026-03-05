'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import styles from './page.module.css';

type Resource = {
  id: string;
  topicId: string;
  type: string;
  title: string;
  content: string;
};

type Topic = {
  id: string;
  title: string;
};

export default function LibraryPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resources')
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources);
        setTopics(data.topics || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? resources
    : resources.filter((r) => r.topicId === filter);

  const getTopicName = (id: string) =>
    topics.find((t) => t.id === id)?.title || id;

  return (
    <>
      <Navbar />
      <main className={styles.libraryPage}>
        <h1>Resource Library</h1>
        <p className={styles.pageDesc}>
          Quick-reference formulas, code snippets, and solved examples. Filter by topic.
        </p>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {topics.map((t) => (
            <button
              key={t.id}
              className={`${styles.filterBtn} ${filter === t.id ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter(t.id)}
            >
              {t.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading resources...</p>
        ) : (
          <div className={styles.resourceGrid}>
            {filtered.map((r) => (
              <div key={r.id} className={styles.resourceCard}>
                <div className={styles.resourceHeader}>
                  <span className={styles.resourceType}>{r.type}</span>
                  <span className={styles.resourceTopic}>{getTopicName(r.topicId)}</span>
                </div>
                <h3>{r.title}</h3>
                <pre className={styles.resourceContent}>{r.content}</pre>
                <Link href={`/topics/${r.topicId}`} className={styles.resourceLink}>
                  View topic →
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className={styles.empty}>No resources match the filter.</p>
        )}
      </main>
    </>
  );
}
