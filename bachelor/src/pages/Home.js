import React, {useState} from 'react'
import Week from "../components/Week";
import Reminder from '../components/Reminder';
let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'))

const Home = (props) => {
    const [dateProp, setDateProp] = useState();
    const uid = currentUser.uid

    const handleSetDate  = (dataFromChild) => {
        setDateProp( dataFromChild)
    }

    const CheckMorning = () => {
        let today = new Date()
        let curHr = today.getHours()
        let name = currentUser.displayName
        
        if (curHr < 12) {
            return 'Good morning ' + name 
        } else if (curHr < 18) {
            return 'Good afternoon ' + name 
        } else {
            return 'Good evening ' + name 
        }

    }

    return (
        <div className='full-height'>
            <div className='container-fluid home'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className="white pt-50"><CheckMorning/></h1>
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
