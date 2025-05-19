import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserDetailsContext } from "../Contexts/UserDetailsContext";
import { useNavigate } from "react-router-dom";

const Submission = () => {

    // Backend API endpoint for user registration (uses env variable for flexibility between dev and production)
    const URL = `${process.env.REACT_APP_API_URL}/register/save`;

    const [error, setError] = useState(''); // State to track error message
    const { completeData } = useContext(UserDetailsContext); // Access complete user data from context
    const navigate = useNavigate(); // Hook to navigate programmatically
    
    // useEffect runs once on mount to send user registration data to backend
    useEffect(() => {
    const fullData = completeData(); // Get full user data (registration + plan)
    console.log('full Data', fullData); // Debug: log full user data

    // Function to send user data to backend API
    const fetchApi = async (fullData) => {
        try {
            const response = await axios.post(URL, fullData); // Send POST request with user data
            const resp = response.data; // Extract response body
            console.log(resp); // Debug: log response data
            const respStatus = response.status; // Get HTTP status code
            console.log(respStatus); // Debug: log response status

            // If response is 200 but contains an error, update error state
            if (respStatus === 200 && resp.error) {
                setError('error');
            }
        } catch (e) {
            console.log('Error:', e); // Catch and log any error during request
        }
    };

    fetchApi(fullData); // Call the API after function is defined
}, [completeData, URL]);


    // Navigate to pricing page if user has active subscription
    const handleSelectPlan = () => {
        navigate("/pricing");
    }

    // Navigate to login page after successful registration
    const handleLoginBtn = () => {
        navigate("/login");
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            {
                // Show error message and redirect button if user already has a plan
                error ? (
                    <div className="container d-flex flex-column align-items-center">
                        <p className="text fs-5">User has an active subscription. Cannot avail the free service.</p>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button" onClick={handleSelectPlan}>Select Plan</button>
                        </div>
                    </div>
                ) : (
                    // Show success message and login button after successful registration
                    <div className="container d-flex flex-column align-items-center">
                        <p className="text fs-3">Success !</p>
                        <p>User successfully registered</p>
                        <button className="btn btn-primary w-25" type="button" onClick={handleLoginBtn}>Login</button>
                    </div>
                )
            }
        </div>
    )
}

export default Submission;
