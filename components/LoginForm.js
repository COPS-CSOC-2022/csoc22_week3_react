import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/auth";
import axiosInstance from "../utils/axios";

export default function LoginForm() {
  const auth = useAuth()
  const route = useRouter()

  const login = () => {
    if (username === '' || password === '') return

    axiosInstance.post('auth/login/',{username: username, password: password})
    .then(ret => ret.data.token)
    .then((token) => {
      auth.setToken(token)
      route.push('/')
    })
    .catch(err => {console.log(err)})
  }
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
            placeholder='Username'
            onChange={event => setUsername(event.target.value)}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange={event => setPassword(event.target.value)}
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
