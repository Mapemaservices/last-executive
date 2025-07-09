const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataDir = path.join(__dirname, 'data');

// Helper to read/write JSON files
function readData(file) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
}
function writeData(file, data) {
  fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));
}

// Generic CRUD endpoints
const endpoints = [
  'services', 'gallery', 'employees', 'testimonials', 'contact', 'packages', 'settings'
];
endpoints.forEach((name) => {
  app.get(`/api/${name}`, (req, res) => {
    res.json(readData(`${name}.json`));
  });
  app.put(`/api/${name}`, (req, res) => {
    writeData(`${name}.json`, req.body);
    res.json({ success: true });
  });
});

// Simple admin login (hardcoded for demo)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, token: 'demo-token' });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
