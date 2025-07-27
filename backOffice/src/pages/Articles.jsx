import { React, useState, useEffect } from "react";
import Page from "../components/Page.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import { useSelector } from 'react-redux';
import { getAllArticlesByTitle, getArticlesData } from "../fetchAPI/CRUD/articles.js";
import DeleteButton from "../components/DeleteButton.jsx";
import { TableTypes } from "../utils/Defs.js";
import PaginationInput from "../components/PaginationInput.jsx";
import PaginationArrows from "../components/PaginationArrows.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar.jsx";
import AddElementButtonForm from "../components/AddElementButtonForm.jsx";
import EditElementButtonForm from "../components/EditElementButtonForm.jsx";

function Articles() {

    const title = "Articles";
    const elementClassNameSingular = "article";
    const elementClassNamePlural = "articles";
    const tableType = TableTypes.ARTICLE;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [noMoreData, setIsThereMoreData] = useState(false);
    const langDict = useSelector(state => state.language.langDict);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Recherche courante

    const getArticles = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, noMoreData } = await getArticlesData(limit, currentPage);
            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error + ": " + (err.message || String(err)));
            toast.error(err.message || String(err));
        }
        setIsLoading(false);
    };

    const searchAllArticlesByTitle = async (title) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllArticlesByTitle(limit, currentPage, title);
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
    };

    // Met à jour la recherche et reset la page
    const handleSearch = async (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // Charge les données à chaque changement de page, limite ou recherche
    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                await searchAllArticlesByTitle(searchQuery);
            } else {
                await getArticles();
            }
        };

        fetchData();
    }, [currentPage, limit, searchQuery]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderTableBody = (article) => (
        <tr key={article.id}>
            <td>{article.id}</td>
            <td>{article.dealer_id}</td>
            <td>{article.title}</td>
            <td>{article.description}</td>
            <td><ConvertedDate longFormatDate={article.entry_date} /></td>
            <td>{article.cost ? article.cost + '€' : ''}</td>
            <td>{article.condition}</td>
            <td>
                <EditElementButtonForm
                    tableType={tableType}
                    initialData={article}
                    onSuccess={getArticles}
                />
            </td>
            <td>
                <DeleteButton
                    elementId={article.id}
                    tableType={tableType}
                    onSuccess={getArticles}
                />
            </td>
        </tr>
    );

    return (
        <div>
            <RowsPerPageSelector limit={limit} setLimit={setLimit} />
            <AddElementButtonForm
                tableType={tableType}
                onSuccess={getArticles}
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
                            noMoreData={noMoreData}
                            onPageChange={handlePageChange}
                        />
                        <PaginationInput
                            currentPage={currentPage}
                            noMoreData={noMoreData}
                            onPageChange={handlePageChange}
                            maxPage={100}
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

export default Articles;
