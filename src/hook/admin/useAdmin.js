
import { useState } from "react";
import UserRepository from "../../repository/admin/useAdminrepository.js";
import { useDispatch } from "react-redux";


import { setAllPostdata } from "../../store/auth/reduser.slice";



export const useAdmin = () => {
      const [loading, setLoading] = useState(false);
         const dispatch = useDispatch();
    return {
     
        getallpost: async () => {
           
            try {
                setLoading(true)
                const response = await UserRepository.post(); 
                
                
                if (response.status === 200) {
                    const data=response.data.posts
                    dispatch(setAllPostdata({ data }));
                 
                 
                   
        
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
