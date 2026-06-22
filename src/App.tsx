import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MusicPage from './components/MusicPage';
import GalleryPage from './components/GalleryPage';
import PressKitPage from './components/PressKitPage';
import SongDetailsPage from './components/SongDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/press-kit" element={<PressKitPage />} />
        <Route path="/stream/:songId" element={<SongDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
