import connectToMongo from './db.js';
import express from 'express';
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import 'dotenv/config'; // For environment variables

// const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// 1. Database Connection
(async () => {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if DB connection fails
  }
})();

app.use(express.json({ limit: '10kb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true }));
// 2. Security Middleware
app.use(helmet()); // Security headers
app.use(cors());

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 4. Request Parsing

// 5. Logging (Dev only)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 6. Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// 7. Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 8. 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// 9. Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 10. Server Startup
const server = app.listen(port, () => {
  console.log(`iNotebook backend running on port ${port}`);
});

// 11. Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server and database connections closed');
      process.exit(0);
    });
  });
});