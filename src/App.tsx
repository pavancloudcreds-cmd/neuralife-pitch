import { HashRouter, Routes, Route } from 'react-router-dom';
import PitchDeck from './PitchDeck';
import SchoolVisit from './pages/SchoolVisit';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PitchDeck />} />
        <Route path="/school-visit" element={<SchoolVisit />} />
      </Routes>
    </HashRouter>
  );
}
