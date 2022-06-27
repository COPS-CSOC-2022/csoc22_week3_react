/***
 * @todo Redirect the user to login page if token is not present.
 */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";

export default function authCheck(){
    const {token_1} = useAuth();
    const router = useRouter();
    useEffect(()=>{
    if(!token_1)
    {  
        router.push('/login')
        console.log("Please Login or Register")
       
    } 
    },[token_1])
}
