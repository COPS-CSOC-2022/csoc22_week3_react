/***
 * @todo Redirect the user to login page if token is not present.
 */

import { useRouter } from "next/router";
import { useEffect } from "react";

export function authRequired(token){
    
    const router = useRouter()
    useEffect(()=>{
        if(!token){
            router.push('/login');
        }
    },[token]);
}







