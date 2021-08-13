import React from "react";
import ItemForm from "../ItemForm";
import StateDrop from "../StateDrop";

const Tuesday = ({ setForm, formData, navigation }) => {
    let { tuesdayName, tuesdayTime , tuesdayDate } = formData;

    const { previous, next } = navigation;


    const handleUser = (target) => {
        tuesdayName = target
    }

    const handleTime = (target) => {
        tuesdayTime = target
    }


    return (
        <div className="form day " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className='day__header day__header__tuesday'>
                <h2>Dinsdag {tuesdayDate}</h2>
                <p> Vul hieronder de gegevens in van Dinsdag. <br />(Er is maar mogelijkheid tot het toevoegen van 1 medicijn) </p>
                <p></p>
            </div>
            
            <h4 className='pt-50 pb-30'>Medicijnnaam</h4>
            <StateDrop name="tuesdayName" value={tuesdayName} sendToParent={handleUser} onChange={setForm} />

            <h4 className='pt-50 pb-30'>Kies de tijd</h4>
            <ItemForm
                name="tuesdayTime"
                value={tuesdayTime}
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

export default Tuesday;
