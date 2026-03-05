'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './PythonSandbox.module.css';

const DEFAULT_CODE = `# Advanced AIML Sandbox - Run Python in your browser!
# Try these examples:

# 1. DCGAN Parameter Counting
def conv_params(k, c_in, c_out, include_bn=True):
    base = k*k*c_in*c_out + c_out
    return base + (2*c_out if include_bn else 0)

k = 3
conv1 = conv_params(k, 1, 25, include_bn=False)  # First layer, no BN
conv2 = conv_params(k, 25, 50, include_bn=True)
fc = 50*2 + 2
print(f"DCGAN Discriminator params: {conv1 + conv2 + fc}")

# 2. VAE Loss
import math
def vae_loss(x, x_recon, mu, sigma_sq):
    recon = (x - x_recon)**2
    kl = 0 if (mu == 0 and sigma_sq == 1) else 0.5 * (mu**2 + sigma_sq - math.log(sigma_sq) - 1)
    return recon + kl
print(f"VAE loss (x=5, x\u0302=4, \u03bc=0, \u03c3\u00b2=1): {vae_loss(5, 4, 0, 1)}")
`;

const TEMPLATES: Record<string, string> = {
  dcgan: `# DCGAN Parameter Calculator
def conv_params(k, c_in, c_out, bn=True):
    return k*k*c_in*c_out + c_out + (2*c_out if bn else 0)
# Example: 64x64 gray, Conv=[25ch, 50ch], 2 classes, k=3
k = 3
conv1 = conv_params(k, 1, 25, bn=False)
conv2 = conv_params(k, 25, 50, bn=True)
fc = 50*2 + 2
print("Total:", conv1 + conv2 + fc)
`,
  vae: `# VAE Loss Calculator
import math
def vae_loss(x, x_hat, mu, sigma_sq):
    recon = (x - x_hat)**2
    kl = 0.5 * (mu**2 + sigma_sq - math.log(sigma_sq) - 1) if not (mu==0 and sigma_sq==1) else 0
    return recon + kl
print(vae_loss(5, 4, 0, 1))  # 1.0
print(vae_loss(3, 2, 1, 2))  # ~1.654
`,
  kld: `# KLD for Gaussian
import math
def kld_gaussian(mu1, sigma1_sq, mu2, sigma2_sq):
    s1, s2 = math.sqrt(sigma1_sq), math.sqrt(sigma2_sq)
    return math.log(s2/s1) + (sigma1_sq + (mu1-mu2)**2)/(2*sigma2_sq) - 0.5
# P=N(3,2), Q=N(4,1)
print("KLD(P||Q):", kld_gaussian(3, 2, 4, 1))
print("KLD(Q||P):", kld_gaussian(4, 1, 3, 2))
`,
  diffusion: `# Diffusion \u03b1 and \u03b1\u0305
betas = [0.1, 0.2, 0.3]
alphas = [1 - b for b in betas]
alpha_bar = []
prod = 1
for a in alphas:
    prod *= a
    alpha_bar.append(prod)
print("\u03b1:", alphas)
print("\u03b1\u0305:", alpha_bar)
`,
};

// Poll until window.loadPyodide is available (loaded by <Script> tag)
function waitForPyodide(timeout = 30000): Promise<any> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (typeof (window as any).loadPyodide === 'function') {
        resolve((window as any).loadPyodide);
      } else if (Date.now() - start > timeout) {
        reject(new Error('window.loadPyodide is not a function'));
      } else {
        setTimeout(check, 200);
      }
    };
    check();
  });
}

export default function PythonSandbox() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setOutput('Loading Python runtime... (this may take a moment)');
        const loadPyodide = await waitForPyodide();
        if (cancelled) return;
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
        });
        if (!cancelled) {
          pyodideRef.current = pyodide;
          setOutput('Python runtime ready. Click Run to execute your code.');
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setOutput('Failed to load Python. Please check your connection and try again. Error: ' + (e as Error).message);
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const runCode = async () => {
    if (!pyodideRef.current) return;
    setRunning(true);
    setOutput('');
    try {
      pyodideRef.current.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
`);
      pyodideRef.current.runPython(code);
      const out = pyodideRef.current.runPython('sys.stdout.getvalue()');
      setOutput(out || '(no output)');
    } catch (e: any) {
      setOutput(`Error: ${e.message || String(e)}`);
    } finally {
      setRunning(false);
    }
  };

  const loadTemplate = (key: string) => {
    if (TEMPLATES[key]) setCode(TEMPLATES[key]);
  };

  return (
    <div className={styles.sandbox}>
      <div className={styles.sandboxToolbar}>
        <button
          onClick={runCode}
          disabled={loading || running}
          className={styles.runBtn}
        >
          {running ? 'Running...' : '\u25b6 Run'}
        </button>
        <span className={styles.templateLabel}>Templates:</span>
        {Object.keys(TEMPLATES).map((k) => (
          <button
            key={k}
            onClick={() => loadTemplate(k)}
            className={styles.templateBtn}
          >
            {k}
          </button>
        ))}
      </div>
      <div className={styles.sandboxEditor}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Python code..."
          spellCheck={false}
          className={styles.codeInput}
        />
        <div className={styles.outputPanel}>
          <div className={styles.outputHeader}>Output</div>
          <pre className={styles.outputContent}>{output || (loading ? 'Loading Python runtime...' : '')}</pre>
        </div>
      </div>
    </div>
  );
}
