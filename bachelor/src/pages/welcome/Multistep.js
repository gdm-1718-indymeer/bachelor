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

const Multistep = (props) => {

    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    switch (id) {
        case "welcome":
            return <Welcome {...props} navigation={navigation} key={1} />;
        case "camera":
            return <Camera {...props} navigation={navigation} key={2} />;
        case "timer":
            return <Timer {...props} navigation={navigation} key={3} />;
        case "dashboard":
            return <Dashboard {...props} navigation={navigation} key={4} />;
        case "pillbox":
            return <Pillbox {...props} navigation={navigation} key={5} />;
        default:
            return null;
    }
};

export default Multistep
