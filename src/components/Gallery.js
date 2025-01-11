// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';

function Gallery() {
  const [artists, setArtists] = useState([]); // State to store fetched artist data
  const [error, setError] = useState(null);

  // Fetch data from Flask backend when component mounts
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/painters'); // Flask endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch artist data');
        }
        const data = await response.json(); // Parse JSON response
        setArtists(data); // Set fetched data to state
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not load artist data. Please try again later.");
      }
    };

    fetchArtists();
  }, []);

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
