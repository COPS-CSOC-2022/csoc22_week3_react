import router from "next/router";
import { useAuth } from "../context/auth";

/***
 * @todo Redirect the user to main page if token is present.
 */
export const no_auth_required=(token)=>{
if(token){
    router.push("/")
}
}
