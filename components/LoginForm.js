import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import {displaySuccess, displayWarning, displayError, displayInfo} from '../pages/_app'


export default function RegisterForm() {


  const router = useRouter();
  const { setToken, token } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function logInValidate(username, password) {
    if (username === '' || password === '') {
      displayError("Invalid Credential")
      return false;
    }
    return true;
  }


  const login = (e) => {

    e.preventDefault();

    if (logInValidate(username, password)) {

      displayInfo("Please Wait ....");

      const data = {
        username: username,
        password: password,
      }

      axios.post(
        'auth/login/',
        data,
      )
        .then(function ({ data, status }) {

          displaySuccess("Logged In Succssfully");
          
          setTimeout(() => {
            setToken(data.token)
            router.push('/')
          }, 3000);

        })
        .catch(function (err) {
          displayError('Failed To Log In Try Again')
        })
    }
  }

  return (
    <>
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
      </div>
    </>
  )
}
