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

  const getAutoplayUrl = () => {
    const videoId = extractYouTubeVideoId(videoSrc);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`; // Autoplay, loop, and mute
  };

  const extractYouTubeVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
    } catch {
      return null;
    }
  };

  return (
    <div className="col" ref={cardRef}>
      <div className="card shadow-sm">
        {isPlaying ? (
          <div
            style={{
              width: '100%',
              height: `${videoHeight}px`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={getAutoplayUrl()} // Embed URL with autoplay and looping
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={title}
            className="card-img-top"
            style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            onClick={() => setIsPlaying(true)}
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
