import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import be from '../../../lang/be.json';
import {
    updatePersonalInformation,
    getUserData,
    uploadProfilePicture,
} from '../../../services/auth.services';

let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));

const Profile = () => {
    const [state, setState] = useState({});
    const [message, setMessage] = useState(false);

    const onChange = (e) => {
        const name = e.target.name;
        const newState = { ...state };
        newState[name] = e.target.value;
        setState(newState);
    };

    const handleChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            photo: URL.createObjectURL(event.target.files[0]),
            pictureBlob: event.target.files[0],
        }));
    };

    const getData = (async (uid) => {
        try {
            const response = await getUserData(uid);
            setState({ ...response, photo: response.profilePicture });
        } catch (e) {
            console.error(e);
        }
    });

    useEffect(() => {
        let uid = currentUser.uid;
        getData(uid);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!state.displayName) {
            setMessage({
                error: 'Gelieve de gebruikersnaam in te vullen',
            });
            return;
        } else if (!state.email) {
            setMessage({
                error: 'Gelieve het email-adres in te vullen',
            });
            return;
        } else if (!state.phoneNumber) {
            setMessage({
                error: 'Gelieve je telefoonnummer in te vullen',
            });
            return;
        }

        if (state.email && state.displayName && state.phoneNumber) {
            let uid = currentUser.uid;
            let picture = state.photo;

            if (state.pictureBlob) {
                console.log(state)
                const img = await uploadProfilePicture(state.pictureBlob);
                picture = img;
            }

            const result = await updatePersonalInformation(
                uid,
                state.displayName,
                state.email,
                state.phoneNumber,
                picture
            );

            if (!result.message) {
                setMessage({
                    succeed: 'De gegevens zijn aangepast',
                });
            } else if (result.message) {
                setMessage({
                    error: result.message,
                });
            }
        } else {
            setMessage({
                error: 'Velden ontbreken',
            });
            return;
        }
    };

    return (
        <>
            <div className='container content clear-fix profile'>
                <div className='row'>
                    <h2 className='mt-5 mb-5'>Profiel instellingen</h2>

                    {message.error && (
                        <p className='alert alert-danger'>{message.error}</p>
                    )}
                    {message.succeed && (
                        <p className='alert alert-success'>{message.succeed}</p>
                    )}
                    <div className='col-md-3'>
                        <div className='container '>



                            <div className='img-wrapper'>
                                <div className='d-inline'>
                                    <img className='picture' src={state.photo} alt='profilePicture'/>
                                    <br />
                                    <input
                                        type='file'
                                        id='photoURL'
                                        name='photoURL'
                                        accept='image/png, image/jpeg'
                                        onChange={handleChange}
                                        hidden
                                    />
                                    <label className='btn' htmlFor='photoURL'>
                                        Profielfoto aanpassen
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <div className='container '>


                            <form>
                                <div className='form-group'>
                                    <label htmlFor='fullName'>Gebruikersnaam</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='fullName'
                                        onChange={onChange}
                                        name='displayName'
                                        value={state.displayName}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        type='email'
                                        onChange={onChange}
                                        name='email'
                                        className='form-control'
                                        value={state.email}
                                        id='email'
                                    />
                                </div>

                                <div className='form-group '>
                                    <label htmlFor='phone'>Telefoon</label>

                                    <PhoneInput
                                        country={'be'}
                                        regions={'europe'}
                                        localization={be}
                                        value={state.phoneNumber ? state.phoneNumber : ''}
                                        onChange={(phone) =>
                                            setState({ ...state, phoneNumber: phone })
                                        }
                                    />
                                </div>

                                <div className='row mt-5'>
                                    <div className='col'>
                                        <button
                                            type='button'
                                            className='btn btn-primary btn-block'
                                            onClick={onSubmit}>
                                            Opslaan
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
