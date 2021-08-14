import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { deleteMedication } from '../../services/auth.services';
import Popup from '../components/popup';
import { Link } from 'react-router-dom';

const List = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const deleteItems = (id) => async () => {
    await deleteMedication(id)
    togglePopup()
    props.update()
  }


  useEffect(() => {
  }, [props.rows]);

  return Object.keys(props.rows).map((obj, i) =>
  (
    <tr>
      <td>{i + 1}</td>
      <td>{props.rows[obj].name}</td>
      <td>{props.rows[obj].value}</td>
      <td><Link className='btn white' to={{ pathname: '/dashboard/medication/create', state: props.rows[obj] }}>Update</Link> <Button className='btn-red' onClick={togglePopup}>Verwijderen</Button>
      </td>
      {isOpen &&
        <Popup
          content={<div className='popup-content'>
            <h1>Verwijder de medicatie</h1>
            <p>Ben je zeker dat je deze medicatie wilt verwijderen?</p>

            <div class="clearfix">
              <button type="button" onClick={togglePopup} class="cancelbtn">Cancel</button>
              <button type="button" class="deletebtn" onClick={deleteItems(props.rows[obj].name)}>Verwijderen</button>
            </div>
          </div>}
          handleClose={togglePopup}
        />}
    </tr>
  )
  )
}

export default List;
