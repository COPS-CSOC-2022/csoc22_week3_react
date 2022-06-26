import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const { setToken } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const registerFieldsAreValid = (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      username === '' ||
      password === ''
    ) {
    toast.warning('Please fill all the fields correctly.',{position:'bottom-right'});
    return false
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.warning('Please enter a valid email address.',{position:'bottom-right'});
      return false
    }
    return true
  }

  const register = (e) => {
    e.preventDefault()

    if (
      registerFieldsAreValid(firstName, lastName, email, username, password)
    ) {
      toast.info('Please wait...',{position:'bottom-right'});
      const dataForApiRequest = {
        name: firstName + ' ' + lastName,
        email: email,
        username: username,
        password: password,
      }

      axios.post(
        'auth/register/',
        dataForApiRequest,
      )
        .then(function ({ data, status }) {
          setToken(data.token)
          router.push('/')
          toast.success('Register Succesfully',{position:'bottom-right'});
        })
        .catch(function (err) {
        toast.error('An account using same email or username is already created',{position:'bottom-right'});
        })
    }
  }

  return (
      <div className='container max-w-lg mx-auto flex flex-col px-2'>
        <div className='px-6 py-8 rounded flex flex-col text-black w-full registerForm'>
          <h1 className='heading'>Register..</h1>
          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full bg-slate-100 focus:shadow-inner'
            name='inputFirstName'
            id='inputFirstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full bg-slate-100 focus:shadow-inner'
            name='inputLastName'
            id='inputLastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />

          <input
            type='email'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full bg-slate-100 focus:shadow-inner'
            name='inputEmail'
            id='inputEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
          />

          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full bg-slate-100 focus:shadow-inner'
            name='inputUsername'
            id='inputUsername'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />

          <input
            type='password'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full'
            name='inputPassword'
            id='inputPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        <div className="w-full" onClick={register}>
        <button className='todo-add-task text-sm px-4 py-4 hover:border-transparent mt-9 cursor-pointer text-white rounded-lg w-full focus:outline-none'>
          Register
        </button>
        </div>
        </div>
      </div>
  )
}
