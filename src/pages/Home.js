import React, { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config'
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';

const Home = () => {
    
    const [input, setInput] = useLastQuery();
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
            return results[0].show 
                ? <ShowGrid data={results} /> 
                : <ActorGrid data={results} />
        }
        return null;
    }

    const onRadioChange = ev => {
        setSearchOption(ev.target.value);
    }

    return (
        <MainPageLayout>
            <SearchInput type="text" placeholder="Search for something" 
                onKeyDown={onKeyDown} onChange={onInputChange} value={input} />

            <RadioInputsWrapper>
                <div>
                    <CustomRadio id="shows-search" 
                            checked={isShowsSearch}
                            label="Shows"
                            value="shows" onChange={onRadioChange} />
                </div>
                <div>
                    <CustomRadio id="actors-search"
                            checked={!isShowsSearch} 
                            label="Actors"
                            value="people" onChange={onRadioChange} />
                </div>
            </RadioInputsWrapper>

            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            { renderResults() }
        </MainPageLayout>
    )
}

export default Home;
