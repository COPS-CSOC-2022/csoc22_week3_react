/***
 * @todo Redirect the user to main page if token is present.
 */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

export default function noAuthCheck(){
    const {token_1} = useAuth();
    const router = useRouter();
    useEffect(()=>{
    if(token_1)
    {   
        router.push('/')
        console.log("No auth required")
    } 
    },[token_1])
}