import React from 'react'


function BaseLayout(props) {
    const { children } = props

    return (
        <div>

            {children}

        </div>
    )
}

export default BaseLayout