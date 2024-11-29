import React from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import "./Menu.css";

function Menu() {
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