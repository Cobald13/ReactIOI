import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Gallery from '../components/Gallery';
import ScanPainting from '../components/ScanPainting';

function Home() {
  return (
    <div>
      <Header />
      <SearchBar />
      <ScanPainting />
      <Gallery />
    </div>
  );
}

export default Home;
