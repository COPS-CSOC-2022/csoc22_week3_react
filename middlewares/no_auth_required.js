import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/auth'
function TokenCheck(){
    const {token} = useAuth()
    const route = useRouter()
    useEffect(()=>{
        if(token){
            route.push('/')
        }
    },[token])
}
export const no_auth_required = ()=>{TokenCheck()} 