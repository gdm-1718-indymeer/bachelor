//https://github.com/bezkoder/react-table-crud-example/blob/master/src/components/TutorialsList.js

import React, { useState, useEffect , useCallback} from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { getAllMedicineData } from "../../services/auth.services";

const Medication = (props) => {
    const [state, setState] = useState({});

    const getMedicine = useCallback(async () => {
        try {
            const medicine = await getAllMedicineData();
            setState(medicine)

            console.log(medicine)
        } catch (e) {
            console.error(e);
        }
    });

  
    useEffect (() => {
        getMedicine();
    }, []);
    return (
        <>
        <Container style={{ marginTop: '100px' }}>
        <Button variant="secondary" style={{ float: 'right', margin: '20px' }} onClick={() => props.history.push('/dashboard/medication/create')}>Add Medicines</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Employee Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>sjlouji10@gmail.com</td>
              <td>932104</td>
              <td><Button>Update</Button> <Button variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>sjlouji@gmail.com</td>
              <td>2345</td>
              <td><Button>Update</Button> <Button variant="danger">Delete</Button></td>
            </tr>
          </tbody>
        </Table>
      </Container>
        </>
    )
}

export default Medication
