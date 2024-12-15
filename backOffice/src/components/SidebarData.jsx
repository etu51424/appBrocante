import { React, useState } from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js"; 

const SidebarData = () => {
    const [langDict, setLangDict] = useState(frDict); //frDict est le dictionnaire par défaut

    const changeLanguage = () => {
        setLangDict(window.language === "fr" ? frDict : enDict);
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


    const SidebarData = [
    {
        title: langDict.home,
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: langDict.article.title,
        path: '/article',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: langDict.flea_market.title,
        path: '/flea_market',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: langDict.person.title,
        path: '/user',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: langDict.dealer.title,
        path: '/dealer',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: langDict.interest.title,
        path: '/interest',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
    {
        title: langDict.slot.title,
        path: '/slot',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    }
    ];

    return (SidebarData);
}

export default SidebarData;