// src/components/HeroSection.js
import React from 'react';
import '../styles/styles.css';

function HeroSection({ painterName, description, onScrollToAlbum }) {
  return (
    <header className="hero-section">
      <div className="container">
        <h1>{painterName}</h1>
        <p>{description}</p>
        <div>
          <a href="/" className="btn btn-primary me-2">Nazaj na slikarje</a>
          <button className="btn btn-outline-light" onClick={onScrollToAlbum}>
            Raziskuj slike
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
