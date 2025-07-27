import { React, useState, useEffect } from "react";
import Page from "../components/Page.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import {getAllFleaMarketsByTitle, getFleaMarketsData} from "../fetchAPI/CRUD/fleaMarkets.js";
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
import AddElementButtonForm from "../components/AddElementButtonForm.jsx";
import EditElementButtonForm from "../components/EditElementButtonForm.jsx";

function FleaMarkets() {

    const title = "Flea Markets";
    const elementClassNameSingular = "flea_market";
    const elementClassNamePlural = "fleaMarkets";
    const tableType = TableTypes.FLEA_MARKETS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const langDict = useSelector(state => state.language.langDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getFleaMarkets = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() =>
                getFleaMarketsData(limit, currentPage)
            );

            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error);
            toast.error(err);
        }

        setIsLoading(false);
    };

    const seatchFleaMarketsByTitle = async (title) => {
        setIsLoading(true);
        setError(null);
        try{
            const data = await getAllFleaMarketsByTitle(limit, currentPage, title)
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
                await seatchFleaMarketsByTitle(searchQuery);
            } else {
                await getFleaMarkets();
            }
        };

        fetchData();
    }, [currentPage, limit, searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage === currentPage) return;
        setCurrentPage(newPage);
    };

    const renderTableBody = (fleaMarket) => {
        fleaMarket.is_charity_word = fleaMarket.is_charity ? langDict.yes : langDict.no;

        return (
            <tr key={fleaMarket.id}>
                <td>{fleaMarket.id}</td>
                <td>{fleaMarket.address}</td>
                <td><ConvertedDate longFormatDate={fleaMarket.date_start}/></td>
                <td><ConvertedDate longFormatDate={fleaMarket.date_end}/></td>
                <td>{fleaMarket.title}</td>
                <td>{fleaMarket.theme}</td>
                <td>{fleaMarket.is_charity_word}</td>
                <td>{fleaMarket.average_rating}</td>
                <td>{fleaMarket.review_count}</td>
                <td>
                    <EditElementButtonForm
                        tableType={tableType}
                        initialData={fleaMarket}
                        onSuccess={getFleaMarkets}
                    />
                </td>
                <td>
                    <DeleteButton elementId={fleaMarket.id} tableType={tableType} onSuccess={getFleaMarkets}/>
                </td>
            </tr>
        );
    };

    return (
        <div>
            <RowsPerPageSelector limit={limit} setLimit={setLimit}/>
            <AddElementButtonForm
                tableType={tableType}
                onSuccess={getFleaMarkets}
            />
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
                        <SearchBar onSearch={handleSearch} tableType={tableType}/>
                    </div>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default FleaMarkets;
