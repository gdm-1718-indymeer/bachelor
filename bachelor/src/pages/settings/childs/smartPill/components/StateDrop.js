import React, { useEffect, useCallback, useState } from "react";
import Select, { components } from 'react-select';
import { getAllMedicineData } from '../../../../../services/auth.services'
const { Option } = components;

const StateDrop = (props, { label, ...others }) => {
    const [medicines, setMedicines] = useState([]);

    const getNames = useCallback(async () => {
        try {
            let data = await getAllMedicineData();
            let names = []
            Object.entries(data).forEach(([key, val]) => {
                let obj = { name: val.name, label: val.label, value: val.value }
                names.push(obj)
            })
            setMedicines(names);

        } catch (e) {
            console.error(e);
        }
    });

    const getKeyByValue = (value) => {
       
        return medicines.find(o => o.name === value)
      }

    useEffect(() => {
        getNames();
    }, []);

    const handleChange = (event) => {
        props.sendToParent(event.name);
        props.onChange({
            target: {
                name: props.name,
                value: event.name
            }
        });
    }
    return (<>
       { medicines.length!==0 &&
       <Select
            defaultValue={getKeyByValue(props.value)}
            options={medicines}
            onChange={handleChange}
            {...others}
        />}
    </>
    )
};

export default StateDrop;
