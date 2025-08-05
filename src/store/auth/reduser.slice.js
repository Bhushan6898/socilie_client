import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  isAuthenticated: false,
  id: null,
  userdata: [],
  notificationdata:[],
  postdata:[],
  error: null, 
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
      state.userdata= data; // Store bill data in the state
    },
    setNotificationdata: (state, actions) => {
      const { data } = actions.payload;
      state.notificationdata= data;
    },setPostdata: (state, actions) => {
      const { data } = actions.payload;
      state.postdata= data; // Store bill data in the state
      console.log(data); 
    },
    
  },
  
});

export const { login, logOut, setProductDatas, setBillDatas, setError ,setUserdata,setNotificationdata,setPostdata} = authReducer.actions;
export default authReducer.reducer;
