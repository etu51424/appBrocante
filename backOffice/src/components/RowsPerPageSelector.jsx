import React from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const RowsPerPageSelector = ({ limit, setLimit }) => {
    const options = [5, 10, 20];
    const langDict = useSelector(state => state.language.langDict);

    const handleChange = (e) => {
        setLimit(Number(e.target.value));
    };

    return (
        <>
            <label htmlFor="rows-per-page" className="text-sm font-medium">{langDict.rowPerPage} :</label>
            <select
                id="rows-per-page"
                value={limit}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
            >
                {options.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </>
    );
}

RowsPerPageSelector.propTypes = {
    limit: PropTypes.number.isRequired,
    setLimit: PropTypes.func.isRequired,
}

export default RowsPerPageSelector;
