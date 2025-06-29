import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const langDict = useSelector(state => state.language.langDict);

    return (
        <div className='home'>
            <img src="/logo.png" alt="logo" />
            <p>{langDict.welcome}</p>
        </div>
    );
}

export default Home;