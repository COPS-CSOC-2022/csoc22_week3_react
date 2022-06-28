import LoginForm from '../components/LoginForm'
import { useEffect } from 'react'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import {noAuth} from '../middlewares/no_auth_required'

export default function Login() {
  const {token} = useAuth()
  const router= useRouter()
  useEffect(() =>{
    if(noAuth(token))
    {router.push('/')}
  },[])
  return (
    <div>
      <LoginForm />
    </div>
  )
}
