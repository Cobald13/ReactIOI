import React, { useState } from 'react';
import '../styles/styles.css';
import useRecognition from './useRecognition.js'; // Custom hook for recognition logic

function Header() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = useRecognition(setError, setIsLoading);

  const handleScanClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <header className="bg-buff text-cornsilk py-3 text-center">
      <h1>Interaktivna galerija slovenskih slikarjev</h1>
      <nav>
        <ul className="list-unstyled d-inline-block">
          <li className="d-inline-block mx-2">
            <button onClick={handleScanClick} className="btn btn-gallery">
              {isLoading ? 'Prepoznavanje...' : 'Poskeniraj sliko'}
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </li>
        </ul>
      </nav>
      {error && <p className="text-danger mt-3">{error}</p>}
    </header>
  );
}

export default Header;
