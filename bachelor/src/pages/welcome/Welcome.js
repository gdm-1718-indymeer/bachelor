import React from 'react'

import Multistep from "./Multistep";

const Welcome = (props) => {
  console.log(props)
  return (
    <>
      <Multistep {...props} />

    </>
  )
}

export default Welcome
