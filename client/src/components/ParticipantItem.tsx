import React from 'react';
import { Participant } from '../types/types';
import './ParticipantItem.css';
import { motion } from 'framer-motion';

interface ParticipantItemProps {
  participant: Participant;
  onClick: () => void;
  showDiagnosisCount?: boolean; // Optional prop to show/hide diagnosis count
  customClassName?: string; // Optional prop for custom styling
}

const ParticipantItem: React.FC<ParticipantItemProps> = ({
  participant,
  onClick,
  showDiagnosisCount = true,
  customClassName = '',
}) => {
  return (
    <motion.div className={`participant-item ${customClassName}`}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      // fade in effect
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}>
      <span className="participant-name">
        {participant.firstName} {participant.lastName}
      </span>
      {showDiagnosisCount && (
        <span className="icd-count">{participant.diagnoses.length}</span>
      )}
    </motion.div>
  );
};

export default ParticipantItem;