import React, { useState, useEffect , useCallback} from 'react';
import { Container , Table, Form, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { getAllMedicineData } from "../../services/auth.services";
import Lottie from 'react-lottie';
import sitting from '../../assets/lotties/sitting.json';
import List from '../components/list';

const Medication = (props) => {
    const [state, setState] = useState(false);



    const getMedicine = useCallback(async () => {
        try {
            const medicine = await getAllMedicineData();
            setState(medicine)

        } catch (e) {
            console.error(e);
        }
    });


    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: sitting,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    useEffect (() => {
        getMedicine();
    }, []);

    
    return (
        <>
        
        <Container style={{ marginTop: '100px' }}>
        <div className='dashboard-intro'>
          <div className='row'>
            <div className='col-4'>
              <Lottie 
                  options={defaultOptions}
                  height={'100%'}
                  width={'100%'}
                  className={'test'}
              />
            </div>
            <div className='col-8 dashboard-intro__text'>
              <p>Het kan zijn dat sommige medicijnen een <b>3e partij </b>zijn van de <b>originele medicijn</b>. 
              Voeg de originele medicijn als 2e waarde om de juist mogelijke weergaven te bemachtigen. </p>
              <p>Indien het de originele medicijn is laat je de 2e waarde leeg. </p>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row medicine-form '>
          <h3 className='pb-50'>Voeg hier je medicijn toe</h3>
          <Link className='btn' to={'/dashboard/medication/create'}>Medicijn toevoegen</Link>
          </div>
         
        </div>
   


       
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicijnnaam</th>
              <th>Medicijn 2e waarde</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {state && <List rows={state} update={getMedicine}/>}
          </tbody>
        </Table>
      </Container>
        </>
    )
}

export default Medication
