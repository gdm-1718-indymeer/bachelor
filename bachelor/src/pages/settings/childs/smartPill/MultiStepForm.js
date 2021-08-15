import React, { useEffect, useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import AOS from 'aos';
import "aos/dist/aos.css"
import moment from 'moment';

import Fill from "./components/Fill";
import Monday from "./components/week/Monday";
import Tuesday from "./components/week/Tuesday";
import Wednesday from "./components/week/Wednesday";
import Thursday from "./components/week/Thursday";
import Friday from "./components/week/Friday";
import Saturday from "./components/week/Saturday";
import Sunday from "./components/week/Sunday";
import {format} from 'date-fns'

import Review from "./components/Review";
import Submit from "./components/Submit";

let date = new Date(); // get current date

const steps = [
    { id: "fill" },
    { id: "monday" },
    { id: "tuesday" },
    { id: "wednesday" },
    { id: "thursday" },
    { id: "friday" },
    { id: "saturday" },
    { id: "sunday" },
    { id: "review" },
    { id: "submit" }
];

const defaultData = {
    mondayName: "Ibuprofen",
    mondayTime: moment().format('HH:mm'),
    mondayDate: format(date.setDate(date.getDate() + (1-date.getDay())), 'dd/MM/yyyy'),

    tuesdayName: "Ibuprofen",
    tuesdayTime: moment().format('HH:mm'),
    tuesdayDate: format(date.setDate(date.getDate() + (2-date.getDay())), 'dd/MM/yyyy'),

    wednesdayName: "Ibuprofen",
    wednesdayTime: moment().format('HH:mm'),
    wednesdayDate: format(date.setDate(date.getDate() + (3-date.getDay())), 'dd/MM/yyyy'),

    thursdayName: "Ibuprofen",
    thursdayTime: moment().format('HH:mm'),
    thursdayDate: format(date.setDate(date.getDate() + (4-date.getDay())), 'dd/MM/yyyy'),

    fridayName: "Ibuprofen",
    fridayTime: moment().format('HH:mm'),
    fridayDate: format(date.setDate(date.getDate() + (5-date.getDay())), 'dd/MM/yyyy'),

    saturdayName: "Ibuprofen",
    saturdayTime: moment().format('HH:mm'),
    saturdayDate: format(date.setDate(date.getDate() + (6-date.getDay())), 'dd/MM/yyyy'),

    sundayName: "Ibuprofen",
    sundayTime: moment().format('HH:mm'),
    sundayDate: format(date.setDate(date.getDate() + (7-date.getDay())), 'dd/MM/yyyy'),

};

const MultiStepForm = () => {
    const [formData, setForm] = useForm(defaultData);
    const [boxkey, setKey] = useState({});

    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    const props = { formData, setForm, navigation, boxkey, setKey };

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    switch (id) {
        case "fill":
            return <Fill {...props} key={1} />;
        case "monday":
            return <Monday {...props} key={2} />;
        case "tuesday":
            return <Tuesday {...props} key={3} />;
        case "wednesday":
            return <Wednesday {...props} key={4} />;
        case "thursday":
            return <Thursday {...props} key={5} />;
        case "friday":
            return <Friday {...props} key={6} />;
        case "saturday":
            return <Saturday {...props} key={7} />;
        case "sunday":
            return <Sunday {...props} key={8} />;
        case "review":
            return <Review {...props} key={9} />;
        case "submit":
            return <Submit {...props} key={10} />;
        default:
            return null;
    }
};

export default MultiStepForm;
