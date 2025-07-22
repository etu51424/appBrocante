'use client'
import React, {useState, useEffect} from "react";
import { 
    AreaChart, 
    Area, 
    ResponsiveContainer, 
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import "../css/AreaChart.css";
import { getFMDataWithinDates } from "../fetchAPI/CRUD/fleaMarketsWithinDates.js";
import { useSelector } from 'react-redux';
import {exponentialRetry} from "../fetchAPI/utils/exponentialRetry.js";
import toast from "react-hot-toast";
import PropTypes from "prop-types";


const AreaChartComponent = ({ 
        dateStartProp,
        dateEndProp
    }) => {
    const [data, setData] = useState([]);

    // utile pour le debugging
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const langDict = useSelector(state => state.language.langDict);

    
    useEffect(() => {

        // valeurs par défaut si l'utilisateur n'a pas encore choisi une date
        if (dateStartProp === undefined) {
            dateStartProp = "2023-01-01"
        } 
        if (dateEndProp === undefined) {
            dateEndProp = "2027-01-01"
        }

        const getFleaMarketsWithinDates = async (dateStartProp, dateEndProp) => {
            setIsLoading(true);

            try {
                const data = await exponentialRetry(() => getFMDataWithinDates(dateStartProp, dateEndProp));

                const monthCountDatapoints = createMarketsPerMonthDict(data);
                setData(monthCountDatapoints);
            } catch (err) {
                setError(langDict.error);
                toast.error(`${langDict.error} : ${err}`);
            }
            setIsLoading(false);
        };
    
        getFleaMarketsWithinDates();
        // 2 dépendances : les deux props
    }, [dateStartProp, dateEndProp]);


    const createMarketsPerMonthDict = (data) => {

        function nextMonthOfYear(currentMonth) {
            // split vers un tableau le mois+l'année
            const year = parseInt(currentMonth.slice(0, 4), 10);
            const month = parseInt(currentMonth.slice(4, 6), 10);
        
            const nextMonth = month + 1;
        
            // passage à l'année d'après
            if (nextMonth > 12) {
                return `${year + 1}01`;
            }
        
            // padStart force un nombre dans un certain nombre de caractère. Ici 2. et force le caractère qui commence "start" à être un caractère
            //nécessaire pour respecter format au sein du dictionnaire marketsPerMonthCount
            return `${year}${String(nextMonth).padStart(2, "0")}`;
        }

        //étape 1: compter le nombre de mois entre dateStart et dateEnd
        function countMonthsWithinDates(dateStart, dateEnd) {
            var months;
            months = (dateEnd.getFullYear() - dateStart.getFullYear()) * 12;
            months -= dateStart.getMonth();
            months += dateEnd.getMonth();
            return months <= 0 ? 0 : months;
        }
        const dateStartVar = dateStartProp; // AAAA-MM-JJ
        const dateEndVar = dateEndProp; // AAAA-MM-JJ

        const dateStart = new Date(dateStartVar);
        const dateEnd = new Date(dateEndVar);

        // étape 1 : compter le nombre de brocantes pour chaque mois entre ces deux dates
        let marketsPerMonthCount = {};
        let monthCount = countMonthsWithinDates(dateStart, dateEnd);

        let monthOfYear = `${dateStart.getFullYear()}${dateStart.getMonth()+1}`;
        // pour chaque mois, on veut recenser le nombre de brocantes
        for (let i = 0; i < monthCount; i++) {

            marketsPerMonthCount[i] = {
            monthOfYear : monthOfYear, 
            marketCount : 0
            };

            // crée la propriété pour le prochain mois
            monthOfYear = nextMonthOfYear(monthOfYear);
        }
        
        // étape 2: pour chaque brocante, on a son date_start et son date_end. Incrémenter tous les mois tant que cette brocante a eu lieu
        // 
        // incrémenter chaque mois dont le year+month se situe entre date_start et date_end, toutes deux inclues
        data.map((market) => {

            const marketDateStart = new Date(market.date_start);
            const marketDateEnd = new Date(market.date_end);

            const firstMonthOfMarket = `${marketDateStart.getFullYear()}${String(marketDateStart.getMonth()+1).padStart(2, "0")}`;
            const lastMonthOfMarket = `${marketDateEnd.getFullYear()}${String(marketDateEnd.getMonth()+1).padStart(2, "0")}`;

            let iMonthOfYear = 0;
            // avancer jusqu'au premier mois de cette brocante
            while (marketsPerMonthCount[iMonthOfYear] &&
                marketsPerMonthCount[iMonthOfYear].monthOfYear < firstMonthOfMarket) {

                iMonthOfYear++;
            }
            // compter tant que la brocante a lieu
            while (marketsPerMonthCount[iMonthOfYear] &&
                marketsPerMonthCount[iMonthOfYear].monthOfYear <= lastMonthOfMarket) {

                //noter que cette brocante a eu lieu à ce mois
                marketsPerMonthCount[iMonthOfYear].marketCount++;

                iMonthOfYear++;
            }
        });

        const monthCountDatapoints = Object.values(marketsPerMonthCount).map((entry) => ({
            month: entry.monthOfYear, // axe x
            count: entry.marketCount, // axe y
        }));

        return monthCountDatapoints;
    }

    if (isLoading) {
        return <p>{langDict.loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="chart">
            <div className="chart-container">
                <ResponsiveContainer width="300%" height="100%">
                    <AreaChart width={100} height={400} data={data}>
                        <YAxis />
                        <XAxis dataKey="month" />

                        <CartesianGrid 
                            strokeDasharray="5 5"
                            stroke="#646464"
                        />

                        <Tooltip/>
                        <Legend/>
                        
                        <Area
                            type="monotone"
                            name={langDict.stats.legend}
                            stroke="#0b8f52"
                            fill="#4ec88f"
                            dataKey="count" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

AreaChartComponent.propTypes = {
    dateStartProp: PropTypes.string,
    dateEndProp: PropTypes.string,
}

export default AreaChartComponent;

