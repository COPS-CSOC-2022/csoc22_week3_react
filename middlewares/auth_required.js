/***
 * @todo Redirect the user to login page if token is not present.
 */
 
 export const Auth=(token)=>{
    if(!token)
    return true
    return false
}