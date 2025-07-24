# Production Deployment Guide - Luxury Weather App

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Fixing Node.js Compatibility Issues

If you encounter the OpenSSL digital envelope error, use one of these solutions:

#### Solution 1: Use Legacy OpenSSL (Already Configured)
The package.json already includes the fix:
```json
{
  "scripts": {
    "start": "NODE_OPTIONS=--openssl-legacy-provider react-scripts start",
    "build": "NODE_OPTIONS=--openssl-legacy-provider react-scripts build"
  }
}
```

#### Solution 2: Node Version Management
```bash
# Install Node 16.x (recommended for React Scripts 4.x)
nvm install 16
nvm use 16

# Then run normally
npm start
npm run build
```

#### Solution 3: Upgrade React Scripts (Recommended for Production)
```bash
# Upgrade to React Scripts 5.x
npm install react-scripts@5

# Update package.json scripts (remove NODE_OPTIONS)
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

## 🌐 Deployment Platforms

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**vercel.json configuration:**
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "buildCommand": "NODE_OPTIONS=--openssl-legacy-provider npm run build"
      }
    }
  ]
}
```

### Netlify Deployment
1. Connect your GitHub repository
2. Set build command: `NODE_OPTIONS=--openssl-legacy-provider npm run build`
3. Set publish directory: `build`

**Environment Variables:**
```
NODE_OPTIONS=--openssl-legacy-provider
CI=false
```

### Heroku Deployment
Create `Procfile`:
```
web: npx serve -s build -l $PORT
```

Add to package.json:
```json
{
  "scripts": {
    "heroku-postbuild": "NODE_OPTIONS=--openssl-legacy-provider npm run build"
  }
}
```

## 🔧 Environment Configuration

### Required Environment Variables
```env
# OpenWeatherMap API
REACT_APP_WEATHER_API_KEY=your_api_key_here

# Site URL for deployment
REACT_APP_SITE_URL=https://your-domain.com

# Optional: Enable/disable features
REACT_APP_ENABLE_FORECAST=true
REACT_APP_ENABLE_VOICE_SEARCH=false
```

### API Configuration
Update `src/api/fetchWeather.js` for production:
```javascript
const APIKey = process.env.REACT_APP_WEATHER_API_KEY || 'fallback_key';
```

## 📊 Performance Optimizations

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Image Optimization
1. Convert SVG icons to optimized formats
2. Implement lazy loading for non-critical images
3. Use WebP format with fallbacks

### Code Splitting
```javascript
// Implement lazy loading for forecast component
const ForecastPanel = React.lazy(() => import('./components/forecast/ForecastPanel'));

// Wrap in Suspense
<Suspense fallback={<div>Loading...</div>}>
  <ForecastPanel />
</Suspense>
```

## 🔒 Security Considerations

### API Key Security
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Implement rate limiting for API calls
- Consider using a backend proxy for API calls

### Content Security Policy
Add to public/index.html:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: openweathermap.org;
  connect-src 'self' api.openweathermap.org;
">
```

## 🧪 Testing & Quality Assurance

### Testing Commands
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run end-to-end tests (if configured)
npm run e2e
```

### Quality Checks
```bash
# ESLint
npx eslint src/

# Prettier
npx prettier --check src/

# TypeScript check (if migrated)
npx tsc --noEmit
```

### Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit on deployed site
lighthouse https://your-domain.com --output html --output-path ./lighthouse-report.html
```

## 📱 Progressive Web App Features

### Service Worker
Create `public/sw.js`:
```javascript
const CACHE_NAME = 'weather-app-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### Web App Manifest
Update `public/manifest.json`:
```json
{
  "short_name": "Luxury Weather",
  "name": "Luxury Weather - Premium Weather Experience",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#1e3c72"
}
```

## 🐛 Troubleshooting

### Common Issues

**Build Fails with Memory Issues:**
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

**CSS Not Loading in Production:**
```bash
# Check build output
ls -la build/static/css/
# Verify CSS is generated and referenced in index.html
```

**API Calls Failing in Production:**
- Check CORS settings
- Verify API key environment variables
- Check network tab in browser dev tools

### Debug Mode
Add to package.json:
```json
{
  "scripts": {
    "start:debug": "REACT_APP_DEBUG=true npm start",
    "build:debug": "REACT_APP_DEBUG=true npm run build"
  }
}
```

## 📈 Monitoring & Analytics

### Performance Monitoring
```javascript
// Add to src/index.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Error Tracking
```javascript
// Error boundary for production
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error('Weather App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## 🔄 Continuous Integration

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: NODE_OPTIONS=--openssl-legacy-provider npm run build
      env:
        REACT_APP_WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
```

---

## ✅ Pre-Launch Checklist

- [ ] All environment variables configured
- [ ] Build process working without errors
- [ ] Lighthouse scores meet targets (95+ performance)
- [ ] Mobile responsiveness tested on real devices
- [ ] API rate limiting and error handling tested
- [ ] Cross-browser compatibility verified
- [ ] Accessibility audit completed
- [ ] Security headers implemented
- [ ] Analytics and monitoring configured
- [ ] Backup and recovery plan in place

The luxury weather app is now ready for production deployment with enterprise-grade reliability and performance! 🚀
