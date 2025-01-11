// src/components/SearchBar.js
import React from 'react';

function SearchBar() {
  return (
    <section id="search" className="bg-beige py-4">
      <div className="container text-center">
        <input
          type="text"
          id="search-bar"
          className="form-control w-75 mx-auto"
          placeholder="Išči slikarje..."
        />
      </div>
    </section>
  );
}

export default SearchBar;
