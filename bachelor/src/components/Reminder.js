import React, { useState, useEffect , useCallback} from 'react';
import { getScheduleByDate } from "../services/auth.services";

const Reminder = (props) => {

    let data = {}
    
    const [tasksRemaining, setTasksRemaining] = useState(0);
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
                className="task mb-3"
                style={{ textDecoration: task.completed ? "line-through" : "" }}
            >
                <div class="row gap-3">
                    <div className="pill-image position-relative col-md-4">
                        <span class="position-absolute start-100 translate-middle badge rounded-pill btn-primary">
                        {task.Amount}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                        <img className='task__image mdl-badge' data-badge="4" src='https://www.freevector.com/uploads/vector/preview/14314/FreeVector-Pill.jpg'></img>
                    </div>

                    <div class="col-md-8">
                        <div className='task-intro'>
                            <h5 className="task-title fw-bold">{task.targetTime}</h5>
                            <h6 className="task-title"> {task.medicineName}</h6>
                        </div>        
                            <hr />
                            {/* <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
                            <button onClick={() => completeTask(index)}>Complete</button> */}

                            <span className="task-cat">
        
                                { task.beforeDinner &&
                                <p> {task.notification}min <span className='food btn--action'> voor het eten</span></p>
                                }
                                
                                { task.duringDinner &&
                                  <p> {task.notification}min <span className='food btn--action'> tijdens het eten</span></p>
                                }
                                
                                { task.afterDinner &&
                                  <p> {task.notification}min <span className='food btn--action'> na het eten</span></p>
                                }

                            </span>
                    </div>
                </div>
        
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
                <ul className="tasks">
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
