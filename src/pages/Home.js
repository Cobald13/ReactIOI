import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Gallery from '../components/Gallery';
import '../styles/styles.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Update the search term (convert to lowercase for case-insensitive search)
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} /> {/* Pass the search handler */}
      <Gallery searchTerm={searchTerm} /> {/* Pass the search term */}
    </div>
  );
}

export default Home;
