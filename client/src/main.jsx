import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
// import axios from 'axios'
// import customFatch from './utils/customFatch.js'


// // const data  = await axios.get('/api/v1/test');
// // console.log(data);
// const data  = await customFatch.get('/test');
// console.log(data);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </StrictMode>,
)
