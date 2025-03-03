import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParticipantList from './components/ParticipantList';
import ParticipantFocusView from './components/ParticipantFocusView';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParticipantList />} />
        <Route path="/participant/:id" element={<ParticipantFocusView />} />
      </Routes>
    </Router>
  );
};

export default App;