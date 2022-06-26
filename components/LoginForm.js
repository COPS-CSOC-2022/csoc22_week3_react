import axios from '../utils/axios';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { displayErrorToast, displayInfoToast, displaySuccessToast, displayWarnToast} from "../components/alert";


export default function RegisterForm() {
  const router= useRouter();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const { setToken }=useAuth();

  const loginFieldsValid =(username,password) => {
    if(username==='' || password==='')
    {
      iziToast.destroy();
      displayInfoToast('Please fill the given fields')
      return false;
    }
    return true;
  };

  const login = (e) => {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
    e.preventDefault();
   
    
    if(loginFieldsValid(username,password)){
      iziToast.destroy();
     displayInfoToast('Please Wait')

      const dataForApiRequest={
        "username":username,
        "password":password,
      }

      axios({
        url:'auth/login/',
        method:'POST',
        data:dataForApiRequest
      })
      .then(
        ({data}) => {
          setToken(data.token);
          iziToast.destroy();
          displaySuccessToast('Logged in successfully')
          router.push('/');
    })
      .catch(
        (err) => {
          iziToast.destroy();
          displayErrorToast('This account does not exist')
      
        }
      )

    }
  

  }

  return (
    <div className="box">
          <h1 className='mb-8 text-3xl text-center'>Login</h1>
          <div className="input-container">
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
           </div>
           <div className="input-container">
          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            value={password}
      onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          </div>

          <button
            type='submit'
            className="login"
            onClick={login}
          >
            Login
          </button>
        </div>
  )
}