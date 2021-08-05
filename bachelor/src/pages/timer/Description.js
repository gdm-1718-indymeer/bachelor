import React, { useState, useEffect , useCallback} from 'react'
import {getMedicineDetails} from '../../services/medication.services'

const Description = () => {
    const [state, setState] = useState({});

    const getEvents = useCallback(async (name) => {
        try {
            const result = await getMedicineDetails(name);
            setState({result})
            await console.log(state)

        } catch (e) {
            console.error(e);
        }
    });
  
      
    useEffect (() => {
      let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
      const uid = currentUser.uid
  
      getEvents('imodium');
  
    }, []);
  

    return (
        <>
            <div className="headerDes">
                <h4>Vitamin D</h4>
                <img className="descriptionImg" src="https://toppng.com/uploads/preview/white-pills-11533030042mkd3inu6tx.png" alt="Prescripted pills" width="200px" height="200px"/>
            </div> 

            <div className="bodyPres container">
                <div className="addPres row">
                    <div class='pres col-6'>
                        <h4>Prescription</h4>
                    </div>
                    <div className='logo col-6'>
                        <img className="prescriptionImg" src="https://toppng.com/uploads/preview/white-pills-11533030042mkd3inu6tx.png" alt="Prescripted pills" width="30px" height="30px"/>
                    </div>
                </div> 

                {state &&
                <div dangerouslySetInnerHTML={  {__html: state.result.dosage_and_administration_table[0]}}></div>
                }

                                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis egestas condimentum. 
                    Fusce ullamcorper sodales mi sit amet varius. Donec suscipit venenatis auctor. 
                    Donec vel orci in dolor dapibus tempor in vitae nisl. Nullam vestibulum id felis in pretium. 
                    Donec euismod quam et dolor scelerisque, nec euismod quam consectetur. 
                    Praesent blandit risus sed neque varius tincidunt.</p>
            </div>

            <div className="label container">
                <div className="labelHead">
                    <h4>Label</h4>
                </div>
                <div className="imgLabel">
                <img src="https://toppng.com/uploads/preview/white-pills-11533030042mkd3inu6tx.png" alt="Prescripted pills" height="300px" width="300px"/>
                </div>
            </div>
        </>
    )
}

export default Description


