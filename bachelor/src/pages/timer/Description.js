import React, { useState, useEffect , useCallback} from 'react'
import {getMedicineDetails} from '../../services/medication.services'
import {getCurrentData} from '../../services/auth.services'
import Lottie from 'react-lottie';
import Water from '../../assets/lotties/water.json'
import { ReactComponent as Tablet} from '../../assets/images/medicines/tablet.svg'
import { ReactComponent as Capsule} from '../../assets/images/medicines/capsule.svg'
import { ReactComponent as Pill} from '../../assets/images/medicines/pill.svg'
import { ReactComponent as Syringe} from '../../assets/images/medicines/syringe.svg'
import { ReactComponent as Inhaler} from '../../assets/images/medicines/inhaler.svg'






const Description = (props) => {
    const [state, setState] = useState(false);

    const getEvents = useCallback(async (name, uid) => {
        try {
            console.log(props.match.params.id)
            const currentData = await getCurrentData(uid, props.match.params.id)
            const result = await getMedicineDetails(currentData.medicineValue);
            setState([result, currentData])


        } catch (e) {
            console.error(e);
        }
    });
  
      
    useEffect (() => {
      let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
      const uid = currentUser.uid
  
      getEvents('imodium', uid);
  
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Water,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  

    return (
        <>
            <div className="headerDes">
                <h4>{state && state[1].medicineName}</h4>
               <Tablet className="descriptionImg"/>
                <Capsule className="descriptionImg"/>
                <Pill className="descriptionImg"/>
                <Inhaler className="descriptionImg"/>

                {/* <Syringe className="descriptionImg"/> */}




            </div> 

            <div className="bodyPres container">
                <div className="addPres row">
                    <div class='pres col-6'>
                        <h4>Wat is het</h4>
                    </div>
                    <div className='logo col-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="30" viewBox="0 0 42 30">
                    <g id="Icons_pc" data-name="Icons/ pc" transform="translate(1.5 1.5)">
                        <g id="Icons_pc-2" data-name="Icons/ pc">
                        <path id="Path" d="M30,16.5V0H0V16.5" transform="translate(4.5)" fill="none" stroke="#205072" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                        <path id="Path-2" data-name="Path" d="M39,6H0L3,0H36Z" transform="translate(0 21)" fill="none" stroke="#205072" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                        <path id="Path-3" data-name="Path" d="M.75,0V9" transform="translate(18.75 6)" fill="none" stroke="#205072" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                        <path id="Path-4" data-name="Path" d="M0,.75H9" transform="translate(15 9.75)" fill="none" stroke="#205072" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"/>
                        </g>
                    </g>
                    </svg>
                    </div>
                    {state[0] &&<p dangerouslySetInnerHTML={  {__html: state[0]}}></p>}
                </div>         

                          
            </div>

            <div className="label container">
                <div className="labelHead">
                    <h4>Inname</h4>
                </div>
                <div className="imgLabel">
                <Lottie 
                    options={defaultOptions}
                    height={'100%'}
                    width={'100%'}
                    className='test'
                    />
                </div>
            </div>
        </>
    )
}

export default Description


