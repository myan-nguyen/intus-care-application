const { participants } = require('../data');
const cors = require('cors');

module.exports = (req, res) => {
  // Enable CORS for all origins
  cors()(req, res, () => {
    const { id } = req.query;  // Extract the dynamic `id` from the URL

    if (req.method === 'GET') {
      const participant = participants.find(p => p.id === id);

      if (participant) {
        return res.json(participant);  // Return the specific participant
      } else {
        return res.status(404).json({ message: 'Participant not found' });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
};
