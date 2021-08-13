import React from "react";
import ItemForm from "../ItemForm";
import StateDrop from "../StateDrop";

const Friday = ({ setForm, formData, navigation }) => {
    let { fridayName, fridayTime , fridayDate} = formData;

    const { previous, next } = navigation;

    const handleUser = (target) => {
        fridayName = target
    }

    const handleTime = (target) => {
        fridayTime = target
    }

    return (
        <div className="form day " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className='day__header day__header__friday'>
                <h2>Vrijdag {fridayDate}</h2>
                <p> Vul hieronder de gegevens in van Vrijdag. <br />(Er is maar mogelijkheid tot het toevoegen van 1 medicijn) </p>
                <p></p>
            </div>
            
            <h4 className='pt-50 pb-30'>Medicijnnaam</h4>
            <StateDrop name="fridayName" value={fridayName} sendToParent={handleUser} onChange={setForm} />

            <h4 className='pt-50 pb-30'>Kies de tijd</h4>
            <ItemForm
                name="fridayTime"
                value={fridayTime}
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

export default Friday;
