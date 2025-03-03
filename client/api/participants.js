const { participants } = require('./data'); // Import participants from data.js

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Check if there's an `id` query parameter
    if (req.query.id) {
      const participant = participants.find(p => p.id === req.query.id);
      if (participant) {
        return res.json(participant);  // Return participant by id
      } else {
        return res.status(404).json({ message: 'Participant not found' });  // Participant not found
      }
    } else {
      return res.json(participants.slice(0, 10)); // Return the first 10 participants
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });  // If the method is not GET, return 405
  }
};
