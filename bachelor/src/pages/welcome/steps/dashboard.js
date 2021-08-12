import React from 'react'
import { ReactComponent as Dashboard} from '../../../assets/images/dashboard.svg'


const dashboard = ({navigation}) => {
    const { previous, next } = navigation;

    return (
        <div className='container'>
            <section className="onboarding">
            <main className="onboarding-slides"  data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className="onboarding-slide">
                <Dashboard className='onboarding-illustration' />
                <h2 className="onboarding-title">
                    Toestemming voor verzorgers
                </h2>
                <p className="onboarding-subtitle">
                   Indien je wilt kan een verzorger of iemand anders toegang krijgen tot jouw gegevens en kan ook meldingen krijgen als je een medicijn vergeten bent na de 2e waarschuwing.
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
                <span className="onboarding-slides-indicator onboarding-slides-indicator--active"></span>
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

export default dashboard
