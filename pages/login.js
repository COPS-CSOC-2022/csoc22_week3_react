import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/auth'
import { no_auth_required } from '../middlewares/no_auth_required'

export default function Login() {

  const route = useRouter()
  const {token} = useAuth()

  useEffect(() => {
    no_auth_required(token, route)
  },[])

  return (
    <div>
      <LoginForm />
    </div>
  )
}
