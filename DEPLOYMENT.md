# Deploy to Render.com

## Quick Deploy

1. **Push to GitHub**: Ensure your code is in a GitHub repository.

2. **Create Web Service on Render**:
   - Go to [render.com](https://render.com) and sign in
   - Click **New** → **Web Service**
   - Connect your GitHub repository
   - Select the `advanced-aiml-companion` folder (or root if it's the only project)

3. **Configure Build Settings**:
   - **Name**: `advanced-aiml-companion` (or your choice)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for always-on)

4. **Deploy**: Click **Create Web Service**. Render will build and deploy automatically.

## Environment Variables

No environment variables are required for basic operation. The app uses:
- Pyodide CDN (no API key)
- Mermaid (bundled, no API key)

## Blueprint Deploy (Optional)

If using Render Blueprint, the included `render.yaml` will auto-configure the service.
