import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "../css/Page.css";
import toast from "react-hot-toast";
import SortMenu from "./SortMenu";
import PropTypes from "prop-types"; // Assure-toi que le fichier est à la bonne place


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

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
        const sorted = [...elements].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setElements(sorted);
    };

    const renderTableHeader = () => {
        let columns = { ...langDict.tables[elementClassNameSingular].columns };
        columns.delete = langDict.deleteButton;

        if (elementClassNameSingular === "user") {
            columns.ban = langDict.banButton;
            columns.promote = langDict.promoteButton;
        }

        const unsortableLabels = [
            langDict.deleteButton,
            langDict.banButton,
            langDict.promoteButton
        ];

        return Object.entries(columns).map(([key, label]) => (
            <th key={key}>
                <div className="header-with-sort">
                    {label}
                    {!unsortableLabels.includes(label) && (
                        <SortMenu
                            onSortAsc={() => handleSort(key, "asc")}
                            onSortDesc={() => handleSort(key, "desc")}
                        />
                    )}
                </div>
            </th>
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
                toast.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getAllElements();
    }, [getElementsData]);

    // UseEffect optionnel pour changer le titre de la page web
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);


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

Page.propTypes = {
    getElementsData: PropTypes.func.isRequired,
    renderTableBody: PropTypes.func.isRequired,
    title: PropTypes.string,
    elementClassNameSingular: PropTypes.string.isRequired,
    elementClassNamePlural: PropTypes.string.isRequired,
    paginationArrows: PropTypes.node,
};


export default Page;

