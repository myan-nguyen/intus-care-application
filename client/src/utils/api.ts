import axios from 'axios';
import { Participant } from '../types/types';

// Ensure the API base URL is set in the environment
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_API_URL");
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchParticipants = async (): Promise<Participant[]> => {
  const response = await axios.get(`${API_BASE_URL}/participants`);
  return response.data;
};

export const fetchParticipantById = async (id: string): Promise<Participant> => {
  const response = await axios.get(`${API_BASE_URL}/participants/${id}`);
  return response.data;
};