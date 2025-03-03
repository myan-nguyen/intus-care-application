import axios from 'axios';
import { Participant } from '../types/types';

const API_BASE_URL = 'http://localhost:5002';

export const fetchParticipants = async (): Promise<Participant[]> => {
  const response = await axios.get(`${API_BASE_URL}/participants`);
  return response.data;
};

export const fetchParticipantById = async (id: string): Promise<Participant> => {
  const response = await axios.get(`${API_BASE_URL}/participants/${id}`);
  return response.data;
};