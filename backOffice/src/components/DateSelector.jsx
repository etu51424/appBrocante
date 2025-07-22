import React, { useState } from 'react';
import PropTypes from "prop-types";

function DateSelector({changeDateElem}) {
    const [year, setYear] = useState("2020");
    const [month, setMonth] = useState("01");

    // créer les années
    const years = [];
    for (let year = 2020; year <= 2030; year++) {
        // convertit en string sinon err
        years.push(year.toString());
    }

    // idem pour les mois
    const months = [];
    for (let iMonth = 1; iMonth <= 12; iMonth++) {
        //idem padStart ici on convertit en string puis on préfixe un "0" pour les mois à 1 chiffre
        months.push(iMonth.toString().padStart(2, "0")); 
    }

    // une fcn callback que le secteur crée et qui sera exec par le parent: Stats.jsx,
    // afin de changer le mois de la date lors d'un clic
    const changeYear = (event) => {
        setYear(event.target.value);
        changeDateElem(`${event.target.value}-${month}-01`); 
    };

    //idem pour l'année
    const changeMonth = (event) => {
        setMonth(event.target.value);
        changeDateElem(`${year}-${event.target.value}-01`); 
    };

    return (
        <div className="dateSelect">

            <select value={year} onChange={changeYear}>
                {
                    years.map(
                        (choosenYear) => (
                        <option key={choosenYear} value={choosenYear}>
                            {choosenYear}
                        </option>
                    ))
                }
            </select>

            <select value={month} onChange={changeMonth}>
                {
                    months.map(
                        (choosenMonth) => (
                        <option key={choosenMonth} value={choosenMonth}>
                            {choosenMonth}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

DateSelector.propTypes = {
    changeDateElem: PropTypes.func.isRequired,
}

export default DateSelector;