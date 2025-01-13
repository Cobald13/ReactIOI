import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Import `useLocation` for query parameters
import HeroSection from '../components/HeroSection';
import PaintingCard from '../components/PaintingCard';
import '../styles/styles.css';

function PainterPage() {
  const { id } = useParams(); // Get painter ID from URL
  const location = useLocation(); // Get location for query parameters
  const backendUrl = 'https://pure-chicken-urgently.ngrok-free.app'; // Static Ngrok URL
  const [painter, setPainter] = useState(null);
  const [error, setError] = useState(null);

  // Extract the paintingId from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const paintingId = queryParams.get('paintingId');

  // Fetch painter data once the backend URL is set
  useEffect(() => {
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
  }, [backendUrl, id]);

  // Scroll to the specific painting when the component loads
  useEffect(() => {
    if (painter && paintingId) {
      const targetPainting = document.getElementById(`painting-${paintingId}`);
      if (targetPainting) {
        targetPainting.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [painter, paintingId]);

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
              <div
                key={painting.id}
                id={`painting-${painting.id}`} // Add an ID for each painting
              >
                <PaintingCard
                  imageSrc={painting.imageSrc}
                  title={painting.title}
                  description={painting.description}
                  videoSrc={painting.videoSrc}
                />
              </div>
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
