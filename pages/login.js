import LoginForm from '../components/LoginForm'
import { no_auth_required } from '../middlewares/no_auth_required'


export default function Login() {
  no_auth_required()
  return (
    <div>
     
      <LoginForm />
    </div>
  )
}
