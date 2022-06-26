/***
 * @todo Redirect the user to main page if token is present.
 */
 import { useEffect, useState } from 'react'
 import { useAuth } from '../context/auth'
 import { useRouter } from 'next/router'

 export function noAuthRequired(){
   
   const { token } = useAuth()

   const router = useRouter()

   useEffect(()=>{
   if(token){
      router.push('/');
   }
 },[token])


 }; 
