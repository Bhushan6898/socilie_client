import axios from "axios";
//export const BaseURL="http://localhost:3001"
export const BaseURL="https://socilite-server-1.onrender.com"
const axiosInstance = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
  timeout: 10000 // 10s to avoid hanging requests
});
const checkConnection = async () => {
    try {
        const response = await axiosInstance.get('/connection');
        console.log('Connection successful:', response.data);
        
    } catch (error) {
        console.error('Connection failed:', error);
    }
};
checkConnection(); 

export default axiosInstance;
//
