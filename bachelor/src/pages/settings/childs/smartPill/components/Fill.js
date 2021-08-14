import React from "react";
import { ReactComponent as Pill } from '../../../../../assets/images/pillApp.svg';
import {fillMedbox, getUserData} from '../../../../../services/auth.services';

let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));

const Fill = ({ navigation, setKey }) => {
    
    const getData = (async () => {
        let { next } = navigation;

        try {
            let uid = currentUser.uid;
            const response = await getUserData(uid);
            await fillMedbox(response.pillBoxId, uid)
            setKey({boxKey: response.pillBoxId, uid: uid})
            next()
        } catch (e) {
            console.error(e);
        }
    });

    return (
        <div className="smartbox " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">

            <Pill className="smartbox__image" />
            <h3 className='text-center'> Vul de pillendoos </h3>
           
            <h5 className='text-center pb-50'> Laat de doos in de originele staat staan tot verdere instructies.</h5>


            <div class="alert alert-warning d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:" viewBox="0 0 16 16">    
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
            </svg>
                <div>
                Let op dit maakt de machine leeg.
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn' onClick={getData}>Click om de pilldoos te vullen</button>

            </div>
        </div>
    );
};

export default Fill;
