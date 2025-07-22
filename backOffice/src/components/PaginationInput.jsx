import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

function PaginationInput({ currentPage, onPageChange }) {
    const [inputValue, setInputValue] = useState(currentPage);
    const langDict = useSelector(state => state.language.langDict);

    useEffect(() => {
        setInputValue(currentPage); // Réinitialise si Articles force une autre page
    }, [currentPage]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleGo = () => {
        const page = parseInt(inputValue, 10);
        if (!isNaN(page)) {
            onPageChange(page);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleGo();
    };

    return (
        <div className="pagination-input">
            <label>
                {langDict?.GoToPage} :
                <input
                    type="number"
                    min="1"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    style={{ width: "60px" }}
                />
            </label>
            <button onClick={handleGo}>Go</button>
        </div>
    );
}

PaginationInput.propTypes = {
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default PaginationInput;
