/***
 * @todo Redirect the user to main page if token is present.
 */
import router from "next/router";

import react from 'react'

function noAuth() {
    const token = localStorage.getItem('token');

    if (token) {
        router.push('/');
    }
}

export default noAuth;