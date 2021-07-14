import React from 'react'
import MedicineImg from '../assets/images/medicine.jpg'
import Logo from '../assets/images/OpWit.svg'

const Login = () => {
    return (
        <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div class="container">
                <div class="card login-card">
                    <div class="row no-gutters">
                    <div class="col-md-5">
                        <img src={MedicineImg} alt="login" class="login-card-img"/>
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                        <div class="brand-wrapper">
                            <img src={Logo} alt="logo" class="logo" />
                        </div>
                        <p class="login-card-description">Create your account</p>
                        <form action="#!">
                            <div class="form-group">
                                <label for="email" class="sr-only">Email</label>
                                <input type="email" name="email" id="email" class="form-control" placeholder="Email address" />
                            </div>
                            <div class="form-group mb-4">
                                <label for="password" class="sr-only">Password</label>
                                <input type="password" name="password" id="password" class="form-control" placeholder="***********" />
                            </div>
                            <input name="register" id="register" class="btn btn-block login-btn mb-4" type="button" value="Register" />
                            </form>
                            <p class="login-card-footer-text">Already have an account? <a href="#!" class="text-reset">Login here</a></p>
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

export default Login

