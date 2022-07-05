import { useEffect } from 'react'
import RegisterForm from '../components/RegisterForm'
import { no_auth_required } from '../middlewares/no_auth_required'

export default function Register() {

  const route = useRouter()
  const {token} = useAuth()

  useEffect(() => {
    no_auth_required(token, route)
  },[])

  return (
    <div>
      <RegisterForm />
    </div>
  )
}
