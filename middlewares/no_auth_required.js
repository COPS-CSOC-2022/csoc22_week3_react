/***
 * @todo Redirect the user to main page if token is present.
 */
import router, { useRouter } from "next/router";
import { useEffect } from "react";

export function noAuthRequired(token){
    
    const router = useRouter()
   
    useEffect(()=>{
        if(token)
         router.push('/');
    },[token])
}

