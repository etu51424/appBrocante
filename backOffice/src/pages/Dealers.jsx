import { React, useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider.jsx";

import Page from "../components/Page.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import frDict from "../translations/fr/fr.js";
import { getDealersData } from "../fetchAPI/CRUD/dealers.js";
import languageDictProvider from "../utils/language.js";
import { exponentialRetry } from "../fetchAPI/exponentialRetry.js";
import { TableTypes } from "../utils/Defs.js";
import DeleteButton from "../components/DeleteButton.jsx";

// ✅ composants de pagination réutilisables
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";

function Dealers() {
    const { token } = useAuth();

    const title = "Dealers";
    const elementClassNameSingular = "dealer";
    const elementClassNamePlural = "dealers";
    const tableType = TableTypes.DEALERS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const [langDict, setLangDict] = useState(frDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDealers = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() =>
                getDealersData(token, limit, currentPage)
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
        getDealers();
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

    const renderTableBody = (dealer) => {
        return (
            <tr key={dealer.person_id}>
                <td>{dealer.person_id}</td>
                <td>{dealer.type}</td>
                <td>{dealer.description}</td>
                <td><ConvertedDate longFormatDate={dealer.signup_date} /></td>
                <td>{dealer.average_rating}</td>
                <td>{dealer.review_count}</td>
                <td>
                    <DeleteButton elementId={dealer.person_id} type={tableType} onSuccess={getDealers} />
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

export default Dealers;
