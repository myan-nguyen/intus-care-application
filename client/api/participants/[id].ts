import { NextApiRequest, NextApiResponse } from 'next';
import { participants } from '../data';

// Define the API handler for the participant route
export default (req: NextApiRequest, res: NextApiResponse) => {
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
