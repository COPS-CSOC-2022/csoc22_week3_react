import router from "next/router";
export function auth_required(token) {
  if (token == undefined) {
    router.push("/login");
  }
}

/***
 * @todo Redirect the user to login page if token is not present.
 */
