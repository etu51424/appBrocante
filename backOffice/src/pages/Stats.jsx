import React, {useState, useEffect} from 'react';
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js"; 

function Stats() {
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut

    const changeLanguage = () => {
        setLangDict(window.language === "fr" ? frDict : enDict);
    }
    
    // j'utilise un useEffect pour écouter (via un listener) un changement potentiel de window.language
    useEffect(() => {
        // listener
        const handleLanguageChange = () => {
            changeLanguage();
        };

        window.addEventListener("langchange", handleLanguageChange);

        // une fois déclenché, l'écouteur se ferme jusqu'au prochain passage du code ici
        // ...qui arrive bientôt, juste après la maj de la page
        return () => {
            window.removeEventListener("langchange", handleLanguageChange);
        };
    }, []); // aucune dépendance utile ici



    return (
        <div className='stats'>
            <p>{langDict.stats.title}</p>
        </div>
    );
}

export default Stats;