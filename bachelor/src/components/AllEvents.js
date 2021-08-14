import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css"

const AllEvents = (props) => {

    const [tasks, setTasks] = useState({});

    useEffect(() => {
        let date = props.date;
        let data = props.events
  
        AOS.refresh();
        AOS.init({
            duration: 1000
       });
    
        let items = []
        let timeOfTheDay = { Noon: [], Morning: [], Evening: [] }

        console.log(date)
        if (date === undefined || date === null) {
            let currentDate = new Date();
            let day = currentDate.getDate()
            let month = currentDate.getMonth() + 1
            let year = currentDate.getFullYear()
            date = `${day}/${month}/${year}`
        } else {
            date = `${date.day}/${date.month}/${date.year}`
        }

        Object.entries(data).forEach(([key, val]) => {

            if (val.targetDate === date) {
                let rawData = val

                Object.assign(rawData, { eventID: key })
                items.push(rawData)
            }
        })


        Object.entries(items).forEach(([key, val]) => {
            let obj = {}
            let hour = Number(val.targetTime.split(':')[0])
            obj = val
            if (hour <= 12) {
                timeOfTheDay.Morning.push(obj)
            } else if (hour <= 18) {
                timeOfTheDay.Noon.push(obj)
            } else if (hour => 18) {
                timeOfTheDay.Evening.push(obj)
            }

        })

        setTasks(timeOfTheDay)

    }, [props.date, props.events]);


    function Task({ task}) {

        return (
            <Link key="index"
                to={`/reminder/${task.eventID}`}
                className=" mb-3"
                // eslint-disable-next-line react/jsx-no-duplicate-props
                style={{ textDecoration: task.completed ? "line-through" : "" }} data-aos="fade-up" key={task.eventID}>

                <li className="events__item" >
                    <div className="events__item--left">
                        <div className="pill-image position-relative col-md-4">
                            <span className="position-absolute start-100 translate-middle badge rounded-pill btn-primary">
                                {task.Amount}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                            <img className='task__image mdl-badge' alt='medicine' data-badge="4" src='https://www.freevector.com/uploads/vector/preview/14314/FreeVector-Pill.jpg'></img>
                        </div>

                        <span className="events__name">{task.medicineName}</span>
                        <span className="events__date">
                            {task.beforeDinner &&
                                <p> {task.notification}min <span className='food btn--action'> voor het eten</span></p>
                            }

                            {task.duringDinner &&
                                <p> {task.notification}min <span className='food btn--action'> tijdens het eten</span></p>
                            }

                            {task.afterDinner &&
                                <p> {task.notification}min <span className='food btn--action'> na het eten</span></p>
                            }</span>
                    </div>
                    <span className="events__tag">{task.targetTime}</span>
                </li>



            </Link>
        );
    }

    return (
        <div className="container">
            {/* <div className="header">Remaining items {tasksRemaining}</div> */}

            <div className="tasks">
                <ul className="events__list" data-aos="fade-up" key={Math.random()}>
                    {tasks ? <>
                        {tasks.Morning && tasks.Morning.length > 0 ? <>
                            <div>
                                <h3 className='events__list__time'>Ochtend</h3>
                                {Object.keys(tasks.Morning).map(key => (
                                    <>
                                        <Task
                                            task={tasks.Morning[key]}
                                            index={key}
                                            key={key}
                                        />
                                    </>
                                ))}
                            </div>
                        </> : null}
                        {
                            tasks.Noon && tasks.Noon.length > 0 ? <>
                                <h3 className='events__list__time'>Middag</h3>
                                {Object.keys(tasks.Noon).map(key => (
                                    <>
                                        <Task
                                            task={tasks.Noon[key]}
                                            index={key}
                                            key={key}
                                        />
                                    </>))}
                            </>
                                : null
                        }

                        {tasks.Evening && tasks.Evening.length > 0 ? <>
                            <h3 className='events__list__time'>Avond</h3>
                            {Object.keys(tasks.Evening).map(key => (
                                <>
                                    <Task
                                        task={tasks.Evening[key]}
                                        index={key}
                                        key={key}
                                    />
                                </>
                            ))}
                        </> : null}
                    </> :
                        <p>Geen data gepland</p>}
                </ul>
            </div>

        </div>
    )
}

export default AllEvents
