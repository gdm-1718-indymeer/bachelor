import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCamera, faClock, faPlus, faChevronLeft, faCog } from '@fortawesome/free-solid-svg-icons';


const Navigation = (props) => {
  const activeItem = useRef(null)

  const firstButtonRef = useRef(null)
  const secondButtonRef = useRef(null)
  const thirdButtonRef = useRef(null)
  const fourthButtonRef = useRef(null)
  const fifthButtonRef = useRef(null)

  const menuRef = useRef(null)
  const menuBorderRef = useRef(null)

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize)

    activeItem.current = firstButtonRef.current
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const handleWindowResize = () => {
    offsetMenuBorder(activeItem?.current, menuBorderRef.current);
    //menuRef.current.element.style.setProperty("--timeOut", "none");
  }

  const offsetMenuBorder = (element, menuBorder) => {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menuRef.current.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorderRef.current.style.transform = `translate3d(${left}, 0 , 0)`;
  }

  const handleMenuClick = (index) => (item) => {

    if(activeItem.current) {
      activeItem.current.classList.remove("active");
    }

    item.currentTarget.classList.add('active')
    activeItem.current = item.currentTarget;
    offsetMenuBorder(activeItem.current, menuBorderRef.current);
  }

  return (
    <div className='navigation'>
    <div ref={menuRef} className="menu">
      <Link onClick={handleMenuClick(0)} ref={firstButtonRef}  to="/now" className="menu__item active" style={{bgColorItem: "#ff8c00"}} >
        <FontAwesomeIcon className="icon" icon={faClock}/>
      </Link>
      <Link onClick={handleMenuClick(1)}  to="/" ref={secondButtonRef} className="menu__item" style={{bgColorItem: "#f54888"}}>
        <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
      </Link>
      <Link onClick={handleMenuClick(2)}  to="/add" ref={thirdButtonRef} className="menu__item" style={{bgColorItem: "#4343f5"}} >
        <FontAwesomeIcon className="icon" icon={faPlus}/>
      </Link>
      <Link onClick={handleMenuClick(3)} to="/camera"  ref={fourthButtonRef} className="menu__item" style={{bgColorItem: "#e0b115"}} > 
        <FontAwesomeIcon className="icon" icon={faCamera}/>
      </Link>
      <Link onClick={handleMenuClick(4)} to="/settings" ref={fifthButtonRef} className="menu__item" style={{bgColorItem:"#65ddb7"}}>
        <FontAwesomeIcon className="icon" icon={faCog}/>

        {/* <svg className="icon" viewBox="0 0 24 24" >
          <path  d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1
            C3.9,4.4,4.4,3.9,5.1,3.9z"/>
          <path  d="M5.5,20l9.9-9.9l4.7,4.7"/>
          <path  d="M10.4,8.8c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C7.3,8,8,7.3,8.9,7.3C9.7,7.3,10.4,8,10.4,8.8z"/>
        </svg> */}
      </Link>
      <div ref={menuBorderRef} className="menu__border"></div>
    </div>

    <div className="svg-container">
      <svg viewBox="0 0 202.9 45.5" >
        <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
          <path  d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
            c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
            c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
        </clipPath>
      </svg>
    </div>
     
    </div>
  )
};

export default Navigation;