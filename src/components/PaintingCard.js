import '../styles/styles.css';

import React, { useState, useEffect, useRef } from 'react';

function PaintingCard({ imageSrc, title, description, videoSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null); // Store the aspect ratio of the image
  const cardRef = useRef(null);

  useEffect(() => {
    // Load the image to determine its dimensions and aspect ratio
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setImageAspectRatio(img.width / img.height); // Calculate aspect ratio of the image
    };
  }, [imageSrc]);

  const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 0;
  const videoHeight = imageAspectRatio ? cardWidth / imageAspectRatio : 0; // Maintain portrait aspect ratio

  const handleTogglePlay = () => {
    // Check if videoSrc is valid before toggling
    if (videoSrc && videoSrc !== "/") {
      setIsPlaying((prevIsPlaying) => !prevIsPlaying); // Toggle play state
    }
  };

  return (
    <div className="painting-card" ref={cardRef}>
      <div className="card shadow-sm">
        {isPlaying ? (
          <div
            style={{
              width: '100%',
              height: `${videoHeight}px`,
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={handleTogglePlay} // Allow toggling back to the image
          >
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              controls
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></video>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={title}
            className="card-img-top"
            style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            onClick={handleTogglePlay} // Toggle to video when clicked
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default PaintingCard;
