import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
        return <Navigate to="/auth" />; // Redirect if not logged in
    }

    return children; // Allow access if logged in
};

export default ProtectedRoute;
