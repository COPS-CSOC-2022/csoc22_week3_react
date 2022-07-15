import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { API_URL } from "../utils/constants"
import {no_auth_required} from "../middlewares/no_auth_required";
import { toast } from "react-toastify";


export default function RegisterForm() {
  no_auth_required();
  const { setToken } = useAuth()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const login = () => {
      axios({
        url : API_URL+"auth/login/",
        method : "post",
        data : {username: username , password: password}
      }
      )
        .then(function ({ data, status }) {
          setToken(data.token)
          router.reload()
          console.log("success")
        })
        .catch(function (err) {         
          console.log(
            'An account using same email or username is already created');
            toast("Please Enter correct credentials");
          
        })

      
    

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
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
