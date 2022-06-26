import React from "react";
import router from "next/router";


function isTokennotPresent() {

    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/login');
    }


}


export default isTokennotPresent;