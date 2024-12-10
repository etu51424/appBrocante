import React, { useEffect, useState } from "react";

// reçoit en arguments les élements (et fonctions) qui vont changer en fonction des pages
function Page({ fetchElementsData, renderTableHeader, renderTableBody, title, elementClassName}) {

    const [elements, setElements] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // affiche à l'useur un "écran" de chargement
    
    console.log("Avant useEffect");

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
        <div className={elementClassName}>
            <h1>{title}</h1>
            {/* afficher l'erreur en rouge si'l yen a une*/}

            <table>
                <thead key="head">
                    <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>
                    {elements.map(renderTableBody)}
                </tbody>
            </table>
        </div>
    );
}

export default Page;

