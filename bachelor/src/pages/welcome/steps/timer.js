import React from 'react'
import { ReactComponent as Timer} from '../../../assets/images/timer.svg'

const timer = ({navigation}) => {
    const { previous, next } = navigation;

    return (
        <div className='container'>
            <section className="onboarding">
            <main className="onboarding-slides"  data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className="onboarding-slide">
                <Timer className='onboarding-illustration' />
                <h2 className="onboarding-title">
                    Notificaties
                </h2>
                <p className="onboarding-subtitle">
                    Krijg een email en sms als het tijd is om jouw medicatie te nemen.
                    Je kan ook naar de timer navigeren om meer details te zien van jouw reminder
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
                <span className="onboarding-slides-indicator onboarding-slides-indicator--active"></span>
                <span className="onboarding-slides-indicator"></span>
                <span className="onboarding-slides-indicator"></span>
            </div>
            <button className="onboarding-button onboarding-button-next" onClick={next}>
                Volgende
            </button>
            </nav>
        </section>
      </div>
    )
}

export default timer
