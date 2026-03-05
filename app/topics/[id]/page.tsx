import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { topicContent } from '@/data/topicContent';
import MermaidDiagram from '@/components/MermaidDiagram';
import styles from './page.module.css';

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = topicContent[id as keyof typeof topicContent];

  if (!content) notFound();

  return (
    <>
      <Navbar />
      <main className={styles.topicDetail}>
        <Link href="/topics" className={styles.backLink}>← Back to Topics</Link>
        <h1>{content.title}</h1>
        {content.sections.map((section, i) => (
          <section key={i} className={styles.contentSection}>
            <h3>{section.title}</h3>
            {section.type === 'formula' ? (
              <pre className={styles.formulaBlock}>{section.content}</pre>
            ) : section.type === 'diagram' ? (
              <MermaidDiagram chart={section.content} />
            ) : (
              <div className={styles.prose}>
                {section.content.split('\n').map((line, j) =>
                  line.trim() ? <p key={j}>{line}</p> : <br key={j} />
                )}
              </div>
            )}
          </section>
        ))}
        <div className={styles.topicActions}>
          <Link href="/library" className={styles.actionBtn}>View in Library</Link>
          <Link href="/sandbox" className={styles.actionBtn}>Try in Sandbox</Link>
        </div>
      </main>
    </>
  );
}
