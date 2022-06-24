import router from "next/router";
import { useAuth } from "../context/auth";

/***
 * @todo Redirect the user to login page if token is not present.
 */
console.log(cookies.token);
const token = cookies.token
console.log(token);
if(!token){
    router.push('/login')
}