/***
 * @todo Redirect the user to login page if token is not present.
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
    if (!token) {
        route.push('/login');
      }
  },[token])
    
  }
 export const auth_required=()=>{Check()}