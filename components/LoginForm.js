import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { no_auth_required } from '../middlewares/no_auth_required';
//import { useNavigate } from 'react-router-dom';


export default function RegisterForm() {
  
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    no_auth_required();
     const { setToken } = useAuth()
     const router = useRouter()
   
     
     const [password, setPassword] = useState('')
     const [username, setUsername] = useState('')
     
     const registerFieldsAreValid = (
       username,
       password
     ) => {
       if (
        username === '' ||
        password === ''
       ) {
         console.log('Please fill all the fields correctly.')
         toast.error('Please fill all the fields correctly.')
         return false
       }
       
       return true
     }


     const login = (e) => {
    
      e.preventDefault()
      if (
        registerFieldsAreValid(username, password)
      ){
        console.log('Please wait...')
        toast.info('Please Wait...')
        const dataForApiRequest = {
          
          username: username,
          password: password,
        }

        axios.post(
          'auth/login/',
          dataForApiRequest,
        )
        .then(function ({ data, status }) {
          setToken(data.token)
          console.log(data.token)
          
          window.location.href = '/';
        })
        .catch(function (err) {
          console.log(
            'Invalid Username or Password'
          )
          
          toast.error("Invalid Username or Password")
         
          
        })
        

      }
     }
  

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer
      position="bottom-right"
      theme="light"
      autoClose={1000}
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
