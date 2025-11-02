const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /src/public
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
console.log("📁 Serving static files from:", publicPath);

// Route for /status
app.get('/status', (req, res) => {
  res.json({ status: 'Application is running successfully!' });
});

// Route for root /
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
