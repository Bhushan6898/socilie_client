import axios from "axios";
export const BaseURL="http://localhost:3001"
//export const BaseURL="https://farmdata365-server.onrender.com"

const axiosInstance=axios.create({
    baseURL:BaseURL,
    withCredentials:true
})
const checkConnection = async () => {
    try {
        const response = await axiosInstance.get('/connection');
        console.log('Connection successful:', response.data);
        
    } catch (error) {
        console.error('Connection failed:', error);
    }
};



checkConnection(); // Call this function to test the connection

export default axiosInstance;

