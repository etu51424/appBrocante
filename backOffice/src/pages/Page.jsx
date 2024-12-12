import React, { useEffect, useState } from "react";
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js"; 

// reçoit en arguments les élements (et fonctions) qui vont changer en fonction des pages
function Page({ fetchElementsData, renderTableBody, title, elementClassNameSingular, elementClassNamePlural}) {

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
        console.log("Dans useEffect");

        const fetchAllElements = async () => {
            try {
                const elementsData = await fetchElementsData();
                console.log("Données récupérées :", elementsData);
                setElements(elementsData); //Maintenant, le reste de la page pourrait utiliser le tableau elements
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllElements();
    }, [fetchElementsData]);

    if (isLoading) {
        return <p>Chargement des données...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }
    
    if (elements.length === 0) {
        return <p>Aucune donnée n'est présente dans cette table.</p>;
    }

    return (
        <div className={elementClassNamePlural}>
            <h1>{title}</h1>
            {/* afficher l'erreur en rouge si'l yen a une*/}

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
    );
}

export default Page;

