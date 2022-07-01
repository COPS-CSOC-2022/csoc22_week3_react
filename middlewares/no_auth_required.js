/***
 * @todo Redirect the user to main page if token is present.
 */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

function noAuthRequired(){
    const { token }=useAuth();
    const router=useRouter();
   useEffect(() => {
    if(token)
    {
        router.replace('/');

    }
    },[token])
}
export default noAuthRequired;