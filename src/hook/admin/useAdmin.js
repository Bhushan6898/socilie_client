
import { useState } from "react";
import UserRepository from "../../repository/admin/useAdminrepository.js";


export const useAdmin = () => {
      const [loading, setLoading] = useState(false);
      const[postdatas,setPostdatas]=useState();
    return {
     postdatas,
        getallpost: async () => {
           
            try {
                setLoading(true)
                const response = await UserRepository.post(); 
                
                
                if (response.status === 200) {
                   setPostdatas(response.data.posts);
        
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
