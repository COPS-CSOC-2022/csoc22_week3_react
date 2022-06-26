import router from "next/router";
export default function auth_required() {
    if (! localStorage.getItem('token')) {
        router.push('/login');
    }
}


