import React, { useState } from 'react'
import { pushInvitationData, sendInvite, uuidv4 } from '../../services/auth.services';

const Invite = (props) => {
    const [email, setEmail] = useState("");
    const handleSubmit = () => {
        if (email.trim()) {
            const inviteId = uuidv4();
            pushInvitationData(inviteId, { date: (new Date()).getTime() })
            sendInvite(email, inviteId)
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    return (
        <>
            <div className='form-group'>
                <h1>Uitnodigen</h1>
                <div>Nodig iemand uit om toegang te krijgen tot zijn data</div>
                <label htmlFor='fullName'>Email</label>
                <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder="example@email.com"
                    name='email'
                    value={email}
                    onChange={handleEmailChange}
                />
                <button onClick={handleSubmit}>Verstuur</button>
            </div>
            <div class="container">
                <div class="user-cards">
                    <div class="user-card">
                        <i class="fas fa-ellipsis-v"></i>
                        <div class="image-wrapper">
                            <img src="https://source.unsplash.com/H982yXJ7vOk/120x120" />
                        </div>
                        <p class="user-name">Henry Paulista</p>
                        <p class="user-mail">henry.p@gmail.com</p>

                        <p class="user-role">SENIOR CREATIVE DIRECTOR</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Invite
