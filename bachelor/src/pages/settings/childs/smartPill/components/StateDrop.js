import React , {useEffect, useCallback, useState}from "react";
import Select, { components } from 'react-select';
import {getAllMedicineData} from '../../../../../services/auth.services'
const { Option } = components;

const StateDrop = ({ label, ...others }) => {
    const [medicines, setMedicines] = useState({});

    const options = [];
        for (let i = 0; i < 100; i += 1) {
        const option = {
            value: `${i}`,
            label: `${i}`,
        };
        options.push(option);
        }

    const getNames = useCallback(async () => {
        try {
        let data = await getAllMedicineData();
        console.log(data)
        let names = []
        Object.entries(data).forEach(([key, val]) => {
            let obj = { name: val.name, label: val.label, value: val.value}
            names.push(obj)
        })
        setMedicines(names);
        } catch (e) {
        console.error(e);
        }
    });
    const CustomName = (props) => <div>{props.data.label}</div>;
    const CustomSelectOption = (props) => (
        <Option {...props}>{props.data.label}</Option>
    );

    useEffect(() => {
        getNames();
    }, []);
    
   return( <>
        <Select
            defaultValue={medicines[0]}
            options={medicines}
            components={{
                Option: CustomSelectOption,
                SingleValue: CustomName,
            }}
           
        />
    </>
   )
};

export default StateDrop;
// import React from "react";

// const states = [
//     ["NSW", "New South Wales"],
//     ["VIC", "Victoria"],
//     ["WA", "Western Australia"]
// ];

// const StateDrop = ({ label, ...others }) => (
//     <>
//         <label>{label}</label>
//         <select {...others}>
//             {states.map(([value, name]) => (
//                 <option value={value}>{name}</option>
//             ))}
//         </select>
//     </>
// );

// export default StateDrop;
