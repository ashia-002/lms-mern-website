import { createContext, useState } from "react";
import { initialSignInFormData, initialSignUpFormData } from "../config/signUpFormControls";
import axiosInstance from "@/api/axios";

export const AuthContext = createContext(null);

export default function AuthProvider({children}){

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

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
            // console.log("handleLoginUser triggered!");
            // axios.post('http://localhost:5000/auth/login', {
            //         ...signInFormData,
            //         role: 'user'
            // }).then(res => console.log("Response:", res.data))
            // .catch(err => console.error("Error:", err.response?.data || err.message));
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.accessToken);
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
    

    return <AuthContext.Provider value={{
        signInFormData, setSignInFormData,
        signUpFormData, setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
    }}>
    {children}
    </AuthContext.Provider>
}
