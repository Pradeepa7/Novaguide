import React,{useContext, useEffect, useState} from "react";
// Importing context to access shared user details across the app
import { UserDetailsContext } from "../Contexts/UserDetailsContext";
import { useNavigate} from "react-router-dom"; // For navigation and linking between pages
import Navbar from "./Navbar";

const Pricing = () => {

    // Destructuring context methods to save user plan and get complete user data
    const {saveUserPlanDetails, completeData} = useContext(UserDetailsContext);
    const [fullData, setFullData] = useState(null); // State to hold full user data
    const navigate = useNavigate(); // Navigation hook from React Router
    
    // Fetch complete user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const data = completeData(); // Getting data from context
            setFullData(data); // Storing it in local state
        };
        fetchData();
    }, [completeData]);
           
    // Handle user plan selection and navigate to success page
    const handleSelectedPlan=(plan)=>{
         console.log('Selected Plan:',plan); // For debugging selected plan
         saveUserPlanDetails(plan); // Save selected plan to context or global state
         navigate("/success") // Navigate to success page
    }

    return (
        // Parent div with fixed header layout
        <div className="d-flex flex-column position-fixed top-0 w-100">
            {/* Navigation Bar */}
            <Navbar/>
            {/* Pricing Content Section */}
            <div className="container d-flex flex-column align-items-center mt-5">
                <h4 style={{ color: '#0000ff', textDecoration:'underline' }}>Select Your Plan</h4>
                <p>"From active to strategic implementation, we redefine systems for efficiency, simplified processes,
                    and informed decision-making "</p>

                {/* Card Row with Horizontal Scroll on Mobile */}
                <div className="container mt-3 overflow-auto">
                    <div className="row flex-nowrap">

                        {/* Free Trial Plan Card */}
                        <div className="col-4 min-width-card pe-2">
                            <div className="card h-100">
                                <div className="card-body p-0">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item active p-3 text-start fw-bold">FREE TRIAL</li>
                                        <li className="list-group-item p-3 text-start"><strong style={{ color: '#0000ff' }}>Expires in</strong> 24 hours</li>
                                        <li className="list-group-item">Max file size: 5 MB</li>
                                        <li className="list-group-item">OCR support: YES</li>
                                        <li className="list-group-item">Customer support: NO</li>
                                        <li className="list-group-item">Total sessions: UNLIMITED</li>
                                        <li className="list-group-item p-0">
                                            <div className="card-body d-grid gap-2">
                                                {/* Button is disabled if user data not available */}
                                                <button type="button" className="btn btn-outline-primary" 
                                                    onClick={()=>{handleSelectedPlan('Free')}} 
                                                    disabled={!fullData || !fullData.name}
                                                >Create Free Account</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Pro Plan Card */}
                        <div className="col-4 min-width-card pe-2">
                            <div className="card h-100">
                                <div className="card-body p-0">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item active p-3 text-start fw-bold">PRO</li>
                                        <li className="list-group-item p-3 text-start"><strong style={{ color: '#0000ff' }}>Rs 999</strong>/week</li>
                                        <li className="list-group-item">Max file size: 5 MB</li>
                                        <li className="list-group-item">OCR support: YES</li>
                                        <li className="list-group-item">Customer support: YES (Email)</li>
                                        <li className="list-group-item">Total sessions: UNLIMITED</li>
                                        <li className="list-group-item p-0">
                                            <div className="card-body d-grid gap-2">
                                                <button type="button" className="btn btn-outline-primary" onClick={()=>{handleSelectedPlan('Pro')}}>Select Plan</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Plan Card */}
                        <div className="col-4 min-width-card pe-2">
                            <div className="card h-100">
                                <div className="card-body p-0">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item active p-3 text-start fw-bold">ADVANCED</li>
                                        <li className="list-group-item p-3 text-start"><strong style={{ color: '#0000ff' }}>Rs 3499</strong>/month</li>
                                        <li className="list-group-item">Max file size: 5 MB</li>
                                        <li className="list-group-item">OCR support: YES</li>
                                        <li className="list-group-item">Customer support: YES (Email)</li>
                                        <li className="list-group-item">Total sessions: UNLIMITED</li>
                                        <li className="list-group-item p-0">
                                            <div className="card-body d-grid gap-2">
                                                <button type="button" className="btn btn-outline-primary" onClick={()=>{handleSelectedPlan('Advanced')}}>Select Plan</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing;
