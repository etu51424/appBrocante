import { React, useState, useEffect } from "react";
import Page from "../components/Page.jsx";
import { useSelector } from 'react-redux';
import {getAllSlotsByFleaMarket, getSlotsData} from "../fetchAPI/CRUD/slots.js";
import { TableTypes } from "../utils/Defs.js";
import DeleteButton from "../components/DeleteButton.jsx";

// Import des composants pagination réutilisables
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";
import toast from "react-hot-toast";
import {getAllFleaMarketsByTitle} from "../fetchAPI/CRUD/fleaMarkets.js";
import SearchBar from "../components/SearchBar.jsx";

function Slots() {

    const title = "Slots";
    const elementClassNameSingular = "slot";
    const elementClassNamePlural = "slots";
    const tableType = TableTypes.SLOTS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const langDict = useSelector(state => state.language.langDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getSlots = async () => {
        setIsLoading(true);
        setError(false);
        try {
            const { data, noMoreData } = await getSlotsData(limit, currentPage);
            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error);
            toast.error(err);
        }
        setIsLoading(false);
    };

    const searchAllSlotsByFleaMarketId = async (fleaMarketId) =>{
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllSlotsByFleaMarket(limit, currentPage, fleaMarketId);
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
        let fleaMarketId;
        try {
            fleaMarketId = parseInt(query);
        } catch (e) {
            console.error(`Error while casting research type : ${query} , ${e.message}`);
            toast.error(`Error while casting research type : ${query} , ${e.message}`);
        }
        setSearchQuery(fleaMarketId);
        setCurrentPage(1);
    };

    // Charge les données à chaque changement de page, limite ou recherche
    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                await searchAllSlotsByFleaMarketId(searchQuery);
            } else {
                await getSlots();
            }
        };

        fetchData();
    }, [currentPage, limit, searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage === currentPage) return;
        setCurrentPage(newPage);
    };

    const renderTableBody = (slot) => (
        <tr key={slot.id}>
            <td>{slot.id}</td>
            <td>{slot.flea_market_id}</td>
            <td>{slot.is_available.toString()}</td>
            <td>{slot.area}</td>
            <td>
                <DeleteButton elementId={slot.id} type={tableType} onSuccess={getSlots} />
            </td>
        </tr>
    );

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
                        <SearchBar onSearch={handleSearch} tableType={TableTypes.SLOTS}/>
                    </div>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default Slots;
