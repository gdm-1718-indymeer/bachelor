import React, { useState, useEffect , useCallback} from 'react';
import { getScheduleByDate } from "../services/auth.services";

const Reminder = (props) => {

    const [tasks, setTasks] = useState({});


    const getEvents = useCallback(async (uid, date) => {
        try {
            const response = await getScheduleByDate(uid, date);
            setTasks(response)
            console.log(tasks)

        } catch (e) {
            console.error(e);
        }
    });
    
    useEffect(() => {
        let date = props.handleDate;
        let uid = props.uid
        getEvents(uid, date);
    }, [props.handleDate]);

    function Task({ task, index, completeTask, removeTask }) {
        return (
            <div
                className=" mb-3"
                style={{ textDecoration: task.completed ? "line-through" : "" }}>

                <li class="events__item">
                    <div class="events__item--left">
                        <div className="pill-image position-relative col-md-4">
                            <span class="position-absolute start-100 translate-middle badge rounded-pill btn-primary">
                            {task.Amount}
                                <span class="visually-hidden">unread messages</span>
                            </span>
                            <img className='task__image mdl-badge' data-badge="4" src='https://www.freevector.com/uploads/vector/preview/14314/FreeVector-Pill.jpg'></img>
                        </div>
                        
                        <span class="events__name">{task.medicineName}</span>
                        <span class="events__date">  
                        { task.beforeDinner &&
                                <p> {task.notification}min <span className='food btn--action'> voor het eten</span></p>
                                }
                                
                                { task.duringDinner &&
                                  <p> {task.notification}min <span className='food btn--action'> tijdens het eten</span></p>
                                }
                                
                                { task.afterDinner &&
                                  <p> {task.notification}min <span className='food btn--action'> na het eten</span></p>
                                }</span>
                    </div>
                    <span class="events__tag">{task.targetTime}</span>
                </li>
               
              
        
            </div>
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

    return (
        <div className="container">
                {/* <div className="header">Remaining items {tasksRemaining}</div> */}
                
                <div className="tasks">
                <ul className="events__list">
                {tasks !== null ? <>           
                        {Object.keys(tasks).map(key => (
                            <>
                            <Task
                            task={tasks[key]}
                            index={key}
                            completeTask={completeTask}
                            removeTask={removeTask}
                            key={key}
                            />
                            </>
                        ))}
                    </>: <p>Geen data gepland</p> }
                    </ul>
                </div>
   
            </div>
    )
}

export default Reminder
