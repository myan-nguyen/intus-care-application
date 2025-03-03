const { participants } = require('./data');  // Import participants from data.js
const cors = require('cors');

// Create a CORS-enabled handler for API requests
module.exports = (req, res) => {
  // Enable CORS for all origins
  cors()(req, res, () => {
    if (req.method === 'GET') {
      // Check if there's an `id` query parameter for specific participant
      if (req.query.id) {
        const participant = participants.find(p => p.id === req.query.id);
        if (participant) {
          return res.json(participant);  // Return participant by id
        } else {
          return res.status(404).json({ message: 'Participant not found' });  // Participant not found
        }
      } else if (req.url.includes("/participant/")) {
        // Handle participant by ID (e.g., /api/participant/:id)
        const participantId = req.url.split("/").pop(); // Get the participant ID from URL
        const participant = participants.find(p => p.id === participantId);
        if (participant) {
          return res.json(participant);  // Return participant by id
        } else {
          return res.status(404).json({ message: 'Participant not found' });  // Participant not found
        }
      } else {
        // Return the first 10 participants if no `id` query parameter
        return res.json(participants.slice(0, 10));
      }
    } else {
      // Return a 405 error if the request method is not GET
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
};


