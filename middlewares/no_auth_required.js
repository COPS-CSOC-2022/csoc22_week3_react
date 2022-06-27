import React from "react";
import router from "next/router";


function isTokenPresent() {

    const token = localStorage.getItem('token');
    if (token) {
        router.push('/');
        return;
    }
}


export default isTokenPresent;