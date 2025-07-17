import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  isAuthenticated: false,
  id: null,
  productDatas: [],
  billdata: [],
  userdata: [],
  notificationdata:[],
  logsdata:[],
  error: null, // Added error state
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
      state.error = null; // Clear any previous errors on successful login
       // Log the updated state
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.id = null; // Clearing the ID on logout
      state.error = null; // Clear error on logout
    },
    setProductDatas: (state, actions) => {
      const { data } = actions.payload;
      state.productDatas = data; // Store product data in the state
    },
    setBillDatas: (state, actions) => {
      const { data } = actions.payload;
      state.billdata = data; // Store bill data in the state
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
    },setLogsdata: (state, actions) => {
      const { data } = actions.payload;
      state.logsdata= data; // Store bill data in the state
      console.log(data); 
    },
    
  },
  
});

export const { login, logOut, setProductDatas, setBillDatas, setError ,setUserdata,setNotificationdata,setLogsdata} = authReducer.actions;
export default authReducer.reducer;
