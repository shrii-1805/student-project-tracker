const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Project Tracker API is active and running!' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running actively on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  server.close();
});
