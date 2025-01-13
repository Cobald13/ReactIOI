import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PainterPage from './pages/PainterPage';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/painter/:id" element={<PainterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
