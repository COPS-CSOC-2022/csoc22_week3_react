import LoginForm from '../components/LoginForm'
import noAuthRequired from '../middlewares/no_auth_required'
import { useAuth } from '../context/auth'

export default function Login() {
  noAuthRequired()

  return (
    <div>
      <LoginForm />
    </div>
  )
}
