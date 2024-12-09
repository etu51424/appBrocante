import React, { useEffect, useState } from "react";
import { createUser, login } from "../api/authService";
import { fetchArticles } from "../api/articleService";

import { SidebarData } from '../components/SidebarData';

function Articles() {

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // affiche à l'useur simplement le chargement
    
    
    const adminForConnection = {
        "name":"Corentin",
        "email":"corentindemr@gmail.com",
        "password":"pw",
    };
    console.log("Avant useEffect");

    // cant convert to undefined object car the useEffect is not entered
    useEffect(() => {
        console.log("Dans useEffect");

        const fetchAllArticles = async () => {
            try {
                let userResponse;
                try {
                    const response = await fetch("http://localhost:3001/api/v1/person/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body:  JSON.stringify(adminForConnection),
                    });

                    if (response.status == 500) {
                        console.log("L'utilisateur existe deja. Login directement.");
                    } else if (!response.ok) {
                        throw new Error(`Echec à créer l'useur: ${response.statusText}`);
                    } else {
                        userResponse = await response.json();
                        console.log("Useur créé avec succès :", userResponse);
                    }
                } catch (err) {
                    console.error("Erreur durant la création de l'utilsiateur", err);
                }

                const loginBody = {
                    personId: userResponse?.id || 4, //4 par défaut si l'utilisateur existe déjà
                    password: adminForConnection.password
                }

                const loginResponse = await fetch("http://localhost:3001/api/v1/client/login", {
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(loginBody),
                });

                if (!loginResponse.ok) {
                    throw new Error(`Login raté : ${loginResponse.statusText}`);
                }

                const { token } = await loginResponse.json();
                console.log("Login réussi. Token reçu :", token);

                // Feth articles
                const articlesResponse = await fetch("http://localhost:3001/api/v1/article/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                
                if (!articlesResponse.ok) {
                    throw new Error(`Failed to fetch articles: ${articlesResponse.statusText}`);
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