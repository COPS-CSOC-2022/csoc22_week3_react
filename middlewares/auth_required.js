/***
 * @todo Redirect the user to login page if token is not present.
 */
import React from "react";
import router from "next/router";

function tokenNotPresent(){
    const token = localStorage.getItem("token")
    if(!token){
        router.push("/login");
    }
}

export default tokenNotPresent;