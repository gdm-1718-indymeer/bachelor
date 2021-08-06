
import React, { useState, useEffect , useCallback} from 'react'
import Select, { components } from 'react-select'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { setSchedule, uuidv4 } from "../services/auth.services";
import { getMedicines } from "../services/medication.services";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBreadSlice, faCoffee, faUtensils } from '@fortawesome/free-solid-svg-icons'

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

import 'rc-time-picker/assets/index.css';
// const textmagicClient = require('textmagic-client');

// const api = new textmagicClient.TextMagicApi();
// const client = textmagicClient.ApiClient.instance;
// const auth = client.authentications['BasicAuth'];

// auth.username = process.env.REACT_APP_SMS_USERNAME;
// auth.password = process.env.REACT_APP_SMS_API;

const { Option } = components
const showSecond = false;


const pillNames = [
    { value: 'Paracetamol', label: 'Paracetamol' },
    { value: 'Ibuprofen', label: 'Ibuprofen' }
]


const options = []
for (let i = 0; i < 100; i+=1) {
    const option = { 
        value: `${i}`, 
        label:  `${i}`, 
    }
    options.push(option);
   
}

const CustomSelectOption = props => (
  <Option {...props}>
        {props.data.label}
  </Option>
)

const CustomName = props => (
    <div>
      {props.data.label}
    </div>
)

const CustomAmount = props => (
    <div>
      {props.data.label}

    </div>
)

const toTimestamp = (year,month,day,hour, minute, second) =>{
    return  Math.floor((new Date(year,month-1,day,hour, minute, second)).getTime() / 1000) ;
}


