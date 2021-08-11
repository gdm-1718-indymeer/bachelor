import React from "react";

import ItemForm from "../ItemForm";
import StateDrop from "../StateDrop";

const Sunday = ({ setForm, formData, navigation }) => {
    const { address, city, state, zip } = formData;

    const { previous, next } = navigation;

    return (
        <div className="form day " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className='day__header day__header__sunday'>
                <h2>Zondag</h2>
                <p> Vul hieronder de gegevens in van Zondag. <br />(Er is maar mogelijkheid tot het toevoegen van 1 medicijn) </p>
                <p></p>
            </div>
            
            <h4 className='pt-50 pb-30'>Medicijnnaam</h4>
            <StateDrop name="state" value={state} onChange={setForm} />

            <h4 className='pt-50 pb-30'>Kies de tijd</h4>
            <ItemForm
                label="Address"
                name="address"
                value={address}
                onChange={setForm}
            />
            <div className='pt-50'>
                <button className='btn' onClick={previous}>Vorige</button>
                <button className='btn' onClick={next}>Volgende</button>
            </div>
        </div>
    );
};

export default Sunday;
