import { React, useState, useEffect } from "react";
import Page from "../components/Page.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import { useSelector } from 'react-redux';
import {getAllUsersByUsername, getUsersData} from "../fetchAPI/CRUD/users.js";
import { exponentialRetry } from "../fetchAPI/utils/exponentialRetry.js";
import DeleteButton from "../components/DeleteButton.jsx";
import { TableTypes } from "../utils/Defs.js";
import BanUserButton from "../components/BanUserButton.jsx";
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";
import PromoteUserButton from "../components/PromoteUserButton.jsx";
import toast from "react-hot-toast";
import ProfilePicturePreview from "../components/ProfilePicturePreview.jsx";
import SearchBar from "../components/SearchBar.jsx";
import AddElementButtonForm from "../components/AddElementButtonForm.jsx";
import EditElementButtonForm from "../components/EditElementButtonForm.jsx";


function Users() {

    const title = "Users";
    const elementClassNameSingular = "user";
    const elementClassNamePlural = "users";
    const tableType = TableTypes.USERS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const langDict = useSelector(state => state.language.langDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getUsers = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await getUsersData(limit, currentPage);
            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error);
            toast.error(err);
        }
        setIsLoading(false);
    };

    const searchUsersByUsername = async (username) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllUsersByUsername(limit, currentPage, username);
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
                await searchUsersByUsername(searchQuery);
            } else {
                await getUsers();
            }
        };

        fetchData();
    }, [currentPage, limit, searchQuery]);

    // Gestion centralisée du changement de page
    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        if (newPage === currentPage) return;
        setCurrentPage(newPage);
    };

    const renderTableBody = (user) => {
        const isUserAdminText = user.is_admin ? langDict.yes : langDict.no;
        const isUserTimedOutText = user.is_timed_out ? langDict.yes : langDict.no;

        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.address}</td>
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td><ConvertedDate longFormatDate={user.last_edit_date}/></td>
                <td><ProfilePicturePreview userId={user.id}/></td>
                <td>{isUserAdminText}</td>
                <td>{isUserTimedOutText}</td>
                <td>{user.recovery_code}</td>
                <td><EditElementButtonForm tableType={TableTypes.USERS} initialData={user} onSuccess={getUsers}/></td>
                <td><DeleteButton elementId={user.id} type={tableType} onSuccess={getUsers}/></td>
                <td><BanUserButton elementId={user.id} isBlocked={user.is_timed_out} onSuccess={getUsers}/></td>
                <td><PromoteUserButton userId={user.id} isAdmin={user.is_admin} onSuccess={getUsers}/></td>
            </tr>
        );
    };

    return (
        <div>
            <RowsPerPageSelector limit={limit} setLimit={setLimit}/>
            <AddElementButtonForm
                tableType={TableTypes.USERS}
                onSuccess={getUsers}
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
                        <PaginationInput currentPage={currentPage} onPageChange={handlePageChange} />
                        <SearchBar onSearch={handleSearch} tableType={TableTypes.USERS}/>
                    </div>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default Users;
