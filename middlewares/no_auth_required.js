
/***
 * @todo Redirect the user to main page if token is present.
 */
 import {useRouter} from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
 
function Check() {
    const {
      token
    } = useAuth();
    const route=useRouter();
  useEffect(()=>{
    if (token) {
        route.push('/');
      }
  },[token])
    
  }
 export const no_auth_required=()=>{Check()}