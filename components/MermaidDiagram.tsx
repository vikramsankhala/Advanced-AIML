'use client';

import { useEffect, useRef, useState } from 'react';

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
        });
        const { svg: result } = await mermaid.render('mermaid-' + Date.now(), chart);
        if (!cancelled) setSvg(result);
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    };
    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) return <div className="mermaid-error">Diagram could not be rendered.</div>;
  if (!svg) return <div className="mermaid-loading">Loading diagram...</div>;

  return (
    <div
      ref={ref}
      className="mermaid-container"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
