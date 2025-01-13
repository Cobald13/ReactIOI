import React from 'react';
import '../styles/styles.css';

function HeroSection({ painterName, description, onScrollToAlbum }) {
  return (
    <header className="hero-section">
      <div className="container">
        <h1>{painterName}</h1>
        <div className="hero-buttons">
          <a href="/" className="btn btn-primary me-2">Nazaj na slikarje</a>
          <button className="btn btn-outline-light" onClick={onScrollToAlbum}>
            Raziskuj slike
          </button>
        </div>
        <p>{description}</p>
      </div>
    </header>
  );
}

export default HeroSection;
