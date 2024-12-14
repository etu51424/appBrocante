import { React } from "react";
import Page from "./Page.jsx";
import { interestsData } from "../fetchAPI/CRUD/interests.js";

function Interests() {

    const title = "Interests";
    const elementClassNameSingular = "interest";
    const elementClassNamePlural = "interests";

    // async car du pov de Page.jsx, fetcher data reste une opération I/O
    const fetchInterests = async () => {
        return interestsData;
    };

// dataElem.map(dataElem => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
    const renderTableBody = (interest) => {
        return (
            <tr key={`${interest.person_id}-${interest.flea_market_id}`}>
                <td>{interest.flea_market_id}</td>
                <td>{interest.person_id}</td>
                <td>{interest.is_interested}</td>
                <td>{interest.is_dealer}</td>
                <td>{interest.participation}</td>
            </tr>
        );
    }

    // renvoit le rendu d'une page auquel on passe les parties personnalisées via props (paramètres)
    return <Page 
        fetchElementsData={fetchInterests}
        renderTableBody={renderTableBody}
        title={title}
        elementClassNameSingular={elementClassNameSingular}
        elementClassNamePlural={elementClassNamePlural}
    />;
}

export default Interests;

