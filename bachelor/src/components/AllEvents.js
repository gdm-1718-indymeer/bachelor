import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const AllEvents = (props) => {

    const [tasks, setTasks] = useState({});


    useEffect(() => {
        let date = props.date;
        let data = props.events
        let items = []
        let timeOfTheDay = { Noon: [], Morning: [], Evening: [] }

        if (date == undefined) {
            let currentDate = new Date();
            let day = currentDate.getDate()
            let month = currentDate.getMonth() + 1
            let year = currentDate.getFullYear()
            date = `${day}/${month}/${year}`
        } else {
            date = `${date.day}/${date.month}/${date.year}`
        }

        Object.entries(data).forEach(([key, val]) => {
            let obj = {}
            obj = val
            Object.assign(obj, { eventID: key })

            if (val.targetDate === date) {
                items.push(obj)
            }
        })


        Object.entries(items).forEach(([key, val]) => {
            let obj = {}
            let hour = Number(val.targetTime.split(':')[0])
            obj = val
            Object.assign(obj, { eventID: key })

            if (hour <= 12) {
                timeOfTheDay.Morning.push(obj)
            } else if (hour <= 18) {
                timeOfTheDay.Noon.push(obj)
            } else if (hour => 18) {
                timeOfTheDay.Evening.push(obj)
            }

        })

        setTasks(timeOfTheDay)
    }, [props.date]);


    function Task({ task, index, completeTask, removeTask }) {
        return (
            <Link key="index"
                to={`/reminder/${task.eventID}`}
                className=" mb-3"
                style={{ textDecoration: task.completed ? "line-through" : "" }}>

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


    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };
    console.log(tasks)
    return (
        <div className="container">
            {/* <div className="header">Remaining items {tasksRemaining}</div> */}

            <div className="tasks">
                <ul className="events__list">
                    {tasks ? <>
                        {tasks.Morning && tasks.Morning.length > 0 ? <>
                            <div>
                                <h3 className='events__list__time'>Ochtend</h3>
                                {Object.keys(tasks.Morning).map(key => (
                                    <>
                                        <Task
                                            task={tasks.Morning[key]}
                                            index={key}
                                            completeTask={completeTask}
                                            removeTask={removeTask}
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
                                            completeTask={completeTask}
                                            removeTask={removeTask}
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
                                        completeTask={completeTask}
                                        removeTask={removeTask}
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
