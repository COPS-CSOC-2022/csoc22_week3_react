import router from "next/router";
export default function no_auth_required() {
    if (localStorage.getItem('token')) {
        router.push('/');
        return;
    }
}