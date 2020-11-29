/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../styled'
import { useShows } from '../../misc/custom-hooks'

const ShowGrid = ({data}) => {

    const [starredShows, dispatchStarred] = useShows();

    return <FlexGrid>
        {
            data.map( ({ show }) => {

                const isStarred = starredShows.includes(show.id);

                const onStarClick = useCallback(() => {
                    if (isStarred) {
                        dispatchStarred({type: 'REMOVE', showId: show.id});
                    } else {
                        dispatchStarred({type: 'ADD', showId: show.id});
                    }
                }, [isStarred, show.id]);

                return (<ShowCard 
                    key={show.id} id={show.id} name={show.name} 
                    summary={show.summary} onStarClick={onStarClick}
                    isStarred={isStarred}
                    image={show.image ? show.image.medium : IMAGE_NOT_FOUND} />);

            })
        }
    </FlexGrid>
}

export default ShowGrid
