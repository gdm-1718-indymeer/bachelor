import React from "react";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
const showSecond = false;

const ItemForm = (props, {...others }) => {


  const handleChange = (event) => {
    props.sendToParent(event);
    console.log()
    props.onChange({
        target: {
            name: props.name,
            value: event.format('HH:mm:ss')
        }
    });
}

    return(
    <TimePicker
          style={{ width: 100 }}
          showSecond={showSecond}
          defaultValue={moment(props.value, 'HH:mm:ss')}
          className='add-medicine__time__timepicker'
          onChange={handleChange}
          {...others}

        />
   
    )
};

export default ItemForm;

