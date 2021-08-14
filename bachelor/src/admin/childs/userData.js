import React, { useEffect , useState} from 'react'
import { getUserData } from '../../services/auth.services';
import Calendar from '../components/calendar'


const UserData = (props) => {
    const [state, setState] = useState([])

    const getUsers = (async (uid) => {
        try {
            let response =  await getUserData(uid);
            if(response) {
              setState(response)
              console.log(state)
              console.log(response)
    
            }
    
          
        } catch (e) {
            console.error(e);
        }
    });
    
      useEffect(() => {
        const uid = props.match.params.uid
        getUsers(uid);
      }, [props.match.params.uid]);

    return (
        <>
        <div class="container-fluid user-data-dashboard">

    
            <div class="row py-3">
                <div class="col-4 order-2" id="sticky-sidebar">
                    <div class="sticky-top">
                        <div class="nav flex-column">
                           <Calendar uid={props.match.params.uid} />
                        </div>
                    </div>
                </div>
                <div class="col" id="main">
                    <h1 className='h3-style'>Gegevens van {state.displayName || state.firstname}</h1>  
                    <div class="container">
                        <h1 class="header">Todo List</h1>
                        
                        <div class="todo__container">
                            <div class="todo todo--emergency">
                            <div class="todo__dropdown">
                                <span>Today <i class="fas fa-caret-down"></i></span>
                            </div>
                            <h3 class="todo__header">Emergency</h3>
                            <h2 class="todo__amount">15</h2>
                            <p class="todo__link">View List</p>
                            </div>
                            
                            <div class="todo todo--remaining">
                            <div class="todo__dropdown">
                                <span>Today <i class="fas fa-caret-down"></i></span>
                            </div>
                            <h3 class="todo__header">To Do</h3>
                            <h2 class="todo__amount">32</h2>
                            <p class="todo__link">View List</p>
                            </div>
                            
                            <div class="todo todo--current">
                            <div class="todo__dropdown">
                                <span>Today <i class="fas fa-caret-down"></i></span>
                            </div>
                            <h3 class="todo__header">Doing</h3>
                            <h2 class="todo__amount">20</h2>
                            <p class="todo__link">View List</p>
                            </div>
                            
                            <div class="todo todo--finished">
                            <div class="todo__dropdown">
                                <span>Today <i class="fas fa-caret-down"></i></span>
                            </div>
                            <h3 class="todo__header">Done</h3>
                            <h2 class="todo__amount">16</h2>
                            <p class="todo__link">View List</p>
                            </div>
                        </div>
                        <div class="todo__container">
                            
                        </div>
                        </div>
                </div>
            </div>

        </div>
           
        </>
    )
}

export default UserData
