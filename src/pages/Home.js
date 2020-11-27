import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {
    
    const [input, setInput] = useState('');

    const onInputChange = event => {
        setInput(event.target.value);
    }

    const onSearch = () => {
        // http://api.tvmaze.com/search/shows?q=girls

        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
            .then(r => r.json())
            .then(result => console.log(result));

    }

    const onKeyDown = event => {
        if (event.keyCode === 13)
            onSearch();
    }

    return (
        <MainPageLayout>
            <input type="text" onKeyDown={onKeyDown} onChange={onInputChange} value={input} />
            <button type="button" onClick={onSearch}>Search</button>
        </MainPageLayout>
    )
}

export default Home;
