import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserRepository from "../../repository/user/useUserrepository.js";
import { logOut, setNotificationdata, setPostdata, setUserdata } from "../../store/auth/reduser.slice";
import { login} from "../../store/auth/reduser.slice";

export const useUser = () => {
    const navigation=useNavigate();
    const[userdatas,setUserdatas]=useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    return {
        userdatas,
        getconnect: async () => {
            try {
                setLoading(true)
                const response = await UserRepository.connection(); 
                if (response.status === 200) {
                    const { role,  id } = response.data;
                    dispatch(login({ role, id })); 
        
                    setLoading(false);
                } else {
                    console.error("Connection failed with status:", response.status);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },
       
        getlogin: async (payload) => {
            try {
                const response = await UserRepository.login(payload); // Call the correct method
                if (response.status === 200) {
                    toast.success(response.data?.message)
                    const { role, _id: id } = response.data.user;
                    dispatch(login({ role, id })); 
                     navigation('/');
                    return response;
                } 
                if (response.response.status === 401) {
                    toast.warn(response.response.data?.message)
                    return response;
                }else {
                    console.error("Connection failed with status:", response.status);
                }
                return response;
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },

        logout: async (payload) => {
            try {
                const response = await UserRepository.logout(payload); // Call the correct method
                if (response.status === 200) {
                    toast.success(response.data?.message)
                    dispatch(logOut()); 
                    return response;
                } 
                if (response.response.status === 401) {
                    toast.warn(response.response.data?.message)
                    return response;
                }else {
                    console.error("Connection failed with status:", response.status);
                }
                return response;
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },
        getregister: async (payload) => {
            try {
                const response = await UserRepository.registration(payload); // Call the correct method
              
                if (response.status === 200) {
                   toast.success(response.data?.message)
                   navigation('/login');
                   return response;
                }
                if (response.response.status === 401) {
                    toast.warn(response.response.data?.message)
                    return response;
                }
                 else{
                    console.error("Connection failed with status:", response.status);
                    return response;
                }
                return response;
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },

        getuser: async () => {
            try {
                setLoading(true)
                const response = await UserRepository.UserData(); 
                if (response.status === 200) {
                    const data= response.data.user;
                  console.log(data);
                  dispatch(setUserdata({ data }));
                    
                    setUserdatas(response.data.user)
                    setLoading(false);
                } else {
                    console.error("Connection failed with status:", response.status);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },
         updatedata: async (payload) => {
            try {
                const response = await UserRepository.updateduser(payload); // Call the correct method
                
                if (response.status === 200) {
                   toast.success(response.data?.message)
                  
                   return response;
                }
                if (response.response.status === 401) {
                    toast.warn(response.response.data?.message)
                    return response;
                }
                 else{
                    console.error("Connection failed with status:", response.status);
                    return response;
                }
       
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },

        getnotification: async () => {
            try {
                setLoading(true)
                const response = await UserRepository.NotificationData(); 
                if (response.status === 200) {
                    const data= response.data.Notification;
                  
                  dispatch(setNotificationdata({ data }));
                    setLoading(false);
                } else {
                    console.error("Connection failed with status:", response.status);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },


    createPost: async (payload) => {
            try {
                const response = await UserRepository.postuserdata(payload); // Call the correct method
              
                if (response.status === 200) {
                   toast.success(response.data?.message)
                     navigation('/');
                   return response;
                }
                if (response.response.status === 401) {
                    toast.warn(response.response.data?.message)
                    return response;
                }
                 else{
                    console.error("Connection failed with status:", response.status);
                    return response;
                }
                return response;
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },

         getpost: async () => {
            try {
                setLoading(true)
                const response = await UserRepository.GetpostData(); 
                if (response.status === 200) {
                    const data= response.data.posts;
                  console.log(data);
                   dispatch(setPostdata({ data }));
                    
                    
                    setLoading(false);
                } else {
                    console.error("Connection failed with status:", response.status);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },

    };
};
