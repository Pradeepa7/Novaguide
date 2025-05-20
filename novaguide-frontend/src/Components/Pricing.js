import React, { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../Contexts/UserDetailsContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Pricing = () => {
  // Accessing user data and plan saving method from context
  const { saveUserPlanDetails, completeData } = useContext(UserDetailsContext);
  const [fullData, setFullData] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = completeData();
      setFullData(data);
    };
    fetchData();
  }, [completeData]);

  // Handle plan selection and navigate to success page
  const handleSelectedPlan = (plan) => {
    console.log("Selected Plan:", plan);
    saveUserPlanDetails(plan);
    navigate("/success");
  };

  return (
    <div className="pt-5 mt-3">
      <Navbar />
      
      {/* Container for pricing content */}
      <div className="container d-flex flex-column align-items-center mt-5 px-3 px-md-5" style={{ paddingBottom: '2rem' }}>
        <h4 style={{ color: "#0000ff", textDecoration: "underline" }}>
          Select Your Plan
        </h4>
        <p className="text-center">
          "From active to strategic implementation, we redefine systems for
          efficiency, simplified processes, and informed decision-making"
        </p>

        {/* Responsive layout for all three plans */}
        <div className="row mt-3 w-100 g-4">
          
          {/* Free Trial Plan Card */}
          <div className="col-12 col-sm-6 col-lg-4 d-flex">
            <div className="card w-100 h-100">
              <div className="card-body p-0">
                <ul className="list-group text-center">
                  <li className="list-group-item active p-3 text-start fw-bold">
                    FREE TRIAL
                  </li>
                  <li className="list-group-item p-3 text-start">
                    <strong style={{ color: "#0000ff" }}>Expires in</strong> 24
                    hours
                  </li>
                  <li className="list-group-item">Max file size: 5 MB</li>
                  <li className="list-group-item">OCR support: YES</li>
                  <li className="list-group-item">Customer support: NO</li>
                  <li className="list-group-item">Total sessions: UNLIMITED</li>
                  <li className="list-group-item p-0">
                    <div className="card-body d-grid gap-2">
                      {/* Free plan button - disabled if user data is missing */}
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          handleSelectedPlan("Free");
                        }}
                        disabled={!fullData || !fullData.name}
                      >
                        Create Free Account
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Plan Card */}
          <div className="col-12 col-sm-6 col-lg-4 d-flex">
            <div className="card w-100 h-100">
              <div className="card-body p-0">
                <ul className="list-group text-center">
                  <li className="list-group-item active p-3 text-start fw-bold">
                    PRO
                  </li>
                  <li className="list-group-item p-3 text-start">
                    <strong style={{ color: "#0000ff" }}>Rs 999</strong>/week
                  </li>
                  <li className="list-group-item">Max file size: 5 MB</li>
                  <li className="list-group-item">OCR support: YES</li>
                  <li className="list-group-item">
                    Customer support: YES (Email)
                  </li>
                  <li className="list-group-item">Total sessions: UNLIMITED</li>
                  <li className="list-group-item p-0">
                    <div className="card-body d-grid gap-2">
                      {/* Pro plan button */}
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          handleSelectedPlan("Pro");
                        }}
                      >
                        Select Plan
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Plan Card */}
          <div className="col-12 col-sm-6 col-lg-4 d-flex mx-auto">
            <div className="card w-100 h-100">
              <div className="card-body p-0">
                <ul className="list-group text-center">
                  <li className="list-group-item active p-3 text-start fw-bold">
                    ADVANCED
                  </li>
                  <li className="list-group-item p-3 text-start">
                    <strong style={{ color: "#0000ff" }}>Rs 3499</strong>/month
                  </li>
                  <li className="list-group-item">Max file size: 5 MB</li>
                  <li className="list-group-item">OCR support: YES</li>
                  <li className="list-group-item">
                    Customer support: YES (Email)
                  </li>
                  <li className="list-group-item">Total sessions: UNLIMITED</li>
                  <li className="list-group-item p-0">
                    <div className="card-body d-grid gap-2">
                      {/* Advanced plan button */}
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          handleSelectedPlan("Advanced");
                        }}
                      >
                        Select Plan
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;
