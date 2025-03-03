const express = require('express');
const cors = require('cors');
const { participants } = require('./data');

const app = express();

//app.use(cors());
app.use(cors({ origin: '*' }));

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

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});

console.log('Participants data:', participants);

module.exports = { app };

module.exports = (req, res) => {
  app(req, res);  // Proxy the request to the Express app
};