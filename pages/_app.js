import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
      <ToastContainer />
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
