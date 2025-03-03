import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchParticipantById } from '../utils/api';
import { Participant } from '../types/types';
import './ParticipantFocusView.css';
import { ReactComponent as Logo } from '../assets/logo_IntusCare.svg';
import { motion } from 'framer-motion';

const ParticipantFocusView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchParticipantById(id)
        .then((data) => {
          setParticipant(data);
          setIsLoading(false);
        })
        .catch(console.error);
    }
  }, [id]);

  if (isLoading || !participant) {
    return (
      <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div className={`participant-focus-container ${!isLoading ? 'visible' : ''}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}>
      {/* Header */}
      <header className="header">
        <Logo className="logo" />
      </header>

      {/* Participant Details */}
      <section className="participant-details">
        {/* Back Button Container */}
        <motion.div className="back-button-container"
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.95 }}>
          <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-symbol">&lt;</span>Back</button>
        </motion.div>

        {/* Diagnoses Box */}
        <div className="diagnoses-box">
          <h2 className="participant-name-2">{participant.firstName} {participant.lastName}</h2>
          <h3 className="icd-code-label">ICD Codes ({participant.diagnoses.length})</h3>
          
          {/* Diagnoses Items */}
          <motion.div 
          className="diagnoses-items"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
            {participant.diagnoses.map((diagnosis) => (
              <motion.div
                key={diagnosis.icdCode}
                className="diagnosis-item"
              >
                <span className="condition-name">{diagnosis.conditionName}</span>
                <span className="icd-code">{diagnosis.icdCode}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ParticipantFocusView;