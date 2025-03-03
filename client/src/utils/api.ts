import axios from 'axios';
import { Participant } from '../types/types';

/*const API_BASE_URL = 'http://localhost:5002';

export const fetchParticipants = async (): Promise<Participant[]> => {
  const response = await axios.get(`${API_BASE_URL}/participants`);
  return response.data;
};

export const fetchParticipantById = async (id: string): Promise<Participant> => {
  const response = await axios.get(`${API_BASE_URL}/participants/${id}`);
  return response.data;
};*/

const API_BASE_URL = typeof window !== "undefined" && window.location.hostname === 'localhost'
  ? 'http://localhost:5002'  // Local API URL when running locally
  : 'https://intus-care-application.vercel.app';  // Vercel API URL in production

export const fetchParticipants = async (): Promise<Participant[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/participants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw error;
  }
};

export const fetchParticipantById = async (id: string): Promise<Participant> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/participants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching participant by ID:", error);
    throw error;
  }
};