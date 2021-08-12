import React, { useEffect, useState } from "react";
import { useStep } from "react-hooks-helper";
import AOS from 'aos';
import "aos/dist/aos.css"
import Welcome from "./steps/welcome";
import Camera from "./steps/camera";
import Timer from "./steps/timer";
import Dashboard from "./steps/dashboard";
import Pillbox from "./steps/pillbox";


const steps = [
    { id: "welcome" },
    { id: "camera" },
    { id: "timer" },
    { id: "dashboard" },
    { id: "pillbox" },
];

const Multistep = () => {

    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    const props = {navigation};

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    switch (id) {
        case "welcome":
            return <Welcome {...props} key={1} />;
        case "camera":
            return <Camera {...props} key={2} />;
        case "timer":
            return <Timer {...props} key={3} />;
        case "dashboard":
            return <Dashboard {...props} key={4} />;
        case "pillbox":
            return <Pillbox {...props} key={5} />;
        default:
            return null;
    }
};

export default Multistep
