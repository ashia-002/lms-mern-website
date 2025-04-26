import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: 'http://localhost:5000'
    }
);

axiosInstance.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('accessToken');
    if (token) {  // Only add token when required
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
},(err)=> Promise.reject(err))

export default axiosInstance;

{/*? Now, when making public requests, you call:
    axiosInstance.get("/courses"); // No token required
*/}

{/*# Now, when making For protected requests, you call:
    axiosInstance.get("/enrolled-courses", { requiresAuth: true }); // Token required
*/}