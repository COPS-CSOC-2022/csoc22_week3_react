import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
    <ToastContainer />
    <AuthProvider>
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
