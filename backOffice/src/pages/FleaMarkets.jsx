import { React, useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider.jsx";

import Page from "../components/Page.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import { getFleaMarketsData } from "../fetchAPI/CRUD/fleaMarkets.js";
import frDict from "../translations/fr/fr.js";
import languageDictProvider from "../utils/language.js";
import { exponentialRetry } from "../fetchAPI/exponentialRetry.js";
import { TableTypes } from "../utils/Defs.js";
import DeleteButton from "../components/DeleteButton.jsx";

// Import des composants pagination réutilisables
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";

function FleaMarkets() {
    const { token } = useAuth();

    const title = "Flea Markets";
    const elementClassNameSingular = "flea_market";
    const elementClassNamePlural = "fleaMarkets";
    const tableType = TableTypes.FLEA_MARKETS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const [langDict, setLangDict] = useState(frDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getFleaMarkets = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() =>
                getFleaMarketsData(token, limit, currentPage)
            );

            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error);
        }

        setIsLoading(false);
    };

    const getElementsData = async () => data;

    useEffect(() => {
        getFleaMarkets();
    }, [currentPage, limit]);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage === currentPage) return;
        setCurrentPage(newPage);
    };

    const changeLanguage = () => {
        languageDictProvider(window.language);
    };

    useEffect(() => {
        const handleLanguageChange = () => {
            changeLanguage();
        };

        window.addEventListener("langchange", handleLanguageChange);
        return () => {
            window.removeEventListener("langchange", handleLanguageChange);
        };
    }, []);

    const renderTableBody = (fleaMarket) => {
        fleaMarket.is_charity_word = fleaMarket.is_charity ? langDict.yes : langDict.no;

        return (
            <tr key={fleaMarket.id}>
                <td>{fleaMarket.id}</td>
                <td>{fleaMarket.address}</td>
                <td><ConvertedDate longFormatDate={fleaMarket.date_start} /></td>
                <td><ConvertedDate longFormatDate={fleaMarket.date_end} /></td>
                <td>{fleaMarket.title}</td>
                <td>{fleaMarket.theme}</td>
                <td>{fleaMarket.is_charity_word}</td>
                <td>{fleaMarket.average_rating}</td>
                <td>{fleaMarket.review_count}</td>
                <td>
                    <DeleteButton elementId={fleaMarket.id} type={tableType} onSuccess={getFleaMarkets} />
                </td>
            </tr>
        );
    };

    return (
        <div>
            <RowsPerPageSelector limit={limit} setLimit={setLimit} />
            <Page
                getElementsData={getElementsData}
                renderTableBody={renderTableBody}
                title={title}
                elementClassNameSingular={elementClassNameSingular}
                elementClassNamePlural={elementClassNamePlural}
                paginationArrows={
                    <div className="flex items-center gap-2">
                        <PaginationArrows
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            noMoreData={noMoreData}
                        />
                        <PaginationInput
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default FleaMarkets;
