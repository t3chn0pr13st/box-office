import React, { memo } from 'react'
import { LinkStyled, NavList } from './Navs.styled'

const LINKS = [
    { to: '/', text: 'Home' },
    { to: '/starred', text: 'Starred' },
]

const Navs = () => {

    return (
        <div>
            <NavList>
                {
                    LINKS.map(item => 
                        <li key={item.to}>
                            <LinkStyled exact to={item.to}>{item.text}</LinkStyled>
                        </li>
                    )
                }
            </NavList>
        </div>
    )
}

export default memo(Navs);