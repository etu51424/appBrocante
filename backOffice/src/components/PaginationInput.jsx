import React, { useState, useEffect } from "react";
import languageDictProvider from "../utils/language.js";

let lang = languageDictProvider(window.language);

function PaginationInput({ currentPage, onPageChange }) {
    const [inputValue, setInputValue] = useState(currentPage);

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
                {lang?.GoToPage} :
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

export default PaginationInput;
