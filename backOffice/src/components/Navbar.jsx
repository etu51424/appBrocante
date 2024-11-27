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
    {/*rend TOUS les icones blancs simultanément*/}
      <IconContext.Provider value={{color: 'brown'}}>
        <div className="navbar">
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar/*à améliorer plus tard en dernier, non fonctionnel, à retirer si jamais fait*/}/> 
            </Link>
            <HeaderContent/>
        </div>
        {/*si l'useur a cliqué sur la sidebar, l'activer, sinon la déplier*/}
        <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
            <li className="navbar-toggle">
              <Link to="#" className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
