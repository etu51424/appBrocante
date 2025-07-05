import { React, useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider.jsx";

import Page from "../components/Page.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import * as IoIcons from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getArticlesData } from "../fetchAPI/CRUD/articles.js";
import { exponentialRetry } from "../fetchAPI/utils/exponentialRetry.js";
import DeleteButton from "../components/DeleteButton.jsx";
import { TableTypes } from "../utils/Defs.js";
import PaginationInput from "../components/PaginationInput.jsx";
import PaginationArrows from "../components/PaginationArrows.jsx";
import RowsPerPageSelector from "../components/RowsPerPageSelector.jsx";


function Articles() {
    const { token } = useAuth();

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

    const getArticles = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() => getArticlesData(token, limit, currentPage));

            setData(data);
            setIsThereMoreData(noMoreData);
        } catch (err) {
            setError(langDict.error);
        }

        setIsLoading(false);
    };

    const getElementsData = async () => {
        return data;
    };

    useEffect(() => {
        getArticles();
    }, [currentPage, limit]);

    // Nouveau callback pour récupérer le changement de page depuis PaginationArrows
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderTableBody = (article) => {
        return (
            <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.dealer_id}</td>
                <td>{article.title}</td>
                <td>{article.description}</td>
                <td><ConvertedDate longFormatDate={article.entry_date} /></td>
                <td>{article.cost + '€'}</td>
                <td>{article.condition}</td>
                <td><DeleteButton elementId={article.id} type={tableType} onSuccess={getArticles} /></td>
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
                    <>
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
                    </>
                }
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default Articles;
