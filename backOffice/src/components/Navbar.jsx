import React, { useContext } from 'react';
import "../css/Navbar.css";
import { AuthContext } from './AuthProvider.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../store/slices/languageSlice.js';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const langDict = useSelector(state => state.language.langDict);

  const dispatch = useDispatch();

  const handleChangeLanguage = (langCode) => {
    dispatch(changeLanguage({langCode:langCode}));
  }

  const handleLogOut = () => {
    logout();
  }

  return (
    <>
        <div className="navbar">
          <div></div> 
          <div className="logoAndTitle">
                <img src="/logo.png" alt="logo" />
                <h2>{langDict.app_brocante}</h2>
            </div>
            <div className="langButtons">
              <button onClick={() => handleChangeLanguage("en")}><img src="/en.png" alt="logo" width="46px"/></button>
              <button onClick={() => handleChangeLanguage("fr")}><img src="/fr.png" alt="logo" width="46px"/></button>
              <button onClick={() => handleChangeLanguage("nl")}><img src="/nl.png" alt="logo" width="46px"/></button>
          </div>
          <div className="logOut">
              <button onClick={() => handleLogOut()}>{langDict.login.logout}</button>
          </div>
        </div>
    </>
  )
}

export default Navbar