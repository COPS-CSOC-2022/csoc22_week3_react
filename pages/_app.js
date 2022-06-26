import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function displaySuccess(message) {
  toast.success(message);
}

export function displayError(message) {
  toast.error(message);
}

export function displayWarning(message) {
  toast.warning(message);
}

export function displayInfo(message) {
  toast.info(message);
}


function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Nav />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  )
}

export default MyApp
