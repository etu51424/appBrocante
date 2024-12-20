import React, {useState, useEffect} from 'react';

import frDict from "../translations/fr/fr.js";
import AreaChart from '../components/AreaChart.jsx';
import DateSelector from '../components/DateSelector.jsx';
import "../css/Stats.css";
import languageDictProvider from "../utils/language.js";

function Stats() {
    
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();

    const changeLanguage = () => {
        languageDictProvider(window.language);
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

    // changeDateStart et changeDateEnd détectent un changement et update le prop passé au sous-composant AreaCharts
    const changeDateStart = (date) => {
        //console.log("date start selectionnée :", date); 
        setDateStart(date);
    };

    const changeDateEnd = (date) => {
        //console.log("date end selectionnée :", date); 
        setDateEnd(date);
    };

    return (
        <div className='stats'>
            <div className='dateSelects'>
                <p className='dateSelectsPara'>{langDict.stats.month_start} :</p>
                <DateSelector changeDateElem={changeDateStart} />

                <p className='dateSelectsPara'>{langDict.stats.month_end} :</p>
                <DateSelector changeDateElem={changeDateEnd} />
            </div>
            <div className="statsGraph">
                <GridItem title={langDict.stats.title}>
                    <AreaChart
                        dateStartProp={dateStart}
                        dateEndProp={dateEnd}
                    />
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