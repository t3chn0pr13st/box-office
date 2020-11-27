import React from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'

const ShowGrid = ({data}) => {
    return <div>
        {
            data.map( ({ show }) => (<ShowCard 
                key={show.id} id={show.id} name={show.name} 
                summary={show.summary}
                image={show.image ? show.image.medium : IMAGE_NOT_FOUND} />)
            )
        }
    </div>
}

export default ShowGrid
