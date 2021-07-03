import React from 'react'
import { Link } from 'react-router-dom'

import {Navigation} from './index'

function BaseLayout(props) {
    const { window, children } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)


  return (
    <div>
       <Navigation></Navigation>
        {children}
    </div>
  )
}

export default BaseLayout