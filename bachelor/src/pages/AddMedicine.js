import React from 'react'
import ReactDom from 'react-dom';
import Select, { components } from 'react-select'
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBreadSlice, faCalendar, faClock, faCoffee, faPills, faPrescriptionBottleAlt, faTimes, faTimesCircle, faUtensils } from '@fortawesome/free-solid-svg-icons'

import 'rc-time-picker/assets/index.css';



const { Option } = components
const showSecond = false;


const pillNames = [
    { value: 'Paracetamol', label: 'Paracetamol' },
    { value: 'Ibuprofen', label: 'Ibuprofen' }
]

const options = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' }
]

const iconStyle = {
    position: 'absolute',
    width: '24px',
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const starPath = "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"

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
      {props.data.label + 'pills'}

    </div>
)

let getIcon = (path, style = {}) => {
    return (
      <i
        style={{
          fontSize: '12px',
          fontStyle: 'normal',
          color: '#aaa',
          display: 'inline-block',
          lineHeight: '1',
          width: '20px',
          transition: 'color 0.3s ease',
          ...style,
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          width="1em"
          height="1em"
          fill="currentColor"
          style={{ verticalAlign: '-.125em' }}
        >
          <path d={path} p-id="5827" />
        </svg>
      </i>
    );
  };

const AddMedicine = () => {

  
    const inputIcon = getIcon(starPath, iconStyle);

    return (
        <div className="container pb-100">
            <div className="row">
                <div className="col-12">
                    <h2>Voeg een planning toe</h2>

                    <div className="option-container">
                        <h5>Medicijn naam</h5> 
                        <Select
                            defaultValue={pillNames[0]}
                            options={pillNames}
                            components={{ Option: CustomSelectOption, SingleValue: CustomName }}
                        />
                    </div>

                    <div className="option-container row">
                        <h5>Amount & How long?</h5> 

                        <div className='col-6'>
                            <Select
                                defaultValue={options[0]}
                                options={options}
                                components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                            />
                        </div>
                        <div className='col-6'>
                            <Select
                                defaultValue={options[0]}
                                options={options}
                                components={{ Option: CustomSelectOption, SingleValue: CustomAmount }}
                            />
                        </div>
                    </div>

                    <div className="option-container row">
                    <fieldset class="checkbox-group">
                        <legend class="checkbox-group-legend">Choose your favorites</legend>
                        <div class="checkbox">
                            <label class="checkbox-wrapper">
                                <input type="checkbox" class="checkbox-input" />
                                <span class="checkbox-tile">
                                    <span class="checkbox-icon">
                                        <FontAwesomeIcon className="icon--food" icon={faCoffee} />
                                    </span>
                                    <span class="checkbox-label">Ontbijt</span>
                                </span>
                            </label>
                        </div>
                        <div class="checkbox">
                            <label class="checkbox-wrapper">
                                <input type="checkbox" class="checkbox-input"  />
                                <span class="checkbox-tile">
                                    <span class="checkbox-icon">
                                        <FontAwesomeIcon className="icon--food" icon={faBreadSlice}/>
                                    </span>
                                    <span class="checkbox-label">Middag</span>
                                </span>
                            </label>
                        </div>
                        <div class="checkbox">
                            <label class="checkbox-wrapper">
                                <input type="checkbox" class="checkbox-input" />
                                <span class="checkbox-tile">
                                    <span class="checkbox-icon">
                                        <FontAwesomeIcon className="icon--food" icon={faUtensils}/>
                                    </span>
                                    <span class="checkbox-label">Avond</span>
                                </span>
                            </label>
                        </div>
                    </fieldset>
                    </div>


                    <div className="option-container row">
                    <h5>Notification</h5> 

                        <TimePicker
                            style={{ width: 100 }}
                            showSecond={showSecond}
                            defaultValue={moment()}
                            inputIcon={ inputIcon }

                            className="xxx"
                        />
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default AddMedicine
