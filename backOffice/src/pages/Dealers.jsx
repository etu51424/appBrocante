import { React } from "react";
import Page from "./Page.jsx";
import { dealersData } from "../fetchAPI/CRUD/dealers.js";

function Dealers() {

    const title = "Dealers";
    const elementClassNameSingular = "dealer";
    const elementClassNamePlural = "dealers";

    // async car du pov de Page.jsx, fetcher data reste une opération I/O
    const fetchDealers = async () => {
        return dealersData;
    };

    // dataElem.map(dataElem => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
    const renderTableBody = (dealer) => {
        return (
            <tr key={dealer.person_id}>
                <td>{dealer.person_id}</td>
                <td>{dealer.type}</td>
                <td>{dealer.description}</td>
                <td>{dealer.signup_date}</td>
                <td>{dealer.average_rating}</td>
                <td>{dealer.review_count}</td>
            </tr>
        );
    }

    // renvoit le rendu d'une page auquel on passe les parties personnalisées via props (paramètres)
    return <Page 
        fetchElementsData={fetchDealers}
        renderTableBody={renderTableBody}
        title={title}
        elementClassNameSingular={elementClassNameSingular}
        elementClassNamePlural={elementClassNamePlural}
    />;
}

export default Dealers;

