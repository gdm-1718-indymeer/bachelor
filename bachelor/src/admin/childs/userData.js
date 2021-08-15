import React, { useEffect , useState} from 'react'
import { getUserData , getAllData} from '../../services/auth.services';
import Calendar from '../components/calendar'


const UserData = (props) => {
    const [state, setState] = useState([])
    const [data, setData] = useState([])
    const [taken, setTaken] = useState([]);
    const [notTaken, setNotTaken] = useState([]);


    const getUsers = (async (uid) => {
        try {
            let response =  await getUserData(uid);
            let data = await getAllData(uid);

            if(response) {
              setState(response)
              console.log(state)
              console.log(response)
            }
            let taken = []
            let notTaken = []
            Object.entries(data).forEach(([key, val]) => {
                if (val.isTaken) {
                    taken.push(val)
                }else {
                    notTaken.push(val)

                }
            })

            setData(data)  
            setTaken(taken)
            setNotTaken(notTaken)  
          
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
                <div class="col-md-4 col-12 order-2" id="sticky-sidebar">
                    <div class="sticky-top">
                        <div class="nav flex-column">
                           {data && <Calendar uid={data} />}
                        </div>
                    </div>
                </div>
                <div class="col" id="main">
                    <h1 className='h3-style'>Gegevens van {state.displayName || state.firstname}</h1>  
                    <div class="container">
                        <h1 class="header">Overzicht</h1>
                        
                        <div class="todo__container">
                            <div class="todo todo">
                                <h5 class="todo__header">Aantal gemaakte herinneringen</h5>
                                <h2 class="todo__amount">{data && Object.keys(data).length}</h2>
                            </div>

                            <div class="todo todo">
                                <h5 class="todo__header">Aantal vergeten herinneringen</h5>
                                <h2 class="todo__amount">{notTaken && Object.keys(notTaken).length}</h2>
                            </div>

                            <div class="todo todo">
                                <h5 class="todo__header">Aantal genomen herinneringen</h5>
                                <h2 class="todo__amount">{taken && Object.keys(taken).length}</h2>
                            </div>

                            <div class="todo todo">
                                <h5 class="todo__header">Aantal gemaakte herinneringen</h5>
                                <h2 class="todo__amount">{data && Object.keys(data).length}</h2>
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
