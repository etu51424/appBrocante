import React, {useState, useEffect} from 'react';
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js";
import AreaChart from '../components/AreaChart.jsx';
import DateSelector from '../components/DateSelector.jsx';
import "../css/Stats.css";

function Stats() {
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();


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

    const changeDateStart = (date) => {
        console.log("date start selectionnée :", date); 
        setDateStart(date);
    };

    const changeDateEnd = (date) => {
        console.log("date end selectionnée :", date); 
        setDateEnd(date);
    };

    return (
        <div className='stats'>
            <div className='dateSelects'>
                <DateSelector changeDateElem={changeDateStart} />
                <DateSelector changeDateElem={changeDateEnd} />
            </div>
            <div className="statsGraph">
                <GridItem title={langDict.stats.title}>
                    <AreaChart/>
                </GridItem>
            </div>
        </div>
    );
}

function GridItem({title, children}) {
    return (
        <div className="statsGrid">
            <h3 className="gridTitle">{title}</h3>
            {children}
        </div>
    );
}

export default Stats;