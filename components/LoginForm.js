import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { API_URL } from "../utils/constants";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {toast} from "react-toastify";

export default function RegisterForm() {
    const {setToken}=useAuth();
     const [pwd, setPwd] = useState('');
     const [user, setUser] = useState('');
     const router=useRouter();
     const login = (e) => {
       e.preventDefault();
       setUser(`${document.getElementById('inputUsername').value.trim()}`);
       setPwd(`${document.getElementById('inputPassword').value}`);
       console.log(user,pwd);
         if (user.toString().length===0||pwd.toString().length===0) {
             toast.error("Username and password can't be empty!!")
         } 
         else {
             const dataForApiRequest = {
                 username: user,
                 password: pwd
             };
             axios.post(
                  API_URL + "auth/login/",
                  dataForApiRequest
             )
                 .then(({ data, status })=>{
                   toast.success("Logged-In successfully!!")
                   setToken(data.token);
                   localStorage.setItem("token", data.token);
                   router.push('/');
                   
                 })
                 .catch((err)=>{
                     console.log(err)
                     toast.error('Wrong username or password!!')
                 });
  }
  
     }
  return (
    <div className='bg-gray-200 min-h-screen flex flex-col'>
      <div className=' container max-w-sm mx-auto  flex-1 flex flex-col items-center justify-center px-2'>
        <div className='login-box bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <input
            type='text'
            value={user}
            className='block border border-grey-light w-full p-3 rounded mb-5'
            name='inputUsername'
            id='inputUsername'
            onChange={(e) => setUser(e.target.value)}
            placeholder='Username'
          />
          <input
            type='password'
            value={pwd}
            className='block border border-grey-light w-full p-3 rounded mb-5'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange={(e) => setPwd(e.target.value)}
          />
          <button id="loginbtn"
            type='submit'
            className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-700 hover:border-transparent focus:outline-none my-1'
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>
  )

}
