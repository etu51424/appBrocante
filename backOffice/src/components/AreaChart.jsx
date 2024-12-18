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
import { getFleaMarketsData } from "../fetchAPI/CRUD/fleaMarkets.js";
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js";

const productSales = [
    {
        name:'Jan',
        product1: 4000, //datakey :nom de la propriété dans le data array
        product2:2400,
    },
    {
        name:'Feb',
        product1:3000,
        product2:2210,
    },
    {
        name:'Mar',
        product1:2000,
        product2:2290,
    },
    {
        name:'Apr',
        product1:2780,
        product2:2000,
    },
    {
        name:'May',
        product1:2893,
        product2:1890,
    },
    {
        name:'Jun',
        product1:1900,
        product2:1790,
    },
];

const AreaChartComponent = () => {
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Limite par défaut
    //prévient si la dernière page de données existe ou non
    const [noMoreData, setIsThereMoreData] = useState(false); 

    // utile pour le debugging
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const getFleaMarkets = async () => {

        try {
            const { data, noMoreData } = await getFleaMarketsData(limit, currentPage);

            setData(data);
            setIsThereMoreData(noMoreData); //pour etre détectable par la pagination

            //console.log(data);
        } catch (err) {
            setError(langDict.error);
        }
    };

    const getData = () => {
        getFleaMarkets(); //obtient les données et les met dans l'obj data
        return data;
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
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={500} height={400} data={productSales}>
                        <YAxis />
                        <XAxis dataKey="name" />

                        <CartesianGrid 
                            strokeDasharray="5 5"
                            stroke="#646464"
                        />

                        <Tooltip/>
                        <Legend/>
                        
                        <Area
                            type="monotone"
                            stroke="#0b8f52"
                            fill="#4ec88f"
                            dataKey="product1" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AreaChartComponent;