import React from "react";
import ItemForm from "../ItemForm";
import StateDrop from "../StateDrop";

const Wednesday = ({ setForm, formData, navigation }) => {
    let { wednesdayName, wednesdayTime , wednesdayDate } = formData;

    const { previous, next } = navigation;

    const handleUser = (target) => {
        wednesdayName = target
    }

    const handleTime = (target) => {
        wednesdayTime = target
    }

    return (
        <div className="form day " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className='day__header day__header__wednesday'>
                <h2>Woensdag {wednesdayDate}</h2>
                <p> Vul hieronder de gegevens in van Woensdag. <br />(Er is maar mogelijkheid tot het toevoegen van 1 medicijn) </p>
                <p></p>
            </div>
            
            <h4 className='pt-50 pb-30'>Medicijnnaam</h4>
            <StateDrop name="wednesdayName" value={wednesdayName} sendToParent={handleUser} onChange={setForm}/>

            <h4 className='pt-50 pb-30'>Kies de tijd</h4>
            <ItemForm
                name="wednesdayTime"
                value={wednesdayTime}
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

export default Wednesday;
