import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "../css/Menu.css";
import enDict from "../translations/en/en.js";
import frDict from "../translations/fr/fr.js"; 
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

function Menu() {
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
        title: langDict.tables.article.title + 's',
        path: '/article',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: langDict.tables.flea_market.title + 's',
        path: '/flea_market',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: langDict.tables.user.title + 's',
        path: '/user',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: langDict.tables.dealer.title + 's',
        path: '/dealer',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: langDict.tables.interest.title + 's',
        path: '/interest',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
    {
        title: langDict.tables.slot.title + 's',
        path: '/slot',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: langDict.stats.simple_title,
        path: '/stats',
        icon: <IoIcons.IoIosStats  />,
        cName: 'nav-text'
    }
    ];

    return (
        <>
        <div className='menu'>
            <ul className='menu-items' >
                {/*map à travers le tableau SidebarData, chaq elem étant un sidebar elem*/}
                {SidebarData.map((item, index) => {
                    return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

export default Menu