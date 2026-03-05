import Script from 'next/script';
import Navbar from '@/components/Navbar';
import PythonSandbox from '@/components/PythonSandbox';
import styles from './page.module.css';

export default function SandboxPage() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <Navbar />
      <main className={styles.sandboxPage}>
        <h1>Coding Sandbox</h1>
        <p className={styles.pageDesc}>
          Run Python directly in your browser. No installation required.
          Experiment with DCGAN parameter counting, VAE loss, KLD, diffusion models, and more.
        </p>
        <div className={styles.sandboxWrapper}>
          <PythonSandbox />
        </div>
        <div className={styles.sandboxTips}>
          <h3>Tips</h3>
          <ul>
            <li>Use the template buttons to load example code for each topic.</li>
            <li>NumPy and other packages can be loaded via micropip if needed.</li>
            <li>First run may take a few seconds while Python initializes.</li>
          </ul>
        </div>
      </main>
    </>
  );
}