const AddMedicine = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [message, setMessage] = useState(false);
    const [medicines, setMedicines] = useState({});

    const  renameKey  = ( obj, oldKey, newKey ) => {
        obj[newKey] = obj[oldKey];
        obj['label'] = obj[newKey];
        delete obj[oldKey];
      }

    const getNames = useCallback(async () => {
        try {
            let data = await getMedicines();
            data.forEach( obj => renameKey( obj, 'term', 'value' ) );

            setMedicines(data)
  
            console.log(medicines)
        } catch (e) {
            console.error(e);
        }
    });

    const [state, setValue] = useState({
        medicine: 'Ibuprofen',
        days: options[1].value,
        time: moment().format('HH:mm:ss'),
        pillAmount:  options[1].value,
        notificationTime:  options[1].value,
        before: false,
        during: false,
        after: false
    });
      
    useEffect (() => {
        getNames();
    }, []);
    

    let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];


    const renderCustomInput = ({ ref }) => (
        <textarea 
          ref={ref} // necessary
          placeholder="Datum"
          value={selectedDay ? ` ${selectedDay.day} ${months[selectedDay.month - 1]}` : ''}
          onChange={setSelectedDay}
          className="datePicker" // a styling class
        />
      )
    
      // ON SUBMIT
    const onSubmit =  async (e) => {
        let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
        const uid = currentUser.uid


        if(state.before || state.during || state.after && selectedDay) {
            const targetDate = `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`;
            
            let time = state.time
            var a = time.split(':'); // split it at the colons
            let hour = Number(a[0]);
            let  minute = Number(a[1]);
            let second = Number(a[2]);


            let data = {}
            for (let i = 0; i < state.days; i++) {
                let uid = uuidv4()
                let newDate = toTimestamp(selectedDay.year , selectedDay.month, selectedDay.day, hour, minute, second )

                data[uid] = {
                    medicineName: state.medicine,
                    targetDate: targetDate,
                    numberOfDays:  state.days,
                    targetTime:  state.time,
                    Amount: state.pillAmount,
                    beforeDinner: state.before,
                    duringDinner: state.during,
                    afterDinner: state.after,
                    notification: state.notificationTime,
                    timeStamp: newDate,
                }

                const input = {
                    text: "http://localhost:3000/dashboard",
                    phones: "32491066364",
                    // Optional parameters
                    sendingTime: newDate,
                }

                // api.sendMessage(input).then(function (data) {
                //     console.log(data);
                // }).catch(function(err){
                //     console.error(err);
                // });
            }

            const result = 'W' //await setSchedule(uid, data)

       
            
            if (!result.message) {
                setMessage({
                    succeed: 'De data is succesvol toegevoegd.'
                })
                setValue({
                    medicine: pillNames[0].value,
                    days: options[1].value,
                    time: moment().format('HH:mm:ss'),
                    pillAmount:  options[1].value,
                    notificationTime:  options[1].value,
                    before: false,
                    during: false,
                    after: false
                })
                setTimeout(() => {
                    setMessage({})
                  }, 3000);
             
            } else if (result.message) {
                setMessage({
                    error: result.message
                })
            }
        } else {
            setMessage({
                error: "Datum of tijd is niet ingesteld"
            })
            return
        }
    }

    return (
        <>
   <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    
        <div className="container add-medicine pb-100">
            <div className="row">
                <div className="col-12">
                    <h2 className="h2-style">Voeg een planning toe</h2>
                    {message.error && 
                        <p className='alert alert-danger'>{message.error}</p>
                    }
                    {message.succeed && 
                        <p className='alert alert-success'>{message.succeed}</p>
                    }

                    <div className="option-container add-medicine__name">
                        <h5>Medicijn naam</h5> 
                       {medicines && 
                        <Select
                            defaultValue={medicines[0]}
                            options={medicines}
                            components={{ Option: CustomSelectOption, SingleValue: CustomName }}
                            onChange={(obj) => setValue({...state, medicine: obj.value})}
                        />}
                    </div>

                    <div className="option-container add-medicine__date row">
                        {/* <h5>Amount & How long?</h5>  */}

                        <div className='col-6'>
                            <h5 className='add-medicine__date__title'> From: </h5>
                            <DatePicker
                                value={selectedDay}
                                onChange={setSelectedDay}
                                renderInput={renderCustomInput} // render a custom input
                                shouldHighlightWeekends
                                
                                />
                        </div>
                        <div className='col-6'>
                        <h5 className='add-medicine__date__title'> Period: </h5>
                            <div className="rangeData">
                                <Select
                                    defaultValue={options[1]}
                                    options={options}
                                    components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                                    onChange={(obj) => setValue({...state, days: obj.value})}
                                    className={'rangeData__select'}
                                />
                                <p>dag(en)</p>
                            </div>


                        </div>
                    </div>

                    <div className="option-container add-medicine__time row">
                        <div className='col-6 '>
                            <TimePicker
                                style={{ width: 100 }}
                                showSecond={showSecond}
                                defaultValue={moment()}
                                className="add-medicine__time__timepicker"
                                onChange={(obj) => setValue({...state, time: obj.format('HH:mm:ss')})}
                                
                            />
                        </div>

                        <div className='col-6 stripe'>
                        <div className="rangeData">
                                <Select
                                    defaultValue={options[1]}
                                    options={options}
                                    components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                                    onChange={(obj) => setValue({...state, pillAmount: obj.value})}
                                />
                                <p> pil(len)</p>
                            </div>
                        </div>
                    </div>  

                    <div className="add-medicine__option row">
                        <h5 className='add-medicine__date__title'>Kies je moment</h5>

                        <fieldset className="checkbox-group">
                            <div className="checkbox">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" className="checkbox-input"  name='before'  checked={state.before}  onChange={() => setValue({...state, before: !state.before})}/>
                                    <span className="checkbox-tile">
                                        <span class="checkbox-icon">
                                            <FontAwesomeIcon className="icon--food" icon={faCoffee} />
                                        </span>
                                        <span className="checkbox-label">Voor</span>
                                    </span>
                                </label>
                            </div>
                            <div className="checkbox">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" className="checkbox-input"  name='during' checked={state.during} onChange={() => setValue({...state, during: !state.during})} />
                                    <span className="checkbox-tile">
                                        <span className="checkbox-icon">
                                            <FontAwesomeIcon className="icon--food" icon={faBreadSlice}/>
                                        </span>
                                        <span className="checkbox-label">Tijdens</span>
                                    </span>
                                </label>
                            </div>
                            <div className="checkbox">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" className="checkbox-input"  name='after' checked={state.after} onChange={() => setValue({...state, after: !state.after})} />
                                    <span className="checkbox-tile">
                                        <span className="checkbox-icon">
                                            <FontAwesomeIcon className="icon--food" icon={faUtensils}/>
                                        </span>
                                        <span className="checkbox-label">Na</span>
                                    </span>
                                </label>
                            </div>
                        </fieldset>
                        <div className="rangeData">
                                <Select
                                    defaultValue={options[1]}
                                    options={options}
                                    components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                                    onChange={(obj) => setValue({...state, notificationTime: obj.value})}

                                />
                                <p> min / voor het eten </p>
                         </div>
                    </div>
              

                    <div className="d-grid gap-2  justify-content-center">
                        <button className="btn " type="button" onClick={onSubmit}>Voeg toe aan planning</button>
                    </div>
                </div>
            </div>
        </div>
        </div >
        </>
    )
}

export default AddMedicine
