import React from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../styled'

const ShowGrid = ({data}) => {
    return <FlexGrid>
        {
            data.map( ({ show }) => (<ShowCard 
                key={show.id} id={show.id} name={show.name} 
                summary={show.summary}
                image={show.image ? show.image.medium : IMAGE_NOT_FOUND} />)
            )
        }
    </FlexGrid>
}

export default ShowGrid
