const express = require('express');
const cors = require('cors');
const { participants } = require('./data');

const app = express();

// Ensure PORT and CLIENT_ORIGIN are set in the environment
if (!process.env.PORT || !process.env.CLIENT_ORIGIN) {
  throw new Error("Missing required environment variables: PORT or CLIENT_ORIGIN");
}

const PORT = process.env.PORT;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

// Enable CORS for frontend requests
app.use(cors({ origin: CLIENT_ORIGIN }));

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

module.exports = { app };