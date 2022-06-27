import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import noAuthCheck from "../middlewares/no_auth_required";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function LoginForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {setToken,setToken_1} = useAuth()
  const router = useRouter();

  noAuthCheck();

    const loginEntriesAreValid = (
      username,
      password
    ) => {
      if(username === '' || password === '')
      {
        toast.error('Pls check the login details', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        return false
      }
      toast.info('Please Wait...', {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
          return true
    }
  const login = () => {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    if(loginEntriesAreValid(username,password))
    {
    const loginDataForApiRequest = {
      username: username,
      password: password
    }

    axios.post('auth/login/',
    loginDataForApiRequest,)
    .then(function({data,status}){
      toast.success('Login Successfull', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      localStorage.setItem("token",data.token)
      setToken(data.token)
      setToken_1(data.token)
      router.push("/")
    }).catch(function(err){
      toast.error('Login failed... Bad Credentials', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      console.log(err)
    })
  }
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col '>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-10 py-10 rounded-xl shadow-xl text-black w-full'>
          <h1 className='mb-8 text-3xl text-center font-bold'>Login</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
            onChange= {(e)=> setUserName(e.target.value)}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange= {(e)=> setPassword(e.target.value)}
          />

          <button
            type='submit'
            className='w-full font-bold text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
