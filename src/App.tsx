import React from 'react';

import './App.css';
// React Router
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Components
import NavBar from './features/NavBar/NavBar';

import Pages from './components/Pages/Pages';

import CharactersList from './components/CharactersList/CharactersList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Pages />} />

        <Route path="characters" element={<CharactersList />} >
        <Route path=":letter" element={<CharactersList />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
