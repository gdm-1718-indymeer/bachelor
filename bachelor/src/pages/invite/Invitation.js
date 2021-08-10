import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { deleteInvitationById, getCurrentUser, getInvitationsById, getUserData, pushAccess } from '../../services/auth.services';

const Invitation = (props) => {
    const [invitationInfo, setinvitationInfo] = useState();
    const [adminInfo, setAdminInfo] = useState();

    const queryParams = queryString.parse(props.location.search)
    useEffect(() => {
        getCurrentUser().then(user => {
            getInvitationsById(user.uid, queryParams.inviteId).then(invitationRes => {
                getUserData(invitationRes.adminId).then(res => setAdminInfo(res))
                setinvitationInfo(invitationRes);
            })
        });
    }, [])
    if (!queryParams.inviteId) {
        return <Redirect to="/" />
    }
    const handleConfirm = () => {
        //add to database
        getCurrentUser().then(user => {

            pushAccess({
                adminId: invitationInfo.adminId,
                clientId: user.uid
            });
            deleteInvitationById(queryParams.inviteId);
            props.history.push("/")
        })

    }
    return (
        <>
            {adminInfo ? <>
                <h1>Wilt u {adminInfo.displayName || `${adminInfo.firstname} ${adminInfo.lastname}`} toegang geven tot uw informatie?</h1>
                <button onClick={handleConfirm}>Ja</button>
            </>
                : null}
        </>
    )
}

export default Invitation
