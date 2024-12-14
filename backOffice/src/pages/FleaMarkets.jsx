import { React } from "react";
import Page from "./Page.jsx";
import { fleaMarketsData } from "../fetchAPI/CRUD/fleaMarkets.js";

function FleaMarkets() {

    const title = "Flea Markets";
    const elementClassNameSingular = "flea_market";
    const elementClassNamePlural = "fleaMarkets";

    // async car du pov de Page.jsx, fetcher data reste une opération I/O
    const fetchFleaMarkets = async () => {
        return fleaMarketsData;
    };

// dataElem.map(dataElem => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
    const renderTableBody = (fleaMarket) => {
        return (
            <tr key={fleaMarket.id}>
                <td>{fleaMarket.id}</td>
                <td>{fleaMarket.address}</td>
                <td>{fleaMarket.date_start}</td>
                <td>{fleaMarket.date_end}</td>
                <td>{fleaMarket.title}</td>
                <td>{fleaMarket.theme}</td>
                <td>{fleaMarket.is_charity}</td>
                <td>{fleaMarket.average_rating}</td>
                <td>{fleaMarket.review_count}</td>
            </tr>
        );
    }

    // renvoit le rendu d'une page auquel on passe les parties personnalisées via props (paramètres)
    return <Page 
        fetchElementsData={fetchFleaMarkets}
        renderTableBody={renderTableBody}
        title={title}
        elementClassNameSingular={elementClassNameSingular}
        elementClassNamePlural={elementClassNamePlural}
    />;
}

export default FleaMarkets;

