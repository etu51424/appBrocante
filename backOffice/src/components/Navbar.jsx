import React, {useState} from 'react';
import "../css/Navbar.css";
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js"; 

function Navbar() {
  const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut
  
  const handleChangeLanguage = (lang) => { 
    window.language = lang;

    //set la langue uniquement pour Navbar.jsx
    setLangDict(lang == "fr" ? frDict : enDict);

    // dispatch un événement "langchange" à travers et dans l'objet window (donc toute la vue, ce qui inlcut tous les composants)
    //changeant la langue sur toutes les pages
    const event = new Event("langchange");
    window.dispatchEvent(event);
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
          </div>
        </div>
    </>
  )
}

export default Navbar