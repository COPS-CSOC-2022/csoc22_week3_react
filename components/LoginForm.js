import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import noAuthRequired from '../middlewares/no_auth_required'
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm() {
  
  const { setToken } = useAuth()
  const router = useRouter()

  noAuthRequired()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const loginFieldsAreValid = (username, password) => {
    if( username == '' || password == ''){
      toast.error("Please fill all the fields correctly")
      return false
    }
    return true
  }

  const login = (e) => {

    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    e.preventDefault()

    if (loginFieldsAreValid(username,password)) {

      toast('Please wait...')
      
      const dataForApiRequest = {
        username: username,
        password: password
      }

      axios.post('auth/login/',dataForApiRequest)
        .then(
          ({ data, status }) => {
              setToken(data.token)
              window.location.reload()
              toast.success('Logged in!')
          }
        )
        .catch(
          (err) => {
            toast.error("Invalid Credentials")
          }
        )
    }
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='font-body font-bold mb-8 text-3xl text-center'>Login</h1>
          <input
            type='text'
            className='font-body block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type='password'
            className='font-body block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type='submit'
            className='font-body w-full text-center py-3 rounded bg-transparent text-yellow-500 hover:text-white hover:bg-yellow-500 border border-yellow-500 hover:border-transparent focus:outline-none my-1'
            onClick={(e)=>{login(e)}}
          >
            Login
          </button>
          <Toaster/>
        </div>
      </div>
    </div>
  )
}
