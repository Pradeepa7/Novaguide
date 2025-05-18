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

    // API endpoint URL
    const URL = 'http://localhost:9000/login/userLogin';
    const navigate = useNavigate();

    // Access context to save user registration details
    const { saveUserRegDetails } = useContext(UserDetailsContext);

    // State to toggle password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);

    // State to manage alert messages
    const [alert, setAlert] = useState({ show: false, message: '', type: '', textColor: '' });

    // State to manage form data
    const [loginFormData, setLoginFormData] = useState({
        name: null,
        email: "",
        password: ""
    });

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    // Handle form input changes
    const handleData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;

        setLoginFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            }
        });
    }

    // Navigate to registration page
    const handleCreateAccBtn = () => {
        navigate("/register")
    }

    // Handle form submission
    const handleFormData = async (e) => {
        e.preventDefault();
        console.log('Login form Data-->', loginFormData);

        try {
            // Send login request to server
            const response = await axios.post(URL, {
                email: loginFormData.email,
                password: loginFormData.password
            });

            const resp = await response.data;
            console.log(resp);
            const respStatus = response.status;
            console.log(respStatus);

            // Redirect to dashboard on successful login
            if (respStatus === 200) {
                navigate("/dashboard");
            }

            // Store JWT token in local storage
            const jwt = response.data.token;
            console.log("token:", jwt)
            localStorage.setItem("jwtToken", jwt);
            window.dispatchEvent(new Event("tokenUpdated"));
        }
        catch (error) {
            console.log('error-->', error);

            // Save registration details to context
            saveUserRegDetails(loginFormData);

            // Handle specific error responses
            if (error.response) {
                const { status } = error.response;
                switch (status) {
                    case 404:
                        console.log('not a valid email');
                        setAlert({ show: true, message: 'Please Provide valid Email', type: 'danger', textColor: 'danger' });
                        break;
                    case 401:
                        console.log('invalid password');
                        setAlert({ show: true, message: 'Invalid Password', type: 'danger', textColor: 'danger' });
                        break;
                    case 403:
                        console.log('plan expired');
                        setAlert({ show: true, message: 'Please upgrade, plan expired', type: 'danger', textColor: 'danger' });
                        setTimeout(() => {
                            navigate("/pricing")
                        }, 3 * 1000);
                        break;
                    default:
                        console.log('something went to wrong!');
                        break;
                }
            }
            else {
                // Show network error alert
                setAlert({ show: true, message: 'Network error. Please check your connection.', type: 'danger', textColor: 'danger' })
            }
        }
    }

    // JSX for login page
    return (
        <div className="container d-flex flex-column align-items-center">
            {
                alert.show && <div className={`alert alert-${alert.type} alert-dismissible w-50 fade show text-${alert.textColor}`} role="alert">
                    <strong>{alert.message}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {/* Branding section */}
            <div className="container d-flex flex-column align-items-center">
                <div className="container d-flex justify-content-center">
                    <img src={logo} className="img me-2" alt="logo" height="30px" width="30px" />
                    <h4 style={{ color: '#0000ff', fontSize: '20px' }}>NovaGuide</h4>
                </div>

                {/* Login card */}
                <div className="container mt-4" style={{ width: '400px' }}>
                    <div className="card" style={{ backgroundColor: '#63c9f9' }}>
                        <div className="card-body mt-3 shadow bg-body-tertiary-subtle">
                            <h5 style={{ color: '#0000ff', textAlign: 'center' }}>Login to Your Account</h5>
                            <p className="text text-center">Enter your Email & Password to login</p>

                            {/* Login form */}
                            <form onSubmit={handleFormData}>
                                <div className="container mt-4 text-center">
                                    <div className="row">
                                        {/* Email input */}
                                        <div className="col-12">
                                            <div className="input-group mb-3">
                                                <img src={emailIcon} alt="username-icon" className="input-group-text" height="38px" width="50px" />
                                                <input type="email" name="email" className="form-control" onChange={handleData} placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required />
                                            </div>
                                        </div>

                                        {/* Password input */}
                                        <div className="col-12">
                                            <div className="input-group mb-3">
                                                <img src={passwordIcon} alt="username-icon" className="input-group-text" height="38px" width="50px" />
                                                <input type={passwordVisible ? "text" : "password"} name="password" className="form-control" onChange={handleData} placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" required />
                                                {
                                                    loginFormData.password && <button type="button" className="btn btn-light text-primary" onClick={togglePasswordVisibility}>
                                                        {
                                                            passwordVisible ? <img src={nonEyeIcon} alt="eye-icon" height="21px" width="22px" /> : <img src={eyeIcon} alt="noneye-icon" height="17px" width="22px" />
                                                        }
                                                    </button>
                                                }
                                            </div>
                                        </div>

                                        {/* Submit button */}
                                        <div className="col-12">
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-primary" type="submit">Login</button>
                                            </div>
                                        </div>

                                        {/* Redirect to register */}
                                        <div className="col-12">
                                            <p className="text text-start mt-2">Don't have an account?</p>
                                            <div className="pt-1 bg-info bg-opacity-10 border border-info-subtle rounded shadow bg-body-tertiary text-center">
                                                <button type="button" className="btn btn-link" onClick={handleCreateAccBtn}>Create an account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

// Export component
export default Login;
