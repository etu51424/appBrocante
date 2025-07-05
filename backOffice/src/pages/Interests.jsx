import { React, useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider.jsx";

import Page from "../components/Page.jsx";
import { getInterestsData } from "../fetchAPI/CRUD/interests.js";
import { useSelector } from 'react-redux';
import { exponentialRetry } from "../fetchAPI/utils/exponentialRetry.js";
import { TableTypes } from "../utils/Defs.js";
import DeleteButton from "../components/DeleteButton.jsx";

// Import des composants pagination réutilisables
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";

function Interests() {
    const { token } = useAuth();

    const title = "Interests";
    const elementClassNameSingular = "interest";
    const elementClassNamePlural = "interests";
    const tableType = TableTypes.INTERESTS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const langDict = useSelector(state => state.language.langDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getInterests = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() =>
                getInterestsData(token, limit, currentPage)
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
        getInterests();
    }, [currentPage, limit]);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage === currentPage) return;
        setCurrentPage(newPage);
    };

    const renderTableBody = (interest) => {
        interest.is_dealer_word = interest.is_dealer ? langDict.yes : langDict.no;
        interest.is_interested_word = interest.is_interested ? langDict.yes : langDict.no;
        interest.participation_word = interest.participation ? langDict.yes : langDict.no;

        return (
            <tr key={`${interest.person_id}-${interest.flea_market_id}`}>
                <td>{interest.flea_market_id}</td>
                <td>{interest.person_id}</td>
                <td>{interest.is_interested_word}</td>
                <td>{interest.is_dealer_word}</td>
                <td>{interest.participation_word}</td>
                <td>
                    <DeleteButton
                        elementId={{ personId: interest.person_id, fleaMarketId: interest.flea_market_id }}
                        type={tableType}
                        onSuccess={getInterests}
                    />
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
                        <PaginationInput currentPage={currentPage} onPageChange={handlePageChange} />
                    </div>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default Interests;
