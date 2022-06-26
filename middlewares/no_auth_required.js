/***
 * @todo Redirect the user to main page if token is present.
 */
function noAuth() {
    

 if (localStorage.token) {
    window.location.href = '/';
} 
}

export default  noAuth();