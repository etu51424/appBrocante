import { React, useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider.jsx";

import Page from "../components/Page.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import { useSelector } from 'react-redux';
import {getAllDealersByType, getDealersData} from "../fetchAPI/CRUD/dealers.js";
import { exponentialRetry } from "../fetchAPI/utils/exponentialRetry.js";
import { TableTypes } from "../utils/Defs.js";
import DeleteButton from "../components/DeleteButton.jsx";

// ✅ composants de pagination réutilisables
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar.jsx";

function Dealers() {

    const title = "Dealers";
    const elementClassNameSingular = "dealer";
    const elementClassNamePlural = "dealers";
    const tableType = TableTypes.DEALERS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const langDict = useSelector(state => state.language.langDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Recherche courante

    const getDealers = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() =>
                getDealersData(limit, currentPage)
            );

            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error);
            toast.error(err);
        }

        setIsLoading(false);
    };

    const searchDealersByTitle = async (type) => {
        setIsLoading(true);
        setError(null);
        try{
            const data = await getAllDealersByType(limit, currentPage, type);
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
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // Charge les données à chaque changement de page, limite ou recherche
    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                await searchDealersByTitle(searchQuery);
            } else {
                await getDealers();
            }
        };

        fetchData();
    }, [currentPage, limit, searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage === currentPage) return;
        setCurrentPage(newPage);
    };

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
                        <PaginationInput
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                        <SearchBar onSearch={handleSearch} />
                    </div>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default Dealers;
