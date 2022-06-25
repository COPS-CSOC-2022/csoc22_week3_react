import LoginForm from '../components/LoginForm'

import NoAuthRequired from '../middlewares/no_auth_required';

export default function Login() {
  return (
    <div>
       
      <NoAuthRequired>
      <LoginForm />
      </NoAuthRequired>
    </div>
  )
}