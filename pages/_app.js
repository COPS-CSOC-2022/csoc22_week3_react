import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'
import {
  displaySuccessToast,
  displayInfoToast,
  displayErrorToast,
} from "../components/alert";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp