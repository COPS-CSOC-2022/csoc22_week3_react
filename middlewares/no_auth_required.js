/***
 * @todo Redirect the user to main page if token is present.
 */
 export const noAuth=(token)=>{
    if(token)
    return true
    return false
}