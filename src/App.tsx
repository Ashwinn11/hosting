import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppLanding from './pages/AppLanding';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:appId" element={<AppLanding />} />
          <Route path="/:appId/privacy-policy" element={<AppLanding section="privacy" />} />
          <Route path="/:appId/terms-of-service" element={<AppLanding section="terms" />} />
          <Route path="/:appId/support" element={<AppLanding section="support" />} />
          <Route path="/privacy-policy" element={<AppLanding appId="masterly" section="privacy" />} />
          <Route path="/terms-of-service" element={<AppLanding appId="masterly" section="terms" />} />
          <Route path="/support" element={<AppLanding appId="masterly" section="support" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
