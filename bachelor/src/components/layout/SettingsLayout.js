import React from 'react'

import {Navigation} from './index'

function BaseLayout(props) {
    const { window, children } = props


  return (
    <div>
        {children}

    </div>
  )
}

export default BaseLayout