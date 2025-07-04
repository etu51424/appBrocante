import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "../css/Page.css";

// reçoit en arguments les élements (et fonctions) qui vont changer en fonction des pages
function Page({
        getElementsData,
        renderTableBody,
        title,
        elementClassNameSingular,
        elementClassNamePlural,
        paginationArrows,
    }) {

    const storeLangDict = useSelector(state => state.language.langDict);
    const langDict = JSON.parse(JSON.stringify(storeLangDict));
    const [elements, setElements] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // affiche à l'useur un "écran" de chargement

    //obtenir les noms des propriétés d'1 article random rpzant tous les articles plutot que les valeurs
    // tableHeader et tableBody font le rendu de la table et du body

    // La méthode va aller prendre les informations depuis le dictionnaire plutot que de le faire dynamiquement
    const renderTableHeader = () => {
        console.log("elementClassNameSingular :" + elementClassNameSingular);
        console.log("langDict.tables[elementClassNameSingular] :" + JSON.stringify(langDict.tables[elementClassNameSingular]));
        let columns = langDict.tables[elementClassNameSingular].columns;

        console.log("langDict en Page.jsx" + JSON.stringify(langDict));
        //console.log(langDict.tables[elementClassNameSingular].columns.ban);
        columns.delete = langDict.deleteButton;

        // Ajouter les éléments spécifiques à la table user
        if (elementClassNameSingular === "user") {
            columns.ban = langDict.banButton;
            columns.promote = langDict.promoteButton;
        }

        return Object.entries(columns).map(([key, label]) => (
            <th key={key}>{label}</th>
        ));
    };

    useEffect(() => {

        const getAllElements = async () => {
            try {
                const elementsData = await getElementsData();
                setElements(elementsData); //Maintenant, le reste de la page pourrait utiliser le tableau elements
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getAllElements();
    }, [getElementsData]);

    if (isLoading) {
        return <p>{langDict.loading}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Verif que elements n'est pas vide. Sans ça, le tableau refuse de s'afficher car elements n'a pas été check
    if (elements.length === 0) {
        return <p>{langDict.table_no_data}</p>;
    }

    return (
        <>
            <div className="page">
                <div className={elementClassNamePlural}>
                    <div className="page-header">
                    {paginationArrows}
                    <h1>{langDict.tables[elementClassNameSingular].title + 's'}</h1>
                    <div></div>
                    </div>
                    <div className="rows-table">
                        <table>
                            <thead key="head">
                                <tr>{renderTableHeader()}</tr>
                            </thead>
                            <tbody>
                                {/*obtenir les noms des propriétés d'1 article random rpzant tous les articles plutot que les valeurs*/}
                                {/*tableHeader et tableBody font le rendu de la table et du body*/}
                                {elements.map(renderTableBody)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;

