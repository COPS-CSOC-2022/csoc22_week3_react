/***
 * @todo Redirect the user to main page if token is present.
 */
 import { useRouter } from "next/router";
 import { useEffect } from "react";
import { useAuth } from "../context/auth";
 
 function noAuthRequired() {
    const router = useRouter()
    const { token } = useAuth()

    useEffect(() => {
        if (token) {
            router.push("/")
        }
    }, [])
 }
 
 export default noAuthRequired