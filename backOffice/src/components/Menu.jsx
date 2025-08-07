import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import "../css/Menu.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { AuthContext } from '../context/AuthContext.js';
import { useSelector } from 'react-redux';

const Menu = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const langDict = useSelector(state => state.language.langDict);

    const SidebarData = [
    {
        title: langDict.home,
        path: '/home',
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
        isLoggedIn &&
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