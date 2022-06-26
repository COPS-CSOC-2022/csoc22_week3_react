import React, { useState } from 'react'
import { useAuth } from '../context/auth'
import {noAuthRequired} from '../middlewares/no_auth_required'
import { useRouter } from 'next/router'
import axios from '../utils/axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function LoginForm() {
  
  const { setToken } = useAuth()
  const router = useRouter()

  noAuthRequired ();

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  
  
  const login = () => {
     if (username === '' ||password === '') {
     
      toast.warn("Please Don't leave any empty spaces....",{position: "top-center"});
      return 
    }
    
    const dataForApiRequest = {
        username: username,
        password: password
      }

      axios.post(
        'auth/login/',
        dataForApiRequest,
      )
        .then(function ({ data, status }) {
          setToken(data.token)
          toast.success("You have been logged in succesfully....",{position: "top-center"})
          router.reload()
        })
        .catch(function (err) {
          toast.error('Unable to log in...Please try again.... ',{position: "top-center"})
        })  
    
   
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <ToastContainer />
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </div>
  )
}
