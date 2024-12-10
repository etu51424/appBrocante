import React, { useEffect, useState } from "react";
import { createUser, login } from "../api/authService";
import { fetchArticles } from "../api/articleService";

import { SidebarData } from '../components/SidebarData';

function Articles() {

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // affiche à l'useur un "écran" de chargement
    
    console.log("Avant useEffect");

    useEffect(() => {
        console.log("Dans useEffect");

        const fetchAllArticles = async () => {
            try {
                const loginBody = {
                    personId: 1,
                    password: "pw"
                }

                const loginResponse = await fetch("http://localhost:3001/api/v1/client/login", {
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(loginBody),
                });

                // Normalement, le token devrait être un json.
                // Pour éviter de modifier le token pour qu'il soit renvoyé en json côté server, j'accepte de l'interpreter en texte
                const token = await loginResponse.text();
                console.log("Login réussi. Token reçu :", token);

                if (!loginResponse.ok) {
                    throw new Error(`Login raté: ${errorText}`);
                }

                // construire la requete pour recup les articles et la
                const articlesResponse = await fetch("http://localhost:3001/api/v1/article/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                
                if (!articlesResponse.ok) {
                    throw new Error(`Regarde pop statusText car pas réussi à récup les articles: ${articlesResponse.statusText}`);
                }

                const articlesData = await articlesResponse.json();
                setArticles(articlesData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
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
                <thead>
                    <tr>
                        {/*obtenir les noms des propriétés d'1 article random rpzant tous les articles plutot que les valeurs*/}
                        {
                            Object.keys(articles[0]).map(
                                keyName =>
                                    <th>{keyName}</th>
                                )
                        }
                        
                    </tr>
                </thead>
            {articles.map(article => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
                <tbody>
                    <tr key={article.id}>
                        <td>{article.id}</td>
                        <td>{article.dealer_id}</td>
                        <td>{article.title}</td>
                        <td>{article.description}</td>
                        <td>{article.entry_date}</td>
                        <td>{article.cost+'€'}</td>
                        <td>{article.condition}</td>
                    </tr>
                </tbody>
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