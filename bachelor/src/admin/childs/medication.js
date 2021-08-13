//https://github.com/bezkoder/react-table-crud-example/blob/master/src/components/TutorialsList.js

import React, { useState, useEffect , useCallback} from 'react';
import { Container , Table, Form, Row, Col, Button} from 'react-bootstrap';

import { getAllMedicineData } from "../../services/auth.services";
import Lottie from 'react-lottie';
import sitting from '../../assets/lotties/sitting.json';
import List from '../components/list';
import {addMedication} from '../../services/auth.services';

const Medication = (props) => {
    const [state, setState] = useState(false);
    const [formdata, setFormdata] = useState({});
    const [message, setMessage] = useState(false);


    const getMedicine = useCallback(async () => {
        try {
            const medicine = await getAllMedicineData();
            setState(medicine)

            console.log(medicine)
        } catch (e) {
            console.error(e);
        }
    });
    const onChange = (e) => {
      const name = e.target.name;
      const newState = { ...formdata };
      newState[name] = e.target.value;
      setFormdata(newState);
  };

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

    const onSubmit = async (e) => {
      let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));
      const uid = currentUser.uid;

      console.log(formdata)
      if(formdata.name, formdata.type, formdata.inname, formdata.description, formdata.warn){
        if (formdata.name ) {
          let value = formdata.value; 

          if(!formdata.value) {
            value = formdata.name
          }
          let data = {
            name: formdata.name,
            value: value,
            label: formdata.name,
            type: formdata.type,
            inname: formdata.inname,
            description: formdata.description,
            warn: formdata.warn
          }
          
          const result = await addMedication(data);
          const medicine = await getAllMedicineData();
          setState(medicine)

          if (!result.message) {
            setMessage({
              succeed: 'De data is succesvol toegevoegd.',
            });
            setFormdata({name: "", value: "", type: "", inname: "", description: "", warn: ""})
            setTimeout(() => {
              setMessage({});
            }, 3000);
          } else if (result.message) {
            setMessage({
              error: result.message,
            });
          }
        } else {
          setMessage({
            error: 'Medicijnnaam niet ingevuld',
          });
          return;
        }
      }else {
        setMessage({
          error: 'Niet alle velden zijn ingevuld',
        });
        setTimeout(() => {
          setMessage({});
        }, 3000);
        return
      }

    };
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
        <Form style={{ margin: '50px' }}>
          <Form.Row className='medicine-form'>
            <h3 className='pb-50'>Voeg hier je medicijn toe</h3>
            {message.error && (
                <p className='alert alert-danger'>{message.error}</p>
              )}
              {message.succeed && (
                <p className='alert alert-success'>{message.succeed}</p>
              )}
            <Col className='medicine-form__input'>
              <Form.Label>Medicijnnaam</Form.Label>
              <Form.Control placeholder="Medicijn naam" name='name' id='name' value={formdata.name} onChange={onChange}/>
            </Col>
            <Col className='medicine-form__input'>
              <Form.Label>Hoofdmedicijn (laat leeg indien dit de hoofdmedicijn is)</Form.Label>
              <Form.Control placeholder="Medicijn 2e waarde" name='value' id='value' value={formdata.value} onChange={onChange}/>
            </Col>

            <Col className='medicine-form__input'>
              <Form.Label>Medicijn type</Form.Label>
              <Form.Control as="select"  value={formdata.type}
              onChange={e => { setFormdata({...formdata, type: e.target.value })}}>
                <option  disabled selected>Medicijn type</option>
                <option value="zalf">Zalf</option>
                <option value="tablet">Tablet</option>
                <option value="capsule">Capsule</option>
                <option value="inhaler">Inhaler</option>
                <option value="spray">Spray</option>
              </Form.Control>
            </Col>

            <Col className='medicine-form__input'>
              <Form.Label>Medicijn Inname</Form.Label>
              <Form.Control as="select"  value={formdata.inname}
                onChange={e => { setFormdata({...formdata, inname: e.target.value })}}>
                <option  disabled selected>Inname</option>
                <option value="oor">In het oor</option>
                <option value="oog">In het oog</option>
                <option value="oraal">Oraal</option>
                <option value="oraalsmelten">Oraal Smelten</option>
                <option value="dermaal">Dermaal (op de huid)</option>
                <option value="spuiten">Spuiten</option>
                <option value="injectie">Injectie</option>
              </Form.Control>
            </Col>

            <Col className='medicine-form__input'>
              <Form.Label>Uitleg</Form.Label>
              <Form.Control  as="textarea" rows={3} placeholder="description" name='description' id='value' value={formdata.description} onChange={onChange}/>
            </Col>

            <Col className='medicine-form__input'>
              <Form.Label>Bijsluiters (bv. max 4uur tussen)</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="warn" name='warn' id='value' value={formdata.warn} onChange={onChange}/>
            </Col>
            
          </Form.Row>
          <Button style={{ margin: '30px 0' }} onClick={onSubmit}>Medicijn toevoegen</Button>
        </Form>
       
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
            
            {state && <List rows={state} />}
          </tbody>
        </Table>
      </Container>
        </>
    )
}

export default Medication
