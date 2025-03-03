const express = require('express');
const cors = require('cors');
const { participants } = require('./data');

const app = express();

app.use(cors());

// Dynamically set the API URL based on the environment (local vs production)
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5002'  // Local API URL
  : 'https://intus-care-application.vercel.app';  // Production URL

app.get('/participants', (_, res) => {
  if (!participants || participants.length === 0) {
    return res.status(500).json({ message: 'Participants data is missing or undefined' });
  }
  res.json(participants.slice(0, 10)); // return only the first 10 participants, could be adjusted to display more
});


app.get('/participants/:id', (req, res) => {
  const participant = participants.find(p => p.id === req.params.id);
  if (participant) {
    res.json(participant);
  } else {
    res.status(404).json({ message: 'Participant not found' });
  }
});

/*const PORT = 5001;
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});

console.log('Participants data:', participants);

module.exports = { app };*/

// Running the server locally
if (process.env.NODE_ENV === 'development') {
  const PORT = 5002;
  app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
  });
}

// For production on Vercel, express will work as a serverless function handler
module.exports = (req, res) => {
  return app(req, res);  // Proxy the request to the express app
};