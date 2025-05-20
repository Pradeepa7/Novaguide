// Import necessary hooks and components
import React, { useState, useContext } from "react";
import logo from '../assets/logo.jpg';
import emailIcon from '../assets/email-logo1.png';
import passwordIcon from '../assets/password-logo.png';
import eyeIcon from '../assets/eye-icon.png';
import nonEyeIcon from '../assets/non-eye-icon.png';
import axios from "axios";
import { UserDetailsContext } from "../Contexts/UserDetailsContext";
import { useNavigate } from "react-router-dom";

// Define Login component
const Login = () => {

    // Dynamically set the login API endpoint from environment variable (suitable for both dev and production)
    const URL = `${process.env.REACT_APP_API_URL}/login/userLogin`;

    const navigate = useNavigate();

    // Access context to save user registration details (for pre-fill on error)
    const { saveUserRegDetails } = useContext(UserDetailsContext);

    // State to toggle password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);

    // State to manage alert messages (e.g., login errors)
    const [alert, setAlert] = useState({ show: false, message: '', type: '', textColor: '' });

    // State to manage login form inputs
    const [loginFormData, setLoginFormData] = useState({
        name: null, // Name not used during login but retained
        email: "",
        password: ""
    });

    // Toggle visibility of password input
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    // Handle input field changes and update state accordingly
    const handleData = (e) => {
        console.log(e.target.value); // Debug log
        const { name, value } = e.target;

        // Spread operator to retain previous state and update changed field
        setLoginFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        });
    }

    // Navigate to registration page if user doesn't have an account
    const handleCreateAccBtn = () => {
        navigate("/register")
    }

    // Handle form submission and login request
    const handleFormData = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        console.log('Login form Data-->', loginFormData); // Debug log

        try {
            // Make POST request to backend with login credentials
            const response = await axios.post(URL, {
                email: loginFormData.email,
                password: loginFormData.password
            });

            const resp = await response.data; // Get response body
            console.log(resp); // Debug log
            const respStatus = response.status; // Check response status
            console.log(respStatus); // Debug log

            // On successful login, navigate to dashboard
            if (respStatus === 200) {
                navigate("/dashboard");
            }

            // Store JWT token in local storage and dispatch event
            const jwt = response.data.token;
            console.log("token:", jwt)
            localStorage.setItem("jwtToken", jwt);
            window.dispatchEvent(new Event("tokenUpdated")); // Notify token update
        }
        catch (error) {
            console.log('error-->', error); // Debug log

            // Save current login data to context to pre-fill during retry
            saveUserRegDetails(loginFormData);

            // Handle different HTTP error status codes
            if (error.response) {
                const { status } = error.response;
                switch (status) {
                    case 404:
                        // Email not found
                        console.log('not a valid email');
                        setAlert({ show: true, message: 'Please Provide valid Email', type: 'danger', textColor: 'danger' });
                        break;
                    case 401:
                        // Incorrect password
                        console.log('invalid password');
                        setAlert({ show: true, message: 'Invalid Password', type: 'danger', textColor: 'danger' });
                        break;
                    case 403:
                        // Plan expired
                        console.log('plan expired');
                        setAlert({ show: true, message: 'Please upgrade, plan expired', type: 'danger', textColor: 'danger' });
                        setTimeout(() => {
                            navigate("/pricing") // Redirect to pricing page after 3 seconds
                        }, 3 * 1000);
                        break;
                    default:
                        // Unexpected error
                        console.log('something went to wrong!');
                        break;
                }
            }
            else {
                // General network error (no response from server)
                setAlert({ show: true, message: 'Network error. Please check your connection.', type: 'danger', textColor: 'danger' })
            }
        }
    }

    // JSX layout for Login page
    return (
        <div className="container d-flex flex-column align-items-center min-vh-100 justify-content-center py-4 px-2">
            {
                alert.show && (
                    // Bootstrap alert for error messages
                    <div className={`alert alert-${alert.type} alert-dismissible w-100 w-md-75 w-lg-50 fade show text-${alert.textColor}`} role="alert">
                        <strong>{alert.message}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )
            }

            {/* Branding section with logo and title */}
            <div className="d-flex align-items-center justify-content-center mb-3">
                <img src={logo} className="me-2" alt="logo" height="30" width="30" />
                <h4 className="m-0" style={{ color: '#0000ff', fontSize: '20px' }}>NovaGuide</h4>
            </div>

            {/* Login form card */}
            <div className="card w-100" style={{ maxWidth: '420px', backgroundColor: '#63c9f9' }}>
                <div className="card-body mt-3 shadow bg-body-tertiary-subtle">
                    <h5 className="text-center" style={{ color: '#0000ff' }}>Login to Your Account</h5>
                    <p className="text-center">Enter your Email & Password to login</p>

                    <form onSubmit={handleFormData}>
                        <div className="text-center">
                            <div className="row gx-2">

                                {/* Email input field */}
                                <div className="col-12 mb-3">
                                    <div className="input-group">
                                        <img src={emailIcon} alt="email-icon" className="input-group-text" height="38" width="50" />
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            onChange={handleData}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password input field with toggle */}
                                <div className="col-12 mb-3">
                                    <div className="input-group">
                                        <img src={passwordIcon} alt="password-icon" className="input-group-text" height="38" width="50" />
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            onChange={handleData}
                                            placeholder="Password"
                                            required
                                        />
                                        {
                                            loginFormData.password && (
                                                <button
                                                    type="button"
                                                    className="btn btn-light text-primary"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {
                                                        passwordVisible
                                                            ? <img src={nonEyeIcon} alt="hide" height="21" width="22" />
                                                            : <img src={eyeIcon} alt="show" height="17" width="22" />
                                                    }
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* Submit login button */}
                                <div className="col-12 mb-3">
                                    <div className="d-grid">
                                        <button className="btn btn-primary" type="submit">Login</button>
                                    </div>
                                </div>

                                {/* Register redirect button */}
                                <div className="col-12">
                                    <p className="text-start mt-2 mb-1">Don't have an account?</p>
                                    <div className="bg-info bg-opacity-10 border border-info-subtle rounded shadow text-center py-2">
                                        <button type="button" className="btn btn-link" onClick={handleCreateAccBtn}>
                                            Create an account
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

// Export component for use in other parts of the app
export default Login;
