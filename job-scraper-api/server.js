import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import scraperRoutes from './routes/scraper.js';



const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', scraperRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Job Scraper API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      scrapeAndSave: 'POST /api/scrape-and-save',
      extractOnly: 'POST /api/extract-only'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n Job Scraper API running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Ready to accept requests\n`);
});