import React from 'react';

function Header({ onScanClick }) {
  return (
    <header className="bg-buff text-cornsilk py-3 text-center">
      <h1>Interaktivna galerija slovenskih slikarjev</h1>
      <nav>
        <ul className="list-unstyled d-inline-block">
          <li className="d-inline-block mx-2">
            <button onClick={onScanClick} className="btn btn-gallery">
              Poskeniraj sliko
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
