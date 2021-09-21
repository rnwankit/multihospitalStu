import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('Login')
    const [reset, setReset] = useState(false)

    const handleLogin = () => {

    }

    const handleSignup = () => {

    }

    const handleResetPassword = () => {

    }

    const handleGoogleSignIn = () => {

    }

    return (
        <React.Fragment>
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        {
                            !reset ?
                                userType === 'Login' ? <h2>Login</h2> : <h2>Signup</h2>
                                : <h2>Reset Password</h2>
                        }
                    </div>
                    <div className="php-email-form">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8 form-group mt-3 mt-md-0">
                                <input
                                    type="email" className="form-control"
                                    name="email" id="email" placeholder="Your Email"
                                    data-rule="email" data-msg="Please enter a valid email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="validate" />
                            </div>
                            {
                                !reset ?
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="password" name="password"
                                            className="form-control" id="password"
                                            placeholder="Your Password" data-rule="minlen:4"
                                            data-msg="Please enter password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="validate" />
                                    </div>
                                    : null
                            }
                        </div>
                        {
                            !reset ?
                                userType === 'Login' ?
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            onClick={() => handleLogin()}
                                        >Login</button></div>
                                    :
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            onClick={() => handleSignup()}
                                        >Signup</button></div>
                                :
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        onClick={() => handleResetPassword()}
                                    >Submit</button></div>
                        }

                        <div className="row text-center">
                            <h6>Or</h6>
                            <div className="col-md-12">
                                <button
                                    type="submit"
                                    onClick={() => handleGoogleSignIn()}
                                    style={{ backgroundColor: 'white', color: 'black', border: '1px solid' }}
                                >
                                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Sigin Using Google
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            {
                                userType === 'Login' ?
                                    <div>
                                        <p className="d-inline mt-2">Create a new account: </p>
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => { setReset(false); setUserType('Signup') }}
                                        >Signup</button>
                                    </div>
                                    :
                                    <div>
                                        <p className="d-inline mt-2">Already have an account? </p>
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => { setReset(false); setUserType('Login') }}
                                        >Login</button>
                                    </div>
                            }
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                className="btn btn-link"
                                onClick={() => setReset(true)}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Login