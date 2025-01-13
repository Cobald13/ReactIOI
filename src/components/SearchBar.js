import React, { useState } from 'react';
import '../styles/styles.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState(''); // Manages the local state for the search term

  const handleInputChange = (e) => {
    const value = e.target.value; // Get the current input value
    setSearchTerm(value);        // Update the local state
    if (onSearch) {
      onSearch(value);           // Call the parent-provided function, if available
    }
  };

  return (
    <section id="search" className="bg-beige py-4">
      <div className="container text-center">
        <input
          type="text"
          id="search-bar"
          className="form-control w-75 mx-auto"
          placeholder="Išči slikarje..."
          value={searchTerm} // Bind the input's value to the state
          onChange={handleInputChange} // Handle input change
        />
      </div>
    </section>
  );
}

export default SearchBar;
