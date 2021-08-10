import React, {useState, useEffect} from 'react'
import OtpInput from 'react-otp-input';
import MultiStepForm from "./MultiStepForm.js";
import Lottie from 'react-lottie';
import Otp from '../../../../assets/lotties/otp.json';
import AOS from 'aos';
import "aos/dist/aos.css"
import {checkIfExist} from '../../../../services/auth.services'

const SmartPill = () => {
    const [state, setState] = useState({otp: ''});
    const handleChange = (otp) => setState({ otp });
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);


    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: Otp,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };
    
    const onSubmit = async () => {
        const keycheck = await checkIfExist(state.otp)
        console.log(keycheck)
        if (!keycheck) {
            setMessage({
              error: 'De code bestaat niet',
            });
            setError(true)
            setTimeout(() => {
                setMessage(false);
                setError(false)
            }, 3000);
          }
    }
        
    useEffect(() => {
        AOS.init({
        duration: 1000
        });
        AOS.refresh();
    }, []);

    return (
        <>
            <div className='container '>
                <div className='row d-flex smartbox__intro justify-content-center align-items-center'>
                    {/* <div className=' d-flex smartbox__intro justify-content-center' > */}
                        {/* <MultiStepForm /> */}
                            <div className=' col-xl-7 col-md-12 ' data-aos="fade-down">
                                <Lottie
                                options={defaultOptions}
                                height={'100%'}
                                width={'100%'}
                                className='test'
                                />
                            </div>
                            <div className=' col-xl-5 col-md-12 ' data-aos="fade-down">
                                <h3> Voer de code in die op de doos staat</h3>
                                {message.error && (
                                    <p className='alert alert-danger'>{message.error}</p>
                                )}
                                <div className='otp-wrapper'>
                                    <OtpInput
                                    value={state.otp}
                                    onChange={handleChange}
                                    numInputs={5}
                                    className={'otp'}
                                    hasErrored={error}
                                    errorStyle={'error'}
                                    separator={
                                        <span>
                                          <strong>.</strong>
                                        </span>
                                      }
                                      inputStyle={{
                                        width: "3rem",
                                        height: "3rem",
                                        margin: "0 1rem",
                                        fontSize: "2rem",
                                        borderRadius: 7,
                                        border: "1px solid rgba(0,0,0,0.3)"
                                      }}
                                />
                                </div>
                                <button onClick={onSubmit} className='btn'>Versturen</button>
                            </div>
            
                      
                    </div>
                </div>

        </>
    )
}

export default SmartPill
