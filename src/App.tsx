import { HashRouter, Routes, Route } from 'react-router-dom';
import DeckContainer from './components/deck/DeckContainer';
import SchoolVisit from './pages/SchoolVisit';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DeckContainer />} />
        <Route path="/school-visit" element={<SchoolVisit />} />
      </Routes>
    </HashRouter>
  );
}
