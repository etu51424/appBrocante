import { React } from "react";
import Page from "./Page.jsx";
import { slotsData } from "../fetchAPI/CRUD/slots.js";

function Slots() {

    const title = "Slots";
    const elementClassNameSingular = "slot";
    const elementClassNamePlural = "slots";

    // async car du pov de Page.jsx, fetcher data reste une opération I/O
    const fetchSlots = async () => {
        return slotsData;
    };

// dataElem.map(dataElem => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
    const renderTableBody = (slot) => {
        return (
            <tr key={slot.id}>
                <td>{slot.flea_market_id}</td>
                <td>{slot.is_available}</td>
                <td>{slot.area}</td>
            </tr>
        );
    }

    // renvoit le rendu d'une page auquel on passe les parties personnalisées via props (paramètres)
    return <Page 
        fetchElementsData={fetchSlots}
        renderTableBody={renderTableBody}
        title={title}
        elementClassNameSingular={elementClassNameSingular}
        elementClassNamePlural={elementClassNamePlural}
    />;
}

export default Slots;

