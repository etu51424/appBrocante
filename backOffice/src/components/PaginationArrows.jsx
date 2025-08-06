import React from "react";
import * as IoIcons from "react-icons/io";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";


const PaginationArrows = ({ currentPage, noMoreData, onPageChange }) => {
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
        <>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                <IoIcons.IoIosArrowBack />
            </button>
            {langDict?.page} {currentPage}
            <button onClick={handleNext} disabled={noMoreData}>
                <IoIcons.IoIosArrowForward />
            </button>
        </>
    );
}

PaginationArrows.propTypes = {
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    noMoreData: PropTypes.bool.isRequired,
}

export default PaginationArrows;
