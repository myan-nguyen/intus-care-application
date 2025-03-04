const { participants } = require('../data');  // Import participants from data.js
const cors = require('cors');

module.exports = (req, res) => {
  cors()(req, res, () => {
    if (req.method === 'GET') {
      // Extract the participant ID from the URL
      const participantId = req.url.split("/").pop();
      const participant = participants.find(p => p.id === participantId);

      console.log('Requested ID:', id);  // Log the requested ID
        console.log('Participants:', participants.map(p => p.id));

      if (participant) {
        return res.json(participant);  // Return the participant by ID
      } else {
        return res.status(404).json({ message: 'Participant not found' });  // Participant not found
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
};