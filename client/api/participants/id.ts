import { NextApiRequest, NextApiResponse } from 'next';
import { participants } from '../data';
import Cors from 'cors';

// Initialize CORS
const cors = Cors({
  methods: ['GET', 'OPTIONS'],  // Allow GET and OPTIONS requests
  origin: 'https://intus-care-application-b8qlty1lt-myan-nguyens-projects.vercel.app', // Allow only specific frontend URL
});

// Helper method to run middleware
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

// Define the API handler for the participant route
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  const { id } = req.query;  // Extract the dynamic `id` from the URL

  // Ensure we handle GET requests properly
  if (req.method === 'GET') {
    // Find the participant by ID
    const participant = participants.find(p => p.id === id);

    if (participant) {
      // If participant is found, return the data
      return res.status(200).json(participant);
    } else {
      // If participant is not found, return a 404 error
      return res.status(404).json({ message: 'Participant not found' });
    }
  } else {
    // If the method is not GET, return a 405 Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};


/*
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
*/