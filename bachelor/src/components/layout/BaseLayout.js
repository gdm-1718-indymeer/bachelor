import React from 'react'

import {Navigation} from './index'

function BaseLayout(props) {
    const { window, children } = props


  return (
    <div>
        {children}
        <Navigation path={props.location.pathname}></Navigation>

    </div>
  )
}

export default BaseLayout