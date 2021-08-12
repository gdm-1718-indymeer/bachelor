import React from 'react'
import { ReactComponent as Camera} from '../../../assets/images/camera.svg'

const camera = ({ navigation }) => {
    const { previous, next } = navigation;

    navigator.permissions.query({name: 'camera'})
    .then((permission) => {
        console.log("camera state", permission.state);
    }).catch((error) => {
        console.log('Got error :', error);
    })

    return (
        <div className='container'>
            <section className="onboarding">
            <main className="onboarding-slides"  data-aos="fade-left" data-aos-offset="500" data-aos-duration="500" data-aos-easing="ease-out-cubic">
            <div className="onboarding-slide">
                <Camera className='onboarding-illustration' />
                <h2 className="onboarding-title">
                Medicatie identificatie
                </h2>
                <p className="onboarding-subtitle">
                Geef toestemming om je camera te gebruiken om medicatie te kunnen identificeren!
                </p>
            </div>
            </main>
            <nav className="onboarding-action-bar">
            <button className="onboarding-button onboarding-button-prev" onClick={previous}>
                Vorige
            </button>
            <div className="onboarding-slides-indicators">
                <span className="onboarding-slides-indicator "></span>
                <span className="onboarding-slides-indicator onboarding-slides-indicator--active"></span>
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

export default camera
