export const auth_required = (token, router) => {
    if (!token) router.push('/login')
}