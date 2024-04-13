import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GarageView from './pages/GarageView';
import WinnersView from './pages/WinnersView';


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
