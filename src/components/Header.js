import React, { useState } from 'react';
import '../styles/styles.css';

function Header() {
  const [error, setError] = useState(null);
  const backendUrl = 'https://pure-chicken-urgently.ngrok-free.app'; // Replace with your backend URL

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null); // Reset any previous errors

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${backendUrl}/recognize`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true', // Skip ngrok warnings
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to recognize the painting');
      }

      const data = await response.json();

      if (data._id) {
        // Redirect to the painter's page
        window.location.href = `/painter/${data._id}`;
      } else {
        setError('Painting not recognized');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while recognizing the painting.');
    }
  };

  const handleScanClick = () => {
    document.getElementById('fileInput').click(); // Trigger the hidden file input
  };

  return (
    <header className="bg-buff text-cornsilk py-3 text-center">
      <h1>Interaktivna galerija slovenskih slikarjev</h1>
      <nav>
        <ul className="list-unstyled d-inline-block">
          <li className="d-inline-block mx-2">
            <button onClick={handleScanClick} className="btn btn-gallery">
              Poskeniraj sliko
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
