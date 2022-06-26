import router from "next/router";
import react from 'react'
/***
 * @todo Redirect the user to login page if token is not present.
 */
function auth(){
const token = localStorage.getItem('token');
 if (token === null ) {
router.push('/login');} 

}

export default  auth;

