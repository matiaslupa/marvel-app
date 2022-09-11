import React from 'react';

import './App.css';
// React Router
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Components
import NavBar from './features/NavBar/NavBar';

import Pages from './components/Pages/Pages';

import CharactersList from './components/CharactersList/CharactersList';

import ComicsList from './components/ComicsList/ComicsList';

import EventsList from './components/EventsList/EventsList';

import SeriesList from './components/SeriesList/SeriesList';



function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Pages />} />

        <Route path="characters" element={<CharactersList />} >
        <Route path=":letter" element={<CharactersList />} />
        </Route>

        <Route path="comics" element={<ComicsList />} >
        <Route path=":letter" element={<ComicsList />} />
        </Route>

        <Route path="events" element={<EventsList />} >
        <Route path=":letter" element={<EventsList />} />
        </Route>

        <Route path="series" element={<SeriesList />} >
        <Route path=":letter" element={<SeriesList />} />
        </Route>

        
      </Routes>
    </div>
  );
}

export default App;
