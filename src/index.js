const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from src/public
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/status', (req, res) => {
  res.json({ status: 'Application is running successfully!' });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
