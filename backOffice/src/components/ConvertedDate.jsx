import React from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

const ConvertedDate = ({ longFormatDate }) => {
    const langDict = useSelector(state => state.language.langDict);

    const convertToFrDate = (longDate) => {
        // créer une Date js
        const date = new Date(longDate);
        return date.toLocaleDateString(langDict.date_format);
    };
    
    return (
        <>
            {convertToFrDate(longFormatDate)}
        </>
    );
}

ConvertedDate.propTypes = {
    longFormatDate: PropTypes.string,
}

export default ConvertedDate;