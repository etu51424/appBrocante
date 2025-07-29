import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const langDict = useSelector(state => state.language.langDict);

    return (
        <div className='home'>
            <img src="/logo.png" alt="logo" />
            <p>{langDict.welcome}</p>
        </div>
    );
}

export default Home;