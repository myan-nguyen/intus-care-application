const { participants } = require('../data');
const cors = require('cors');

// Use CORS with specific options if needed
const corsOptions = {
  origin: 'https://intus-care-application-b8qlty1lt-myan-nguyens-projects.vercel.app', // Allow only your frontend URL
  methods: ['GET'],
};

module.exports = (req, res) => {
  // Enable CORS for all origins or specific origins
  cors(corsOptions)(req, res, () => {
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
