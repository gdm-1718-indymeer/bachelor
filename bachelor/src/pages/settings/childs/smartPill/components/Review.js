import React, {useCallback} from "react";
import {addDataMedBox} from '../../../../../services/auth.services';

const Review = ({ setForm, formData, navigation , boxkey}) => {
    const {
        mondayName,
        mondayTime,
        mondayDate,
        tuesdayName,
        tuesdayTime,
        tuesdayDate,
        wednesdayName,
        wednesdayTime,
        wednesdayDate,
        thursdayName,
        thursdayTime,
        thursdayDate,
        fridayName,
        fridayTime,
        fridayDate,
        saturdayName,
        saturdayTime,
        saturdayDate,
        sundayName,
        sundayTime,
        sundayDate,
    } = formData;
    const { go } = navigation;

    const pushData = useCallback(async () => {

        console.log(boxkey)

        try {
            await addDataMedBox(boxkey.boxKey, boxkey.uid, formData);
            go('submit')
        } catch (e) {
            console.error(e);
        }
    });

    return (
        <div className="form">
            <h3>Herbekijk de door jouw ingevoerde data</h3>
            <div className='edit_data'>
                <div className='day__header day__header__monday'>
                    <h3>Maandag {mondayDate}</h3>
                    <button onClick={() => go("monday")}>Bewerken</button>
                </div>
                <div>
                    <p>Medicatie: {mondayName},</p>
                    <p>Tijd: {mondayTime},</p>
                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__tuesday'>
                    <h3>Dinsdag {tuesdayDate}</h3>
                    <button onClick={() => go("tuesday")}>Bewerken</button>
                </div>
                <div>
                    <p>Medicatie: {tuesdayName},</p>
                    <p>Tijd: {tuesdayTime},</p>
                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__wednesday'>
                    <h3>Woensdag {wednesdayDate}</h3>
                    <button onClick={() => go("wednesday")}>Bewerken</button>
                </div>
                <div>
                    <p>Medicatie: {wednesdayName},</p>
                    <p>Tijd: {wednesdayTime},</p>
                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__thursday'>
                    <h3>Donderdag {thursdayDate}</h3>
                    <button onClick={() => go("thursday")}>Bewerken</button>
                </div>
                <div>
                    <p>Medicatie: {thursdayName},</p>
                    <p>Tijd: {thursdayTime},</p>
                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__friday'>
                    <h3>Vrijdag {fridayDate}</h3>
                    <button onClick={() => go("vrijdag")}>Bewerken</button>
                </div>
                <div>
                    <p>Medicatie: {fridayName},</p>
                    <p>Tijd: {fridayTime},</p>
                </div>
            </div>


            <div className='edit_data'>
                <div className='day__header day__header__saturday'>
                    <h3>Zaterdag {saturdayDate}</h3>
                    <button onClick={() => go("saturday")}>Bewerken</button>
                </div>
                <div>
                    <p>Medicatie: {saturdayName},</p>
                    <p>Tijd: {saturdayTime},</p>
                </div>
            </div>


            <div className='edit_data'>
                <div className='day__header day__header__sunday'>
                    <h3>Zondag {sundayDate}</h3>
                    <button onClick={() => go("sunday")}>Bewerken</button>
                </div>
                <div>
                    <p>Medicatie: {sundayName},</p>
                    <p>Tijd: {sundayTime},</p>
                </div>
            </div>
          
            <div className='upload-wrapper'>
                <button className='btn' onClick={pushData}>Verzenden</button>
            </div>
        </div>
    );
};

export default Review;
