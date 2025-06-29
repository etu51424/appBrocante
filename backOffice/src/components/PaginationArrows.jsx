import React from "react";
import * as IoIcons from "react-icons/io";
import { useSelector } from "react-redux";


function PaginationArrows({ currentPage, noMoreData, onPageChange }) {
    const langDict = useSelector(state => state.language.langDict);

    const handleNext = () => {
        if (!noMoreData) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    return (
        <div className="pagination-arrows">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                <IoIcons.IoIosArrowBack />
            </button>
            {langDict?.page} {currentPage}
            <button onClick={handleNext} disabled={noMoreData}>
                <IoIcons.IoIosArrowForward />
            </button>
        </div>
    );
}

export default PaginationArrows;
