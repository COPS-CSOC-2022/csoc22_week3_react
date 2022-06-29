import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth"

/***
 * @todo Redirect the user to login page if token is not present.
 */
export default function authRequired(){
    
    const router = useRouter()
    const { token } = useAuth()
    useEffect(()=>{
        if(!token){
            router.push('/login')
        }
    },[])
}
