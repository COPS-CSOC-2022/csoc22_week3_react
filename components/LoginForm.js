import axios from '../utils/axios'
import React, { useState } from 'react'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { API_URL } from '../utils/constants';

export default function RegisterForm() {
  // no_auth_required();
  const [ipusername,settheName]=useState("")
  const [pwd,setpwd]=useState("")
  const {setToken,token} = useAuth()
  const router = useRouter()

  const login = () => {
    if(ipusername===''||pwd==='')
    {
      alert('The fields can`t be left empty!');
    }
    else{
    axios({
      url:API_URL+"auth/login/",
      method : "post",
      data : {username:ipusername,password:pwd}
    }).then((res)=>{
      const {data,status} = res;
      setToken(data.token),
      router.push('/')
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
            placeholder='Username'
            value={ipusername}
            onChange={(e)=>{settheName(e.target.value)}}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            value={pwd}
            onChange={(e)=>{setpwd(e.target.value)}}
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
