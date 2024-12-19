import Navbar from './components/Navbar.jsx';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Slots from './pages/Slots.jsx';
import Articles from './pages/Articles.jsx';
import FleaMarkets from './pages/FleaMarkets.jsx';
import Users from './pages/Users.jsx';
import Dealers from './pages/Dealers.jsx';
import Interests from './pages/Interests.jsx';
import Stats from './pages/Stats.jsx';
import Menu from './components/Menu.jsx';

window.language = "fr";

function App() {

  return (
    <>
      <Router>
        <div>
          <Navbar/>
          <div className="main-body">
            <Menu/>
            <Routes>
              {/* en fonction de la route, un different affichage */}
              <Route path='/' exact element={<Home/>} />
              <Route path='/article' element={<Articles/>} />
              <Route path='/user' element={<Users/>} />
              <Route path='/dealer' element={<Dealers/>} />
              <Route path='/flea_market' element={<FleaMarkets/>} />
              <Route path='/interest' element={<Interests/>} />
              <Route path='/slot' element={<Slots/>} />
              <Route path='/stats' element={<Stats/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App
