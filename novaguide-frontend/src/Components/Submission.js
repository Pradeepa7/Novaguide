import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserDetailsContext } from "../Contexts/UserDetailsContext";
import { useNavigate } from "react-router-dom";

const Submission = () => {

    const URL = 'http://localhost:9000/register/save'; // Backend API endpoint
    const [error, setError] = useState(''); // State to track error message
    const { completeData } = useContext(UserDetailsContext); // Access complete user data from context
    const navigate = useNavigate(); // Hook to navigate programmatically

    // useEffect runs once on component mount to send registration data
    useEffect(() => {
        const fullData = completeData(); // Get full user data (registration + plan)
        console.log('full Data', fullData); // Debug: log full user data
        fetchApi(fullData); // Call API to save data
    }, [completeData]);

    // Function to send user data to backend API
    const fetchApi = async (fullData) => {
        try {
            const response = await axios.post(URL, fullData); // Send POST request with user data
            const resp = await response.data; // Extract response body
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
    }

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
