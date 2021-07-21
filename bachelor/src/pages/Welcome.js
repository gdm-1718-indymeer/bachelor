import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Register from "./signup/Signup";

const Welcome = () => {
    return (
      <>
        <Register></Register>
      </>
    )
}

export default Welcome
