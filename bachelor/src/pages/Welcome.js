import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../components/Login";
import SignUp from "../components/Signup";

const Welcome = () => {
    return (
      <>
        <Login></Login>
      </>
    )
}

export default Welcome
