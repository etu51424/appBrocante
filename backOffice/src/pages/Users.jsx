import { React, useState, useEffect } from "react";
import Page from "../components/Page.jsx";
import { useAuth } from "../components/AuthProvider.jsx";
import ConvertedDate from "../components/ConvertedDate.jsx";
import * as IoIcons from 'react-icons/io';
import frDict from "../translations/fr/fr.js";
import { getUsersData } from "../fetchAPI/CRUD/users.js";
import languageDictProvider from "../utils/language.js";
import {exponentialRetry} from "../fetchAPI/exponentialRetry.js";

function Users() {
    const { token } = useAuth();

    const title = "Users";
    const elementClassNameSingular = "user";
    const elementClassNamePlural = "users";


    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Limite par défaut
    //prévient si la dernière page de données existe ou non
    const [noMoreData, setIsThereMoreData] = useState(false); 
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut

    // utile pour le debugging
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        setIsLoading(true);
        setError(false);

        try {
            const { data, noMoreData } = await exponentialRetry(() => getUsersData(token, limit, currentPage)) ;

            setData(data);
            setIsThereMoreData(noMoreData); //pour etre détectable par la pagination
        } catch (err) {
            setError(langDict.error);
        }

        setIsLoading(false);
    };

    // obligé de recoder une fonction asynchrone de ce nom car Page.jsx s'attend exactement à une fc à exec
    // et en meme temps, je dois uniquement renvoyer les fleaMarkets qui seront updatés par le useState
    const getElementsData = async () => {
        return data;
    }

    // besoin d'un useEffect ici car ici c'est une interaction avec l'api
    // Utilise getDonnées (càd récup et met à jour les données de la classe)
    useEffect(
        () => {
            getUsers();
        }, [currentPage, limit]
    );

    // reçu par Page.jsx.
    const PaginationArrows = () => {
        return (
            <div className="pagination-arrows">
                {/* cacher le bouton si page actuelle===1 */}
                <button onClick={showPreviousPage} disabled={currentPage === 1}>
                    <IoIcons.IoIosArrowBack /> 
                </button>
                page {currentPage}
                <button onClick={showNextPage} disabled={noMoreData}>
                    <IoIcons.IoIosArrowForward /> 
                </button>
            </div>
        );
    }

    // une fonction est passée à setCurrentPage pour prendre en compte l'état précédent (plutot que juste passer le num de la page)
    const showNextPage = () => {
        setCurrentPage(
            (previousPage) => previousPage + 1
        );
    };

    const showPreviousPage = () => {
        setCurrentPage(
            // retourne la page actuelle (pour le moment encore prevPage) -1, donc la page prec. Sauf si la page actuelle est 1
             (previousPage) => (previousPage == 1 ? previousPage : previousPage - 1)
        );
    };

    const changeLanguage = () => {
        languageDictProvider(window.language);
    }

    // j'utilise un useEffect pour écouter (via un listener) un changement potentiel de window.language
    useEffect(() => {
        // listener
        const handleLanguageChange = () => {
            changeLanguage();
        };

        window.addEventListener("langchange", handleLanguageChange);

        // une fois déclenché, l'écouteur se ferme jusqu'au prochain passage du code ici
        // ...qui arrive bientôt, juste après la maj de la page
        return () => {
            window.removeEventListener("langchange", handleLanguageChange);
        };
    }, []); // aucune dépendance utile ici

// dataElem.map(dataElem => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
    const renderTableBody = (user) => {

        // convertir les booléens en strings appropriés
        user.is_admin = user.is_admin ? langDict.yes : langDict.no;
        user.is_timed_out = user.is_timed_out ? langDict.yes : langDict.no;

        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.address}</td>
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td>
                    <ConvertedDate longFormatDate={user.last_edit_date}/>
                </td>
                <td>{user.password}</td>
                <td>{user.profile_picture}</td>
                <td>{user.is_admin}</td>
                <td>{user.is_timed_out}</td>
                <td>{user.recovery_code}</td>
            </tr>
        );
    }

    // renvoit le rendu d'une page auquel on passe les parties personnalisées via props (paramètres)
    return (
        <div>
            {/*getElementsData reçoit la data updaté par le setFleaMarkets */}
            <Page 
                getElementsData={getElementsData} 
                renderTableBody={renderTableBody}
                title={title}
                elementClassNameSingular={elementClassNameSingular}
                elementClassNamePlural={elementClassNamePlural}
                paginationArrows={<PaginationArrows/>}
            />
            {error && <p>{langDict.error} : {error}</p>}
            {isLoading && <p>{langDict.loading}</p>}
        </div>
    );
}

export default Users;

