import React, { useState, useCallback, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChartBar, faCog, faHome, faMedkit, faPowerOff, faTachometerAlt, faUser, } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Redirect } from 'react-router-dom';
import AppContext from '../../services/context.services';
import { Link } from 'react-router-dom'
import { isAdmin, isSuperAdmin } from '../../services/auth.services';

const menuItems = {
  Home: {
    title: 'Terug naar de app',
    icon: faHome,
    link: '/'
  },
  Dashboard: {
    title: 'Dashboard',
    icon: faTachometerAlt,
    link: '/dashboard'
  },
  Clients: {
    title: 'Clients',
    icon: faUser,
    link: '/dashboard'
  },
  Statistics: {
    title: 'Statistics',
    icon: faChartBar,
    link: '/dashboard'
  },
  Schedule: {
    title: 'schedules',
    icon: faCalendar,
    link: '/dashboard'
  },
  Settings: {
    title: 'Settings',
    icon: faCog,
    link: '/dashboard'
  },
  Medicines: {
    title: 'Medicines',
    icon: faMedkit,
    link: '/dashboard/medication',
    permissions: ['isSuperAdmin']
  },
};

const BaseLayout = (props) => {
  const { children } = props;
  const [sideBarReduced, setSideBarReduced] = useState(true);
  const [permissions, setPermissions] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState(1);

  let menuChangeActive = (index) => () => {
    setActiveMenuItem(index);
  };
  const getPermissions = async () => {
    const superAdmin = await isSuperAdmin();
    setPermissions(Object.assign(permissions, { isSuperAdmin: superAdmin }))
  }
  const renderMenuItems = useCallback(() => {
    const menuItemsComponentArray = [];
    Object.values(menuItems).forEach((el, index) => {
      let isVisible = true;
      if (el.permissions) {
        console.log('test')
        for (const permissionName of el.permissions) {
          const result = permissions[permissionName];

          if (!result) {
            isVisible = false;
            break;
          }
        }
      }
      if (isVisible)
        menuItemsComponentArray.push(
          !sideBarReduced ? (
            <Link to={el.link}
              key={index}
              onClick={menuChangeActive(index)}
              className={`c-menu__item ${index === activeMenuItem && 'is-active'
                }`}>
              <div className='c-menu__item__inner'>
                <FontAwesomeIcon className='icon' icon={el.icon} />
                <div className='c-menu-item__title'>
                  <span>{el.title}</span>
                </div>
              </div>
            </Link>
          ) : (
            <OverlayTrigger
              key={index}
              placement='right'
              overlay={<Tooltip style={{ marginLeft: 5 }}>{el.title}</Tooltip>}>
              <Link to={el.link}
                onClick={menuChangeActive(index)}
                className={`c-menu__item ${index === activeMenuItem && 'is-active'
                  }`}>
                <div className='c-menu__item__inner'>
                  <FontAwesomeIcon className='icon' icon={el.icon} />

                  <div className='c-menu-item__title'>
                    <span>{el.title}</span>
                  </div>
                </div>
              </Link>
            </OverlayTrigger>
          )
        );
    });
    return menuItemsComponentArray;
  }, [activeMenuItem, sideBarReduced, permissions]);

  useEffect(() => {
    getPermissions();
  }, [])
  const appContext = useContext(AppContext);
  if (appContext.loginStatus === 'LOGGED_OUT') {
    return <Redirect to={`/login?callback=${window.location.origin}${props.location.pathname}${props.location.search}`} />;
  }
  if (!isAdmin()) {
    return <Redirect to={`/invite`} />;

  }
  const sidebarChangeWidth = () => {
    setSideBarReduced((prevState) => !prevState);
  };
  console.log(permissions);
  return (
    <div
      className={sideBarReduced ? 'sidebar-is-reduced' : 'sidebar-is-expanded'}>
      <header className='l-header'>
        <div className='l-header__inner clearfix'>
          <div
            className='c-header-icon js-hamburger'
            onClick={sidebarChangeWidth}>
            <div
              className={`hamburger-toggle ${!sideBarReduced && 'is-opened'}`}>
              <span className='bar-top'></span>
              <span className='bar-mid' />
              <span className='bar-bot' />
            </div>
          </div>

          <div className='header-icons-group'>
            <div className='c-header-icon logout'>
              <FontAwesomeIcon className='icon' icon={faPowerOff} />
            </div>
          </div>
        </div>
      </header>
      <div className='l-sidebar'>
        <div className='logo'>
          <div className='logo__txt'>D</div>
        </div>
        <div className='l-sidebar__content'>
          <nav className='c-menu js-menu'>
            <ul className='u-list'>{renderMenuItems(permissions)}</ul>
          </nav>
        </div>
      </div>

      <main className='l-main'>
        <div className='content-wrapper content-wrapper--with-bg'>
          {children}
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
