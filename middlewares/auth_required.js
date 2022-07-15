import { useEffect} from 'react'

import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'

export function auth_required(){

  const { token } = useAuth()

  const router = useRouter()

  useEffect(()=>{
  if(token===undefined){
     router.push('/login');
  }
},[token])


} ;