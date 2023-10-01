const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid'); // To generate short URLs
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for URL mappings
const urlDatabase = {};

// API endpoint to shorten URLs
app.post('/shorten', (req, res) => {
  const { longUrl } = req.body;
  const shortUrl = generateShortUrl();
  urlDatabase[shortUrl] = longUrl;
  res.status(201).json({ shortUrl });
});

// API endpoint to redirect to original URLs
app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const longUrl = urlDatabase[shortUrl];
  if (longUrl) {
    res.redirect(301, longUrl); // Permanent redirect
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

// Helper function to generate short URLs
function generateShortUrl() {
  return shortid.generate();
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
