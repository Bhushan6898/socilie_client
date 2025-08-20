
import { useState } from "react";
import UserRepository from "../../repository/admin/useAdminrepository.js";
import { useDispatch } from "react-redux";


import { setAllPostdata ,setSetting} from "../../store/auth/reduser.slice";


export const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([]);
    return {
        allUsers,
        getallpost: async () => {

            try {
                setLoading(true)
                const response = await UserRepository.post();


                if (response.status === 200) {
                    const data = response.data.posts
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

        getallusers: async () => {

            try {
                setLoading(true)
                const response = await UserRepository.alluser();

                if (response.status === 200) {
                    // const data=response.data.posts
                    // dispatch(setAllPostdata({ data }));
                    console.log("All users data:", response.data.users);
                    setAllUsers(response.data.users);
                    setLoading(false);

                } else {
                    console.error("Connection failed with status:", response.status);

                }
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting:", error);
            }
        },

        setting: async () => {

            try {
                setLoading(true)
                const response = await UserRepository.getsetting();

                if (response.status === 200) {
                   dispatch(setSetting({ data: response.data.settings }));
                   console.log("Settings data:", response.data.settings);
                   
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
