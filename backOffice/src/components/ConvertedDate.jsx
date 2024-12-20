import React, {useEffect, useState} from "react";
import frDict from "../translations/fr/fr.js";
import languageDictProvider from "../utils/language.js";

function ConvertedDate({ longFormatDate }) {
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut

    const changeLanguage = () => {
        languageDictProvider(window.language);
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

    const convertToFrDate = (longDate) => {
        // créer une Date js
        const date = new Date(longDate);
        const convertedDate = date.toLocaleDateString(langDict.date_format);

        // utiliser la méthode Date de js et préciser qu'on veut une date fr JJ/MM/AAAA
        return convertedDate;
    };
    
    return (
        <>
            {convertToFrDate(longFormatDate)}
        </>
    );
}

export default ConvertedDate;