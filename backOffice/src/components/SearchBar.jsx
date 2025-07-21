// components/SearchBar.jsx
import React, { useState } from 'react';
import {TableTypes} from "../utils/Defs.js";

function SearchBar({ onSearch, tableType }) {
    const [query, setQuery] = useState('');
    const [queryFleaMarketId, setQueryFleaMarketId] = useState('');
    const [queryPersonId, setQueryPersonId] = useState('');

    const handleSearch = () => {
        let trimmedQuery;

        if (tableType === TableTypes.INTERESTS) {
            trimmedQuery = {};

            if (queryFleaMarketId) {
                trimmedQuery.fleaMarketId = queryFleaMarketId.trim();
            }

            if (queryPersonId) {
                trimmedQuery.personId = queryPersonId.trim();
            }

            if (Object.keys(trimmedQuery).length <= 0) {
                trimmedQuery = null;
            }

            setQueryFleaMarketId('');
            setQueryPersonId('');
        } else {
            trimmedQuery = query.trim();
        }
        if (trimmedQuery) {
            onSearch(trimmedQuery);
        } else {
            // signaler une recherche vide pour reset les données
            onSearch(null);
            setQuery('');
            setQueryFleaMarketId('');
            setQueryPersonId('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
            <input
                type="text"
                placeholder="Rechercher..."
                value={tableType === TableTypes.INTERESTS ? queryFleaMarketId : query}
                onChange={(e) => {
                    if (tableType === TableTypes.INTERESTS) {
                        setQueryFleaMarketId(e.target.value);
                    } else {
                        setQuery(e.target.value)
                    }
                }}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Rechercher</button>
        </div>
        {tableType === TableTypes.INTERESTS && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={queryPersonId}
                    onChange={(e) => setQueryPersonId(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Rechercher</button>
            </div>
        )}
        </>
    );
}

export default SearchBar;
