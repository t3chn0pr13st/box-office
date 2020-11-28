import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config';

const initialState = {
    show: null,
    isLoading: true,
    error: null
}

const reducer = (prevState, action) => {
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

const Show = () => {

    const { id } = useParams();

    const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initialState);
    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect( () => {
        
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
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

    }, [id]);

    console.log('show', show);

    if (isLoading)
        return <div>Data is being loaded</div>;
    
    if (error)
        return <div>Error occurred: {error}</div>;

    return (
        <div>
            Show page
        </div>
    )
}

export default Show
