import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config';

const Show = () => {

    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(result => {
            if (isMounted) {
                setShow(result);
                setIsLoading(false);
            }        
        }).catch(err => {
            if (isMounted) {
                setError(err.message);
                setIsLoading(false);
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
