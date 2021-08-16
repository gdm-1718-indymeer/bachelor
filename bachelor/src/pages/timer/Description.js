import React, { useState, useEffect } from 'react'
import { deleteSchedule, getCurrentData, getMedicineDetails, setCurrentData } from '../../services/auth.services'
import { ReactComponent as Tablet } from '../../assets/images/medicines/tablet.svg'
import { ReactComponent as Capsule } from '../../assets/images/medicines/capsule.svg'
import { ReactComponent as Syringe } from '../../assets/images/medicines/syringe.svg'
import { ReactComponent as Inhaler } from '../../assets/images/medicines/inhaler.svg'
import Popup from '../../admin/components/popup'
import Orale from '../../assets/images/intake/orale.png'
import Ear from '../../assets/images/intake/ear.png'
import Eye from '../../assets/images/intake/eye.png'
import Dermaal from '../../assets/images/intake/dermaal.png'
import Melting from '../../assets/images/intake/melting.png'
import Spray from '../../assets/images/intake/spray.png'
import Injection from '../../assets/images/intake/injection.png'
import { useHistory } from 'react-router'

let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))

const Description = (props) => {
    const [state, setState] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [taken, setTaken] = useState(true);


    const history = useHistory();


    const getEvents = (async (name, uid) => {
        try {
            const currentData = await getCurrentData(uid, props.match.params.id)
            if(currentData === null){
                history.push('/')
            }
            const result = await getMedicineDetails(currentData.medicineName);
            setState([result, currentData])
     
            let today = new Date().getTime() / 1000;
            if(state) {
            let minutes = Math.floor(((today - state[1].timeStamp) % 3600) / 60)
            if(minutes > 20 )
                setTaken(false)
            }

        } catch (e) {
            console.error(e);
        }
    });


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const deleteItems = () => async () => {
        let uid = currentUser.uid
        let id = props.match.params.id
        await deleteSchedule(uid, id)
        togglePopup()
        history.push("/");
    }


    useEffect(() => {
        const uid = currentUser.uid

        getEvents('imodium', uid);

    }, []);

    const tookMedicine = async () => {
        const uid = currentUser.uid;
        await setCurrentData(uid, props.match.params.id, { ...state[1], isTaken: true })
        await getEvents(null, uid)
    }
    return (
        <>
            <div className="headerDes">
                <h4>{state && state[1].medicineName} <span>({state && state[1].medicineValue})</span></h4>
                {state[0] && <>
                    {state[0].type === 'tablet' && <Tablet className="descriptionImg" />}
                    {state[0].type === 'capsule' && <Capsule className="descriptionImg" />}
                    {state[0].type === 'spray' && <Inhaler className="descriptionImg" />}
                    {state[0].type === 'spuit' && <Syringe className="descriptionImg" />}
                    <div className='description'>
                        <p className=''>Aantal medicijnen: <b>{state[1].Amount}</b></p>
                        <p className=''>Innemen om: <b>{state[1].targetTime}</b></p>
                        {state[1].beforeDinner && <span className="tag before">{state[1].notification} min voor het eten</span>}
                        {state[1].duringDinner && <span className="tag during">tijdens het eten</span>}
                        {state[1].afterDinner && <span className="tag after">{state[1].notification} min na het eten</span>}
                       {taken && <> {!state[1].isTaken ?
                        <button className='countdown-wrapper__button btn' onClick={tookMedicine} value="Ik heb mijn medicijn genomen"
                        >Ik heb mijn pil genomen!</button> : null}</>}
                    </div>

                    <button className='btn-red btn' onClick={togglePopup}>Herinnering verwijderen</button>


                </>}
            </div>
            {isOpen &&
                <Popup
                    content={<div className='popup-content'>
                        <h1>Verwijder de herinnering</h1>
                        <p>Ben je zeker dat je deze herinnering wilt verwijderen?</p>

                        <div class="clearfix">
                            <button type="button" onClick={togglePopup} class="btn cancelbtn">Cancel</button>
                            <button type="button" class="btn deletebtn" onClick={deleteItems()}>Verwijderen</button>
                        </div>
                    </div>}
                    handleClose={togglePopup}
                />}
            <div className="bodyPres container">
                <div className="addPres row">
                    <div className='pres col-6'>
                        <h4>Wat is het</h4>
                    </div>
                    <div className='logo col-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="30" viewBox="0 0 42 30">
                            <g id="Icons_pc" data-name="Icons/ pc" transform="translate(1.5 1.5)">
                                <g id="Icons_pc-2" data-name="Icons/ pc">
                                    <path id="Path" d="M30,16.5V0H0V16.5" transform="translate(4.5)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-2" data-name="Path" d="M39,6H0L3,0H36Z" transform="translate(0 21)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-3" data-name="Path" d="M.75,0V9" transform="translate(18.75 6)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-4" data-name="Path" d="M0,.75H9" transform="translate(15 9.75)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    {state[0] && <p dangerouslySetInnerHTML={{ __html: state[0].description }}></p>}
                </div>
            </div>

            <div className="label container">
                <div className="labelHead">
                    <h4>Inname</h4>
                    <span>( Gelieve voor een accurate raadpleging de huisarts of dokter te contacteren )</span>
                </div>
                <div className="imgLabel">
                    {state[0] && <>
                        {state[0].inname === 'oraalsmelten' && <>
                            <h5>Laten smelten in vloeistof of in je mond</h5>
                            <img src={Melting} className="descriptionImgIntake" alt='' />
                        </>
                        }
                        {state[0].inname === 'oor' && <>
                            <h5>Via het oor</h5>
                            <img src={Ear} className="descriptionImgIntake" alt='' />
                        </>}

                        {state[0].inname === 'oog' && <>
                            <h5>Via het oog</h5>
                            <img src={Eye} className="descriptionImgIntake" alt='' />
                        </>}
                        {state[0].inname === 'oraal' && <>
                            <h5>Oraal met vloeistof</h5>
                            <img src={Orale} className="descriptionImgIntake" alt='' />
                        </>}

                        {state[0].inname === 'dermaal' && <>
                            <h5>Dermaal (op de huid)</h5>
                            <img src={Dermaal} className="descriptionImgIntake" alt='' />
                        </>}

                        {state[0].inname === 'spuiten' && <>
                            <h5>Spuiten in de neus of oraal</h5>
                            <img src={Spray} className="descriptionImgIntake" alt='' />
                        </>}

                        {state[0].inname === 'injectie' && <>
                            <h5>Injecteren</h5>
                            <img src={Injection} className="descriptionImgIntake" alt='' />
                        </>}

                    </>}
                </div>
            </div>

            <div className="bodyPres container pb-100">
                <div className="addPres row">
                    <div className='pres col-6'>
                        <h4>Waarschuwingen</h4>
                    </div>
                    <div className='logo col-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40.5" viewBox="0 0 42 40.5">
                            <g id="Icons_medicine-symbol" data-name="Icons/ medicine-symbol" transform="translate(1.5 1.5)">
                                <g id="Icons_medicine-symbol-2" data-name="Icons/ medicine-symbol">
                                    <circle id="Oval" cx="3" cy="3" r="3" transform="translate(16.5)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path" d="M.75,0V9" transform="translate(18.75 25.5)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-2" data-name="Path" d="M.75,0V13.5" transform="translate(18.75 12)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-3" data-name="Path" d="M28.5,0V.75a9,9,0,0,1-18,0V0L0,9.75l19.5,6,19.5-6Z" transform="translate(0 2.25)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-4" data-name="Path" d="M1.05,5.55A2.319,2.319,0,0,1,0,3.75C0,1.65,4.05,0,9,0s9,1.65,9,3.75S13.95,7.5,9,7.5" transform="translate(10.5 18)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-5" data-name="Path" d="M1.95,5.25C.75,4.65,0,3.9,0,3,0,1.35,2.7,0,6,0" transform="translate(13.5 25.5)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                    <path id="Path-6" data-name="Path" d="M4.5,0C7.05,0,9,1.35,9,3S7.05,6,4.5,6,0,4.65,0,3" transform="translate(15 31.5)" fill="none" stroke="#205072" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    {state[0] && <p dangerouslySetInnerHTML={{ __html: state[0].warn }}></p>}
                </div>
            </div>
        </>
    )
}

export default Description


