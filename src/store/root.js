import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/reduser.slice';

const rootReducer = combineReducers({
    auth: authReducer, // Use 'auth' as the key to access the state
});

export default rootReducer;
