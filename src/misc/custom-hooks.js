import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

function showsReducer(prevState, action) {
    switch (action.type) {
        case 'ADD': return [...prevState, action.showId];
        case 'REMOVE': return prevState.filter(showId => showId !== action.showId);
        default: return prevState;
    }
}

function usePersistedReducer(reducer, initialState, key) 
{
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persisted = localStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, dispatch];
}

export function useShows(key = 'shows') {
    return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
    
    const [input, setInput] = useState( () => {
        const persisted = sessionStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : "";
    });

    const setPersistedInput = (newState) => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
    }

    return [input, setPersistedInput];
}

const showInitialState = {
    show: null,
    isLoading: true,
    error: null
}

const showReducer = (prevState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return { ...prevState, isLoading: false, show: action.show, error: null };
        }
        case 'FETCH_FAILED': {
            return { ...prevState, isLoading: false, error: action.error, show: null };
        }
        default: return prevState;
    }
}

export function useShow(showId) {

    const [state, dispatch] = useReducer(showReducer, showInitialState);
    
    useEffect( () => {
        
        let isMounted = true;

        apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
        .then(result => {
            if (isMounted) {
                dispatch({ type: 'FETCH_SUCCESS', show: result });
            }
        }).catch(err => {
            if (isMounted) {
                dispatch({ type: 'FETCH_FAILED', error: err.message });
            }
        });

        // возвращенная в этом месте функция вызывается когда компонент выгружается (например при переходе на другую страницу)
        return () => {
            isMounted = false;
        }

    }, [showId]);

    return state;
}