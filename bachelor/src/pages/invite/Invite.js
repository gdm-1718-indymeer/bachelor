import React, { useState } from 'react'
import { pushInvitationData, sendInvite, uuidv4 } from '../../services/auth.services';
import { ReactComponent as Dashboard} from '../../assets/images/dashboard.svg'

const Invite = (props) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(false);

    const handleSubmit = () => {
        if (email.trim()) {
            const inviteId = uuidv4();
            pushInvitationData(inviteId, { date: (new Date()).getTime() })
            sendInvite(email, inviteId)
            setMessage({
                succeed: 'De data is succesvol toegevoegd.',
              });
            setTimeout(() => {
                setMessage({});
                setEmail("")
              }, 3000);
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }


    return (
        <>
        <div className='container'>
            <div className='row'>
                <div className='form-group w-75 d-flex mx-auto text-center flex-column'>
                    <h1>Uitnodigen</h1>
                    <div className='mb-50'>Nodig iemand uit om toegang te krijgen tot zijn data</div>
                    <Dashboard className='onboarding-illustration' />
                    {message.succeed && (
                            <p className='alert alert-success'>{message.succeed}</p>
                        )}

                    <label htmlFor='fullName'>Email</label>
                        <input
                            type='email'
                            className='form-control mb-50'
                            id='email'
                            placeholder="example@email.com"
                            name='email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <button className='btn d-flex mx-auto' onClick={handleSubmit}>Verstuur</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Invite
