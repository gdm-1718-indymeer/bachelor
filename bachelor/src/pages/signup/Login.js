import React, { useState } from 'react';
import MedicineImg from '../../assets/images/medicine.jpg';
import {signInWithGoogle,signInWithEmailAndPassword,forgotPassword} from '../../services/auth.services';
import queryString from 'query-string';

const Login = (props) => {
  const queryParams = queryString.parse(props.location.search)
  const [state, setValue] = useState({});
  const [message, setMessage] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [emailValue, setEmailValue] = useState(false);

  // eslint-disable-next-line no-useless-escape
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    let stateValue = state;
    stateValue[name] = value;

    setValue(stateValue);
  };
  
  const loginWithGoogle = () => {
    signInWithGoogle(queryParams.callback? queryParams.callback : '/welcome')
  }
  
  const onSubmitReset = async () => {

    if (!emailValue.email) {
      setMessage({
        error: 'Er is geen email ingevuld',
      });
      return;
    }else if(! re.test(emailValue.email) ){
      setMessage({
        error: 'Ongeldig email adres',
      });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }else {
      await forgotPassword(emailValue.email)
      setMessage({
        error: 'Er is een email verstuurd naar het geschreven email-adres',
      });
      setTimeout(() => {
        setMessage({});
        setPasswordReset(false)

      }, 3000);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!state.password) {
      setMessage({
        error: 'Gelieve een wachtwoord in te vullen',
      });
      return;
    }

    if (state.email && state.password) {
       if(! re.test(state.email) ){
        setMessage({
          error: 'Ongeldig email adres',
        });
        setTimeout(() => {
          setMessage({});
        }, 3000);
        return
      }
      const result = await signInWithEmailAndPassword(
        state.email,
        state.password
      );
      if (!result.message) {
        window.location = queryParams.callback ? queryParams.callback : '/';
      } else if (result.message) {
        setMessage({
          error: result.message,
        });
      }
    } else {
      setMessage({
        error: "Wachtwoorden zijn niet gelijkaardig",
      });
      return;
    }
  };

  return (
    <main className='d-flex align-items-center min-vh-100 py-3 py-md-0 login'>
      <div className='container'>
        <div className='card login-card'>
          <div className='row no-gutters'>
            <div className='col-md-5'>
              <img src={MedicineImg} alt='login' className='login-card-img' />
            </div>
            <div className='col-md-7'>
              <div className='card-body'>
              {!passwordReset ? <>
                <p className='login-card-description'>
                  Inloggen op jouw account
                </p>
       
                <form action='#!'>
                  {message.error && (
                    <p className='alert alert-danger'>{message.error}</p>
                  )}

                  <div className='form-group'>
                    <label htmlFor='email' className='sr-only'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='form-control'
                      placeholder='Email address'
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group mb-4'>
                    <label htmlFor='password' className='sr-only'>
                      Wachtwoord
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='form-control'
                      placeholder='***********'
                      onChange={onChange}
                    />
                  </div>

                  <input
                    name='register'
                    id='register'
                    className='btn btn-block login-btn mb-4'
                    type='button'
                    value='Login'
                    onClick={onSubmit}
                  />
                   <nav className='login-card-footer-nav'>
                    <a href='#!' onClick={() => {setPasswordReset(true)}}>Wachtwoord vergeten?</a>
                  </nav>
                </form>

                <div className='providers-login'>
                  <h5 className='providers-login__title'>Of log in met </h5>
                  <button
                    type='button'
                    className='google-button'
                    onClick={loginWithGoogle}>
                    <span className='google-button__icon'>
                      <svg
                        viewBox='0 0 366 372'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z'
                          id='Shape'
                          fill='#EA4335'
                        />
                        <path
                          d='M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z'
                          id='Shape'
                          fill='#FBBC05'
                        />
                        <path
                          d='M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z'
                          id='Shape'
                          fill='#4285F4'
                        />
                        <path
                          d='M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z'
                          fill='#34A853'
                        />
                      </svg>
                    </span>
                    <span className='google-button__text'>
                      Inloggen met Google
                    </span>
                  </button>
                </div>

                <p className='login-card-footer-text'>
                  Heb je geen account?{' '}
                  <a href={`/register?callback=${queryParams.callback}`} className='text-reset'>
                    Registreer dan hier
                  </a>
                </p>
                </> : <>
                  <p className='login-card-description'>
                    Wachtwoord herstellen
                  </p>
                 <div className='form-group'>
                 {message.error && (
                    <p className='alert alert-secondary'>{message.error}</p>
                  )}
                 <label htmlFor='email' className='sr-only'>
                   Email
                 </label>
                 <input
                   type='email'
                   name='email'
                   id='email'
                   className='form-control'
                   placeholder='Email address'
                   onChange={(obj) => setEmailValue({email: obj.target.value})}
                 />
                  
                  <input
                    name='register'
                    id='register'
                    className='btn btn-block login-btn mb-4'
                    type='button'
                    value='Versturen'
                    onClick={onSubmitReset}
                  />
               </div></>}
                <nav className='login-card-footer-nav'>
                  <a href='https://www.arteveldehogeschool.be'>Opdracht in functie van Artevelde Hogeschool</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
