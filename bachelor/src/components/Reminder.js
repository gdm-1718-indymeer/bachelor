import React, { useState, useEffect, useCallback } from 'react';
import { getScheduleByDate } from "../services/auth.services";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css"

const Reminder = (props) => {
    const [tasks, setTasks] = useState({});

    const getEvents = useCallback(async (uid, date) => {
        try {
            let response = await getScheduleByDate(uid, date);
            let item = { Noon: [], Morning: [], Evening: [] }

            if (response) {
                Object.entries(response).forEach(([key, val]) => {
                    let obj = {}
                    let hour = Number(val.targetTime.split(':')[0])
                    obj = val
                    Object.assign(obj, { eventID: key })

                    if (hour <= 12) {
                        item.Morning.push(obj)
                    } else if (hour <= 18) {
                        item.Noon.push(obj)
                    } else if (hour => 18) {
                        item.Evening.push(obj)
                    }
                })
            }
            setTasks(item)
        } catch (e) {
            console.error(e);
        }
    });

    useEffect(() => {
        let date = props.handleDate;
        let uid = props.uid
        getEvents(uid, date);
         
        AOS.refresh();
        AOS.init({
            duration: 1000
       });
    }, [props.handleDate]);

    function Task({ task }) {
        return (
            <Link
                to={`/reminder/${task.eventID}`}
                className=" mb-3"
                style={{ textDecoration: task.completed ? "line-through" : "" }} data-aos="fade-up" key={Math.random()}>

                <li className="events__item">
                    <div className="events__item--left">
                        <div className="pill-image position-relative col-md-4">
                            <span className="position-absolute start-100 translate-middle badge rounded-pill btn-primary">
                                {task.Amount}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                            <img className='task__image mdl-badge' data-badge="4" src='https://www.freevector.com/uploads/vector/preview/14314/FreeVector-Pill.jpg'></img>
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
                    <span class="events__tag">{task.targetTime}</span>
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

                        {tasks.Morning && tasks.Morning.length > 0 ?
                            <>
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
                            </> : null}

                        {tasks.Noon && tasks.Noon.length > 0 ?
                            <>
                                <h3 className='events__list__time'>Middag</h3>
                                {Object.keys(tasks.Noon).map(key => (
                                    <>
                                        <Task
                                            task={tasks.Noon[key]}
                                            index={key}
                                            key={key}
                                        />
                                    </>
                                ))}
                            </> : null}


                        {tasks.Evening && tasks.Evening.length > 0 ?
                            <>
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
                    </> : <p>Geen data gepland</p>}
                </ul>
            </div>

        </div>
    )
}

export default Reminder
