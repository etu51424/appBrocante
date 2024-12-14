import { React } from "react";
import Page from "./Page.jsx";
import { articlesData } from "../fetchAPI/CRUD/articles.js";

function Articles() {

    const title = "Articles";
    const elementClassNameSingular = "article";
    const elementClassNamePlural = "articles";

    // async car du pov de Page.jsx, fetcher articlesData reste une opération I/O
    const fetchArticles = async () => {
        return articlesData;
    };

// articles.map(article => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
    const renderTableBody = (article) => {
        return (
            <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.dealer_id}</td>
                <td>{article.title}</td>
                <td>{article.description}</td>
                <td>{article.entry_date}</td>
                <td>{article.cost+'€'}</td>
                <td>{article.condition}</td>
            </tr>
        );
    }

    // renvoit le rendu d'une page auquel on passe les parties personnalisées via props (paramètres)
    return <Page 
        fetchElementsData={fetchArticles}
        renderTableBody={renderTableBody}
        title={title}
        elementClassNameSingular={elementClassNameSingular}
        elementClassNamePlural={elementClassNamePlural}
    />;
}

export default Articles;





    /*
    const articles = [
        {
            id: 2,
            dealer_id: 3,
            title: "armoire acajou",
            description: "dressée en bois d'acajou néerlandais",
            entry_date: "2022-09-15",
            cost: 9.99,
            condition: "Les charnières sont rouillées"
        },
        {
            id: 3,
            dealer_id: 6,
            title: "pot à lierre",
            description: "sobre et moderne",
            entry_date: "2024-07-15",
            cost: 109.99,
            condition: "bon état"
        },
        {
            id: 4,
            dealer_id: 3,
            title: "un hélicoptère en verre",
            description: "Fabriquée en france dans les années 70s",
            entry_date: "2021-09-15",
            cost: 78.95,
            condition: "attention, fragile"
        },
        {
            id: 4,
            dealer_id: 3,
            title: "terrarium pour geckos",
            description: "Conçu en thailande. En plexiglass",
            entry_date: "2020-03-30",
            cost: 128.85,
            condition: "peu de fissures"
        }
    ];*/