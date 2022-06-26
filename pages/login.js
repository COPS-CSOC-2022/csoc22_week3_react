import LoginForm from '../components/LoginForm'
import auth from '../middlewares/auth_required'
import noAuth from '../middlewares/no_auth_required'
import React, { useState, useEffect } from 'react'


export default function Login() {
  useEffect(() => { auth() }, []);
  useEffect(() => { noAuth() }, []);
  return (
    <div>
      <LoginForm />
    </div>
  )
}
