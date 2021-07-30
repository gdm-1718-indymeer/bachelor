import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faChartBar, faCogs, faGifts, faPlane, faPowerOff, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';


function BaseLayout(props) {
    const { window, children } = props

   /* let global = {
		tooltipOptions: {
			placement: "right"
		},
		menuClass: ".c-menu"
	};

	let menuChangeActive = el => {
		let hasSubmenu = ($(el).hasClass("has-submenu"));
		$(global.menuClass + " .is-active").removeClass("is-active");
		$(el).addClass("is-active");
		
		// if (hasSubmenu) {
		// 	$(el).find("ul").slideDown();
		// }
	};

	let sidebarChangeWidth = () => {
		let $menuItemsTitle = $("li .menu-item__title");

		$("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
		$(".hamburger-toggle").toggleClass("is-opened");
		
		if ($("body").hasClass("sidebar-is-expanded")) {
			$('[data-toggle="tooltip"]').tooltip("destroy");
		} else {
			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
		}
		
	};*/

	/*return {
		init: () => {
			$(".js-hamburger").on("click", sidebarChangeWidth);

			$(".js-menu li").on("click", e => {
				menuChangeActive(e.currentTarget);
			});

			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
		}
	};*/


  return (
    <div>                
        <body class="sidebar-is-reduced">
        <header class="l-header">
            <div class="l-header__inner clearfix">
            <div class="c-header-icon js-hamburger">
                <div class="hamburger-toggle"><span class="bar-top"></span><span class="bar-mid"></span><span class="bar-bot"></span></div>
            </div>
            <div class="c-header-icon has-dropdown"><span class="c-badge c-badge--red c-badge--header-icon animated swing">13</span><i class="fa fa-bell"></i>
                <div class="c-dropdown c-dropdown--notifications">
                <div class="c-dropdown__header"></div>
                <div class="c-dropdown__content"></div>
                </div>
            </div>
            <div class="c-search">
                <input class="c-search__input u-input" placeholder="Search..." type="text"/>
            </div>
            <div class="header-icons-group">
                <div class="c-header-icon basket"><span class="c-badge c-badge--blue c-badge--header-icon animated swing">4</span><i class="fa fa-shopping-basket"></i></div>
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
                <li class="c-menu__item is-active" data-toggle="tooltip" title="Flights">
                    <div class="c-menu__item__inner">
                        <FontAwesomeIcon className="icon" icon={faPlane}/>

                    <div class="c-menu-item__title"><span>Flights</span></div>
                    </div>
                </li>
                <li class="c-menu__item has-submenu" data-toggle="tooltip" title="Modules">
                    <div class="c-menu__item__inner">
                        <FontAwesomeIcon className="icon" icon={faPuzzlePiece}/>

                    <div class="c-menu-item__title"><span>Modules</span></div>
                    <div class="c-menu-item__expand js-expand-submenu">        
                        <FontAwesomeIcon className="icon" icon={faAngleDown}/>
                    </div>
                    </div>
                    <ul class="c-menu__submenu u-list">
                    <li>Payments</li>
                    <li>Maps</li>
                    <li>Notifications</li>
                    </ul>
                </li>
                <li class="c-menu__item has-submenu" data-toggle="tooltip" title="Statistics">
                    <div class="c-menu__item__inner"> 
                        <FontAwesomeIcon className="icon" icon={faChartBar}/>
                    <div class="c-menu-item__title"><span>Statistics</span></div>
                    </div>
                </li>
                <li class="c-menu__item has-submenu" data-toggle="tooltip" title="Gifts">
                    <div class="c-menu__item__inner"> 
                        <FontAwesomeIcon className="icon" icon={faGifts}/>

                    <div class="c-menu-item__title"><span>Gifts</span></div>
                    </div>
                </li>
                <li class="c-menu__item has-submenu" data-toggle="tooltip" title="Settings">
                    <div class="c-menu__item__inner">       
                         <FontAwesomeIcon className="icon" icon={faCogs}/>

                    <div class="c-menu-item__title"><span>Settings</span></div>
                    </div>
                </li>
                </ul>
            </nav>
            </div>
        </div>
        </body>
        <main class="l-main">
        <div class="content-wrapper content-wrapper--with-bg">
            <h1 class="page-title">Dashboard</h1>
            {children}

        </div>
        </main>

    </div>
  )
}

export default BaseLayout