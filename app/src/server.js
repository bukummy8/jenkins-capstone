const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    application: 'Jenkins DevOps Capstone',
    message: 'Application is running',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    application: 'Jenkins DevOps Capstone',
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Jenkins Capstone API running on port ${PORT}`);
  });
}

module.exports = app;