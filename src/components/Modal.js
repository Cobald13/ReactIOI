// src/components/Modal.js
import React from 'react';
import '../styles/styles.css';

function Modal({ modalId, videoSrc }) {
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-transparent border-0">
          <div className="modal-body d-flex justify-content-center align-items-center p-0">
            <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
              <iframe
                src={videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
