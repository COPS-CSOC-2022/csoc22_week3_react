import axios from "axios";
import router from "next/router";
import React,{ useState } from "react";
import { useAuth } from "../context/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm() {
  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')
  const {setToken,setTok} = useAuth()

  const login = () => {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    if(user != "" && pass !=""){
      axios.post('https://todo-app-csoc.herokuapp.com/auth/login/',{
        username:user,
        password:pass
      }).then(({data})=>{
        setToken(data.token)
        setTok(data.token)
        alert("Logged in as "+user)
        router.push('/')
      }).catch((e)=>{
        console.log(e);
        toast.error('Enter valid username and password',{position:'bottom-right'});
      })

    }
    else{
      toast.warning('Fill both username and password fields',{position:'bottom-right'});
    }
  }

  return (
      <div className='container max-w-lg mx-auto flex flex-col px-2'>
        <div className='px-6 py-8 rounded flex flex-col text-black w-full'>
          <h1 className='heading'>Login..</h1>
          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
            onChange={(e)=>{setUser(e.target.value);}}
          />
          <input
            type='password'
            className='px-8 py-4 rounded-lg text-md w-full'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            onChange={(e)=>{setPass(e.target.value);}}
          />
<div className="w-full mt-0" onClick={login}>
  <button className='todo-add-task text-sm px-4 py-4 hover:border-transparent mt-9 cursor-pointer text-white rounded-lg w-full focus:outline-none'>
          Login
        </button>
</div>
        </div>
      </div>
  )
}
