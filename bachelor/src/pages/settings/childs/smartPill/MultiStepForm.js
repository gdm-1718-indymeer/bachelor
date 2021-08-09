import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Names from "./components/Names";
import Address from "./components/Address";
import Contact from "./components/Contact";
import Review from "./components/Review";
import Submit from "./components/Submit";


const steps = [
    { id: "names" },
    { id: "address" },
    { id: "contact" },
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

    switch (id) {
        case "names":
            return <Names {...props} className="roll-out" key={Math.random()} />;
        case "address":
            return <Address {...props} className="roll-out" key={Math.random()} />;
        case "contact":
            return <Contact {...props} className="roll-out" key={Math.random()} />;
        case "review":
            return <Review {...props} className="roll-out" key={Math.random()} />;
        case "submit":
            return <Submit {...props} className="roll-out" key={Math.random()} />;
        default:
            return null;
    }
};

export default MultiStepForm;
