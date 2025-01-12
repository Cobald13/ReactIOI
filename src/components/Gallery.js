// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';

function Gallery() {
  const [artists, setArtists] = useState([]); // State to store fetched artist data
  const [error, setError] = useState(null);

  const backendUrl = 'https://pure-chicken-urgently.ngrok-free.app'; // Static Ngrok URL
    

  // Fetch artists data once the backend URL is set
  useEffect(() => {
    if (!backendUrl) return; // Don't fetch artists until backend URL is available

    const fetchArtists = async () => {
      try {
        const response = await fetch(`${backendUrl}/painters`, {
          headers: {
            'ngrok-skip-browser-warning': 'true', // Add this header
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtists(data);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Could not load artist data. Please try again later.');
      }
    };

    fetchArtists();
  }, [backendUrl]); // Dependency array includes backendUrl

  return (
    <section id="gallery" className="py-5">
      <div className="container">
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row g-4">
          {artists.map((artist, index) => (
            <ArtistCard
              key={index}
              artistName={artist.name} // Use 'name' field from API
              images={artist.paintings.map((painting) => ({
                src: painting.imageSrc, // Image URL
                alt: painting.title,    // Alt text as painting title
              }))}
              galleryLink={`/painter/${artist._id}`} // Link to the artist page
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
