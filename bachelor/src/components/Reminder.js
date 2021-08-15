import React, { useState, useEffect } from 'react';
import { getScheduleByDate } from "../services/auth.services";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css"

const Reminder = (props) => {
    const [tasks, setTasks] = useState({});

    const getEvents = (async (uid, date) => {
        try {
            let response = await getScheduleByDate(uid, date);
            let item 

            if (response) {
                item = { Noon: [], Morning: [], Evening: [] }
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
            console.log(tasks)

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
    }, [props.handleDate, props.uid]);

    function Task({ task }) {
        
        return (
            <Link
                to={`/reminder/${task.eventID}`}
                className=" mb-3"
                 data-aos="fade-up" key={task.eventID}>

                <li className={`events__item ${task.isTaken ? '' : 'events__item__not '}`} key={task.eventID}>
                    <div className="events__item--left">
                        <div className="pill-image position-relative col-md-4">
                            <span className="position-absolute start-100 translate-middle badge rounded-pill btn-primary">
                                {task.Amount}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                            <img className='task__image mdl-badge' data-badge="4" src='https://www.freevector.com/uploads/vector/preview/14314/FreeVector-Pill.jpg' alt='img'></img>
                        </div>

                        <div className='medication-wrapper'>
                            <span className="events__name">{task.medicineName}</span>
                            <span className="events__date">
                                {task.beforeDinner &&
                                    <p> <span className="tag before"> {task.notification}min voor het eten</span></p>
                                }

                                {task.duringDinner &&
                                    <p> <span className="tag during"> tijdens het eten</span></p>
                                }

                                {task.afterDinner &&
                                    <p> <span className="tag after"> {task.notification}min na het eten</span></p>
                                }

                                <span className='notTaken'>{task.isTaken ? '' : 'Nog niet genomen '}</span>
                            </span>
                        </div>
                    </div>
                    <span className="events__tag">{task.targetTime}</span>
                </li>

            </Link>
        );
    }

    return (
            <div className="tasks">
                <ul className="events__list" data-aos="fade-up" key={Math.random()}>
                    {tasks ? <>

                        {tasks.Morning && tasks.Morning.length > 0 ?
                            <>
                                <h3 className='events__list__time'>Ochtend</h3>
                                {Object.keys(tasks.Morning).sort((timeA, timeB)=> { return tasks.Morning[timeB].timeStamp - tasks.Morning[timeA].timeStamp; }).map(key => (
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
    )
}

export default Reminder
