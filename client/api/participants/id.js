const { participants } = require('../data');  // Import participants from data.js
const cors = require('cors');

// Create a CORS-enabled handler for API requests
module.exports = (req, res) => {
  // Enable CORS for all origins
  cors({ origin: 'https://intus-care-application-myan-nguyens-projects.vercel.app/api' })(req, res, () => {
    if (req.method === 'GET') {
      // Check if the request is for a specific participant by matching /participants/:id
      if (req.url.startsWith("/participants/")) {
        const participantId = req.url.split("/").pop(); // Extract the participant ID from the URL
        const participant = participants.find(p => p.id === participantId);

        if (participant) {
          return res.json(participant);  // Return the participant by ID
        } else {
          return res.status(404).json({ message: 'Participant not found' });  // Participant not found
        }
      } else {
        // If no specific participant, return the first 10 participants
        return res.json(participants.slice(0, 10));
      }
    } else {
      // If the request method is not GET, return a 405 error
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
};