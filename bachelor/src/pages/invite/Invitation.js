import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { deleteInvitationById, getCurrentUser, getInvitationsById, getUserData, pushAccess, setAdminProfile } from '../../services/auth.services';
import { ReactComponent as Dashboard} from '../../assets/images/dashboard.svg'
let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));

const Invitation = (props) => {
    const [invitationInfo, setinvitationInfo] = useState();
    const [adminInfo, setAdminInfo] = useState();

    const queryParams = queryString.parse(props.location.search)
    useEffect(() => {
        getCurrentUser().then(user => {
            getInvitationsById(currentUser.uid, queryParams.inviteId).then(invitationRes => {
                getUserData(invitationRes.adminId).then(res => setAdminInfo(res))
                setinvitationInfo(invitationRes);
            })
        });
    }, [])
    if (!queryParams.inviteId || currentUser.uid === invitationInfo.adminId ) {
        return <Redirect to="/" />
    }
    const handleConfirm = () => {
        //add to database
            pushAccess({
                adminId: invitationInfo.adminId,
                clientId: currentUser.uid
            });
            setAdminProfile(invitationInfo.adminId)
            deleteInvitationById(queryParams.inviteId);
            props.history.push("/")
        
    }
    return (
        <>
            {adminInfo ? <>
                <div className='container'>
                    <div className='row'>
                        <Dashboard className='onboarding-illustration' />
                        <h1 className='h4-style text-center d-flex justify-content-center'>Wilt u {adminInfo.displayName || `${adminInfo.firstname} ${adminInfo.lastname}`} ({adminInfo.email}) toegang geven tot uw informatie?</h1>

                        <div className='btn-wrapper d-flex justify-content-center'>
                            <button className='btn' onClick={handleConfirm}>Ja</button>
                            <button className='btn-red btn' onClick={handleConfirm}>Nee</button>
                        </div>

                       
                    </div>
                </div>
            </>
                : null}
        </>
    )
}

export default Invitation
