import React, { useState, useEffect , useCallback} from 'react'
import { Container , Form, Row, Col, Button} from 'react-bootstrap'

const Create = () => {
    const [state, setState] = useState({});

    const onChange = (e) => {
        const { target: {name, value }} = e
        let stateValue = state
        stateValue[name] = value

        setState(stateValue)
    }

    return (
    <Container style={{ marginTop: '100px' }}>
      <h1>Add Medicine Data</h1>
      <Form style={{ margin: '50px' }}>
        <Form.Row>
          <Col>
            <Form.Control placeholder="Employee Name" />
          </Col>
          <Col>
            <Form.Control placeholder="Employee Email" />
          </Col>
          <Col>
            <Form.Control placeholder="Employee Mobile" />
          </Col>
        </Form.Row>
        <Button style={{ margin: '30px 0' }}>Add  Employee</Button>
      </Form>
    </Container>
    )
}

export default Create
