import React from "react";
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import  noAuthRequired  from "../middlewares/no_auth_required";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "todo-app-csoc.herokuapp.com/" ;

export default function RegisterForm() {
  const router = useRouter();
  const { setToken } = useAuth();

  const [loginData, setLoginData] = React.useState({
    inputUsername: "",
    inputPassword: ""
  })

  function handleChange(event){
    const {name, value} = event.target;
    setLoginData(prev => {
      return {
        ...prev,
        [name] : value
      }
    })
  }

  noAuthRequired();

  const login = () => {
    
    const userData = {
      username: loginData.inputUsername,
      password: loginData.inputPassword
    }
    if(userData.username==="" || userData.password===""){
      toast.warn("Enter username or password",{position: "top-center"});
      return;
    }

    axios({
        url: "auth/login/",
        method: 'POST',
        data: userData,
    }).then(res => {
        toast.success("Login Successfull!!!",{position: "top-center"});
        const authToken = res.data.token;
        setToken(authToken)
        router.push('/error', '/');            
        
    }).catch(function (err) {
        // console.log(err);
        toast.error("Enter correct Username Or Password!!!",{position: "top-center"});
        setLoginData({
          inputUsername: "",
          inputPassword: ""
        })
    })
    
  }

  return (
    <>
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <input
            onChange={handleChange}
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
            value={loginData.inputUsername}
          />

          <input
            onChange={handleChange}
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            value={loginData.inputPassword}
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
    <ToastContainer/>
       </>
  )
}

