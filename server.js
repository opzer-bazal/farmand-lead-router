const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SUBMISSIONS_PATH = path.join(__dirname, 'data', 'submissions.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_PATH, 'utf8'));
  submissions.push({ ...req.body, timestamp: new Date().toISOString() });
  fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2));
  res.json({ ok: true });
});

app.get('/submissions', (req, res) => {
  const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_PATH, 'utf8'));
  res.json(submissions);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
