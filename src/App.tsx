import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MusicPage from './components/MusicPage';
import GalleryPage from './components/GalleryPage';
import PressKitPage from './components/PressKitPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'music':
        return <MusicPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'presskit':
        return <PressKitPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </>
  );
}

export default App;
