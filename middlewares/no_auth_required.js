/***
 * @todo Redirect the user to main page if token is present.
 */
 import React from "react";
 import router from "next/router";
 
 function tokenPresent(){
     const token = localStorage.getItem("token")
     if(token){
         router.push('/');
     }
 }
 
 export default tokenPresent;