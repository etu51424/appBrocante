  import Navbar from './components/Navbar.jsx';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Slots from './pages/Slots.jsx';
import Articles from './pages/Articles.jsx';
import FleaMarkets from './pages/FleaMarkets.jsx';
import Users from './pages/Users.jsx';
import Dealers from './pages/Dealers.jsx';
import Interests from './pages/Interests.jsx';
import Stats from './pages/Stats.jsx';
import Menu from './components/Menu.jsx';

import App from './App'

import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider  } from "./components/AuthProvider.jsx";

window.language = "fr";

function App() {
  console.log("Arrive sur l'appli");
  return (
    <>
        <Router>
          <div>
            <AuthProvider>
            <Navbar/>
            <div className="main-body">
              <Menu/>
              <Routes>
                <Route path='/' element={<Navigate to="/login" replace />} />
                <Route path='/home' element={<PrivateRoute element={<Home/>} />} />
                <Route path='/article' element={<PrivateRoute element={<Articles/>}/>} />
                <Route path='/user' element={<PrivateRoute element={<Users/>}/>} />
                <Route path='/dealer' element={<PrivateRoute element={<Dealers/>} />} />
                <Route path='/flea_market' element={<PrivateRoute element={<FleaMarkets/>} />} />
                <Route path='/interest' element={<PrivateRoute element={<Interests/>} />} />
                <Route path='/slot' element={<PrivateRoute element={<Slots/>} />} />
                <Route path='/stats' element={<PrivateRoute element={<Stats/>} />} />
                <Route path='/login' element={<LoginForm/>} />
              </Routes>
            </div>
             </AuthProvider>
            </div>
        </Router>
    </>
  );
}

export default App
