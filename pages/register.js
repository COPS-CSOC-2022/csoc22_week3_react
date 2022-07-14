import RegisterForm from '../components/RegisterForm'
import { useEffect } from 'react'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import {noAuth} from '../middlewares/no_auth_required'
export default function Register() {
  const {token} = useAuth()
  const router= useRouter()
  useEffect(() =>{
    if(noAuth(token))
    {router.push('/')}
  },[])
  return (
    <div>
      <RegisterForm />
    </div>
  )
}
