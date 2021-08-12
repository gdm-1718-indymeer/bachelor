import React from 'react'
import { ReactComponent as Welcome} from '../../../assets/images/welcome.svg'

const welcome = ({ navigation }) =>{
    const { previous, next } = navigation;

    return (
        <div className='container'>
            <section className="onboarding">
            <main className="onboarding-slides"  data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className="onboarding-slide">
                <Welcome className='onboarding-illustration' />
                <h2 className="onboarding-title">
                Welkom bij Remedmed
                </h2>
                <p className="onboarding-subtitle">
                Jouw persoonlijke assistent voor medicatie
                </p>
            </div>
            </main>
            <nav className="onboarding-action-bar">
            <button className="onboarding-button onboarding-button-prev" disabled onClick={previous}>
                Vorige
            </button>
            <div className="onboarding-slides-indicators">
                <span className="onboarding-slides-indicator onboarding-slides-indicator--active"></span>
                <span className="onboarding-slides-indicator"></span>
                <span className="onboarding-slides-indicator"></span>
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

export default welcome;
