import React from "react";

function RowsPerPageSelector({ limit, setLimit }) {
    const options = [5, 10, 20];

    const handleChange = (e) => {
        setLimit(Number(e.target.value));
    };

    return (
        <div className="mb-4 flex items-center gap-2">
            <label htmlFor="rows-per-page" className="text-sm font-medium">Lignes par page :</label>
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
        </div>
    );
}

export default RowsPerPageSelector;
