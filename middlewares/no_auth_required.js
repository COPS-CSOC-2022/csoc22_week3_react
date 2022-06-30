/***
 * @todo Redirect the user to main page if token is present.
 */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

export function noAuthRequired(){
    const {token} = useAuth()
    const route = useRouter()
    useEffect(()=>{
        if(token){
            route.push('/')
        }
    },[token])
}
noAuthRequired();
