import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChartBar,
  faCog,
  faHome,
  faPowerOff,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const menuItems = {
  Dashboard: {
    title: 'Dashboard',
    icon: faHome,
  },
  Clients: {
    title: 'Clients',
    icon: faUser,
  },
  Statistics: {
    title: 'Statistics',
    icon: faChartBar,
  },
  Schedule: {
    title: 'schedules',
    icon: faCalendar,
  },
  Settings: {
    title: 'Settings',
    icon: faCog,
  },
};

const BaseLayout = (props) => {
  const { window, children } = props;

  const [sideBarReduced, setSideBarReduced] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  let menuChangeActive = (index) => () => {
    setActiveMenuItem(index);
  };

  const renderMenuItems = useCallback(() => {
    const menuItemsComponentArray = [];
    Object.values(menuItems).forEach((el, index) => {
      menuItemsComponentArray.push(
        !sideBarReduced ? (
          <li
            key={index}
            onClick={menuChangeActive(index)}
            className={`c-menu__item ${
              index === activeMenuItem && 'is-active'
            }`}>
            <div className='c-menu__item__inner'>
              <FontAwesomeIcon className='icon' icon={el.icon} />
              <div className='c-menu-item__title'>
                <span>{el.title}</span>
              </div>
            </div>
          </li>
        ) : (
          <OverlayTrigger
            key={index}
            placement='right'
            overlay={<Tooltip style={{ marginLeft: 5 }}>{el.title}</Tooltip>}>
            <li
              onClick={menuChangeActive(index)}
              className={`c-menu__item ${
                index === activeMenuItem && 'is-active'
              }`}>
              <div className='c-menu__item__inner'>
                <FontAwesomeIcon className='icon' icon={el.icon} />

                <div className='c-menu-item__title'>
                  <span>{el.title}</span>
                </div>
              </div>
            </li>
          </OverlayTrigger>
        )
      );
    });
    return menuItemsComponentArray;
  }, [activeMenuItem, sideBarReduced]);

  const sidebarChangeWidth = () => {
    setSideBarReduced((prevState) => !prevState);
  };

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
          <div className='c-header-icon has-dropdown'>
            <span className='c-badge c-badge--red c-badge--header-icon animated swing'>
              13
            </span>
            <i className='fa fa-bell'></i>
            <div className='c-dropdown c-dropdown--notifications'>
              <div className='c-dropdown__header'></div>
              <div className='c-dropdown__content'></div>
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
            <ul className='u-list'>{renderMenuItems()}</ul>
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
