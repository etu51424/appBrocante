'use client'
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


// PARTIE SERVICE

const nbOccurencesOfFleaMarketPerMonth = () => {
    //console.log(getFleaMarketsData);
}


// PARTIE VIEW

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
    //execution service
    nbOccurencesOfFleaMarketPerMonth();

    //view
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