export const no_auth_required = (token, router) => {
    if (token) router.push('/')
}