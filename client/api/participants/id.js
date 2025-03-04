const { participants } = require('../data');
const cors = require('cors');

module.exports = (req, res) => {
  // Enable CORS for all origins
  cors()(req, res, () => {
    const { id } = req.query;  // Extract dynamic `id` from the URL

    if (req.method === 'GET') {
      // Find participant by ID
      const participant = participants.find(p => p.id === id);

      if (participant) {
        return res.status(200).json(participant);  // If found, return data
      } else {
        return res.status(404).json({ message: 'Participant not found' });  // If not found
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });  // Handle unsupported methods
    }
  });
};
