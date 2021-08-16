import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useHistory } from 'react-router-dom';


const FillBox = ({ navigation, formData }) =>{
    const { go } = navigation;
    const history = useHistory()

    const label = [
        { title: `zondag: ${formData.sundayName}`, value: 12.5, color: '#86d8c9' },
        { title: `zaterdag: ${formData.saturdayName}`, value: 12.5, color: '#56cae7' },
        { title: `vrijdag: ${formData.fridayName}`, value: 12.5, color: '#ffcf5c' },
        { title: `donderdag: ${formData.thursdayName}`, value: 12.5, color: '#fa8072' },
        { title: `woensdag: ${formData.wednesdayName}`, value: 12.5, color: '#edceff' },
        { title: `dinsdag: ${formData.tuesdayName}`, value: 12.5, color: '#d799fa' },
        { title: `maandag: ${formData.mondayName}`, value: 12.5, color: '#f8e2f3' },
        { title: 'Leeg', value: 12.5, color: '#C13C37' },

    ]
    console.log(formData)
    return (
        <div className='container pt-100  pb-100'>
            <div className='row chart-wrapper'>
            <h3>Vul de medicatie in zoals aangegeven</h3>
            <div className='chart'>
            
            <PieChart
                label={(props) => { return props.dataEntry.title;}}
                paddingAngle={10}
                startAngle={118}

                labelStyle={(index) => ({
                    fill: label[index].color,
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                  })}
                  labelPosition={112}
                  lineWidth={20}
                  viewBoxSize={[200,200]}
                  center={[100,100]}
             
                    data={label}
                />
                <div className='days-wrapper'>
                    <p className='day__header day__header__monday'>Maandag: {formData.mondayName}</p>
                    <p className='day__header day__header__tuesday'>Dinsdag: {formData.tuesdayName}</p>
                    <p className='day__header day__header__wednesday'>Woensdag: {formData.wednesdayName}</p>
                    <p className='day__header day__header__thursday'>Donderdag: {formData.thursdayName}</p>
                    <p className='day__header day__header__friday'>Vrijdag: {formData.fridayName}</p>
                    <p className='day__header day__header__saturday'>Zaterdag: {formData.saturdayName}</p>
                    <p className='day__header day__header__sunday'>Zondag: {formData.sundayName}</p>
                </div>

                </div>
                <button className='btn pb-100 mx-auto'  onClick={() => history.push('/')}>Terug naar home</button>
            </div>
        </div>
    )
}

export default FillBox
