import Navbar from './components/Navbar.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Slots from './pages/Slots.jsx';
import Articles from './pages/Articles.jsx';
import FleaMarkets from './pages/FleaMarkets.jsx';
import Users from './pages/Users.jsx';
import Dealers from './pages/Dealers.jsx';
import Interests from './pages/Interests.jsx';

function App() {

  return (
    <>
      <Router>
        <div>
          <Navbar/>
          <Routes>
            {/* exact identifie exactement que aucun chemin donne Home plutot qu'un autre chemin */}
            <Route path='/' exact element={<Home/>} />
            <Route path='/article' element={<Articles/>} />
            <Route path='/user' element={<Users/>} />
            <Route path='/dealer' element={<Dealers/>} />
            <Route path='/flea_market' element={<FleaMarkets/>} />
            <Route path='/interest' element={<Interests/>} />
            <Route path='/slot' element={<Slots/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
