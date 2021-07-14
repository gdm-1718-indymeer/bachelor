import React from 'react'
import Week from "../components/Week";
import Reminder from '../components/Reminder';

const Home = (props) => {
    return (
        <div>
            <div className='container-fluid home'>
                <div className='row'>
                    <div className='col-12'>
                        <h1>Je dagelijkse overzicht</h1>
                    </div>
                    <Week />
                </div>
            </div>

            <div className='overview'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='overview__activity'>Today</h3>
                            <Reminder />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
