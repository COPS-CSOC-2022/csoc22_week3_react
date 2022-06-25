import React from "react";
import router from "next/router";


function isTokenPresent() {

    const token = localStorage.getItem('token');
    if (token) {
        return;
    }
    else {
        router.push('/login');
    }


}


export default isTokenPresent;