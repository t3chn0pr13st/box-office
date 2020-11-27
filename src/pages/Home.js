import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config'

const Home = () => {
    
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const isShowsSearch = searchOption === 'shows';

    const onInputChange = event => {
        setInput(event.target.value);
    }

    const onSearch = () => {        
        apiGet(`/search/${searchOption}?q=${input}`).then(result => setResults(result));
    }

    const onKeyDown = event => {
        if (event.keyCode === 13)
            onSearch();
    }

    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No results</div>
        }
        if (results && results.length > 0) {
            return results[0].show ? results.map(item => 
                    <div key={item.show.id}>
                        {item.show.name}
                    </div>
                ) : results.map(item => 
                    <div key={item.person.id}>
                        {item.person.name}
                    </div>
                )
        }
        return null;
    }

    const onRadioChange = ev => {
        setSearchOption(ev.target.value);
    }

    console.log(searchOption);

    return (
        <MainPageLayout>
            <input type="text" placeholder="Search for something" 
                onKeyDown={onKeyDown} onChange={onInputChange} value={input} />

            <div>
                <label htmlFor="shows-search">
                    Shows
                    <input id="shows-search" 
                        checked={isShowsSearch}
                        type="radio" value="shows" onChange={onRadioChange} />
                </label>

                <label htmlFor="actors-search">
                    Actors
                    <input id="actors-search"
                        checked={!isShowsSearch} 
                        type="radio" value="people" onChange={onRadioChange} />
                </label>
            </div>

            <button type="button" onClick={onSearch}>Search</button>
            { renderResults() }
        </MainPageLayout>
    )
}

export default Home;
