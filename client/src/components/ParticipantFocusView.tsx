import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchParticipantById } from '../utils/api';
import { Participant } from '../types/types';
import './ParticipantFocusView.css';
import { ReactComponent as Logo } from '../assets/logo_IntusCare.svg';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import downloadIcon from '../assets/download-icon.png';
import timelineIcon from '../assets/timeline-icon.png';
import Modal from './Modal';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ParticipantFocusView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);

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

  const generatePDF = () => {
    const doc = new jsPDF();

    const title = `${participant.firstName} ${participant.lastName} Diagnoses`;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, 20);

    doc.setLineWidth(0.5);
    doc.line(20, 22, 180, 22);

    const startY = 30;
    let currentY = startY;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text('Condition Name', 20, currentY);
    doc.text('ICD Code', 150, currentY);
    currentY += 10;

    currentY += 5;

    const maxConditionWidth = 80;

    participant.diagnoses.forEach((diagnosis) => {
      const wrappedConditionName = doc.splitTextToSize(diagnosis.conditionName, maxConditionWidth);

      wrappedConditionName.forEach((line: string, index: number) => {
        doc.text(line, 20, currentY + (index * 10));
      });

      doc.text(diagnosis.icdCode, 150, currentY);

      currentY += wrappedConditionName.length * 10 + 10;
    });

    doc.save(`${participant.firstName}_${participant.lastName}_diagnoses.pdf`);
  };
  
  const handleOpenModal = () => {
    const extraInfo = `
      <p><strong>Name:</strong> ${participant.firstName} ${participant.lastName}</p>
      <p><strong>Date of Birth:</strong> ${new Date(participant.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> ${participant.gender}</p>
      <p><strong>Phone Number:</strong> ${participant.phoneNumber}</p>
      <p><strong>Patient Notes:</strong> ${participant.patientNotes || 'No additional notes available.'}</p>
    `;
    setModalContent(extraInfo);
    setIsModalOpen(true);
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenTimelineModal = () => {
    setIsTimelineModalOpen(true);
  };

  const handleCloseTimelineModal = () => {
    setIsTimelineModalOpen(false);
  };
  
  const sortedDiagnoses = participant.diagnoses.sort((a, b) => {
    const dateA = new Date(a.timestamp); 
    const dateB = new Date(b.timestamp);
    return dateA.getTime() - dateB.getTime();
  });

  const chartData = {
    labels: sortedDiagnoses.map((diagnosis) => new Date(diagnosis.timestamp).toLocaleDateString()), // Dates as X-axis labels
    datasets: [
      {
        label: 'Diagnoses Over Time',
        data: sortedDiagnoses.map((diagnosis, index) => ({
          x: new Date(diagnosis.timestamp).toLocaleDateString(), // Date on X-axis
          y: 1, 
          condition: diagnosis.conditionName // Attach condition to each point
        })),
        borderColor: 'rgba(0, 123, 255, 1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false, 
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderColor: 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: 'rgba(0, 123, 255, 1)',
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Timeline of Diagnoses',
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            return `Date: ${tooltipItems[0].label}`;
          },
          label: (tooltipItem: any) => {
            return `Condition: ${tooltipItem.raw.condition}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date of Diagnosis',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        display: false,
      },
    },
  };  

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
          <div className="diagnoses-headers">
            <h2 className="participant-name-2">{
            participant.firstName} {participant.lastName}

            </h2>
             {/* Timeline Button */}
            <button
              className="timeline-button"
              onClick={handleOpenTimelineModal}
            >
              <img
                src={timelineIcon}
                alt="Timeline Icon"
                className="timeline-icon"
              />
            </button>
            {/* Extra Information Button */}
            <button
              className="extra-info-button"
              onClick={handleOpenModal}
            >
              +
            </button>
            {/* Export PDF Button */}
            <button
                className="export-button"
                onClick={generatePDF}
              >
                <img
                    src={downloadIcon}
                    alt="Download Icon"
                    className="download-icon"
                  />
              </button>
          </div>
          
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
      {/* Modal for Extra Information */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} content={modalContent} />
      
      {/* Timeline Modal with Chart.js */}
      <Modal isOpen={isTimelineModalOpen} onClose={handleCloseTimelineModal} content={<Line data={chartData} options={chartOptions} />} />

    </motion.div>
  );
};

export default ParticipantFocusView;