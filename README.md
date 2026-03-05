# Advanced AIML Study Companion

A complete online study companion for Advanced AI & Machine Learning. Features comprehensive notes, visual diagrams, a resource library API, and an in-browser Python coding sandbox.

## Features

- **Topic Notes**: 8 core topics (DCGAN, KLD/JSD/Wasserstein, FID, Flow+Lipschitz, VAE, Word2Vec, Backprop, Diffusion)
- **Resource Library**: Backend API serving formulas and code snippets, filterable by topic
- **Visual Diagrams**: Mermaid flowcharts for key concepts
- **Coding Sandbox**: Run Python in the browser via Pyodide—no installation required

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS-in-JS (styled-jsx)
- **Python Runtime**: Pyodide (browser-based)
- **Diagrams**: Mermaid

## APIs Used

- **Pyodide** (free): Python runtime in the browser—no API key needed
- **Mermaid** (free): Diagram rendering
- No commercial APIs required

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Render.com

1. Push this repository to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repo
4. Use these settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Runtime**: Node

Or use the included `render.yaml` for Blueprint deployment.

## Project Structure

```
advanced-aiml-companion/
├── app/
│   ├── api/           # Backend API routes
│   ├── library/       # Resource library page
│   ├── sandbox/       # Coding sandbox page
│   ├── topics/        # Topics list & detail pages
│   └── page.tsx       # Home page
├── components/
│   ├── MermaidDiagram.tsx
│   ├── Navbar.tsx
│   └── PythonSandbox.tsx
├── data/
│   ├── resources.json # Resource library data
│   ├── topics.json    # Topic metadata
│   └── topicContent.ts # Full topic content
└── render.yaml        # Render deployment config
```
