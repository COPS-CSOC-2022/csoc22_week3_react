import { useRouter } from 'next/router'
 import { useEffect } from 'react'
 import { useAuth } from '../context/auth'
 function TokenCheck(){
     const {token} = useAuth()
     const route = useRouter()
     useEffect(()=>{
         if(!token){
             route.push('/login')
         }
     },[token])
 }

 export const auth_required = ()=> {TokenCheck()}
