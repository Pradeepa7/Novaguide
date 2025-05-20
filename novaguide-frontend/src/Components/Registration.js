import React, { useState, useContext } from "react";
import logo from '../assets/logo.jpg';
import axios from "axios";
import usernameIcon from '../assets/name-logo.png';
import emailIcon from '../assets/email-logo1.png';
import passwordIcon from '../assets/password-logo.png';
import eyeIcon from '../assets/eye-icon.png';
import nonEyeIcon from '../assets/non-eye-icon.png';
import { UserDetailsContext } from "../Contexts/UserDetailsContext";
import { useNavigate } from "react-router-dom";

// Registration component
const Registration = () => {
    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        checkbox: false
    });

    // Alert message state
    const [alert, setAlert] = useState({ show: false, message: '', type: '', textColor: '' });

    // Password visibility toggle state
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Context and navigation hooks
    const { saveUserRegDetails } = useContext(UserDetailsContext);
    const navigate = useNavigate();
    const URL = 'http://localhost:7000/register/verify';

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    // Handle form input data
    const handleData = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    // Navigate to login page
    const handleLoginBtn = () => {
        navigate("/login");
    }

    // Handle form submission
    const handleFormData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(URL, {
                user: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            });

            const respStatus = response.status;

            if (respStatus === 200) {
                navigate('/pricing');
                saveUserRegDetails(formData);
            }

        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 409) {
                    setAlert({ show: true, message: 'Email Already Exist!', type: 'danger', textColor: 'danger' });
                }
            } else {
                setAlert({ show: true, message: 'Something Went To Wrong!', type: 'danger', textColor: 'danger' });
            }
        }
    }

    return (
        <div className="container py-4 d-flex flex-column align-items-center">
            {/* Alert Message */}
            {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible w-100 w-md-75 w-lg-50 fade show text-${alert.textColor}`} role="alert">
                    <strong>{alert.message}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {/* Logo and App Name */}
            <div className="d-flex justify-content-center align-items-center mb-3">
                <img src={logo} className="me-2" alt="logo" height="30px" width="30px" />
                <h4 style={{ color: '#0000ff', fontSize: '20px' }}>NovaGuide</h4>
            </div>

            {/* Registration Card */}
            <div className="card w-100 w-sm-75 w-md-50 w-lg-33" style={{ maxWidth: '400px', backgroundColor: '#63c9f9' }}>
                <div className="card-body mt-2 shadow bg-body-tertiary-subtle">
                    <h5 className="text-center" style={{ color: '#0000ff' }}>Create your Account</h5>
                    <p className="text-center">Enter your details</p>

                    <form onSubmit={handleFormData}>
                        {/* Name Field */}
                        <div className="input-group mb-3">
                            <img src={usernameIcon} alt="username-icon" className="input-group-text" height="38px" width="50px" />
                            <input type="text" name="name" className="form-control" placeholder="Username" onChange={handleData} required />
                        </div>

                        {/* Email Field */}
                        <div className="input-group mb-3">
                            <img src={emailIcon} alt="email-icon" className="input-group-text" height="38px" width="50px" />
                            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleData} required />
                        </div>

                        {/* Password Field with Eye Toggle */}
                        <div className="input-group mb-3">
                            <img src={passwordIcon} alt="password-icon" className="input-group-text" height="38px" width="50px" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={handleData}
                                required
                            />
                            {/* Eye icon toggle button */}
                            {formData.password && (
                                <button type="button" className="btn btn-light text-primary" onClick={togglePasswordVisibility}>
                                    {passwordVisible
                                        ? <img src={nonEyeIcon} alt="hide-icon" height="21px" width="22px" />
                                        : <img src={eyeIcon} alt="show-icon" height="17px" width="22px" />}
                                </button>
                            )}
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="form-check">
                            <input className="form-check-input" name="checkbox" onChange={handleData} type="checkbox" required />
                            <label className="form-check-label">
                                I agree and accept the <span className="text-primary">terms and conditions</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100 mt-3 mb-2" disabled={!formData.checkbox}>
                            Create Account
                        </button>

                        {/* Login Redirect */}
                        <p className="mb-1">Already have an account?</p>
                        <div className="pt-1 bg-info bg-opacity-10 border border-info-subtle rounded shadow text-center">
                            <button type="button" className="btn btn-link" onClick={handleLoginBtn}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
