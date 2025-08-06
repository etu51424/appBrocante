import React, { useState } from 'react';
import {TableTypes} from "../utils/Defs.js";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";


const SearchBar = ({ onSearch, tableType }) => {
    const langDict = useSelector(state => state.language.langDict);
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

    const getTableText = () =>{
        let text;
        switch (tableType) {
            case TableTypes.ARTICLE:
                text = langDict['searchTexts'].articles;
                break;
            case TableTypes.DEALERS:
                text = langDict['searchTexts'].dealers;
                break;
            case TableTypes.USERS:
                text = langDict['searchTexts'].users;
                break;
            case TableTypes.FLEA_MARKETS:
                text = langDict['searchTexts'].fleaMarkets;
                break;
            case TableTypes.INTERESTS:
                text = langDict['searchTexts'].interests;
                break;
            case TableTypes.SLOTS:
                text = langDict['searchTexts'].slots;
                break;
            default:
                console.error(`${langDict.noTextFound} : ${tableType}`);
                text = '///';
        }

        return text;
    }

    return (
        <>
            <input
                type="text"
                placeholder={getTableText()}
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
            <button onClick={handleSearch}>
                {langDict['searchTexts'].research}
            </button>
            {tableType === TableTypes.INTERESTS && (
                <>
                    <input
                        type="text"
                        placeholder={langDict['searchTexts'].interestsAlt}
                        value={queryPersonId}
                        onChange={(e) => setQueryPersonId(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>
                        {langDict['searchTexts'].research}
                    </button>
                </>
            )}
        </>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    tableType: PropTypes.oneOf(Object.values(TableTypes)).isRequired,
};

export default SearchBar;
