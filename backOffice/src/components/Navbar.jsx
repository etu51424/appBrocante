import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import "./Navbar.css";
import { IconContext } from 'react-icons';

function Navbar() {
  return (
    <>
        <div className="navbar">
          <div className="headerContent">
              <img src="/logo.png" alt="logo" />
              <h2>AppBrocante - Menu Administrateur</h2>
            </div>
        </div>
    </>
  )
}

export default Navbar



/*

import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import "./Navbar.css";
import { IconContext } from 'react-icons';
import HeaderContent from './HeaderContent';

function Navbar() {
  const [sidebar, setSidebar] = useState(false)

  // ce useState est un toggle; updatant la sidebar par son opposé (ouvert si fermé, fermé si ouvert)
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
    
    <IconContext.Provider value={{color: 'brown'}}>
    <div className="navbar">
        <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar}/> 
        </Link>
        <HeaderContent/>
    </div>
    
    <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
      <ul className='nav-menu-items' >
        <li className="navbar-toggle">
          <Link to="#" className='menu-bars'>
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
        {}
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
    </nav>
  </IconContext.Provider>
</>
)
}

export default Navbar

*/