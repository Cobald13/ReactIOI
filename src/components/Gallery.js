import React, { useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';
import '../styles/galery.css'; // Import the CSS file
import '../styles/styles.css';

function Gallery({ searchTerm }) {
  const [artists, setArtists] = useState([]); // State to store fetched artist data
  const [filteredArtists, setFilteredArtists] = useState([]); // Artists matching the search
  const [previousArtists, setPreviousArtists] = useState([]); // Previous state for comparison
  const [error, setError] = useState(null);

  const backendUrl = 'https://pure-chicken-urgently.ngrok-free.app'; // Static Ngrok URL

  // Fetch artists data once the backend URL is set
  useEffect(() => {
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
  }, [backendUrl]);

  // Update filtered artists based on the search term
  useEffect(() => {
    const newFilteredArtists = artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match artist name
        artist.paintings.some((painting) =>
          painting.title.toLowerCase().includes(searchTerm.toLowerCase()) // Match painting title
        )
    );

    setPreviousArtists(filteredArtists); // Save the current state as "previous"
    setFilteredArtists(newFilteredArtists); // Update the filtered list
  }, [searchTerm, artists]);

  // Function to determine if a card needs fade-in
  const needsFadeIn = (artist) => {
    // Fade in if:
    // 1. Artist is newly added to the filtered list.
    // 2. The position/order of the artist has changed.
    const previousIndex = previousArtists.findIndex((prev) => prev._id === artist._id);
    const currentIndex = filteredArtists.findIndex((curr) => curr._id === artist._id);
    return previousIndex === -1 || previousIndex !== currentIndex;
  };

  return (
    <section id="gallery" className="py-5">
      <div className="container">
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row g-4">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <div
                key={artist._id}
                className={`col-12 col-md-6 col-lg-4 ${needsFadeIn(artist) ? 'fade-in' : ''}`}
              >
                <div className="card artist-card">
                  <div className="card-title-top">{artist.name}</div>
                  <div className="card-images">
                    {artist.paintings.slice(0, 3).map((painting, index) => ( // Show only first 3 images
                      <img
                        key={index}
                        alt={painting.title}
                        className="artist-image"
                        src={painting.imageSrc}
                      />
                    ))}
                  </div>
                  <div className="card-footer">
                    <a
                      className="btn btn-gallery"
                      href={`/painter/${artist._id}`}
                      data-discover="true"
                    >
                      Ogled galerije
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No results found for "{searchTerm}".</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
