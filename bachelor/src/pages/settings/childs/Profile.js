import React, { useState, useEffect, useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import be from '../../../lang/be.json';
import {
  updatePersonalInformation,
  getUserData,
  uploadProfilePicture,
} from '../../../services/auth.services';

let currentUser = JSON.parse(localStorage.getItem('firebase:currentUser'));

const Profile = (props) => {
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
      profilePicture: event.target.files[0],
    }));
  };

  const getData = useCallback(async (uid) => {
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
    console.log(state);
    // getEvents(uid);
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

      if (state.profilePicture) {
        const img = await uploadProfilePicture(state.profilePicture);
        picture = img;
        console.log(img);
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
          <div className='col-md-9'>
            <div className='container '>
              <h2 className='mt-5 mb-5'>Profiel instellingen</h2>

              {message.error && (
                <p className='alert alert-danger'>{message.error}</p>
              )}
              {message.succeed && (
                <p className='alert alert-success'>{message.succeed}</p>
              )}

              <div className='img-wrapper'>
                <div className='d-inline'>
                  <img className='picture' src={state.photo} />
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

              <form>
                <div className='form-group'>
                  <label htmlFor='fullName'>Gebruikersnaam</label>
                  <input
                    type='text'
                    className='form-control'
                    id='fullName'
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
