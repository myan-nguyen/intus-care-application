import axios from 'axios';
import { Participant } from '../types/types';

// dynamically set the API base URL based on the environment (local vs production)
const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5001'  // Local API URL
  : 'https://intus-care-application.vercel.app/api';  // Vercel URL

export const fetchParticipants = async (): Promise<Participant[]> => {
  const response = await axios.get(`${API_BASE_URL}/participants`);
  return response.data;
};

export const fetchParticipantById = async (id: string): Promise<Participant> => {
  const response = await axios.get(`${API_BASE_URL}/participants/${id}`);
  return response.data;
};