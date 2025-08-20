import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  isAuthenticated: false,
  id: null,
  userdata: [],
  notificationdata:[],
  postdata:[],
  error: null,
   allpostdata:[], 
   setting:[], 
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, actions) => {
      const { role, id } = actions.payload;
      state.role = role;
      state.isAuthenticated = true;
      state.id = id;
      state.error = null; 
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.id = null; // Clearing the ID on logout
      state.error = null; // Clear error on logout
    },
   
    setError: (state, actions) => {
      state.error = actions.payload; // Set an error message
    },
    setUserdata: (state, actions) => {
      const { data } = actions.payload;
      state.userdata= data; 
    },
    setNotificationdata: (state, actions) => {
      const { data } = actions.payload;
      state.notificationdata= data;
    },setPostdata: (state, actions) => {
      const { data } = actions.payload;
      state.postdata= data; 
      
    },
    setAllPostdata: (state, actions) => {
      const { data } = actions.payload;
      state.allpostdata= data; 
      
    },
    setSetting: (state, actions) => {
      const { data } = actions.payload;
      state.setting= data;
     
    },
    
  },
  
});

export const { login, logOut, setProductDatas, setBillDatas, setError ,setUserdata,setNotificationdata,setPostdata,setAllPostdata,setSetting} = authReducer.actions;
export default authReducer.reducer;
