/***
 * @todo Redirect the user to login page if token is not present.
 */
 /*import { useEffect} from 'react';
 import { useAuth } from '../context/auth';
 import { useRouter } from 'next/router';
 
 export default function auth(){
     const {token} = useAuth();
     const router = useRouter()
     useEffect(() => {  
         if(!token){
             router.push('/login')
         }
     },[token])
 }*/
 import { useAuth } from "../context/auth";
import { useRouter } from 'next/router';
import { useEffect } from "react";

/***
 * @todo Redirect the user to login page if token is not present.
 */

const AuthRequired=(props) => {
    const { token }=useAuth();
    const router=useRouter();
   useEffect(() => {
    if(!token)
    { router.replace('/login');
 
    }    

   },[]);

   return props.children;
   }

export default AuthRequired;



