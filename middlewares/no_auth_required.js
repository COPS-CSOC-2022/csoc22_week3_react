import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/auth'

export function no_auth_required() {
    const {token} = useAuth()
    const router = useRouter()
    
    useEffect(() => {
        if(!token) router.replace('/login')},
    [token])
}
