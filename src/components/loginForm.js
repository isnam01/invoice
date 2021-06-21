import React, { useContext } from 'react';
import useInput from '../hooks/useInput'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {


    const userctx = useContext(UserContext)
    const history = useHistory()
    const {
        value: enteredemail,
        isValid: enteredemailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetemailInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetpasswordInput,
    } = useInput((value) => value.trim() !== '');


    let formIsValid = false;

    if (enteredemailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }
    const formSubmissionHandler = (event) => {
        event.preventDefault();

        if (!enteredemailIsValid || !enteredPasswordIsValid) {
            return;
        }
        resetemailInput();
        resetpasswordInput();
        console.log("sending req")
        fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: enteredemail,
                password: enteredPassword
            })

        }).then(res => res.json())
            .then(data => {

                if (data.error) {
                    console.log("error")
                }
                else {
                    const token = data.token
                    localStorage.setItem('token', token)
                    userctx.login(data.token)
                    history.push('/dashboard')
                    toast.success(data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    };
    const emailInputClasses = emailInputHasError
        ? 'input-field invalid'
        : 'input-field';

    const passwordInputClasses = passwordInputHasError
        ? ' input-field invalid'
        : 'input-field';

    return (

        <>
            <form onSubmit={formSubmissionHandler} className="signin-form">
                <h2 className="title">Sign in</h2>
                <div className={emailInputClasses}>
                    <i className="fa fa-user"></i>
                    <input type="text" id='name'
                        onChange={emailChangedHandler}
                        onBlur={emailBlurHandler}
                        value={enteredemail}
                        placeholder="Enter your email" />
                </div>
                {emailInputHasError && (
                    <p className='error-text'>Enter a valid email.</p>
                )}
                <div className={passwordInputClasses}>
                    <i className="fa fa-lock"></i>
                    <input type="password"
                        id='password'
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                        placeholder="Password" />
                </div>
                {passwordInputHasError && (
                    <p className='error-text'>Enter a valid password.</p>
                )}
                <button type="submit" className="btn" disabled={!formIsValid} >Login</button>
            </form>
        </>
    )

}
export default Login;