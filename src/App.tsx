import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Gallery from './pages/Gallery';
import Challenge from './pages/Challenge';
import Community from './pages/Community';
import Profile from './pages/Profile';
import MobileNavigation from './components/MobileNavigation';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50 pb-16">
          <Routes>
            <Route path="/" element={<Navigate to="/gallery" replace />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <MobileNavigation />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;