import { React, useState, useEffect } from "react";
import Page from "../components/Page.jsx";
import { useAuth } from "../components/AuthProvider.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import frDict from "../translations/fr/fr.js";
import { getUsersData } from "../fetchAPI/CRUD/users.js";
import languageDictProvider from "../utils/language.js";
import { exponentialRetry } from "../fetchAPI/exponentialRetry.js";
import DeleteButton from "../components/DeleteButton.jsx";
import { TableTypes } from "../utils/Defs.js";
import BanUserButton from "../components/BanUserButton.jsx";
import PaginationArrows from "../components/PaginationArrows.jsx";
import PaginationInput from "../components/PaginationInput.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";

function Users() {
    const { token } = useAuth();

    const title = "Users";
    const elementClassNameSingular = "user";
    const elementClassNamePlural = "users";
    const tableType = TableTypes.USERS;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const [langDict, setLangDict] = useState(frDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() =>
                getUsersData(token, limit, currentPage)
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
        getUsers();
    }, [currentPage, limit]);

    // Gestion centralisée du changement de page
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
                <td><ConvertedDate longFormatDate={user.last_edit_date} /></td>
                <td>{user.profile_picture}</td>
                <td>{isUserAdminText}</td>
                <td>{isUserTimedOutText}</td>
                <td>{user.recovery_code}</td>
                <td><DeleteButton elementId={user.id} type={tableType} onSuccess={getUsers} /></td>
                <td><BanUserButton elementId={user.id} isBlocked={user.is_timed_out} onSuccess={getUsers} /></td>
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

export default Users;
