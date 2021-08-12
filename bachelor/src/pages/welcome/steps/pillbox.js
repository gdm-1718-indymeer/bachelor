import React from 'react'
import { ReactComponent as Pill} from '../../../assets/images/pillApp.svg'
import { useHistory } from "react-router-dom";


const Pillbox = ({navigation}) => {
    const { previous, next } = navigation;
    let history = useHistory();

    function handleClick() {
        history.push("/");
      }

    return (
        <div className='container'>
            <section className="onboarding">
            <main className="onboarding-slides"  data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className="onboarding-slide">
                <Pill className='onboarding-illustration' />
                <h2 className="onboarding-title">
                    Smart Pillbox
                </h2>
                <p className="onboarding-subtitle">
                   Registreer jouw eigen pillendoos en laat je niet meer verrassen bij het vergeten van de medicatie!
                </p>
            </div>
            </main>
            <nav className="onboarding-action-bar">
            <button className="onboarding-button onboarding-button-prev" onClick={previous}>
                Vorige
            </button>
            <div className="onboarding-slides-indicators">
                <span className="onboarding-slides-indicator "></span>
                <span className="onboarding-slides-indicator "></span>
                <span className="onboarding-slides-indicator "></span>
                <span className="onboarding-slides-indicator "></span>
                <span className="onboarding-slides-indicator onboarding-slides-indicator--active"></span>
            </div>
            <button className="onboarding-button onboarding-button-next" onClick={handleClick}>
                Volgende
            </button>
            </nav>
        </section>
      </div>
    )
}

export default Pillbox
