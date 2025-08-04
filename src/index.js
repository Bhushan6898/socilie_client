import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store/storage';

import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify'; 
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false} 
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" 
        />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
