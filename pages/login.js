import LoginForm from '../components/LoginForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  return (
    <div>
      <LoginForm />
      <ToastContainer />
    </div>
  )
}
