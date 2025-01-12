import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import PaintingCard from '../components/PaintingCard';

function PainterPage() {
  const { id } = useParams(); // Get painter ID from URL
  const [backendUrl, setBackendUrl] = useState(null); // State for backend URL
  const [painter, setPainter] = useState(null);
  const [error, setError] = useState(null);

  // Fetch backend configuration when component mounts
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/config');
        const config = await response.json();
        setBackendUrl(config.backend_url); // Set the backend URL dynamically
      } catch (err) {
        console.error('Error fetching backend config:', err);
        setError('Failed to fetch backend configuration');
      }
    };

    fetchConfig();
  }, []);

  // Fetch painter data once the backend URL is set
  useEffect(() => {
    if (!backendUrl) return; // Wait until backendUrl is available

    const fetchPainter = async () => {
      try {
        const response = await fetch(`${backendUrl}/painter/${id}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true', // Add this header
          },
        });
        if (!response.ok) {
          throw new Error('Painter not found');
        }
        const data = await response.json();
        setPainter(data); // Set the painter data
      } catch (err) {
        console.error('Error fetching painter data:', err);
        setError('Painter not found');
      }
    };

    fetchPainter();
  }, [backendUrl, id]); // Dependency array includes backendUrl and id

  // Handle loading state
  if (error) {
    return <div className="text-center text-danger py-5">{error}</div>;
  }

  if (!painter) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        painterName={painter.name}
        description={painter.description}
        onScrollToAlbum={() =>
          document.getElementById('album-section').scrollIntoView({ behavior: 'smooth' })
        }
      />

      {/* Album Section */}
      <div id="album-section" className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {painter.paintings.map((painting) => (
              <PaintingCard
                key={painting.id}
                imageSrc={painting.imageSrc}
                title={painting.title}
                description={painting.description}
                videoSrc={painting.videoSrc}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="text-center py-4">
        <button
          className="btn btn-primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Nazaj na vrh
        </button>
      </div>
    </div>
  );
}

export default PainterPage;
