import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import Btn from './Btn'
import Link from 'next/link'

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
      console.log('Please fill all the fields correctly.')
      return false
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log('Please enter a valid email address.')
      return false
    }
    return true
  }

  const register = (e) => {
    e.preventDefault()

    if (
      registerFieldsAreValid(firstName, lastName, email, username, password)
    ) {
      console.log('Please wait...')

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
        })
        .catch(function (err) {
          console.log(
            'An account using same email or username is already created'
          )
        })
    }
  }

  return (
      <div className='container max-w-lg mx-auto flex flex-col px-2'>
        <div className='px-6 py-8 rounded flex flex-col text-white w-full registerForm'>
          <h1 className='mb-8 text-6xl float-left font-semibold'>Register<span style={{
            color:"rgb(0, 180, 216)"
          }}>.</span></h1>
          <h4 className="mb-3 font-bold">Already Have an account? <span style={{
            color:"rgb(0, 180, 216)"
          }}><Link href="/login">Log In</Link></span></h4>
          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full'
            name='inputFirstName'
            id='inputFirstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full'
            name='inputLastName'
            id='inputLastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />

          <input
            type='email'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full'
            name='inputEmail'
            id='inputEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
          />

          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full'
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
        <Btn data="Register" />
        </div>
        </div>
      </div>
  )
}
