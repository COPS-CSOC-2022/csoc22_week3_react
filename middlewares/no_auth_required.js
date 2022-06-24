import router from "next/router";
import { useAuth } from "../context/auth";

/***
 * @todo Redirect the user to main page if token is present.
 */
const {token1} = useAuth()
if(token1){
    router.push('/')
}