import { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'

export function no_auth_required(){

  const { token } = useAuth()

  const router = useRouter()

  useEffect(()=>{
  if(token){
     router.push('/');
  }
},[token])


};