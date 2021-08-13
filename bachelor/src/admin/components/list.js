import React,  { useState, useEffect, useCallback } from 'react'
import { Button} from 'react-bootstrap';
import Popup from '../components/popup';


const List = (props) => {

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const check = () => {
        console.log('ree')
      }
  

    useEffect(() => {
        console.log(props.rows)

    }, [props.rows]);

    return Object.keys(props.rows).map((obj, i) => (
        <tr>
            <td>{i+1}</td>
            <td>{props.rows[obj].name}</td>
            <td>{props.rows[obj].value}</td>
            <td><Button>Update</Button> <Button variant="danger" onClick={togglePopup}>Delete</Button>
            </td>
            {isOpen && <Popup
      content={<div className='popup-content'>
            <h1>Verwijder de medicatie</h1>
            <p>Ben je zeker dat je deze medicatie wilt verwijderen?</p>
            
            <div class="clearfix">
                <button type="button"  onClick={check} class="cancelbtn">Cancel</button>
                <button type="button"  class="deletebtn">Delete</button>
            </div>
      </div>}
      handleClose={togglePopup}
    />}
      </tr>
    ))
}

export default List;
