import React, {useState, useEffect} from 'react';

import { useSelector } from 'react-redux';
import AreaChart from '../components/AreaChart.jsx';
import DateSelector from '../components/DateSelector.jsx';
import "../css/Stats.css";

function Stats() {
    
    const langDict = useSelector(state => state.language.langDict);
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();

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