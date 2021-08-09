import React, { useEffect } from "react";
import { useForm, useStep } from "react-hooks-helper";
import AOS from 'aos';
import "aos/dist/aos.css"

import Fill from "./components/Fill";
import Monday from "./components/week/Monday";
import Tuesday from "./components/week/Tuesday";
import Wednesday from "./components/week/Wednesday";
import Thursday from "./components/week/Thursday";
import Friday from "./components/week/Friday";
import Saturday from "./components/week/Saturday";
import Sunday from "./components/week/Sunday";

import Review from "./components/Review";
import Submit from "./components/Submit";


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
    firstName: "Jane",
    lastName: "Doe",
    nickName: "Jan",
    address: "200 South Main St",
    city: "Anytown",
    state: "CA",
    zip: "90505",
    email: "email@domain.com",
    phone: "+61 4252 454 332"
};

const MultiStepForm = ({ images }) => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, navigation };

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
        AOS.refresh();

    }, []);

    switch (id) {
        case "fill":
            return <Fill {...props} key={Math.random()} />;
        case "monday":
            return <Monday {...props} key={Math.random()} />;
        case "tuesday":
            return <Tuesday {...props} key={Math.random()} />;
        case "wednesday":
            return <Wednesday {...props} key={Math.random()} />;
        case "thursday":
            return <Thursday {...props} key={Math.random()} />;
        case "friday":
            return <Friday {...props} key={Math.random()} />;
        case "saturday":
            return <Saturday {...props} key={Math.random()} />;
        case "sunday":
            return <Sunday {...props} key={Math.random()} />;
        case "review":
            return <Review {...props} key={Math.random()} />;
        case "submit":
            return <Submit {...props} key={Math.random()} />;
        default:
            return null;
    }
};

export default MultiStepForm;
