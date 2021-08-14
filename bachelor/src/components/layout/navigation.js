/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';


const Navigation = (props) => {
  const activeItem = useRef(null)
  const [activeItemState, setActiveItemState] = useState(null)

  const firstButtonRef = useRef(null)
  const secondButtonRef = useRef(null)
  const thirdButtonRef = useRef(null)
  const fourthButtonRef = useRef(null)
  const fifthButtonRef = useRef(null)

  const menuRef = useRef(null)
  const menuBorderRef = useRef(null)



  useEffect(() => {

    window.addEventListener("load", handleWindowResize)
    window.addEventListener("resize", handleWindowResize)

    const menuItems = {
      '/now': {
        el: firstButtonRef.current,
        index: 0
      },
      '/': {
        el: secondButtonRef.current,
        index: 1
      },
      '/add': {
        el: thirdButtonRef.current,
        index: 2
      },
      '/camera': {
        el: fourthButtonRef.current,
        index: 3
      },
      '/settings': {
        el: fifthButtonRef.current,
        index:4
      }
    }

    activeItem.current = menuItems[props.path].el
    setActiveItemState(menuItems[props.path].index)
    handleWindowResize()

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }

  }, [props.path])
  
  const handleWindowResize = () => {
    offsetMenuBorder(activeItem?.current, menuBorderRef.current);
  }
 
  const offsetMenuBorder = (element, menuBorder) => {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menuRef.current.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorderRef.current.style.transform = `translate3d(${left}, 0 , 0)`;
  }

  const handleMenuClick = (index) => (item) => {
    setActiveItemState(index)
    activeItem.current = item.currentTarget;
    offsetMenuBorder(activeItem.current, menuBorderRef.current);
  }

  return (
    <div className='navigation'>
    <div ref={menuRef} className="menu">
      <Link onClick={handleMenuClick(0)} ref={firstButtonRef}  to="/now" className={`menu__item ${activeItemState === 0 && 'active'}`} style={{bgColorItem: "#ff8c00"}} >
      <span className="position-absolute start-90 translate-middle badge rounded-pill btn-primary">
          !
          <span className="visually-hidden">unread messages</span>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="26" height="32" viewBox="0 0 36 42">
        <g id="Icons_beat" data-name="Icons/ beat" transform="translate(1.5)">
          <g id="Icons_beat-2" data-name="Icons/ beat">
            <path id="Path" d="M0,.75H9" transform="translate(12 0.75)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <path id="Path-2" data-name="Path" d="M.75,6V0" transform="translate(15.75 1.5)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <path id="Path-3" data-name="Path" d="M.75.75h0" transform="translate(15.75 11.25)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <path id="Path-4" data-name="Path" d="M.75.75h0" transform="translate(15.75 35.25)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <path id="Path-5" data-name="Path" d="M.75.75h0" transform="translate(27.75 23.25)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <path id="Path-6" data-name="Path" d="M.75.75h0" transform="translate(3.75 23.25)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <path id="Path-7" data-name="Path" d="M13.725,1.237h0a3.564,3.564,0,0,0-5.4,0l-.75.75c-.15.15-.15.15-.3,0l-.75-.75a3.564,3.564,0,0,0-5.4,0h0a4.171,4.171,0,0,0,0,5.7l.9.9,5.25,5.55c.15.15.15.15.3.15l5.25-5.55.9-.9A4.075,4.075,0,0,0,13.725,1.237Z" transform="translate(9.075 17.962)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <circle id="Oval" cx="16.5" cy="16.5" r="16.5" transform="translate(0 7.5)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
          </g>
        </g>
      </svg>

      </Link>
      <Link onClick={handleMenuClick(1)}  to="/" ref={secondButtonRef} className={`menu__item ${activeItemState === 1 && 'active'}`} style={{bgColorItem: "#f54888"}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="50.6" height="50.6" viewBox="0 0 50.6 50.6">
        <g id="Icons_home" data-name="Icons/ home" transform="translate(1.5 1.5)">
          <path id="Path" d="M23.8,9.917,38.278,25.783H47.6L23.8,0,0,25.783H7.933V47.6H39.667V33.717" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
          <g id="Path-2" data-name="Path" transform="translate(17.85 23.8)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M11.9,5.95c0,5.355-5.95,9.917-5.95,9.917S0,11.305,0,5.95A5.844,5.844,0,0,1,5.95,0,5.844,5.844,0,0,1,11.9,5.95Z" stroke="none"/>
            <path d="M 5.95001220703125 3 C 4.240662097930908 3 3.000001907348633 4.240659713745117 3.000001907348633 5.950009346008301 C 3.000001907348633 7.794119834899902 4.20618200302124 9.670660018920898 5.218032360076904 10.9201602935791 C 5.463733196258545 11.22356510162354 5.711074352264404 11.50634765625 5.950215816497803 11.76517105102539 C 6.164597988128662 11.53291702270508 6.386081218719482 11.28085136413574 6.607392311096191 11.01158905029297 C 7.653282165527344 9.739089965820312 8.900022506713867 7.828019142150879 8.900022506713867 5.950009346008301 C 8.900022506713867 4.240659713745117 7.659362316131592 3 5.95001220703125 3 M 5.95001220703125 0 C 9.321681976318359 0 11.90002250671387 2.578339576721191 11.90002250671387 5.950009346008301 C 11.90002250671387 11.30501937866211 5.95001220703125 15.86669921875 5.95001220703125 15.86669921875 C 5.95001220703125 15.86669921875 1.9073486328125e-06 11.30501937866211 1.9073486328125e-06 5.950009346008301 C 1.9073486328125e-06 2.578339576721191 2.578342437744141 0 5.95001220703125 0 Z" stroke="none" />
          </g>
        </g>
      </svg>
      </Link>
      
      <Link onClick={handleMenuClick(2)}  to="/add" ref={thirdButtonRef} className={`menu__item ${activeItemState === 2 && 'active'}`} style={{bgColorItem: "#4343f5"}} >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="25.576" height="25.576" viewBox="0 0 25.576 25.576">
        <g id="Plus" transform="translate(1.5 1.5)">
          <path id="Path" d="M.538,0V22.576" transform="translate(10.751)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" opacity="0.89"/>
          <path id="Path-2" data-name="Path" d="M0,.538H22.576" transform="translate(0 10.751)" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" opacity="0.89"/>
        </g>
      </svg>
      </Link>
      
      <Link onClick={handleMenuClick(3)} to="/camera"  ref={fourthButtonRef} className={`menu__item ${activeItemState === 3 && 'active'}`} style={{bgColorItem: "#e0b115"}} > 
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 50 50"><path d="M 24.375 4 C 22.472656 4 20.699219 5.414063 19.9375 7.375 L 19.3125 9 L 14 9 L 14 8 C 14 7.449219 13.550781 7 13 7 L 6 7 C 5.449219 7 5 7.449219 5 8 L 5 9.40625 C 2.136719 10.285156 0 12.859375 0 16 L 0 37 C 0 40.855469 3.144531 44 7 44 L 43 44 C 46.855469 44 50 40.855469 50 37 L 50 16 C 50 12.144531 46.855469 9 43 9 L 40.6875 9 L 40.0625 7.375 C 39.300781 5.414063 37.53125 4 35.625 4 Z M 24.375 6 L 35.625 6 C 36.390625 6 37.710938 6.867188 38.1875 8.09375 L 39.0625 10.375 C 39.214844 10.757813 39.589844 11.003906 40 11 L 43 11 C 45.773438 11 48 13.226563 48 16 L 48 37 C 48 39.773438 45.773438 42 43 42 L 7 42 C 4.226563 42 2 39.773438 2 37 L 2 16 C 2 13.511719 3.792969 11.460938 6.15625 11.0625 C 6.636719 10.988281 6.992188 10.578125 7 10.09375 L 7 9 L 12 9 L 12 10 C 12 10.550781 12.449219 11 13 11 L 20 11 C 20.410156 11.003906 20.785156 10.757813 20.9375 10.375 L 21.8125 8.09375 C 22.289063 6.867188 23.609375 6 24.375 6 Z M 30 13 C 22.835938 13 17 18.835938 17 26 C 17 33.164063 22.835938 39 30 39 C 37.164063 39 43 33.164063 43 26 C 43 18.835938 37.164063 13 30 13 Z M 7 14 C 5.894531 14 5 14.894531 5 16 C 5 17.105469 5.894531 18 7 18 C 8.105469 18 9 17.105469 9 16 C 9 14.894531 8.105469 14 7 14 Z M 30 15 C 36.085938 15 41 19.914063 41 26 C 41 32.085938 36.085938 37 30 37 C 23.914063 37 19 32.085938 19 26 C 19 19.914063 23.914063 15 30 15 Z"></path></svg>
      </Link>
      
      <Link onClick={handleMenuClick(4)} to="/settings" ref={fifthButtonRef} className={`menu__item ${activeItemState === 4 && 'active'}`} style={{bgColorItem:"#65ddb7"}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 30 30">    
          <path d="M 15 2 C 14.448 2 14 2.448 14 3 L 14 3.171875 C 14 3.649875 13.663406 4.0763437 13.191406 4.1523438 C 12.962406 4.1893437 12.735719 4.2322031 12.511719 4.2832031 C 12.047719 4.3892031 11.578484 4.1265 11.396484 3.6875 L 11.330078 3.53125 C 11.119078 3.02125 10.534437 2.7782344 10.023438 2.9902344 C 9.5134375 3.2012344 9.2704219 3.785875 9.4824219 4.296875 L 9.5488281 4.4570312 C 9.7328281 4.8970313 9.5856875 5.4179219 9.1796875 5.6699219 C 8.9836875 5.7919219 8.7924688 5.9197344 8.6054688 6.0527344 C 8.2174688 6.3297344 7.68075 6.2666875 7.34375 5.9296875 L 7.2226562 5.8085938 C 6.8316562 5.4175937 6.1985937 5.4175938 5.8085938 5.8085938 C 5.4185938 6.1995938 5.4185938 6.8326563 5.8085938 7.2226562 L 5.9296875 7.34375 C 6.2666875 7.68075 6.3297344 8.2164688 6.0527344 8.6054688 C 5.9197344 8.7924687 5.7919219 8.9836875 5.6699219 9.1796875 C 5.4179219 9.5856875 4.8960781 9.7337812 4.4550781 9.5507812 L 4.296875 9.484375 C 3.786875 9.273375 3.2002813 9.5153906 2.9882812 10.025391 C 2.7772813 10.535391 3.0192969 11.120031 3.5292969 11.332031 L 3.6855469 11.396484 C 4.1245469 11.578484 4.3892031 12.047719 4.2832031 12.511719 C 4.2322031 12.735719 4.1873906 12.962406 4.1503906 13.191406 C 4.0753906 13.662406 3.649875 14 3.171875 14 L 3 14 C 2.448 14 2 14.448 2 15 C 2 15.552 2.448 16 3 16 L 3.171875 16 C 3.649875 16 4.0763437 16.336594 4.1523438 16.808594 C 4.1893437 17.037594 4.2322031 17.264281 4.2832031 17.488281 C 4.3892031 17.952281 4.1265 18.421516 3.6875 18.603516 L 3.53125 18.669922 C 3.02125 18.880922 2.7782344 19.465563 2.9902344 19.976562 C 3.2012344 20.486563 3.785875 20.729578 4.296875 20.517578 L 4.4570312 20.451172 C 4.8980312 20.268172 5.418875 20.415312 5.671875 20.820312 C 5.793875 21.016313 5.9206875 21.208484 6.0546875 21.396484 C 6.3316875 21.784484 6.2686406 22.321203 5.9316406 22.658203 L 5.8085938 22.779297 C 5.4175937 23.170297 5.4175938 23.803359 5.8085938 24.193359 C 6.1995938 24.583359 6.8326562 24.584359 7.2226562 24.193359 L 7.3457031 24.072266 C 7.6827031 23.735266 8.2174688 23.670266 8.6054688 23.947266 C 8.7934688 24.081266 8.9856406 24.210031 9.1816406 24.332031 C 9.5866406 24.584031 9.7357344 25.105875 9.5527344 25.546875 L 9.4863281 25.705078 C 9.2753281 26.215078 9.5173438 26.801672 10.027344 27.013672 C 10.537344 27.224672 11.121984 26.982656 11.333984 26.472656 L 11.398438 26.316406 C 11.580438 25.877406 12.049672 25.61275 12.513672 25.71875 C 12.737672 25.76975 12.964359 25.814562 13.193359 25.851562 C 13.662359 25.924562 14 26.350125 14 26.828125 L 14 27 C 14 27.552 14.448 28 15 28 C 15.552 28 16 27.552 16 27 L 16 26.828125 C 16 26.350125 16.336594 25.923656 16.808594 25.847656 C 17.037594 25.810656 17.264281 25.767797 17.488281 25.716797 C 17.952281 25.610797 18.421516 25.8735 18.603516 26.3125 L 18.669922 26.46875 C 18.880922 26.97875 19.465563 27.221766 19.976562 27.009766 C 20.486563 26.798766 20.729578 26.214125 20.517578 25.703125 L 20.451172 25.542969 C 20.268172 25.101969 20.415312 24.581125 20.820312 24.328125 C 21.016313 24.206125 21.208484 24.079312 21.396484 23.945312 C 21.784484 23.668312 22.321203 23.731359 22.658203 24.068359 L 22.779297 24.191406 C 23.170297 24.582406 23.803359 24.582406 24.193359 24.191406 C 24.583359 23.800406 24.584359 23.167344 24.193359 22.777344 L 24.072266 22.654297 C 23.735266 22.317297 23.670266 21.782531 23.947266 21.394531 C 24.081266 21.206531 24.210031 21.014359 24.332031 20.818359 C 24.584031 20.413359 25.105875 20.264266 25.546875 20.447266 L 25.705078 20.513672 C 26.215078 20.724672 26.801672 20.482656 27.013672 19.972656 C 27.224672 19.462656 26.982656 18.878016 26.472656 18.666016 L 26.316406 18.601562 C 25.877406 18.419563 25.61275 17.950328 25.71875 17.486328 C 25.76975 17.262328 25.814562 17.035641 25.851562 16.806641 C 25.924562 16.337641 26.350125 16 26.828125 16 L 27 16 C 27.552 16 28 15.552 28 15 C 28 14.448 27.552 14 27 14 L 26.828125 14 C 26.350125 14 25.923656 13.663406 25.847656 13.191406 C 25.810656 12.962406 25.767797 12.735719 25.716797 12.511719 C 25.610797 12.047719 25.8735 11.578484 26.3125 11.396484 L 26.46875 11.330078 C 26.97875 11.119078 27.221766 10.534437 27.009766 10.023438 C 26.798766 9.5134375 26.214125 9.2704219 25.703125 9.4824219 L 25.542969 9.5488281 C 25.101969 9.7318281 24.581125 9.5846875 24.328125 9.1796875 C 24.206125 8.9836875 24.079312 8.7915156 23.945312 8.6035156 C 23.668312 8.2155156 23.731359 7.6787969 24.068359 7.3417969 L 24.191406 7.2207031 C 24.582406 6.8297031 24.582406 6.1966406 24.191406 5.8066406 C 23.800406 5.4156406 23.167344 5.4156406 22.777344 5.8066406 L 22.65625 5.9296875 C 22.31925 6.2666875 21.782531 6.3316875 21.394531 6.0546875 C 21.206531 5.9206875 21.014359 5.7919219 20.818359 5.6699219 C 20.413359 5.4179219 20.266219 4.8960781 20.449219 4.4550781 L 20.515625 4.296875 C 20.726625 3.786875 20.484609 3.2002812 19.974609 2.9882812 C 19.464609 2.7772813 18.879969 3.0192969 18.667969 3.5292969 L 18.601562 3.6855469 C 18.419563 4.1245469 17.950328 4.3892031 17.486328 4.2832031 C 17.262328 4.2322031 17.035641 4.1873906 16.806641 4.1503906 C 16.336641 4.0753906 16 3.649875 16 3.171875 L 16 3 C 16 2.448 15.552 2 15 2 z M 15 7 C 19.078645 7 22.438586 10.054876 22.931641 14 L 16.728516 14 A 2 2 0 0 0 15 13 A 2 2 0 0 0 14.998047 13 L 11.896484 7.625 C 12.850999 7.222729 13.899211 7 15 7 z M 10.169922 8.6328125 L 13.269531 14 A 2 2 0 0 0 13 15 A 2 2 0 0 0 13.269531 15.996094 L 10.167969 21.365234 C 8.2464258 19.903996 7 17.600071 7 15 C 7 12.398945 8.2471371 10.093961 10.169922 8.6328125 z M 16.730469 16 L 22.931641 16 C 22.438586 19.945124 19.078645 23 15 23 C 13.899211 23 12.850999 22.777271 11.896484 22.375 L 14.998047 17 A 2 2 0 0 0 15 17 A 2 2 0 0 0 16.730469 16 z"></path></svg>
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