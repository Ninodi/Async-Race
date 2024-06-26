import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WinnersView from './pages/WinnersView';
import GarageView from './pages/GarageView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GarageView />} />
        <Route path='/winners' element={<WinnersView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
