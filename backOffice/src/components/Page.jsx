import React, { useEffect, useState } from "react";
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js"; 
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
            
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut
    const [elements, setElements] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // affiche à l'useur un "écran" de chargement

    //obtenir les noms des propriétés d'1 article random rpzant tous les articles plutot que les valeurs
    // tableHeader et tableBody font le rendu de la table et du body
    const renderTableHeader = () => {
        return Object.keys(
            elements[0]).map(
                (keyName) => (
                    <th key={`${keyName}`}>
                        {
                            langDict.tables[elementClassNameSingular].columns[keyName]
                        }
                    </th>
            )
        );
    }

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
                        <div></div>
                        <h1>{langDict.tables[elementClassNameSingular].title + 's'}</h1>
                        {paginationArrows}
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

