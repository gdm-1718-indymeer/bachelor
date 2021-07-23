import React, { useState, useEffect , useCallback} from 'react';
import { getScheduleByDate } from "../services/auth.services";

const Reminder = (props) => {

    let data = {}
    
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState({
 
    }
        // {
        //     title: "Ibuprofen",
        //     dose: '150g, 1 capsule',
        //     when: 'after breakfast',
        //     time: '8:00pm',
        //     icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E1272bu1zV2zuYlyRXR3ipZUFqHNoezMvA&usqp=CAU',
        //     completed: true,
        // },
        // {
        //     title: "Dafalgan",
        //     dose: '150g, 1 capsule',
        //     when: 'after breakfast',
        //     time: '8:00pm',
        //     icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E1272bu1zV2zuYlyRXR3ipZUFqHNoezMvA&usqp=CAU',
        //     completed: true
        // },
        // {
        //     title: "Ibu",
        //     dose: '150g, 1 capsule',
        //     when: 'after breakfast',
        //     time: '8:00pm',
        //     icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E1272bu1zV2zuYlyRXR3ipZUFqHNoezMvA&usqp=CAU',
        //     completed: false
        // }
    );


    const getEvents = useCallback(async (uid, date) => {
        try {
            const response = await getScheduleByDate(uid, date);
            setTasks(response)

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
                className="task"
                style={{ textDecoration: task.completed ? "line-through" : "" }}
            >
                <li class="one red">
                    <span className="task-title"> {task.medicineName}</span>
                     <span className="task-time">{task.targetTime}</span>
                    <span className="task-cat">
  
                        { task.beforeDinner &&
                         <button class="btn btn--action"> Voor het eten</button>
                        }
                        
                        { task.duringDinner &&
                         <button class="btn btn--action"> Tijdens het eten</button>
                        }
                        
                        { task.afterDinner &&
                         <button class="btn btn--action"> Na het eten</button>
                        }

                    </span>
                </li>
                 
                <img className='task__image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E1272bu1zV2zuYlyRXR3ipZUFqHNoezMvA&usqp=CAU'></img>
                {task.Amount}

                <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
                <button onClick={() => completeTask(index)}>Complete</button>
    
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
