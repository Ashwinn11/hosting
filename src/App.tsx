import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AppHome from './pages/AppHome';
import PlayPulseHome from './pages/PlayPulseHome';
import GutBuddyHome from './pages/GutBuddyHome';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Support from './pages/Support';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playpulse" element={<PlayPulseHome />} />
          <Route path="/gutbuddy" element={<GutBuddyHome />} />
          <Route path="/:appId" element={<AppHome />} />
          <Route path="/:appId/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:appId/terms-of-service" element={<TermsOfService />} />
          <Route path="/:appId/support" element={<Support />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
