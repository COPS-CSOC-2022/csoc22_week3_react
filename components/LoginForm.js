import axios from "axios";
import { useState } from "react";
import {no_auth_required} from "../middlewares/no_auth_required";
import { API_URL } from "../utils/constants";
import {useAuth} from "../context/auth"
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.css'
import { toast } from "react-toastify";
export default function RegisterForm() {
  no_auth_required();
  const [inpame,setName] = useState("")
  const [pass,setPass] = useState("")
  const {setToken,theme} = useAuth()
  const route = useRouter()
  const login = () => {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
  (inpame=="" || pass=="") ? (theme==='dark'? toast.warn("Username and Password can't be empty",{theme: 'dark'}) : toast.warn("Username and Password can't be empty")):
    axios({
      url : API_URL+"auth/login/",
      method : "post",
      data : {username: inpame , password: pass}
  })
  .then((res)=>{
    const {data,status} = res;
    setToken(data.token)
    theme==='dark'? toast.info("Please Wait",{theme: 'dark'}) : toast.info("Please Wait")
    route.reload()
  }).catch((err)=>theme==='dark'? toast.error("Enter Correct Credentials",{theme: 'dark'}) : toast.error("Enter Correct Credentials"))
    
    
  }

  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col dark:'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white dark:bg-green-800 px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <input
            type='text'
            className='block border border-grey-light dark:text-white w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
            value={inpame}
            onChange={(e)=>{setName(e.target.value)}}

          />

          <input
            type='password'
            className='block border border-grey-light dark:text-white w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
            value={pass}
            onChange={(e)=>{setPass(e.target.value)}}
          />
         

          <button
            type='submit'
            className='w-full text-center py-3 rounded dark:bg-red-500 dark:text-white text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
