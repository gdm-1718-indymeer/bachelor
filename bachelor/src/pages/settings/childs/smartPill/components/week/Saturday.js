import React from "react";

import ItemForm from "../ItemForm";
import StateDrop from "../StateDrop";

const Saturday = ({ setForm, formData, navigation }) => {
    const { address, city, state, zip } = formData;

    const { previous, next } = navigation;

    return (
        <div className="form day " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className='day__header day__header__saturday'>
                <h2>Zaterdag</h2>
                <p> Vul hieronder de gegevens in van Zaterdag. <br />(Er is maar mogelijkheid tot het toevoegen van 1 medicijn) </p>
                <p></p>
            </div>
            <ItemForm
                label="Address"
                name="address"
                value={address}
                onChange={setForm}
            />
            <ItemForm label="City" name="city" value={city} onChange={setForm} />
            <StateDrop label="State" name="state" value={state} onChange={setForm} />
            <ItemForm label="Zip" name="zip" value={zip} onChange={setForm} />
            <div>
                <button className='btn' onClick={previous}>Vorige</button>
                <button className='btn' onClick={next}>Volgende</button>
            </div>
        </div>
    );
};

export default Saturday;
