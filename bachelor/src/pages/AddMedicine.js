import {React , useState} from 'react'
import Select, { components } from 'react-select'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { setSchedule, uuidv4 } from "../services/auth.services";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBreadSlice, faCoffee, faPills, faPrescriptionBottleAlt, faUtensils } from '@fortawesome/free-solid-svg-icons'

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

import 'rc-time-picker/assets/index.css';



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
   // options = [...options, option]
   
}

const CustomSelectOption = props => (
  <Option {...props}>
        {props.data.label}
  </Option>
)

const CustomName = props => (
    <div>
    <FontAwesomeIcon className="icon--add" icon={faPrescriptionBottleAlt}/>
      {props.data.label}
    </div>
)

const CustomAmount = props => (
    <div>
    <FontAwesomeIcon className="icon--add" icon={faPills}/>
      {props.data.label}

    </div>
)

const toTimestamp = (year,month,day,hour, minute, second) =>{
    var datum = new Date(Date.UTC(year,month-1,day,hour, minute, second));
    return datum.getTime()/1000;
   }


const AddMedicine = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [message, setMessage] = useState(false);

    const [state, setValue] = useState({
        medicine: pillNames[0].value,
        days: options[1].value,
        amount: options[1].value,
        time: moment().format('HH:mm:ss'),
        pillAmount:  options[1].value,
        notificationTime:  options[1].value,
        before: false,
        during: false,
        after: false
    });

    let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];



    const renderCustomInput = ({ ref }) => (
        <input
          ref={ref} // necessary
          placeholder="Datum"
          value={selectedDay ? ` ${selectedDay.day} ${months[selectedDay.month - 1]}` : ''}
          style={{
            textAlign: 'center',
            padding: '0.5rem 1.5rem',
            border: '1px solid #9c88ff',
            borderRadius: '100px',
            color: '#9c88ff',
            outline: 'none',
          }}
          className="my-custom-input-class" // a styling class
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
            let hour = a[0];
            let  minute = a[1];
            let second = a[2];


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
                    timestamp: newDate,
                }
            }
            const result = await setSchedule(uid, data)
            
            if (!result.message) {
                setMessage({
                    succeed: 'De data is succesvol toegevoegd.'
                })
                setValue({})
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
        <div className="container pb-100">
            <div className="row">
                <div className="col-12">
                    <h2>Voeg een planning toe</h2>
                    {message.error && 
                        <p className='alert alert-danger'>{message.error}</p>
                    }
                    {message.succeed && 
                        <p className='alert alert-success'>{message.succeed}</p>
                    }
                    <div className="option-container">
                        <h5>Medicijn naam</h5> 
                        <Select
                            defaultValue={pillNames[0]}
                            options={pillNames}
                            components={{ Option: CustomSelectOption, SingleValue: CustomName }}
                            onChange={(obj) => setValue({...state, medicine: obj.value})}
                        />
                    </div>

                    <div className="option-container row">
                        <h5>Amount & How long?</h5> 

                        <div className='col-6'>
                            <h5> From: </h5>
                            <DatePicker
                                value={selectedDay}
                                onChange={setSelectedDay}
                                renderInput={renderCustomInput} // render a custom input
                                shouldHighlightWeekends
                                
                                />
                        </div>
                        <div className='col-6'>
                        <h5> Period: </h5>
                            <div className="rangeData">
                                <Select
                                    defaultValue={options[1]}
                                    options={options}
                                    components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                                    onChange={(obj) => setValue({...state, days: obj.value})}
                                />
                                <p>days</p>
                            </div>
                            <div className="rangeData">
                                <Select
                                    defaultValue={options[1]}
                                    options={options}
                                    components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                                    onChange={(obj) => setValue({...state, amount: obj.value})}
                                />
                                <p>/ per day</p>
                            </div>

                        </div>
                    </div>

                    <div className="option-container time-select row">
                        <div className='col-6'>
                            <TimePicker
                                style={{ width: 100 }}
                                showSecond={showSecond}
                                defaultValue={moment()}
                                className="xxx"
                                onChange={(obj) => setValue({...state, time: obj.format('HH:mm:ss')})}
                                
                            />
                        </div>

                        <div className='col-6'>
                        <div className="rangeData">
                                <Select
                                    defaultValue={options[1]}
                                    options={options}
                                    components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                                    onChange={(obj) => setValue({...state, pillAmount: obj.value})}
                                />
                                <p> pillen</p>
                            </div>
                        </div>
                    </div>  

                    <div className="option-container row">
                    <fieldset className="checkbox-group">
                        <legend className="checkbox-group-legend">Choose your favorites</legend>
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
              

                    <div className="d-grid gap-2 d-md-block">
                        <button className="btn btn-primary" type="button" onClick={onSubmit}>Voeg toe aan planning</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMedicine
