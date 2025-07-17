import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root';

const store = configureStore({
    reducer: rootReducer, // Using the root reducer
});

export default store;
