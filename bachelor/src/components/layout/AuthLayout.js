import React from 'react'


function BaseLayout(props) {
    const { window, children } = props

    return (
        <div>

            {children}

        </div>
    )
}

export default BaseLayout