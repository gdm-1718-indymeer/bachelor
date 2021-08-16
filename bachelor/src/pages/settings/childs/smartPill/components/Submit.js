import React from "react";
import Box from '../../../../../assets/images/box_down.jpg';

const Submit = ({ navigation, formData }) => {

    const { next } = navigation;
    return (
        <div className='container pt-100  pb-100'>
            <div className='row'>
            <h4 className='text-center'>Leg de doos neer zoals de afbeelding hieronder. ( Deksel verwijderen)</h4>
  
            <img src={Box} className='smartbox-img pt-50' alt='smartBox' />
                 <button className='btn pb-100 jusity-content-center mx-auto ' onClick={next}>Volgende stap</button>
            </div>
        </div>
    );
};

export default Submit;
