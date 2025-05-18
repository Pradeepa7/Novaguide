import { createContext, useState } from 'react';

// Creating a context to share user-related data across components
export const UserDetailsContext = createContext();

export const UserRegProvider = ({ children }) => {

    // State to store user registration form details
    const [userRegDetails, setUserRegDetails] = useState(null);

    // State to store user-selected subscription plan details
    const [userPlanDetails, setUserPlanDetails] = useState(null);

    // State to store user login details
    const [userLoginDetails, setUserLoginDetails] = useState(null);

    // Function to save user registration form data
    const saveUserRegDetails = (formData) => {
        setUserRegDetails(formData);
        console.log('data saved in context');
    }

    // Function to save user plan subscription data
    const saveUserPlanDetails = (plan) => {
        setUserPlanDetails(plan);
        console.log('Plan saved in context');
    }

    // Function to save user login data
    const saveUserLoginDetails = (loginFormData) => {
        setUserLoginDetails(loginFormData);
        console.log('Login data saved in context');
    }

    // Function to combine and return registration and plan data
    const completeData = () => {
        const userFullData = {
            ...userRegDetails,
            plan: userPlanDetails
        }
        return userFullData;
    }

    return (
        // Providing all user-related data and functions to child components via context
        <UserDetailsContext.Provider value={{
            userRegDetails,
            userPlanDetails,
            userLoginDetails,
            completeData,
            saveUserRegDetails,
            saveUserPlanDetails,
            saveUserLoginDetails
        }}>
            {children}
        </UserDetailsContext.Provider>
    );
}


