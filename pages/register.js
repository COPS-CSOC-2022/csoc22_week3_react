import RegisterForm from '../components/RegisterForm'
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  return (
    <div>
      <RegisterForm />
      <ToastContainer />
    </div>
  )
}
