import { createContext, useState } from "react";
import { initialSignInFormData, initialSignUpFormData } from "../config/signUpFormControls";
import axiosInstance from "@/api/axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";

export default function AuthProvider({children}){

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );
    const navigate = useNavigate();
    
    async function handleRegisterUser(event) {
        try {
            event.preventDefault();
            console.log("Sending signUpFormData:", signUpFormData);
            const response = await axiosInstance.post('/auth/register', {
                ...signUpFormData,
                role: 'user'
            });
            console.log(response.data); // Log response for debugging
            
        } catch (error) {
            console.error("Registration failed:", error);
            throw error; // Rethrow error for handling in UI
        }
    }

    async function handleLoginUser(event) {
        try {
            event.preventDefault();
            console.log("Sending signUpFormData:", signInFormData);
            const response = await axiosInstance.post('/auth/login', {
                ...signInFormData,
                role: 'user'
            });
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.accessToken);
                setIsAuthenticated(true); // Mark as logged in
                navigate("/"); // Redirect to home after login
                console.log("Login successful:", response.data);
                // Redirect user to dashboard or another protected page
            }
            
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Rethrow error for handling in UI
        }
    }

    async function handleAuth(event) {
        try {
            event.preventDefault();
            const response = await axiosInstance.get('/auth/check-auth')
            console.log(response.data); // Log response for debugging
            
        } catch (error) {
            console.error("Registration failed:", error);
            throw error; // Rethrow error for handling in UI
        }
    }
    function handleLogout() {
        localStorage.removeItem("token"); // or cookies if used
        setIsAuthenticated(false);
        navigate("/");
      }
      

    return <AuthContext.Provider value={{
        signInFormData, setSignInFormData,
        signUpFormData, setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        handleLogout,
        isAuthenticated,
    }}>
    {children}
    </AuthContext.Provider>
}
