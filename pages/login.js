import LoginForm from '../components/LoginForm'

import NoAuthRequired from '../middlewares/no_auth_required';

export default function Login() {
  return (
    <div>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/css/iziToast.min.css"></link>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js"></script>
      <NoAuthRequired>
      <LoginForm />
      </NoAuthRequired>
    </div>
  )
}