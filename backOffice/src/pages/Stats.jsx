import React, {useState, useEffect} from 'react';
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js";
import AreaChart from '../components/AreaChart.jsx';
import "../css/Stats.css";

function Stats() {
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut

    const changeLanguage = () => {
        setLangDict(window.language === "fr" ? frDict : enDict);
    }

    // on utilise un useEffect pour écouter (via un listener) un changement potentiel de window.language
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
            <main className="statsIn">
                <div className="statsInIn">
                    <GridItem title={langDict.stats.title}>
                        <AreaChart/>
                    </GridItem>
                </div>
            </main>
        </div>
    );
}

function GridItem({title, children}) {
    return (
        <div className="flex flex-col items-center justify-center p-4 border border-slate-900
        bg-slate-900/50 rounded-xl h-[400px]">
            <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
            {children}
        </div>
    );
}

export default Stats;