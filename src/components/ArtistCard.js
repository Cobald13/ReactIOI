import { Link } from 'react-router-dom';
import '../styles/styles.css';

function ArtistCard({ artistName, images, galleryLink }) {
  const painterId = galleryLink.split('.html')[0]; // Extract the ID (e.g., "kobilca")

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card artist-card">
        <div className="card-title-top">{artistName}</div>
        <div className="card-images">
          {images.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} className="artist-image" />
          ))}
        </div>
        <div className="card-footer">
        <Link to={galleryLink} className="btn btn-gallery">Ogled galerije</Link>
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
