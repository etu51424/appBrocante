import { React, useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider.jsx";

import Page from "../components/Page.jsx";
import {getAllInterestsWithArgs, getInterestsData} from "../fetchAPI/CRUD/interests.js";
import { useSelector } from 'react-redux';
import { exponentialRetry } from "../fetchAPI/utils/exponentialRetry.js";
import { TableTypes } from "../utils/Defs.js";
import DeleteButton from "../components/DeleteButton.jsx";

// Import des composants pagination réutilisables
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar.jsx";

function Interests() {

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
    const [searchQuery, setSearchQuery] = useState({});

    const getInterests = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await getInterestsData(limit, currentPage);
            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error);
            toast.error(err);
        }
        setIsLoading(false);
    };

    const searchAllInterestsWithArgs = async (args) =>{
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllInterestsWithArgs(limit, currentPage, args);
            if (data) {
                setData(data);
            } else {
                setData([]);
                toast.error("No data received");
            }
        } catch (err) {
            setError(langDict.error + ": " + (err.message || String(err)));
            toast.error(err.message || String(err));
        }
        setIsLoading(false);
    }

    const handleSearch = async (query) => {
        if (query) {
            let fleaMarketId;
            let personId;
            try {
                if (query.fleaMarketId)
                    fleaMarketId = parseInt(query.fleaMarketId);
                if (query.personId)
                    personId = parseInt(query.personId);
            } catch (e) {
                console.error(`Error while casting research type : ${query} , ${e.message}`);
                toast.error(`Error while casting research type : ${query} , ${e.message}`);
            }
            setSearchQuery({fleaMarketId, personId});
        } else {
            setSearchQuery(null);
        }
        setCurrentPage(1);
    };

    // Charge les données à chaque changement de page, limite ou recherche
    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                await searchAllInterestsWithArgs(searchQuery);
            } else {
                await getInterests();
            }
        };

        fetchData();
    }, [currentPage, limit, searchQuery]);

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
                getElementsData={() => data}
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
                        <SearchBar onSearch={handleSearch} tableType={TableTypes.INTERESTS}/>
                    </div>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default Interests;
