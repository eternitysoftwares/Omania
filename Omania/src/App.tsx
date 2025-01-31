import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Chat } from './pages/Chat';
import { useThemeStore } from './store/theme';

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={isDark ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;