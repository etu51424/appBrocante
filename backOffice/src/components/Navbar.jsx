import React from 'react';
import "./Navbar.css";

function Navbar() {
  const handleChangeLanguage = (lang) => { 
    window.language = lang;

    // dispatch un événement "langchange" à travers dans l'objet window (donc toute la vue, ce qui inlcut tous les composants)
    const event = new Event("langchange");
    window.dispatchEvent(event);
    console.log("Changed to " + window.language);
  }

  return (
    <>
        <div className="navbar">
          <div></div> 
          <div className="logoAndTitle">
                <img src="/logo.png" alt="logo" />
                <h2>AppBrocante - Menu Administrateur</h2>
            </div>
            <div className="langButtons">
              <button onClick={() => handleChangeLanguage("en")}><img src="/en.png" alt="logo" width="46px"/></button>
              <button onClick={() => handleChangeLanguage("fr")}><img src="/fr.png" alt="logo" width="46px"/></button>
          </div>
        </div>
    </>
  )
}

export default Navbar