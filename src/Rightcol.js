import React from 'react'

import Content from './Content'
import './style.css'
import NavTab from './NavTab'

const Rightcol = () => {
    return (
        <div className='right-container'>
            <NavTab />
            <Content />
        </div>
    )
}

export default Rightcol
