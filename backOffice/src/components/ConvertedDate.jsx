import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

function ConvertedDate({ longFormatDate }) {
    const langDict = useSelector(state => state.language.langDict);

    const convertToFrDate = (longDate) => {
        // créer une Date js
        const date = new Date(longDate);
        const convertedDate = date.toLocaleDateString(langDict.date_format);

        // utiliser la méthode Date de js et préciser qu'on veut une date fr JJ/MM/AAAA
        return convertedDate;
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