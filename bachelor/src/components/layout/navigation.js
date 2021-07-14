import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faCalendar, faCamera } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/images/OpWit.svg'


const tabs = [{
  route: "/home",
  icon: faSearch,
  label: "Home"
},{
  route: "/search",
  icon: faSearch,
  label: "Search"
},{
  route: "/login",
  icon: faUserCircle,
  label: "Login"
},{
  route: "/calendar",
  icon: faCalendar,
  label: "Calendar"
},{
  route: "/camera",
  icon: faCamera,
  label: "Login"
}]

const Navigation = (props) => {

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/home">     <div class="brand-wrapper">
                            <img src={Logo} alt="logo" class="logo" />
                        </div></a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to="/search" className="nav-link">
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/welcome" className="nav-link">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
    <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav bottom-navbar" role="navigation">
      <Nav className="w-100">
        <div className="d-flex flex-row justify-content-around w-100">
          {
            tabs.map((tab, index) =>(
              <NavItem key={`tab-${index}`}>
                <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <FontAwesomeIcon className="icon--social" icon={tab.icon}/>
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))
          }
        </div>
      </Nav>
    </nav>
    </div>
  )
};

export default Navigation;