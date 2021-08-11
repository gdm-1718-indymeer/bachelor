import React, { useState } from "react";
import MedicineImg from '../../assets/images/medicine.jpg'
import { signInWithGoogle, createUserWithEmailAndPassword } from "../../services/auth.services";
import queryString from 'query-string';

const Signup = (props) => {
    const queryParams = queryString.parse(props.location.search)

    const [state, setValue] = useState({});
    const [message, setMessage] = useState(false);


    const onChange = (e) => {
        const { target: { name, value } } = e
        let stateValue = state
        stateValue[name] = value

        setValue(stateValue)
    }
    const loginWithGoogle = () => {
        signInWithGoogle(queryParams.callback || '/settings')
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        if (state.password !== state.passwordConfirm) {
            setMessage({
                error: "Password doesn't match"
            })
            return
        }

        if (state.email && state.password && state.firstname && state.lastname) {

            const result = await createUserWithEmailAndPassword(state.email, state.password, state.firstname, state.lastname)
            if (!result.message) {
                window.location = queryParams.callback || '/settings';
            } else if (result.message) {
                setMessage({
                    error: result.message
                })
            }
        } else {
            setMessage({
                error: "Password doesn't match"
            })
            return
        }
    }


    return (
        <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div class="container">
                <div class="card login-card">
                    <div class="row no-gutters">
                        <div class="col-md-5">
                            <img src={MedicineImg} alt="login" class="login-card-img" />
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">

                                <p class="login-card-description">Create your account</p>
                                <form action="#!">
                                    {message.error &&
                                        <p className='alert alert-danger'>{message.error}</p>
                                    }
                                    <div class="input-group">
                                        <input type="text" class="form-control" name='firstname' placeholder="Voornaam" onChange={onChange} />
                                        <span class="input-group-btn"></span>
                                        <input type="text" class="form-control" name='lastname' placeholder="Achternaam" onChange={onChange} />
                                    </div>

                                    <div class="form-group">
                                        <label for="email" class="sr-only">Email</label>
                                        <input type="email" name="email" id="email" class="form-control" placeholder="Email address" onChange={onChange} />
                                    </div>


                                    <div class="form-group">
                                        <label for="email" class="sr-only">Telefoon</label>
                                        <input type="number" name="phone" id="phone" class="form-control" placeholder="Telefoonnummer" onChange={onChange} />
                                    </div>

                                    <div class="form-group mb-4">
                                        <label for="password" class="sr-only">Password</label>
                                        <input type="password" name="password" id="password" class="form-control" placeholder="***********" onChange={onChange} />
                                    </div>

                                    <div class="form-group mb-4">
                                        <label for="password" class="sr-only">passwordConfirm</label>
                                        <input type="password" name="passwordConfirm" id="passwordConfirm" class="form-control" placeholder="***********" onChange={onChange} />
                                    </div>

                                    <input name="register" id="register" class="btn btn-block login-btn mb-4" type="button" value="Register" onClick={onSubmit} />
                                </form>

                                <div className='providers-login'>
                                    <h5 className='providers-login__title'>Or Sign up with </h5>
                                    <button type="button" class="google-button" onClick={loginWithGoogle}>
                                        <span class="google-button__icon">
                                            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
                                        </span>
                                        <span class="google-button__text">Sign Up with Google</span>
                                    </button>
                                </div>

                                <p class="login-card-footer-text">Already have an account? <a href="/login" class="text-reset">Login here</a></p>
                                <nav class="login-card-footer-nav">
                                    <a href="#!">Terms of use.</a>
                                    <a href="#!">Privacy policy</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Signup

