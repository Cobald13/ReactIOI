import React, { useState, useEffect } from 'react';

function ScanPainting() {
  const [selectedFile, setSelectedFile] = useState(null);
  const backendUrl = 'https://pure-chicken-urgently.ngrok-free.app'; // Static Ngrok URL
  const [error, setError] = useState(null);


  const handleFileChange = (event) => {
    setError(null);
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Automatically trigger the API call
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    if (!backendUrl) {
      setError('Backend URL not available');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${backendUrl}/recognize`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true', // Add this header
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to recognize the painting');
      }

      const data = await response.json();
      console.log(data); // Log the response for debugging

      if (data._id) {
        // Redirect to the painter's page
        window.location.href = `/painter/${data._id}`;
      } else {
        // Display the popup only if there's no painter ID
        alert('Painting not recognized');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  return (
    <div className="scan-container text-center">
      <h2>Scan Painting</h2>
      {error && <p className="text-danger">{error}</p>}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <button
        onClick={() => document.getElementById('fileInput').click()}
        className="btn btn-primary"
      >
        Open Camera
      </button>
    </div>
  );
}

export default ScanPainting;
