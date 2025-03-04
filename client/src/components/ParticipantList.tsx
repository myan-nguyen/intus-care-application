import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchParticipants } from '../utils/api';
import { Participant } from '../types/types';
import './ParticipantList.css';
import ParticipantItem from './ParticipantItem';
import { ReactComponent as Logo } from '../assets/logo_IntusCare.svg';
import sortDescIcon from '../assets/orderFilter_Down.png';
import sortAscIcon from '../assets/orderFilter_Up.png';
import alphAscIcon from '../assets/ascending-alph.png';
import alphDescIcon from '../assets/descending-alph.png';
import { motion } from 'framer-motion';

interface ParticipantListProps {
  filter?: string;
  sortBy?: 'name' | 'codeCount';
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  filter = '',
  sortBy: propSortBy = 'codeCount',
}) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortNameOrder, setSortNameOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'name' | 'codeCount'>(propSortBy);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipants()
      .then((data) => {
        console.log('Fetched participants:', data);
        setParticipants(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching participants:', error);
        setIsLoading(false);
      });
  }, []);

  // filter participants based on name or a specific icd code (i.e. C19)
  const filteredParticipants = participants.filter((participant) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
    const nameMatch = `${participant.firstName} ${participant.lastName}`
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
  
    const icdMatch = participant.diagnoses.some((diagnosis) => {
      const icdCodeLower = diagnosis.icdCode.toLowerCase();
      return icdCodeLower.includes(lowerCaseSearchTerm);
    });
  
    return nameMatch || icdMatch;
  });
  
  // sort participants
  const sortedParticipants = filteredParticipants.sort((a, b) => {
    if (sortBy === 'name') {
      return sortNameOrder === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    } else {
      const countA = a.diagnoses.length;
      const countB = b.diagnoses.length;
      return sortOrder === 'desc' ? countB - countA : countA - countB;
    }
  });

  if (isLoading) {
    return (
      <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div className={`participant-list-container ${!isLoading ? 'visible' : ''}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}>
      {/* Header */}
      <header className="header">
      <Logo className="logo" />
      </header>

      {/* Participants Section */}
      <section className="participants-section">
        <div className="participants-heading">
          <h2 >Participants</h2>
        </div>
        
        <div className="scrollable-box">
          {/* Column Labels */}
          <div className="column-labels">
            <span className="participant-name-heading">Participant Name</span>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by Name or ICD Code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />

            <div className="icd-sort-container">
              <span className="icd-label">ICD Codes</span>
              {/* Sort By ICD Code Lengths Button */}
              <button
                className="sort-button"
                onClick={() => {
                  setSortBy('codeCount');
                  setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                }}
              >
                <img
                  src={sortOrder === 'desc' ? sortDescIcon : sortAscIcon}
                  alt="Sort Icon"
                  className="sort-icon"
                />
              </button>
              {/* Sort Alphabetically by Name Button */}
              <button
                className="sort-button"
                onClick={() => {
                  setSortBy('name');
                  setSortNameOrder(sortNameOrder === 'desc' ? 'asc' : 'desc');
                }}
              >
                <img
                  src={sortNameOrder === 'desc' ? alphDescIcon : alphAscIcon}
                  alt="Alphabetical Sort Icon"
                  className="sort-icon"
                />
              </button>
            </div>
          </div>
          
          {/* Participant Items */}
          <div className="participant-items">
            {sortedParticipants.map((participant) => (
              <ParticipantItem
                key={participant.id}
                participant={participant}
                onClick={() => navigate(`/participant/${participant.id}`)}
                showDiagnosisCount={true}
              />
            ))}
          </div>

        </div>
      </section>
    </motion.div>
  );
};

export default ParticipantList; 