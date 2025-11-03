import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import LiveDetection from './components/app/LiveDetection';
import SimpleLogin from './components/auth/SimpleLogin';
import Dashboard from './components/app/Dashboard';
import Train from './components/app/Train';
import History from './components/app/History';
import Settings from './components/app/Settings';
import TestLanguage from './components/app/TestLanguage';
import VoiceTest from './components/app/VoiceTest';
import SimpleTest from './components/app/SimpleTest';
import VoiceToText from './components/app/VoiceToText';
import MicTest from './components/app/MicTest';
import Header from './components/common/Header';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <SimpleLogin onLogin={handleLogin} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/live" element={user ? <LiveDetection /> : <Navigate to="/login" />} />
          <Route path="/train" element={user ? <Train /> : <Navigate to="/login" />} />
          <Route path="/history" element={user ? <History /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/test" element={user ? <TestLanguage /> : <Navigate to="/login" />} />
          <Route path="/voices" element={user ? <VoiceTest /> : <Navigate to="/login" />} />
          <Route path="/simple" element={user ? <SimpleTest /> : <Navigate to="/login" />} />
          <Route path="/voice-to-text" element={user ? <VoiceToText /> : <Navigate to="/login" />} />
          <Route path="/mic-test" element={user ? <MicTest /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
