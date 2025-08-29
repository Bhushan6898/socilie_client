import axios from "axios";
//export const BaseURL="http://localhost:3001"
export const BaseURL="https://socilite-server-1.onrender.com"
const axiosInstance = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
  timeout: 10000 
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);


export default axiosInstance;
//
