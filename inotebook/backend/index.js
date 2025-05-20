import connectToMongo from './db.js';
import express from 'express';
import authRouter from './routes/auth.js';  
import notesRouter from './routes/notes.js';

const app = express();
const port = process.env.PORT || 5000; // Better port handling

// Database connection with error handling
(async () => {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json()); // Add JSON body parser

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server listening at  http://localhost:${port}`);
});