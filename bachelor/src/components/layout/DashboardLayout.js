import React, {useState, useCallback} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChartBar, faCog,  faHome,  faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

const menuItems = {
    'Dashboard': {
        title: 'Dashboard',
        icon: faHome
    },
    'Clients': {
        title: 'Clients',
        icon: faUser
    },
    'Statistics': {
        title: 'Statistics',
        icon: faChartBar
    },
    'Schedule': {
        title: 'schedules',
        icon: faCalendar
    },
    'Settings': {
        title: 'Settings',
        icon: faCog
    }
}

const BaseLayout = (props) => {
    const { window, children } = props

    const [sideBarReduced, setSideBarReduced] = useState(true)
    const [activeMenuItem, setActiveMenuItem] = useState(null)


	let menuChangeActive = (index) => () => {
        setActiveMenuItem(index)
	};

    const renderMenuItems = useCallback(() => {
        const menuItemsComponentArray = []
        Object.values(menuItems).forEach((el, index) => {
            menuItemsComponentArray.push(
                !sideBarReduced ? (
                <li onClick={menuChangeActive(index)} class={`c-menu__item ${index === activeMenuItem && 'is-active'}`} >
                    <div class="c-menu__item__inner">
                        <FontAwesomeIcon className="icon" icon={el.icon}/>
                        <div class="c-menu-item__title">
                            <span>{el.title}</span>
                        </div>
                    </div>
                </li>
                ) : (
                    <OverlayTrigger placement="right" overlay={
                        <Tooltip style={{marginLeft: 5}}>{el.title}</Tooltip>
                    }>
                        <li onClick={menuChangeActive(index)} class={`c-menu__item ${index === activeMenuItem && 'is-active'}`}>
                            <div class="c-menu__item__inner">
                                <FontAwesomeIcon className="icon" icon={el.icon}/>

                                <div class="c-menu-item__title">
                                    <span>{el.title}</span>
                                </div>
                            </div>
                        </li>
                    </OverlayTrigger>

            ))
        })
        return menuItemsComponentArray
    },[activeMenuItem, sideBarReduced])

	const sidebarChangeWidth = () => {
        setSideBarReduced(prevState => !prevState)
	
	};

  return (
    <div>                
        <body class={sideBarReduced ? "sidebar-is-reduced" : "sidebar-is-expanded"}>
            <header class="l-header">
                <div class="l-header__inner clearfix">
                    <div class="c-header-icon js-hamburger"  onClick={sidebarChangeWidth}>
                        <div class={`hamburger-toggle ${!sideBarReduced && "is-opened"}`}>
                            <span class="bar-top"></span>
                            <span class="bar-mid"/>
                            <span class="bar-bot"/>
                        </div>
                    </div>
                    <div class="c-header-icon has-dropdown">
                        <span class="c-badge c-badge--red c-badge--header-icon animated swing">13</span>
                        <i class="fa fa-bell"></i>
                        <div class="c-dropdown c-dropdown--notifications">
                            <div class="c-dropdown__header"></div>
                            <div class="c-dropdown__content"></div>
                        </div>
                    </div>
       
                    <div class="header-icons-group">
                        <div class="c-header-icon logout">        
                            <FontAwesomeIcon className="icon" icon={faPowerOff}/>
                        </div>
                    </div>
                </div>
            </header>
        <div class="l-sidebar">
            <div class="logo">
            <div class="logo__txt">D</div>
            </div>
            <div class="l-sidebar__content">
            <nav class="c-menu js-menu">
                <ul class="u-list">
                {renderMenuItems()}
                </ul>
            </nav>
            </div>
        </div>

        <main class="l-main">
            <div class="content-wrapper content-wrapper--with-bg">
                {children}

            </div>
        </main>
        </body>

    </div>
  )
}

export default BaseLayout