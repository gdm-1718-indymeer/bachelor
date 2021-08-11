import React from "react";

import ItemForm from "./ItemForm";
import { ReactComponent as Pill } from '../../../../../assets/images/pillApp.svg'

const Fill = ({ setForm, formData, navigation }) => {
    const { firstName, lastName, nickName } = formData;

    const { next } = navigation;

    return (
        <div className="smartbox " data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic"
        >
            <Pill className="smartbox__image" />

            <div className='d-flex justify-content-center'>
                <button className='btn' onClick={next}>Click om de pilldoos te vullen</button>

            </div>
        </div>
    );
};

export default Fill;
