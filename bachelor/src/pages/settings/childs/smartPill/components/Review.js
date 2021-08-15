import React from "react";
import {addDataMedBox} from '../../../../../services/auth.services';
import { setSchedule, uuidv4 } from '../../../../../services/auth.services';

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

    // create timestamp 
    let toDate = (year, month, day, hour, minute) => {
        return new Date(year, month - 1, day, hour, minute);
    };

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday','sunday']
    const toTimestamp = (date) => {
        return Math.floor(date.getTime() / 1000);
    };
      
    const pushData = (async () => {

        console.log(formData)

        try {
            let data = {};
            let form = [formData]
            let keys = [];
            for (const property in days) {
                console.log(`${property}: ${days[property]}`);
                    let uid = uuidv4();
                    let name =  formData[days[property]+'Name']
                    let time =  formData[days[property]+'Time']
                    let dayDate =  formData[days[property]+'Date']
                    formData[days[property]+'Key'] = uid
                    keys = [...keys, uid]
            

                    var splitDay = dayDate.split('/'); // split it at the colons
                    let day = Number(splitDay[0]);
                    let month = Number(splitDay[1]);
                    let year = Number(splitDay[2]);

                    var splitTime = time.split(':'); // split it at the colons
                    let hour = Number(splitTime[0]);
                    let minute = Number(splitTime[1]);
                   
                    const date = toDate(year,month,day,hour,minute);
                    let newDate = toTimestamp(date);

                    console.log(newDate)

                    data[uid] = {
                        medicineName: name,
                        medicineValue: name,
                        targetDate: dayDate,
                        numberOfDays: 1,
                        targetTime: time,
                        Amount: 1,
                        beforeDinner: false,
                        duringDinner: false,
                        afterDinner: false,
                        notification: 1,
                        timeStamp: newDate,
                        isTaken: false,
                        sendFirstReminder: false,
                        sendAdminReminder: false,
                    };

            
              }
              formData = {...formData, ...{keys}}
    
            await addDataMedBox(boxkey.boxKey, boxkey.uid, formData);
            await setSchedule(boxkey.uid, data)
            // go('submit')
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
                    <div className='description'>
                        <p>Medicatie: {mondayName}</p>
                        <p>Tijd: {mondayTime}</p>
                    </div>
                    <button className='btn btn-white' onClick={() => go("monday")}>Bewerken</button>
                </div>
                <div>
  
                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__tuesday'>
                    <h3>Dinsdag {tuesdayDate}</h3>
                    <div className='description'>
                        <p>Medicatie: {tuesdayName}</p>
                        <p>Tijd: {tuesdayTime}</p>
                    </div>
                    <button className='btn btn-white' onClick={() => go("tuesday")}>Bewerken</button>
                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__wednesday'>
                    <h3>Woensdag {wednesdayDate}</h3>
                    <div className='description'>
                        <p>Medicatie: {wednesdayName}</p>
                        <p>Tijd: {wednesdayTime}</p>
                    </div>
                    <button className='btn btn-white' onClick={() => go("wednesday")}>Bewerken</button>
                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__thursday'>
                    <h3>Donderdag {thursdayDate}</h3>
                    <div className='description'>
                        <p>Medicatie: {thursdayName}</p>
                        <p>Tijd: {thursdayTime}</p>
                    </div>
                    <button className='btn btn-white' onClick={() => go("thursday")}>Bewerken</button>
                </div>
                <div>

                </div>
            </div>

            <div className='edit_data'>
                <div className='day__header day__header__friday'>
                    <h3>Vrijdag {fridayDate}</h3>
                    <div className='description'>
                        <p>Medicatie: {fridayName}</p>
                        <p>Tijd: {fridayTime}</p>
                    </div>
                    <button className='btn btn-white' onClick={() => go("vrijdag")}>Bewerken</button>
                </div>
            </div>


            <div className='edit_data'>
                <div className='day__header day__header__saturday'>
                    <h3>Zaterdag {saturdayDate}</h3>
                    <div className='description'>
                        <p>Medicatie: {saturdayName}</p>
                        <p>Tijd: {saturdayTime}</p>
                    </div>
                    <button className='btn btn-white' onClick={() => go("saturday")}>Bewerken</button>
                </div>
            </div>


            <div className='edit_data'>
                <div className='day__header day__header__sunday'>
                    <h3>Zondag {sundayDate}</h3>
                    <div className='description'>
                        <p>Medicatie: {sundayName}</p>
                        <p>Tijd: {sundayTime}</p>
                    </div>
                    <button className='btn btn-white' onClick={() => go("sunday")}>Bewerken</button>
                </div>
            </div>
          
            <div className='upload-wrapper pb-100'>
                <button className='btn' onClick={pushData}>Verzenden</button>
            </div>
        </div>
    );
};

export default Review;
