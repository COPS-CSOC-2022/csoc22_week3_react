/***
 * @todo Redirect the user to login page if token is not present.
 */
function auth(){
 if (localStorage.token === null ) {
    window.location.href = 'login/';
} 

}

export default  auth();

