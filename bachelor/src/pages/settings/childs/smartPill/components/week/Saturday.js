import React from "react";
import {startOfWeek , format} from 'date-fns'
import ItemForm from "../ItemForm";
import StateDrop from "../StateDrop";

const Saturday = ({ setForm, formData, navigation }) => {
    let { saturdayName, saturdayTime , saturdayDate} = formData;

    const { previous, next } = navigation;

    const handleUser = (target) => {
        saturdayName = target
    }

    const handleTime = (target) => {
        saturdayTime = target
    }

    return (
        <div className="form day " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className='day__header day__header__saturday'>
                <h2>Zaterdag {saturdayDate}</h2>
                <p> Vul hieronder de gegevens in van Zaterdag. <br />(Er is maar mogelijkheid tot het toevoegen van 1 medicijn) </p>
                <p></p>
            </div>
            
            <h4 className='pt-50 pb-30'>Medicijnnaam</h4>
            <StateDrop name="saturdayName" value={saturdayName} sendToParent={handleUser} onChange={setForm} />

            <h4 className='pt-50 pb-30'>Kies de tijd</h4>
            <ItemForm
                name="saturdayTime"
                value={saturdayTime}
                sendToParent={handleTime}
                onChange={setForm}
            />
            <div className='pt-50'>
                <button className='btn' onClick={previous}>Vorige</button>
                <button className='btn' onClick={next}>Volgende</button>
            </div>
        </div>
    );
};

export default Saturday;
