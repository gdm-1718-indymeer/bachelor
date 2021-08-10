import React,  { useState, useEffect, useCallback } from 'react'
import { Button} from 'react-bootstrap';


const List = (props) => {

    useEffect(() => {
        console.log(props.rows)

    }, [props.rows]);

    return Object.keys(props.rows).map((obj, i) => (
        <tr>
            <td>{i+1}</td>
            <td>{props.rows[obj].name}</td>
            <td>{props.rows[obj].value}</td>
            <td><Button>Update</Button> <Button variant="danger">Delete</Button>
            </td>
      </tr>
    ))
}

export default List;
