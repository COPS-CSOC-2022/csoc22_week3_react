import router from "next/router";
export function no_auth_required(token) {
  if (token) {
    router.push("/");
  }
}
/***
 * @todo Redirect the user to main page if token is present.
 */
