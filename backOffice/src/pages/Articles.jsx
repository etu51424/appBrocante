import React, { useEffect, useState } from "react";
import { createUser, login } from "../api/authService";
import { fetchArticles } from "../api/articleService";

import { SidebarData } from '../components/SidebarData';

function Articles() {

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // affiche à l'useur simplement le chargement
    const adminForConnection = {
        name: "AAA",
        email: "aaa@gmail.com",
        password: "password",
    };
    console.log("Avant useEffect");

    // cant convert to undefined object car the useEffect is not entered
    useEffect(() => {
        console.log("Dans useEffect");
        const fetchAllArticles = async () => {
            try {
                //1. Créer un utilisateur
                const userResponse = await createUser(adminForConnection);
                console.log("User créé : ", userResponse);

                const loginBody = {
                    "personId":userResponse.id,
                    "password":adminForConnection.password
                };
                console.log("loginBody: " + userResponse.id);
                console.log("password:" + adminForConnection.password);

                //2. Login et obtenir le token
                const loginResponse = await login(loginBody);
                const token = loginResponse.token;
                console.log("Token obtenu : ", token);

                // 3. Récupérer les articles
                const articles = await fetchArticles(token);
                // articles changeront avec l'affichage
                setArticles(articles);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        fetchAllArticles();
    }, []);

    if (isLoading) {
        return <p>Chargement des articles...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }

    if (articles.length === 0) {
        return <p>Aucun article disponible.</p>;
    }

    return (
        <div className='articles'>
            <h1>Articles</h1>
            {/* afficher l'erreur en rouge si'l yen a une*/}

            <table>
                <tr>
                    {/*obtenir les noms des propriétés d'1 article random rpzant tous les articles plutot que les valeurs*/}
                    {
                        Object.keys(articles[0]).map(
                            keyName =>
                                <th>{keyName}</th>
                            )
                    }
                </tr>
            {articles.map(article => 
                <tr>
                    <td>{article.id}</td>
                    <td>{article.dealer_id}</td>
                    <td>{article.title}</td>
                    <td>{article.description}</td>
                    <td>{article.entry_date}</td>
                    <td>{article.cost+'€'}</td>
                    <td>{article.condition}</td>
                </tr>
            )}
            </table>
        </div>
    );
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