import router from "next/router";
import {No_Auth_req} from "../middlewares/no_auth_required"
import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from '../utils/axios'
import { toast } from "react-toastify";

export default function RegisterForm() {
  No_Auth_req();
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const {setToken} = useAuth();
  const Login = () => {
        
    if (username === '' || password === '') {
      toast.warn('Do not use empty fields!',{position:"top-center",theme:"colored"});
      return;
    }
    const dataForApiRequest = {
      username: username,
      password: password
    }

    axios.post(
      'auth/login/',
      dataForApiRequest,
    ).then(function({data, status}) {
      setToken(data.token);
      toast.success('Login was successful!!',{position:"top-center",theme:"colored"})
      router.reload();
    }).catch(function(err) {
      toast.error('Invalid credentials! :(',{position:"top-center",theme:"colored"});
      console.log(err);
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
            placeholder='Username'
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={Login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
