import React, { useState, useEffect } from 'react';

const Reminder = () => {
    function Task({ task, index, completeTask, removeTask }) {
        return (
            <div
                className="task"
                style={{ textDecoration: task.completed ? "line-through" : "" }}
            >
                <li class="one red">
                    <span class="task-title"> {task.title}</span>
                     <span class="task-time">{task.time}</span>
                    <span class="task-cat"><button class="btn btn--action"> {task.when}</button></span>
                </li>
                 
                <img className='task__image' src={task.icon}></img>
                {task.dose}
                

               


    
                <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
                <button onClick={() => completeTask(index)}>Complete</button>
    
            </div>
        );
    }
    
    
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Ibuprofen",
            dose: '150g, 1 capsule',
            when: 'after breakfast',
            time: '8:00pm',
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E1272bu1zV2zuYlyRXR3ipZUFqHNoezMvA&usqp=CAU',
            completed: true,
        },
        {
            title: "Dafalgan",
            dose: '150g, 1 capsule',
            when: 'after breakfast',
            time: '8:00pm',
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E1272bu1zV2zuYlyRXR3ipZUFqHNoezMvA&usqp=CAU',
            completed: true
        },
        {
            title: "Ibu",
            dose: '150g, 1 capsule',
            when: 'after breakfast',
            time: '8:00pm',
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7E1272bu1zV2zuYlyRXR3ipZUFqHNoezMvA&usqp=CAU',
            completed: false
        }
    ]);
      
    // useEffect(() => { 
    //   setTasksRemaining(tasks.filter(task => !task.completed).length) 
    // });

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
                <ul class="tasks">

                    {tasks.map((task, index) => (
                        <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                        />
                    ))}
                    </ul>
                </div>
   
            </div>
    )
}

export default Reminder
