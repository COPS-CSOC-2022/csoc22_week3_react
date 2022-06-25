/***
 * @todo Redirect the user to login page if token is not present.
 */
 export default function auth_required() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login/";
    }
}
