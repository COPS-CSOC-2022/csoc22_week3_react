import router from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
/***
 * @todo Redirect the user to login page if token is not present.
 */
export function auth_required(token) {
    console.log(token);
    if(token==undefined){
        router.push('/login')
    }
}

