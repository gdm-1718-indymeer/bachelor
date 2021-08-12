import React, {useEffect} from "react";
import ItemForm from "../ItemForm";
import StateDrop from "../StateDrop";

const Monday = ({ setForm, formData, navigation }) => {
    let { mondayName, mondayTime , mondayDate} = formData;

    const { previous, next } = navigation;

    const handleUser = (target) => {
        mondayName = target
    }

    const handleTime = (target) => {
        mondayTime = target
    }


    return (
        <div className="form day " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className='day__header day__header__monday'>
                <h2>Maandag {mondayDate}</h2>
                <p> Vul hieronder de gegevens in van Maandag. <br />(Er is maar mogelijkheid tot het toevoegen van 1 medicijn) </p>
                <p></p>
            </div>

            <h4 className='pt-50 pb-30'>Medicijnnaam</h4>
            <StateDrop name="mondayName" value={mondayName} sendToParent={handleUser} onChange={setForm} />

            <h4 className='pt-50 pb-30'>Kies de tijd</h4>
            <ItemForm
                name="mondayTime"
                value={mondayTime}
                sendToParent={handleTime}
                onChange={setForm}
            />
            <div className='pt-50'>
                <button className='btn' >Vorige</button>
                <button className='btn' onClick={next}>Volgende</button>
            </div>
        </div>
    );
};

export default Monday;
