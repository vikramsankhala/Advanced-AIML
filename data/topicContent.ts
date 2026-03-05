export const topicContent: Record<string, {
  title: string;
  sections: { title: string; content: string; type?: 'formula' | 'diagram' | 'example' }[];
}> = {
  dcgan: {
    title: 'DCGAN Parameter Counting',
    sections: [
      {
        title: 'Overview',
        content: 'Count how many parameters a DCGAN model needs to learn. Go layer by layer, use fixed formulas, add everything up. Pure pattern — no creativity needed.',
      },
      {
        title: 'Architecture Flow',
        content: `flowchart LR
    A[Input Image] --> B[Conv1]
    B --> C[Conv2]
    C --> D[GAP]
    D --> E[FC]
    E --> F[Output]`,
        type: 'diagram',
      },
      {
        title: '1. Conv Layer',
        content: 'k² × C_in × C_out + C_out\n\nk = filter size\nC_in = channels IN (prev layer)\nC_out = channels OUT (this layer)\n+C_out = bias',
        type: 'formula',
      },
      {
        title: '2. BatchNorm (BN)',
        content: '2 × C_out\n\nSKIP BN if: First conv (Discriminator) or Last conv (Generator)',
        type: 'formula',
      },
      {
        title: '3. GAP',
        content: 'ALWAYS = 0\n\nGlobal Average Pooling has no learnable parameters.',
        type: 'formula',
      },
      {
        title: '4. FC Layer',
        content: 'C_in × C_out + C_out\n\nC_in = last conv\'s C_out\nC_out = number of classes/nodes',
        type: 'formula',
      },
      {
        title: 'Exam Attack Plan',
        content: '1. Read input — gray=1ch, color=3ch → that is your first C_in\n2. Conv Layer 1: k²×C_in×C_out + C_out → NO BN (discriminator rule)\n3. Conv Layer 2+: k²×C_in×C_out + C_out + 2×C_out (add BN)\n4. GAP = 0 always\n5. FC = C_in×C_out + C_out\n6. Add all layers together',
      },
      {
        title: 'Common Mistakes',
        content: '• BN on first conv of discriminator — always skip\n• BN on last conv of generator — always skip\n• GAP = some number — always 0\n• Wrong C_in — must equal previous layer\'s C_out\n• Forgetting +C_out bias in conv formula',
      },
    ],
  },
  'kld-jsd-w': {
    title: 'KLD / JSD / Wasserstein',
    sections: [
      {
        title: 'Overview',
        content: 'You have two distributions P and Q. These metrics measure: "How different are P and Q?"',
      },
      {
        title: 'Metric Comparison',
        content: `flowchart TD
    A[Distribution Metrics] --> B[KLD]
    A --> C[JSD]
    A --> D[Wasserstein]
    B --> B1[Asymmetric]
    C --> C1[Symmetric]
    D --> D1[Symmetric]`,
        type: 'diagram',
      },
      {
        title: 'Summary',
        content: 'KLD: Selfish — direction matters. NOT symmetric.\nJSD: Fair version of KLD. Symmetric.\nWasserstein: Effort to reshape P into Q. Symmetric.',
      },
      {
        title: 'KLD — Gaussian',
        content: 'P = N(μ₁, σ₁²)    Q = N(μ₂, σ₂²)\n\nKLD(P||Q) = log(σ₂/σ₁) + [σ₁² + (μ₁-μ₂)²]/(2σ₂²) - ½\n\nTo get KLD(Q||P): swap ALL 1s and 2s',
        type: 'formula',
      },
      {
        title: 'Wasserstein Distance',
        content: 'W₂ = √[(μ₁-μ₂)² + (σ₁-σ₂)²]\n\n= √[center difference² + spread difference²]',
        type: 'formula',
      },
      {
        title: 'JSD Shortcut',
        content: 'For Gaussians: "M = ½(P+Q) is a mixture. Closed form not possible. JSD(P||Q) = JSD(Q||P) by symmetry." — Full marks, no calculation needed.',
      },
    ],
  },
  fid: {
    title: 'FID Calculation',
    sections: [
      {
        title: 'What is FID?',
        content: 'FID measures how close fake (generated) images are to real images. Low FID = good GAN. High FID = bad GAN.',
      },
      {
        title: 'Reading Variance',
        content: 'RULE: exponent has -x²/(2k) → variance = k\n\n-x²/2 → variance=1, σ=1\n-x²/8 → variance=4, σ=2\n-y²/18 → variance=9, σ=3',
      },
      {
        title: 'FID Formula',
        content: 'Part 1 = (mean_P_x - mean_Q_x)² + (mean_P_y - mean_Q_y)²\nPart 2 = (σ_P_x - σ_Q_x)² + (σ_P_y - σ_Q_y)²\n\nFID = Part 1 + Part 2',
        type: 'formula',
      },
    ],
  },
  'flow-lipschitz': {
    title: 'Flow Model + Lipschitz',
    sections: [
      {
        title: 'Flow Model Check',
        content: 'Condition 1 — INVERTIBLE: Set y = f(x), solve for x. ONE answer → invertible ✅. TWO answers (±) → NOT invertible ❌\n\nCondition 2 — DERIVATIVE EXISTS: Compute f\'(x). If exists for all x → tractable ✅',
      },
      {
        title: 'Lipschitz Constant',
        content: 'K = maximum value of |f\'(x)|\n\nIf K ≤ 1 → 1-Lipschitz → can use in WGAN ✅\nIf K > 1 → cannot use in WGAN ❌',
        type: 'formula',
      },
    ],
  },
  'vae-loss': {
    title: 'VAE Loss Calculation',
    sections: [
      {
        title: 'VAE Loss Formula',
        content: 'VAE Loss = Reconstruction Loss + KL Divergence\n\nPart 1: (x - x̂)²\nPart 2: ½ × (μ² + σ² - log(σ²) - 1)\n\nShortcut: When μ=0 and σ²=1 → KL = 0',
        type: 'formula',
      },
    ],
  },
  word2vec: {
    title: 'Word2Vec / Skip-gram',
    sections: [
      {
        title: 'Models',
        content: 'CBoW: Context words → predict CENTER word\nSkip-gram: Center word → predict CONTEXT words',
      },
      {
        title: 'Parameters',
        content: 'Embedding Matrix = V × E\nContext Matrix = E × V\nTotal params = 2 × V × E\n\nV = vocabulary size, E = embedding size',
        type: 'formula',
      },
    ],
  },
  backprop: {
    title: 'Autoencoder Backprop',
    sections: [
      {
        title: 'Forward Pass',
        content: 'net_h = w1×x1 + w2×x2\nh = sigmoid(net_h)\nnet_o = w3×h\no = sigmoid(net_o)',
        type: 'formula',
      },
      {
        title: 'Backward Pass',
        content: 'δ_o = (target - o) × o×(1-o)\nδ_h = δ_o × w3 × h×(1-h)',
        type: 'formula',
      },
      {
        title: 'Weight Update',
        content: 'Δw = η × δ × input_to_weight\nw_new = w_old + Δw + α×Δw_previous',
        type: 'formula',
      },
    ],
  },
  diffusion: {
    title: 'Diffusion Model',
    sections: [
      {
        title: 'Forward Process',
        content: `flowchart LR
    A[Clear Image] --> B[Step 1]
    B --> C[Step 2]
    C --> D[...]
    D --> E[Pure Noise]
    E --> F[Model Learns Reverse]`,
        type: 'diagram',
      },
      {
        title: 'Formulas',
        content: 'αt = 1 - βt (signal remaining at step t)\n\nᾱt = α₁ × α₂ × ... × αt (product of all α)\n\nq(xt|x₀) = N(√ᾱt × x₀, (1-ᾱt) × I)',
        type: 'formula',
      },
      {
        title: 'Key Distinction',
        content: 'αt = one step only. ᾱt = ALL steps multiplied together. Don\'t confuse them.',
      },
    ],
  },
};
