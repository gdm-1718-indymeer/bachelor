import React, { useState, useEffect , useCallback} from 'react'
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {addMedication} from '../../services/auth.services';
import Lottie from 'react-lottie';
import sitting from '../../assets/lotties/sitting.json';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

const Create = (props) => {
    const [state, setState] = useState({});
    const [formdata, setFormdata] = useState({});
    const [message, setMessage] = useState(false);

    useEffect (() => {
      if(props.location.state){
        setFormdata(props.location.state)
      }
  }, []);

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

    const onSubmit = async (e) => {
      let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));
      const uid = currentUser.uid;
      if(formdata.name, formdata.type, formdata.inname, formdata.description, formdata.warn){
        if (formdata.name ) {

          let data = {
            name: formdata.name,
            value: formdata.value,
            label: formdata.name,
            type: formdata.type,
            inname: formdata.inname,
            description: formdata.description,
            warn: formdata.warn
          }
          
          const result = await addMedication(data);

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
        <Form.Row >
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
              <option   selected>Medicijn type</option>
              <option value="zalf">Zalf</option>
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="inhaler">Inhaler</option>
              <option value="spray">Spray</option>
              <option value="spuit">Spuit</option>

            </Form.Control>
          </Col>

          <Col className='medicine-form__input'>
            <Form.Label>Medicijn Inname</Form.Label>
            <Form.Control as="select"  value={formdata.inname}
              onChange={e => { setFormdata({...formdata, inname: e.target.value })}}>
              <option   selected>Inname</option>
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
              <ReactQuill key={Math.random()} value={formdata.description} name='description' onChange={(html) => setFormdata({...formdata, description: html})} />
          </Col>

          <Col className='medicine-form__input'>
            <Form.Label>Bijsluiters (bv. max 4uur tussen)</Form.Label>
              <ReactQuill modules={this.modules} key={Math.random()} value={formdata.warn} name='warn' onChange={(html) => setFormdata({...formdata, warn: html})} />
          </Col>
          
        </Form.Row>
        <Link className='btn white' to='/dashboard/medication' onClick={onSubmit}>Keer terug</Link>
        <Button style={{ margin: '30px 0' }} onClick={onSubmit}>Medicijn toevoegen</Button>

      </Form>
      </Container>
   
    )
}

export default Create
