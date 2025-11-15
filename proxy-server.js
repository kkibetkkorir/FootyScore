import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Enable CORS
app.use(cors({
  origin: ['https://footyscore.onrender.com', 'http://localhost:5173'],
  credentials: true
}));

// Proxy middleware
app.use('/api/proxy', createProxyMiddleware({
  target: 'https://api.sofascore.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // remove /api/proxy from the path
  },
  onProxyReq: (proxyReq, req, res) => {
    // Use the exact User-Agent you found
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36');
    proxyReq.setHeader('Accept', 'application/json');
    proxyReq.setHeader('Accept-Language', 'en-US,en;q=0.9');
    proxyReq.setHeader('Referer', 'https://www.sofascore.com/');
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});