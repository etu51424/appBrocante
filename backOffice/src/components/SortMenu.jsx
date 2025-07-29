import React, { useState, useRef, useEffect } from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const SortMenu = ({ onSortAsc, onSortDesc }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const langDict = useSelector(state => state.language.langDict);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sort-menu-wrapper" ref={menuRef}>
            <button onClick={() => setOpen(!open)}>⇅</button>
            {open && (
                <div className="sort-menu">
                    <div onClick={() => { onSortAsc(); setOpen(false); }}>
                        {langDict.sortMenuAsc}
                    </div>
                    <div onClick={() => { onSortDesc(); setOpen(false); }}>
                        {langDict.sortMenuDesc}
                    </div>
                </div>
            )}
        </div>
    );
}

SortMenu.propTypes = {
    onSortAsc: PropTypes.func.isRequired,
    onSortDesc: PropTypes.func.isRequired,
}

export default SortMenu;
