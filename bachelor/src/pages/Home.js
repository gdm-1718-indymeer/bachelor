import React, {useState} from 'react'
import Week from "../components/Week";
import Reminder from '../components/Reminder';

const Home = (props) => {
    const [dateProp, setDateProp] = useState();
    let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))
    const uid = currentUser.uid

    const handleSetDate  = (dataFromChild) => {
        setDateProp( dataFromChild)
    }

    return (
        <div>
            <div className='container-fluid home'>
                <div className='row'>
                    <div className='col-12'>
                        <h1>Je dagelijkse overzicht</h1>
                    </div>
                    <Week handleSetDate={handleSetDate }/>
                </div>
            </div>

            <div className='overview'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='overview__activity'>Today</h3>
                            {dateProp &&
                                <Reminder handleDate={dateProp} uid={uid}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
