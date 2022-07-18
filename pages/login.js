import LoginForm from '../components/LoginForm'
import isTokenPresent from '../middlewares/no_auth_required'
import isTokennotPresent from '../middlewares/auth_required'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => { isTokennotPresent() }, [])
  useEffect(() => { isTokenPresent() }, [])
  return (
    <div>
      <LoginForm />
    </div>
  )
}
